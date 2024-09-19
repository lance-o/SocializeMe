import Favorite from "@/components/Favorite";
export async function generateMetadata() {
  return {
    title: `Socialize Me App - Favourite`,
    description: `Connecting Software Development Professionals Through Socialize Me!`,
  };
}
export default function FavoritePage() {
  return (
    <>
      <Favorite />
    </>
  );
}
