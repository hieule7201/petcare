import Banner from "../../components/Home/Banner";
import Navbar from "../../components/Navbar";
import Service from "../../components/Home/Services";
import "./home.css";
import Footer from "../../components/Footer";
import About from "../../components/Home/About";

const Home = () => {
  return (
    <>
      <Navbar />

      <Banner />
      <About />
      <Service />
      <Footer />
    </>
  );
};

export default Home;
