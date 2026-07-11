import { BRAND_NAME, COMPANY_EMAIL, COMPANY_PHONE } from './appConstants';
import { assets } from '../assets/assets';

export const CONTACT_CONTENT = {
  hero: {
    subtitle: 'Get in touch',
    title: 'Contact',
    highlight: 'Us',
  },

  image: {
    url: assets.contact_image,
    imageAlt: 'MediBook office',
  },

  office: {
    title: 'Our Office',

    location: {
      address: '54709 Willms Station, Suite 350\nWashington, USA',
      icon: assets.location_icon,
    },

    contactNo: {
      phone: COMPANY_PHONE,
      icon: assets.phone_icon,
    },

    mail: {
      gmail: COMPANY_EMAIL,
      icon: assets.mail_icon,
    },
  },

  careers: {
    title: `Careers at ${BRAND_NAME}`,
    description:
      'Learn more about our teams and current job openings — help us build the future of accessible healthcare.',
    button: 'Explore Jobs',
  },
};
