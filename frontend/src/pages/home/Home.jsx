import Banner from "../../components/Home/Banner";
import Navbar from "../../components/Navbar";
import Service from "../../components/Home/Services";
import "./home.css";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <Banner />
      <Service />
      <Footer />
    </>
  );
};

export default Home;
