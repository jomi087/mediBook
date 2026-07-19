import { steps } from '../../assets/assets';

const HowItWorks = () => {
  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold font-inter">
            How It Works
          </h2>

          <p className="mt-1 text-gray-600 text-lg">
            Get the care you need in three simple steps.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-2 lg:gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative w-full sm:max-w-md md:flex-1 md:max-w-sm bg-white border border-gray-200 rounded-2xl p-6 flex items-center md:flex-col text-left md:text-center gap-5 hover:scale-103 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-6 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                {step.id}
              </div>

              {/* Icon */}
              <div className="hidden sm:block shrink-0 p-3">
                <img
                  src={step.iconUrl}
                  alt={step.title}
                  className="w-10 h-10"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-3">
                  <h3 className="flex-1 sm:text-lg font-semibold font-poppins leading-snug">
                    {step.title}
                  </h3>

                  <div className="sm:hidden shrink-0 rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center">
                    <img
                      src={step.iconUrl}
                      alt={step.title}
                      className="w-5 h-5"
                    />
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
