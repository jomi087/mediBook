import { assets } from '../assets/assets';
import { BRAND_NAME } from './appConstants';

export const ABOUT_CONTENT = {
  hero: {
    title: 'About',
    brand: `${BRAND_NAME}`,
    subtitle: 'Who we are',
  },

  image: {
    url: assets.about_image,
    imageAlt: `Doctor consulting a patient at ${BRAND_NAME}`,
  },

  description: {
    paragraph1: `Welcome to ${BRAND_NAME}, your trusted partner in managing healthcare needs conveniently and efficiently. At ${BRAND_NAME}, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.`,

    paragraph2: `${BRAND_NAME} is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service — whether you're booking your first appointment or managing ongoing care.`,
  },

  vision: {
    title: 'Our vision',
    description:
      'To create a seamless healthcare experience for every user — bridging the gap between patients and providers, so the care you need is always within easy reach.',
  },

  whyChooseUs: {
    subtitle: `Why ${BRAND_NAME}`,
    title: 'Why Choose Us',

    cards: [
      {
        title: 'Efficiency',
        desc: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
        icon: assets.clock_icon,
      },
      {
        title: 'Convenience',
        desc: 'Access to a network of trusted healthcare professionals in your area.',
        icon: assets.location_icon,
      },
      {
        title: 'Personalization',
        desc: 'Tailored recommendations and reminders to help you stay on top of your health.',
        icon: assets.user_icon,
      },
    ],
  },
};
