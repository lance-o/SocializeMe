import Users from "@/components/Users";
export async function generateMetadata() {
  return {
    title: `Socialize Me App - Users`,
    description: `Connecting Software Development Professionals Through Socialize Me!`,
  };
}
export default function UsersPage() {
  return (
    <>
      <Users />
    </>
  );
}
