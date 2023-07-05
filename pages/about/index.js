function About(props) {
  console.log(props);
  return <div>About</div>;
}

export const getServerSideProps = async () => {
  //   const res = await fetch("https://api.github.com/repos/vercel/next.js");
  //   const repo = await res.json();
  const repo = { message: "About page" };
  return { props: { repo } };
};

export default About;
