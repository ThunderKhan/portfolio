import assert from "node:assert/strict";
import { test } from "node:test";
import { blogsData, blogPosts, getBlogPostBySlug } from "../src/data/blogsData.ts";

test("published articles have unique internal URLs and complete content", () => {
  assert.ok(blogPosts.length > 0);
  assert.equal(new Set(blogPosts.map((post) => post.slug)).size, blogPosts.length);
  for (const post of blogPosts) {
    assert.equal(post.link, `/blogs/${post.slug}`);
    assert.equal(post.isExternal, false);
    assert.ok(post.content.length > 0);
    assert.equal(getBlogPostBySlug(post.slug), post);
  }
  assert.equal(blogsData.length, blogPosts.length);
  assert.equal(getBlogPostBySlug("missing-article"), undefined);
});

test("diff2test preserves code blocks and cross-publication links", () => {
  const post = getBlogPostBySlug("cpp-test-impact-analysis-zero-runtime-dependencies");
  assert.ok(post);
  assert.ok(post.content.some((block) => block.type === "code" && block.text.includes("git diff")));
  assert.ok(post.content.some((block) => block.type === "quote" && block.text.includes("precondition engineering")));
  assert.equal(post.crossPosts.length, 2);
  assert.equal(post.publishedAt, "2026-08-30");
});
