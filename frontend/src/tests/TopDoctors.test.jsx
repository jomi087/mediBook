import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopDoctors from './TopDoctors';
import { AppContext } from '../context/AppContext';

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
});

/*
Why fake data?

TopDoctors gets doctors from AppContext.

Instead of using the real AppContextProvider (which may later fetch
data from the backend), we provide fake data in the test.

This keeps the test independent and predictable.

The way we provide fake data depends on how the component accesses data:

- Props          -> pass fake props
- Context        -> wrap with Context.Provider (used here)
- Redux          -> provide a test store
- API/fetch      -> mock fetch/axios
- React Query    -> mock the query/API call
*/

const fakeDoctors = Array.from({ length: 11 }, (_, index) => ({
  _id: `doc${index + 1}`,
  name: `Doctor ${index + 1}`,

  // Image is not being tested.
  // Any placeholder string is sufficient.
  image: 'fake-image',

  speciality: 'General physician',
}));

const renderTopDoctors = () => {
  render(
    <AppContext.Provider value={{ doctors: fakeDoctors }}>
      <TopDoctors />
    </AppContext.Provider>
  );
};

describe('TopDoctors', () => {
  it('should render only the first 10 doctors', () => {
    renderTopDoctors();

    expect(screen.getByText('Doctor 1')).toBeInTheDocument();
    expect(screen.getByText('Doctor 10')).toBeInTheDocument();
    expect(screen.queryByText('Doctor 11')).not.toBeInTheDocument();
  });

  it('should navigate to appointment page when a doctor is clicked', async () => {
    const user = userEvent.setup();

    renderTopDoctors();

    await user.click(screen.getByText('Doctor 1'));

    expect(mockNavigate).toHaveBeenCalledWith('/appointment/doc1');
  });

  it('should navigate to doctors page when More button is clicked', async () => {
    const user = userEvent.setup();

    renderTopDoctors();

    await user.click(
      screen.getByRole('button', {
        name: 'More',
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith('/doctors');
  });
});
