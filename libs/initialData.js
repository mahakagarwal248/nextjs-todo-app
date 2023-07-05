// The following function is shared
// with getStaticProps and API routes
// from a `lib/` directory
export async function NavbarData() {
  const initalData = {
    login: "Login",
    logout: "Logout",
  };
  return initalData;
}
