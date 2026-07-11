import { ABOUT_CONTENT } from '../constants/aboutContent';

const About = () => {
  return (
    <div className="pb-10">
      {/* Hero */}
      <div className="text-center pt-4 ">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-2">
          {ABOUT_CONTENT.hero.title}{' '}
          <span className="text-primary">{ABOUT_CONTENT.hero.brand}</span>
        </h1>

        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          {ABOUT_CONTENT.hero.subtitle}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12 my-10">
        <img
          className="w-full md:max-w-95 rounded-2xl shadow-lg shadow-gray-200"
          src={ABOUT_CONTENT.image.url}
          alt={ABOUT_CONTENT.image.imageAlt}
        />

        <div className="flex-1 flex flex-col gap-5 text-[15px] leading-relaxed text-gray-600">
          <p>{ABOUT_CONTENT.description.paragraph1}</p>

          <p>{ABOUT_CONTENT.description.paragraph2}</p>

          <div className="border-l-4 border-primary bg-primary/5 rounded-r-lg px-5 py-4 mt-1">
            <p className="font-semibold text-gray-800 mb-1">
              {ABOUT_CONTENT.vision.title}
            </p>

            <p className="text-gray-600">{ABOUT_CONTENT.vision.description}</p>
          </div>
        </div>
      </div>

      {/* Why choose us */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          {ABOUT_CONTENT.whyChooseUs.subtitle}
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
          {ABOUT_CONTENT.whyChooseUs.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ABOUT_CONTENT.whyChooseUs.cards.map(({ title, desc, icon }) => (
          <div
            key={title}
            className="group border border-gray-200 rounded-2xl p-8 flex flex-col gap-4 bg-white
               hover:border-primary hover:shadow-xl hover:shadow-primary/10
               hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div
              className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center
                 group-hover:bg-primary transition-colors duration-300"
            >
              <img src={icon} alt={title} className="w-5 h-5" />
            </div>

            <b className="text-gray-800 text-base">{title}</b>

            <p className="text-[15px] text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
