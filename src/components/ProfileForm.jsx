import { currentUser } from "@clerk/nextjs/server";
import UploadMedia from "./UploadImage";
import { SignInButton } from "@clerk/nextjs";

export default async function ProfileForm() {
  const currentuser = await currentUser();

  async function profileFormSubmit(formData) {
    "use server";
    const firstName = formData.get("firstname");
    const lastName = formData.get("lastname");
    const email = formData.get("email");
    const bio = formData.get("bio");
    const imageUrl = formData.get("imageUrl");
    const created_date = currentuser?.createdAt;
    const lastLogin = currentuser?.lastSignInAt;
    const creationDate = new Date(currentuser.createdAt).toLocaleString();
    const lastsignIn = new Date(lastLogin).toLocaleString();

    console.log("Created date show us please", created_date);
    console.log(creationDate);

    // await db.query(
    //     `INSERT INTO users(email,bio,first_name,last_name,profile_image,clerk_id) VALUES($1,$2,$3,$4,$5,$6)  `,
    //     [email, bio, first_name, last_name, CurrUser?.imageUrl, CurrUser?.id]
    //   );
  }

  return (
    <div>
      <SignInButton />
      <form action={profileFormSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="email" />
        </div>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="firstname"
            id="first_name"
            placeholder="First Name"
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="last_name"
            placeholder="Last Name"
          />
        </div>
        <div>
          <label htmlFor="Bio">Bio</label>
          <input type="text" name="bio" id="Bio" placeholder="Bio" />
        </div>
        <div>
          <label htmlFor="imageUrl">Image</label>
          <UploadMedia />
          <input type="hidden" name="imageUrl" id="imageUrl" />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
