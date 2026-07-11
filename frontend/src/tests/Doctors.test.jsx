import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppContext } from '../context/AppContext';
import Doctors from '../pages/Doctors';

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
});

const fakeDoctors = [
  {
    _id: 'doc1',
    name: 'Doctor 1',
    image: 'fake-image',
    speciality: 'General physician',
  },
  {
    _id: 'doc2',
    name: 'Doctor 2',
    image: 'fake-image',
    speciality: 'Neurologist',
  },
  {
    _id: 'doc3',
    name: 'Doctor 3',
    image: 'fake-image',
    speciality: 'Neurologist',
  },
  {
    _id: 'doc4',
    name: 'Doctor 4',
    image: 'fake-image',
    speciality: 'Dermatologist',
  },
];

const renderDoctors = ({ speciality, doctors = fakeDoctors } = {}) => {
  mockUseParams.mockReturnValue({ speciality });

  render(
    <AppContext.Provider value={{ doctors }}>
      <Doctors />
    </AppContext.Provider>
  );
};

describe('Doctors', () => {
  it('should render all doctors when no speciality is selected', () => {
    renderDoctors();

    expect(screen.getByText('Doctor 1')).toBeInTheDocument();
    expect(screen.getByText('Doctor 2')).toBeInTheDocument();
    expect(screen.getByText('Doctor 3')).toBeInTheDocument();
    expect(screen.getByText('Doctor 4')).toBeInTheDocument();

    expect(screen.getByText('4 doctors available')).toBeInTheDocument();
  });

  it('should render only neurologists', () => {
    renderDoctors({
      speciality: 'Neurologist',
    });

    expect(screen.getByText('Doctor 2')).toBeInTheDocument();
    expect(screen.getByText('Doctor 3')).toBeInTheDocument();

    expect(screen.queryByText('Doctor 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Doctor 4')).not.toBeInTheDocument();

    expect(screen.getByText('2 doctors available')).toBeInTheDocument();
  });

  it('should show empty state', () => {
    renderDoctors({
      speciality: 'Cardiologist',
    });

    expect(
      screen.getByText('No doctors found for this specialty.')
    ).toBeInTheDocument();
  });

  it('should navigate to appointment page when doctor card is clicked', async () => {
    const user = userEvent.setup();

    renderDoctors();

    await user.click(screen.getByText('Doctor 1'));

    expect(mockNavigate).toHaveBeenCalledWith('/appointment/doc1');
  });

  it('should navigate to selected speciality', async () => {
    const user = userEvent.setup();

    renderDoctors();

    const dermatologistButtons = screen.getAllByRole('button', {
      name: 'Dermatologist',
    });
    await user.click(dermatologistButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/doctors/Dermatologist');
  });

  it('should reset filter when active speciality is clicked', async () => {
    const user = userEvent.setup();

    renderDoctors({
      speciality: 'Neurologist',
    });

    const neurologistButtons = screen.getAllByRole('button', {
      name: 'Neurologist',
    });
    await user.click(neurologistButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/doctors');
  });
});
