import Button from '../components/ui/Button';
import { CONTACT_CONTENT } from '../constants/contactConstants';
import { toast } from 'sonner';

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
      <img src={icon} alt={label} className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-gray-700">{value}</p>
    </div>
  </div>
);

const Contact = () => {
  return (
    <div className="pb-10">
      <div className="text-center pt-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-2">
          {CONTACT_CONTENT.hero.title}{' '}
          <span className="text-primary">{CONTACT_CONTENT.hero.highlight}</span>
        </h1>
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          {CONTACT_CONTENT.hero.subtitle}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-12 my-10 sm:mx-15">
        <img
          className="hidden sm:block sm:max-w-60 md:max-w-75 lg:max-w-95 rounded-2xl shadow-lg shadow-gray-200"
          src={CONTACT_CONTENT.image.url}
          alt={CONTACT_CONTENT.imageAlt}
        />

        <div className="flex-1 flex flex-col gap-6 ">
          <p className="text-lg font-semibold text-gray-800">
            {CONTACT_CONTENT.office.title}
          </p>

          <div className="flex flex-col gap-5">
            <InfoRow
              label="Address"
              value={CONTACT_CONTENT.office.location.address}
              icon={CONTACT_CONTENT.office.location.icon}
            />

            <InfoRow
              label="Phone"
              value={CONTACT_CONTENT.office.contactNo.phone}
              icon={CONTACT_CONTENT.office.contactNo.icon}
            />

            <InfoRow
              label="Phone"
              value={CONTACT_CONTENT.office.mail.gmail}
              icon={CONTACT_CONTENT.office.mail.icon}
            />
          </div>
        </div>
      </div>

      {/* Careers panel */}
      <div className="bg-primary/5 border border-primary/10 rounded-2xl px-8 py-12 flex flex-col items-center text-center gap-4">
        <p className="text-lg font-semibold text-gray-800">
          {CONTACT_CONTENT.careers.title}
        </p>
        <p className="text-gray-600 max-w-md">
          {CONTACT_CONTENT.careers.description}
        </p>
        <Button
          className="mt-2 bg-primary text-white text-sm font-medium px-8 py-3 rounded-full
          hover:bg-primary/90 active:scale-95 transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={() => toast.info('No Jobs available for now.')}
        >
          {CONTACT_CONTENT.careers.button}
        </Button>
      </div>
    </div>
  );
};

export default Contact;
