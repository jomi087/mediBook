import profile_pic from './profile_pic.png';
import logo from './logo.svg';
import dropdown_icon from './dropdown_icon.svg';
import group_profiles from './group_profiles.png'
import arrow_icon from './arrow_icon.svg'
import header_img from './header_img.png'
import calender_icon from './calender_icon.svg'
import user_icon from './user_icon.svg'
import search_icon from './search_icon.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import Dermatologist from './Dermatologist.svg'

export const assets = {
  logo,
  profile_pic,
  dropdown_icon,
  group_profiles,
  arrow_icon,
  header_img,
  calender_icon,
  user_icon,
  search_icon
};

export const steps = [
  {
    id: 1,
    title: "Search for Symptoms",
    description:
      "Enter your symptoms or the specialty you need to find the right care.",
    iconUrl: assets.search_icon,
  },
  {
    id: 2,
    title: "Choose a Specialist",
    description:
      "Browse top-rated doctors, view their profiles, and read patient reviews.",
    iconUrl: assets.user_icon,
  },
  {
    id: 3,
    title: "Book an Appointment",
    description:
      "Select a time slot that suits you and confirm your visit instantly.",
    iconUrl: assets.calender_icon,
  },
]

export const specialityData = [
    {
        speciality: "General physician",
        // slug: "general-physician",
        image: General_physician,
    },
    {
        speciality: "Gynecologist",
        // slug: "gynecologist",
        image: Gynecologist,
    },
    {
        speciality: "Dermatologist",
        // slug: "dermatologist",
        image: Dermatologist,
    },
    {
        speciality: "Pediatricians",
        // slug: "pediatricians",
        image: Pediatricians,
    },
    {
        speciality: "Neurologist",
        // slug: "neurologist",
        image: Neurologist,
    },
    {
        speciality: "Gastroenterologist",
        // slug: "gastroenterologist",
        image: Gastroenterologist,
    },
];
