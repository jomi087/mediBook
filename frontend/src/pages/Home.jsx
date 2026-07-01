import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from "../components/TopDoctors"
import Banner from "../components/Banner"

const Home = () => {
  return (
    <div className="space-y-4">
      <Hero />
      <HowItWorks />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
