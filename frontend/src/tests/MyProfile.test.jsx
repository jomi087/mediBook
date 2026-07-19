import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import MyProfile from '../pages/MyProfile';
import profileService from '../services/profileService';

vi.mock('../services/profileService');

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

const mockUser = {
  name: 'John Doe',
  image: 'fake-image',
  email: 'john@gmail.com',
  phone: '9999999999',
  address: {
    line1: 'Street 1',
    line2: 'Street 2',
  },
  gender: 'male',
  dob: '2000-01-01',
};

beforeEach(() => {
  vi.clearAllMocks();

  profileService.getProfile.mockResolvedValue({
    data: mockUser,
  });
});

const renderMyProfile = () => {
  render(
    <MemoryRouter>
      <MyProfile />
    </MemoryRouter>
  );
};

describe('MyProfile', () => {
  it('should show loading spinner initially', () => {
    renderMyProfile();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render profile information in view mode', async () => {
    renderMyProfile();

    expect(await screen.findByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getAllByText(mockUser.email)[0]).toBeInTheDocument();
    expect(screen.getByText(mockUser.phone)).toBeInTheDocument();
    expect(screen.getByText(mockUser.dob)).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Edit Profile',
      })
    ).toBeInTheDocument();
  });

  it('should switch to edit mode', async () => {
    const user = userEvent.setup();

    renderMyProfile();

    await screen.findByText(mockUser.name);

    await user.click(
      screen.getByRole('button', {
        name: 'Edit Profile',
      })
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('Line 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Line 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of birth')).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Save Information',
      })
    ).toBeInTheDocument();
  });

  it('should preload existing values in edit mode', async () => {
    const user = userEvent.setup();

    renderMyProfile();

    await screen.findByText(mockUser.name);

    await user.click(
      screen.getByRole('button', {
        name: 'Edit Profile',
      })
    );

    expect(screen.getByLabelText('Name')).toHaveValue(mockUser.name);
    expect(screen.getByLabelText('Phone')).toHaveValue(mockUser.phone);
    expect(screen.getByLabelText('Line 1')).toHaveValue(mockUser.address.line1);
    expect(screen.getByLabelText('Line 2')).toHaveValue(mockUser.address.line2);
    expect(screen.getByLabelText('Gender')).toHaveValue(mockUser.gender);
    expect(screen.getByLabelText('Date of birth')).toHaveValue(mockUser.dob);
  });

  it('should update profile information', async () => {
    const user = userEvent.setup();

    renderMyProfile();

    await screen.findByText(mockUser.name);

    await user.click(
      screen.getByRole('button', {
        name: 'Edit Profile',
      })
    );

    const nameInput = screen.getByLabelText('Name');

    await user.clear(nameInput);
    await user.type(nameInput, 'Jane Doe');

    expect(nameInput).toHaveValue('Jane Doe');
  });

  it('should update selected gender', async () => {
    const user = userEvent.setup();

    renderMyProfile();

    await screen.findByText(mockUser.name);

    await user.click(
      screen.getByRole('button', {
        name: 'Edit Profile',
      })
    );

    const genderSelect = screen.getByLabelText('Gender');

    await user.selectOptions(genderSelect, 'female');

    expect(genderSelect).toHaveValue('female');
  });

  it('should save edited information and return to view mode', async () => {
    const user = userEvent.setup();

    renderMyProfile();

    await screen.findByText(mockUser.name);

    await user.click(
      screen.getByRole('button', {
        name: 'Edit Profile',
      })
    );

    const nameInput = screen.getByLabelText('Name');

    await user.clear(nameInput);
    await user.type(nameInput, 'Jane Doe');

    await user.click(
      screen.getByRole('button', {
        name: 'Save Information',
      })
    );

    expect(await screen.findByText('Jane Doe')).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Edit Profile',
      })
    ).toBeInTheDocument();
  });

  it('should show validation errors for empty required fields', async () => {
    const user = userEvent.setup();

    renderMyProfile();

    await screen.findByText(mockUser.name);

    await user.click(
      screen.getByRole('button', {
        name: 'Edit Profile',
      })
    );

    await user.clear(screen.getByLabelText('Name'));
    await user.clear(screen.getByLabelText('Phone'));
    await user.clear(screen.getByLabelText('Line 1'));
    await user.clear(screen.getByLabelText('Line 2'));

    await user.click(
      screen.getByRole('button', {
        name: 'Save Information',
      })
    );

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(
      await screen.findByText('Phone number is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Address Line 1 is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Address Line 2 is required')
    ).toBeInTheDocument();
  });

  it('should render ErrorState when profile loading fails', async () => {
    profileService.getProfile.mockRejectedValueOnce(
      new Error('Failed to load profile.')
    );

    renderMyProfile();

    expect(
      await screen.findByText('Unable to load profile')
    ).toBeInTheDocument();

    expect(screen.getByText('Failed to load profile.')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Try Again' })
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
  });

  it('should retry loading profile when Try Again is clicked', async () => {
    const user = userEvent.setup();

    // First request fails
    profileService.getProfile.mockRejectedValueOnce(
      new Error('Failed to load profile.')
    );

    renderMyProfile();

    // Wait for ErrorState to appear
    expect(
      await screen.findByText('Unable to load profile')
    ).toBeInTheDocument();

    // Next request succeeds
    profileService.getProfile.mockResolvedValueOnce({
      data: mockUser,
    });

    // Click Retry
    await user.click(
      screen.getByRole('button', {
        name: 'Try Again',
      })
    );

    // Profile should render again
    expect(await screen.findByText(mockUser.name)).toBeInTheDocument();

    // Service should have been called twice
    expect(profileService.getProfile).toHaveBeenCalledTimes(2);
  });
});
