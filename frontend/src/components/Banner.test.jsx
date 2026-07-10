//# 1) No need to import methods from Vitest explicitly (see notes below)
// import { describe, it, expect } from "vitest";

//# 2) Why @testing-library/jest-dom/vitest?
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import Banner from './Banner';
import userEvent from '@testing-library/user-event';

//# 3) Why do we need mockNavigate? (see notes below)
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Reset the mock before each test
beforeEach(() => {
  mockNavigate.mockClear();
});

describe('Banner', () => {
  it('should render the Start Booking button', () => {
    // Arrange
    render(<Banner />);

    // Act
    const createAccountButton = screen.getByRole('button', {  // button is a role
      name: 'Start Booking',
    });

    // Assert
    expect(createAccountButton).toBeInTheDocument();
  });

  it('should navigate to login when Start Booking is clicked', async () => {
    const user = userEvent.setup();

    // Arrange
    render(<Banner />);

    // Act
    const createAccountButton = screen.getByRole('button', {
      name: 'Start Booking',
    });

    await user.click(createAccountButton);

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});

/*
1) No need to import describe, it, expect, etc.

Reason:
- These methods are already available globally because of:
  vite.config.js
    test: {
      globals: true,
    }

Constraint:
- ESLint may show "not defined" warnings.
- To fix that, add Vitest globals in eslint.config.js
  (e.g. ...globals.vitest)

------------------------------------------------------------
2) Why @testing-library/jest-dom/vitest?

Vitest provides basic assertions like:
- toBe()
- toEqual()
- toHaveBeenCalled()

This package extends Vitest with DOM-specific assertions, such as:
- toBeInTheDocument()
- toBeVisible()
- toHaveAttribute()
- toHaveTextContent()
- toBeDisabled()

Without this import:

expect(button).toBeInTheDocument();

will throw an error because Vitest doesn't know that matcher.

also this repetative file can be configured :-
like ,instead of importing it in every test file,
we'll configure it once in a global setup file (vitest.setup.js).
-------------------------------------------------------------------
3) Why do we need mockNavigate?

The confusion:

Initially, the test was only checking whether the
"Start Booking" button was rendered.

render(<Banner />);

const createAccountButton = screen.getByRole("button", {
  name: "Start Booking",
});

expect(createAccountButton).toBeInTheDocument();

Question:

"If I'm only checking whether the button exists,
why do I need to mock useNavigate()?"

Reason:

Understanding the rendering process.

When React renders a component, it executes the
entire component function before returning JSX.

Example:

const Banner = () => {
  const navigate = useNavigate();

  return (
    <button>Start Booking</button>
  );
};

Execution flow:

render(<Banner />)
        ↓
Banner() starts executing
        ↓
const navigate = useNavigate()
        ↓
return JSX

React cannot return the JSX until the entire component
has executed successfully.

------------------------------------------------------------

What happened before mocking?

During:

render(<Banner />);

React executed:

const navigate = useNavigate();

useNavigate() comes from react-router-dom.

It expects a Router context.

Since our test rendered only:

render(<Banner />);

there was no Router.

Therefore, React Router threw an error before the JSX
could even be rendered.

------------------------------------------------------------

Possible solutions:

1. Provide a Router.

There are different ways:

- Mock useNavigate().
- Wrap the component with MemoryRouter.

The correct approach depends on what you're testing.

------------------------------------------------------------

Why are we using a mock here?

This is a COMPONENT (unit) test.

We only want to verify Banner's behavior.

Banner's responsibility is:

Click button
        ↓
Call navigate("/login")

React Router is a third-party library and is already
tested by its maintainers.

So we replace useNavigate() with a mock function
and simply verify that our component calls it correctly.

------------------------------------------------------------

When to use each approach?

1. Mock (used here)

- Unit / Component tests
- Test only the component's behavior
- Fast and isolated

2. MemoryRouter

- Integration tests
- Verify actual navigation
- Example:

Home
 ↓
Click "Start Booking"
 ↓
Login page renders

3. BrowserRouter / RouterProvider

- Real application runtime
- Usually not used in component tests
*/
