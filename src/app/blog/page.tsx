import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on signal intelligence, spectrum analysis, and electronic security from the Signal Scout team.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Coming soon — insights on signal intelligence, spectrum analysis,
            and electronic security.
          </p>
        </div>

        {/* Blog post cards go here. Example structure:
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <BlogPostCard
            title="Post title"
            excerpt="Post excerpt..."
            date="2025-03-01"
            slug="post-slug"
            image="/blog/post-image.jpg"
          />
        </div>
        */}
      </main>
      <Footer />
    </>
  );
}
