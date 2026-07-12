import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useContext, useEffect, useMemo, useState } from 'react';
import { assets } from '../assets/assets';
import { DAYS_TO_SHOW, DAYS_OF_WEEK } from '../constants/slotConstants';
import RelatedDoctors from '../components/RelatedDoctors';
import Button from '../components/ui/Button';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const docInfo = useMemo(() => {
    return doctors.find((doc) => doc._id === docId);
  }, [doctors, docId]);

  useEffect(() => {
    const getAvailableSlots = () => {
      let allDays = [];
      let today = new Date();

      for (let i = 0; i < DAYS_TO_SHOW; i++) {
        // Current day's date
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        // End time (9:00 PM)
        let endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0);

        // If today, start from the next available slot
        if (today.toDateString() === currentDate.toDateString()) {
          // Minimum starting hour is 10 AM
          if (currentDate.getHours() < 10) {
            currentDate.setHours(10, 0, 0, 0);
          } else {
            if (currentDate.getMinutes() > 30) {
              currentDate.setHours(currentDate.getHours() + 1);
              currentDate.setMinutes(0);
            } else if (currentDate.getMinutes() > 0) {
              currentDate.setMinutes(30);
            }

            currentDate.setSeconds(0);
            currentDate.setMilliseconds(0);
          }
        } else {
          // Future days start at 10:00 AM
          currentDate.setHours(10, 0, 0, 0);
        }

        let dayData = {
          date: new Date(currentDate),
          isToday: today.toDateString() === currentDate.toDateString(),
          isClosed: false,
          slots: [],
        };

        // Generate slots
        while (currentDate < endTime) {
          dayData.slots.push({
            dateTime: new Date(currentDate),
            time: currentDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          });

          // Move to the next 30-minute slot
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        if (dayData.slots.length === 0) {
          dayData.isClosed = true;
        }
        allDays.push(dayData);
      }
      // console.log("allDays",allDays)
      setDocSlots(allDays);
    };

    getAvailableSlots();
  }, []);
  // console.log("slotIndex",slotIndex)

  return (
    docInfo && (
      <div className="max-sm:pb-24">
        {/* Docter details */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-4 max-sm:flex-row max-sm:items-center max-sm:gap-3 max-sm:px-4 max-sm:pt-4">
          <div className="max-sm:shrink-0">
            <img
              className="bg-slate-100 w-full h-full sm:max-w-80 md:max-w-70 rounded-lg shadow-lg shadow-olive-800 max-sm:w-30 max-sm:h-30 max-sm:rounded-lg max-sm:object-cover max-sm:shadow-none max-sm:border max-sm:border-gray-200"
              src={docInfo.image}
              alt="docter image"
            />
          </div>
          <div className="flex-1 border-gray-400 shadow-md shadow-olive-800 rounded-lg p-6 py-6 bg-white mx-2 sm:mx-0 mt-[-80] sm:mt-0 max-sm:border-none max-sm:shadow-none max-sm:p-0 max-sm:mx-0 max-sm:mt-0 max-sm:bg-transparent">
            {/* Doc Info : name, degree, exp */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900 max-sm:text-base max-sm:gap-1">
              {docInfo.name}
              <img
                className="w-5 max-sm:w-4"
                src={assets.verified_icon}
                alt="verification badge"
              />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600 max-sm:flex-wrap max-sm:gap-1.5 max-sm:mt-0.5">
              <p className="max-sm:text-xs max-sm:text-gray-500">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <Button className="py-0.5 px-2 border text-xs rounded-full max-sm:hidden">
                {docInfo.experience}
              </Button>
            </div>

            {/* Doctor About — hidden in the compact mobile header, fee badge shown instead */}
            <div className="space-y-1 max-sm:hidden">
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="about icon" />
              </p>
              <p className="text-sm text-gray-500 max-w-175  ">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4 max-sm:hidden">
              Appointment Fee:{' '}
              <span className="font-semibold text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
            <p className="hidden max-sm:inline-flex max-sm:items-center max-sm:mt-1.5 max-sm:text-xs max-sm:font-medium max-sm:text-primary max-sm:bg-primary/10 max-sm:px-2 max-sm:py-0.5 max-sm:rounded-full">
              {currencySymbol}
              {docInfo.fees} fee
            </p>
          </div>
        </div>

        {/* About — full version on its own row on mobile, above booking */}
        <div className="hidden max-sm:block max-sm:px-4 max-sm:mt-4">
          <p className="text-sm font-medium text-gray-900 mb-1">About</p>

          <p
            className={`text-sm text-gray-500 ${
              isExpanded ? '' : 'line-clamp-5'
            }`}
          >
            {docInfo.about}
          </p>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 text-xs w-full text-end order font-medium"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </Button>
        </div>

        {/* BookingSlots */}
        <div className="md:pl-74 sm:pl-4 mt-8 max-sm:ml-0 max-sm:pl-0 max-sm:mt-6 max-sm:px-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 max-sm:text-base max-sm:mb-3">
            Booking Slots
          </h3>

          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide max-sm:gap-2">
            {docSlots.map((day, index) => (
              <Button
                key={index}
                aria-label={`Booking day ${index + 1}`}
                onClick={() => !day.isClosed && setSlotIndex(index)}
                className={`flex flex-col items-center justify-center min-w-24 h-28 rounded-2xl border transition-all duration-200 max-sm:min-w-14 max-sm:h-16 max-sm:rounded-xl
                ${
                  day.isClosed
                    ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed '
                    : slotIndex === index
                      ? 'bg-primary text-white border-primary shadow-md max-sm:shadow-none'
                      : 'bg-white border-gray-200 hover:border-primary hover:shadow-md cursor-pointer max-sm:hover:shadow-none'
                }`}
              >
                <p className="text-sm font-medium max-sm:text-[11px]">
                  {DAYS_OF_WEEK[day.date.getDay()]}
                </p>

                <p className="text-2xl font-bold mt-1 max-sm:text-base max-sm:mt-0.5">
                  {day.date.getDate()}
                </p>

                <p className="text-xs mt-2 opacity-80 max-sm:hidden">
                  {day.isClosed ? 'Closed' : `${day.slots.length} Slots`}
                </p>
              </Button>
            ))}
          </div>

          <div className="flex lg:flex-wrap items-center gap-3 w-full px-1 py-2 overflow-x-scroll mt-4 max-sm:grid max-sm:grid-cols-3 max-sm:gap-2 max-sm:overflow-visible max-sm:mt-4">
            {docSlots.length > 0 &&
              docSlots[slotIndex].slots.map((slot, index) => (
                <Button
                  className={`text-sm font-light shrink-0 cursor-pointer px-5 py-3 rounded-full text-center max-sm:text-xs max-sm:px-2 max-sm:py-2.5 max-sm:rounded-lg max-sm:shrink
                   ${
                     slot.time === slotTime
                       ? 'bg-primary text-white border-primary shadow-lg scale-105 max-sm:shadow-none max-sm:scale-100'
                       : 'bg-white border border-gray-300 hover:border-primary  cursor-pointer'
                   }
                  `}
                  onClick={() => setSlotTime(slot.time)}
                  key={index}
                >
                  {slot.time.toLowerCase()}
                </Button>
              ))}
          </div>
          <Button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 max-sm:hidden">
            Book an appointment
          </Button>
        </div>

        {/* listing related doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

        {/* Sticky mobile booking bar — keeps fee + selected time + CTA reachable without scrolling back up */}
        <div className="hidden max-sm:flex fixed bottom-0 left-0 right-0 items-center justify-between gap-3 bg-white border-t border-gray-200 px-4 py-3 z-20">
          <div className="min-w-0">
            <p className="text-[11px] text-gray-400 leading-none">Fee</p>
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {currencySymbol}
              {docInfo.fees}
            </p>
            {slotTime && (
              <p className="text-[11px] text-primary leading-none mt-0.5">
                {DAYS_OF_WEEK[docSlots[slotIndex]?.date.getDay()]}{' '}
                {docSlots[slotIndex]?.date.getDate()} · {slotTime.toLowerCase()}
              </p>
            )}
          </div>
          <Button
            disabled={!slotTime}
            className={`shrink-0 text-sm font-medium px-6 py-2.5 rounded-full transition-colors ${
              slotTime ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
            }`}
          >
            {slotTime ? 'Book appointment' : 'Select a time'}
          </Button>
        </div>
      </div>
    )
  );
};

export default Appointment;
