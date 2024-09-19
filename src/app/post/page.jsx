import PostForm from "@/components/PostForm";
export async function generateMetadata() {
  return {
    title: `Socialize Me App - Post`,
    description: `Connecting Software Development Professionals Through Socialize Me!`,
  };
}
export default function PostPage() {
  return (
    <div>
      <PostForm />
    </div>
  );
}
