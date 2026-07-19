import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import SpecialityMenu from '../components/home/SpecialityMenu';
import TopDoctors from '../components/home/TopDoctors';
import Banner from '../components/home/Banner';

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
