import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import userEvent from '@testing-library/user-event';
import Appointment from '../pages/Appointment';

const mockNavigate = vi.fn();
const mockUseParams = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
  };
});

beforeEach(() => {
  mockNavigate.mockClear();
  mockUseParams.mockReset();
  window.scrollTo = vi.fn();
});

const fakeDoctors = [
  {
    _id: 'doc1',
    name: 'Doctor One',
    image: 'fake-image',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Doctor One About',
    fees: 500,
    address: {
      line1: 'Street',
      line2: 'City',
    },
  },
  {
    _id: 'doc2',
    name: 'Doctor Two',
    image: 'fake-image',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Doctor Two About',
    fees: 600,
    address: {
      line1: 'Street',
      line2: 'City',
    },
  },
];

const renderAppointment = () => {
  mockUseParams.mockReturnValue({
    docId: 'doc1',
  });

  render(
    <MemoryRouter>
      <AppContext.Provider
        value={{
          doctors: fakeDoctors,
          currencySymbol: '₹',
        }}
      >
        <Appointment />
      </AppContext.Provider>
    </MemoryRouter>
  );
};

describe('Appointment', () => {
  it('should render selected doctor information', () => {
    renderAppointment();

    expect(screen.getByText('Doctor One')).toBeInTheDocument();
    expect(screen.getByText('Neurologist')).toBeInTheDocument();
    expect(screen.getByText('4 Years')).toBeInTheDocument();
    expect(screen.getAllByText('₹500')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Doctor One About')[0]).toBeInTheDocument();
  });

  it('should toggle doctor about section', async () => {
    const user = userEvent.setup();

    renderAppointment();

    const readMoreButton = screen.getByRole('button', {
      name: 'Read More',
    });

    expect(readMoreButton).toBeInTheDocument();

    await user.click(readMoreButton);

    expect(
      screen.getByRole('button', {
        name: 'Read Less',
      })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Read Less',
      })
    );

    expect(
      screen.getByRole('button', {
        name: 'Read More',
      })
    ).toBeInTheDocument();
  });

  it('should render booking slots', async () => {
    renderAppointment();

    expect(screen.getByText('Booking Slots')).toBeInTheDocument();

    const dayButtons = screen.getAllByLabelText(/Booking day/i);

    // Click the second day (which always has slots)
    await userEvent.click(dayButtons[1]);

    const timeSlots = screen
      .getAllByRole('button')
      .filter((button) => button.textContent?.includes(':'));

    expect(timeSlots.length).toBeGreaterThan(0);
  });

  it('should allow selecting a booking day', async () => {
    const user = userEvent.setup();

    renderAppointment();

    const dayButtons = screen.getAllByLabelText(/Booking day/i);

    await user.click(dayButtons[1]);

    expect(dayButtons[1]).toHaveClass('bg-primary');
    expect(dayButtons[1]).toHaveClass('text-white');
  });

  it('should allow selecting a booking time', async () => {
    renderAppointment();

    // Select an available day
    const dayButtons = screen.getAllByLabelText(/Booking day/i);
    await userEvent.click(dayButtons[1]);

    // Get all available time slot buttons
    const timeButtons = screen.getAllByTestId('time-slot');

    const firstTimeSlot = timeButtons[0];

    // Select a time
    await userEvent.click(firstTimeSlot);

    // Verify the selected state
    expect(firstTimeSlot).toHaveClass(
      'bg-primary',
      'text-white',
      'border-primary'
    );
  });
});
