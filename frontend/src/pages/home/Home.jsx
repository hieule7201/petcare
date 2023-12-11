import Banner from "../../components/Home/Banner";
import Navbar from "../../components/Navbar";
import Service from "../../components/Home/Services";
import "./home.css";

const Home = () => {
  return (
    <>
      <Navbar />

      <Banner />
      <Service />
    </>
  );
};

export default Home;
