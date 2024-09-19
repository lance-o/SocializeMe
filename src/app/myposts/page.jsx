import MyPosts from "@/components/MyPosts";
export async function generateMetadata() {
  return {
    title: `Socialize Me App - MyPosts`,
    description: `Connecting Software Development Professionals Through Socialize Me!`,
  };
}
export default async function MyPostsPage() {
  return (
    <>
      <MyPosts />
    </>
  );
}
