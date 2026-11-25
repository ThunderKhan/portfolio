export interface Blog {
  title: string;
  date: string;
  claps: number;
  tags: string[];
  link: string;
  isExternal: boolean;
  /**
   * Where to read the live approval count. `claps` stays as the committed
   * fallback for when the upstream is unreachable.
   */
  live?:
    | { source: "codeforces"; entryId: number }
    | { source: "x"; handle: string; statusId: string };
  slug?: string;
  description?: string;
  readingTime?: string;
  content?: BlogBlock[];
}

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption: string;
      width: number;
      height: number;
    }
  | { type: "list"; items: string[] }
  | {
      type: "links";
      items: { title: string; href: string; description: string }[];
    };

/**
 * External posts and published work. Set `isExternal: false` and add `slug` +
 * `content` to host a post on the site instead of linking out.
 *
 * `claps` is whatever the host platform counts as approval - Codeforces calls
 * it the blog's rating, which is its net upvotes.
 */
export const blogsData: Blog[] = [
  {
    "title": "I Built C++ Test Impact Analysis With Zero Runtime Dependencies",
    "date": "Aug 30, 2026",
    "claps": 0,
    "tags": [
      "C++",
      "Testing",
      "DevTools"
    ],
    "link": "https://dev.to/thunderkhan/i-built-c-test-impact-analysis-with-zero-runtime-dependencies-4bo8",
    "isExternal": true,
    "description": "How diff2test reconstructs affected CTest tests from CMake and compiler metadata without third-party runtime dependencies.",
    "readingTime": "16 min read"
  }
];

export const blogPosts = blogsData.filter(
  (blog): blog is Blog & { slug: string; content: BlogBlock[] } =>
    typeof blog.slug === "string" && Array.isArray(blog.content),
);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((blog) => blog.slug === slug);
}
