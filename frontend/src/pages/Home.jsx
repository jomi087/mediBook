import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from "../components/TopDoctors"

const Home = () => {
  return (
    <div className="space-y-4">
      <Hero />
      <HowItWorks />
      <SpecialityMenu />
      <TopDoctors />
    </div>
  );
};

export default Home;
