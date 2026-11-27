# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY --chown=node:node package.json package-lock.json ./
RUN chown node:node /app
USER node
RUN npm ci --no-audit --no-fund

FROM node:22-bookworm-slim AS builder
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

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

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
