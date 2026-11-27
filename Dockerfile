# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim@sha256:be979e5523c76fa4d5ca4ebd3099078f220aa47ec39c48ad5b5df9314debd6eb AS deps
WORKDIR /app
COPY --chown=node:node package.json package-lock.json ./
RUN chown node:node /app
USER node
RUN npm ci --no-audit --no-fund

FROM node:22-bookworm-slim@sha256:be979e5523c76fa4d5ca4ebd3099078f220aa47ec39c48ad5b5df9314debd6eb AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN chown node:node /app
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json package-lock.json next.config.ts portfolio.config.ts postcss.config.mjs tsconfig.json ./
COPY --chown=node:node src ./src
COPY --chown=node:node public ./public
COPY LICENSE ./LICENSE
USER node
RUN PORTFOLIO_DOCKER_BUILD=1 npm run build

FROM node:22-bookworm-slim@sha256:be979e5523c76fa4d5ca4ebd3099078f220aa47ec39c48ad5b5df9314debd6eb AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

# Patch the installed PAM packages and omit development package managers from
# the runtime filesystem. The standalone server runs directly with Node.
RUN apt-get update \
    && apt-get install -y --no-install-recommends --only-upgrade libpam0g libpam-modules libpam-modules-bin libpam-runtime \
    && dpkg --compare-versions "$(dpkg-query -W -f='${Version}' libpam0g)" ge 1.5.2-6+deb12u3 \
    && rm -rf /var/lib/apt/lists/* \
        /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
        /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
        /usr/local/bin/yarn /usr/local/bin/yarnpkg /usr/local/bin/pnpm /usr/local/bin/pnpx \
        /opt/yarn-v*

# Keep application entry point, dependencies and public/static assets root-owned.
COPY --from=builder --chown=0:0 /app/.next/standalone ./
COPY --from=builder --chown=0:0 /app/.next/static ./.next/static
COPY --from=builder --chown=0:0 /app/public ./public
COPY --from=builder --chown=0:0 /app/LICENSE ./LICENSE
# Next's filesystem cache and App Router ISR output need runtime writes.
# Do not mount an empty volume over generated server/app content.
RUN mkdir -p /app/.next/cache && chown -R node:node /app/.next/cache /app/.next/server/app

USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||'3000')+'/robots.txt',{signal:AbortSignal.timeout(3000),redirect:'error'}).then(r=>{process.exit(r.ok?0:1)},()=>process.exit(1))"]
CMD ["node", "server.js"]
