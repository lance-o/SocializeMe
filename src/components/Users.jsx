import fetchAllUsers from "@/app/actions/fetchAllUsers";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import AvatarDisplayTable from "./AvatarForTable";
import { SignInButton } from "@clerk/nextjs";
import "./Users.css";
import { fetchUser } from "@/app/actions/fetchUser";
import { fetchRole } from "@/app/actions/fetchRole";
import { deleteUser } from "@/app/actions/deleteUser";
import SearchUserComponent from "./SearchBarComponent";

export default async function Users() {
  try {
    const currUser = await currentUser();
    if (!currUser) {
      return (
        <>
          <p style={{ color: "red" }}>you need to Login first</p>
          <SignInButton />
        </>
      );
    }
    //fetching current user inf0
    const theUser = await fetchUser(currUser.id);
    //fetch current user role
    const curRole = await fetchRole(theUser.id);

    const users = await fetchAllUsers();
    console.log(users);
    // const canDeleteOrEdit = curRole.role_name === "manager";
    //   || // Manager can access all
    //   (curRole.role_name === "admin" && role.role_name === "normal_user"); // Admin can only manage Users
    //   (curRole.role_name === "normal_user" && theUser.id === newUser.id); // Users can only manage themselves

    return (
      <>
        <SearchUserComponent />
        <table>
          <thead>
            <tr className="trHead">
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const canDeleteOrEdit =
                curRole.role_name === "manager" ||
                (curRole.role_name === "admin" &&
                  user.role_name === "normal_user");
              return (
                <tr className="trBody" key={user.id}>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0.75rem",
                    }}
                  >
                    <AvatarDisplayTable src={user.profile_image} />
                    <Link
                      style={{ color: "purple" }}
                      href={`/profile/${user.id}`}
                    >
                      {user.first_name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      style={{ color: "purple" }}
                      href={`/profile/${user.id}`}
                    >
                      {user.email}
                    </Link>
                  </td>

                  <td>
                    {
                      //prettier-ignore
                      canDeleteOrEdit  && (
                    <>
                    <form>

                    </form>
                      <button
                      >
                        Remove
                      </button>
                    </>
                  )
                      //prettier-ignore-end
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } catch {
    throw new Error("Dispalying users is not possible check users component");
  }
}
