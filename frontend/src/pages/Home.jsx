import Hero from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import SpecialityMenu from "../components/SpecialityMenu"


const Home = () => {
  return (
    <div className="space-y-4">
      <Hero />
      <HowItWorks />
      <SpecialityMenu />

    </div>
  )
}

export default Home
