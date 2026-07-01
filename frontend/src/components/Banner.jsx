import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"

const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className="flex bg-cyan-600 rounded-lg px-6 sm:px-5 md:px-10 lg:px-8 md:mx-5 md:mt-10 ">
      {/* left side */}
      <div className="flex-1 py-4 sm:py-8 md:py-14 lg:py-16 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-stone-200 font-serif ">
          <p>Book Appointment</p>
          <p className="mt-2 lg:mt-4 lg:text-center">
            with 100
            <sup className="text-yellow-300">+ </sup>
            Trusted Doctors
          </p>
        </div>
        <button
          onClick={() => {
              navigate("/login")
              window.scrollTo(0,0)
            }
          }
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-103 transition-all font-montserrat font-semibold"
        >
          Create Account
        </button>
      </div>
      {/* right side */}
      <div className="hidden md:block md:w-1/2 lg:w-92.5 relative">
        <img
          className="absolute w-full bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt="advertisment image"
        />
      </div>
    </div>
  )
}

export default Banner
