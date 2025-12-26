import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
    </>
  );
};

export default Layout;
