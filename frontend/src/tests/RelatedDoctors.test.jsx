import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RelatedDoctors from '../components/RelatedDoctors';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  mockNavigate.mockClear();
  window.scrollTo = vi.fn();
});

const fakeDoctors = [
  {
    _id: 'doc1',
    name: 'Doctor One',
    image: 'fake-image',
    speciality: 'Neurologist',
  },
  {
    _id: 'doc2',
    name: 'Doctor Two',
    image: 'fake-image',
    speciality: 'Neurologist',
  },
  {
    _id: 'doc3',
    name: 'Doctor Three',
    image: 'fake-image',
    speciality: 'Neurologist',
  },
  {
    _id: 'doc4',
    name: 'Doctor Four',
    image: 'fake-image',
    speciality: 'Dermatologist',
  },
];

const renderRelatedDoctors = () => {
  render(
    <MemoryRouter>
      <AppContext.Provider value={{ doctors: fakeDoctors }}>
        <RelatedDoctors docId="doc1" speciality="Neurologist" />
      </AppContext.Provider>
    </MemoryRouter>
  );
};

describe('RelatedDoctors', () => {
  it('should render only related doctors', () => {
    renderRelatedDoctors();

    expect(screen.getByText('Doctor Two')).toBeInTheDocument();
    expect(screen.getByText('Doctor Three')).toBeInTheDocument();

    expect(screen.queryByText('Doctor Four')).not.toBeInTheDocument();
  });

  it('should exclude the current doctor', () => {
    renderRelatedDoctors();

    expect(screen.queryByText('Doctor One')).not.toBeInTheDocument();
  });

  it('should render doctor links with correct destination', () => {
    renderRelatedDoctors();

    const doctorLink = screen.getByRole('link', {
      name: /Doctor Two/i,
    });

    expect(doctorLink).toHaveAttribute('href', '/appointment/doc2');
  });

  it('should scroll to top when doctor card is clicked', async () => {
    const user = userEvent.setup();

    renderRelatedDoctors();

    await user.click(
      screen.getByRole('link', {
        name: /Doctor Two/i,
      })
    );

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should navigate to doctors page when More button is clicked', async () => {
    const user = userEvent.setup();

    renderRelatedDoctors();

    await user.click(
      screen.getByRole('button', {
        name: 'More',
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith('/doctors');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
