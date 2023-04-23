import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100vw",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
);

export default SignUpPage;
