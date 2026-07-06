import { assets } from "../assets/assets"

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row bg-cyan-600 rounded-lg px-6 sm:px-10 lg:px-20 overflow-hidden">
      {/* left side */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start justify-center gap-4 py-10 md:py-16 lg:py-24 text-center md:text-left">
        <p className="text-2xl sm:text-3xl lg:text-4xl text-white font-serif font-semibold leading-tight">
          Book Appointment <br className="hidden sm:block" /> With Trusted
          Doctors
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 text-white text-sm font-light">
          <img
            className="w-24 sm:w-28"
            src={assets.group_profiles}
            alt="few profile"
          />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free
          </p>
        </div>

        <a
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300"
          href="#speciality"
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="book appointment" />
        </a>
      </div>

      {/* right side */}
      <div className="md:w-1/2 flex items-end justify-center">
        <img
          className="w-full max-w-xs sm:max-w-sm md:max-w-none h-auto object-contain"
          src={assets.header_img}
          alt="doctor group"
        />
      </div>
    </div>
  )
}

export default Hero