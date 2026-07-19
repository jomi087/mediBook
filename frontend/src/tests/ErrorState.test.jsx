import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import ErrorState from '../components/common/ErrorState';

describe('ErrorState', () => {
  it('should render default title and description', () => {
    render(<ErrorState />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    expect(screen.getByText('Please try again later.')).toBeInTheDocument();
  });

  it('should render custom title and description', () => {
    render(
      <ErrorState
        title="Test Error"
        description="This is a test description."
      />
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
  });

  it('should render custom actions', () => {
    render(
      <ErrorState
        actions={
          <>
            <button>Try Again</button>
            <button>Go Back</button>
          </>
        }
      />
    );

    expect(
      screen.getByRole('button', {
        name: 'Try Again',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Go Back',
      })
    ).toBeInTheDocument();
  });

  it('should not render any actions when actions prop is not provided', () => {
    render(<ErrorState />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
