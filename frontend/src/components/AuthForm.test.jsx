import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import AuthForm from './AuthForm';
import userEvent from '@testing-library/user-event';

const renderAuthForm = (mode) => {
  render(
    <MemoryRouter>
      <AuthForm mode={mode} />
    </MemoryRouter>
  );
};

describe('Authentication Form', () => {
  // render login form
  it('should render login form', () => {
    //Arragne
    renderAuthForm('login');

    //Act
    const emailInput = screen.getByLabelText('Email'); // what does this line tells and how to choose the method from screen.
    const nameInput = screen.queryByLabelText('Name'); // what & why queryByLabelText
    const passwordInput = screen.getByLabelText('Password');

    //how to know the role inside when calling getByRole
    const submitButton = screen.getByRole('button', {
      name: 'Submit',
    });

    const signupLink = screen.getByRole('link', {
      name: 'Sign up',
    });

    //Assert
    expect(nameInput).not.toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '/signup');
  });

  // render signup form
  it('should render signup  form', () => {
    //Arragne
    renderAuthForm('signup');

    //Act
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    const submitButton = screen.getByRole('button', {
      name: 'Submit',
    });

    const loginLink = screen.getByRole('link', {
      name: 'log in',
    });

    //Assert
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  // empty login validatio
  it('should show validation errors for empty login form', async () => {
    const user = userEvent.setup();

    renderAuthForm('login');

    await user.click(
      screen.getByRole('button', {
        name: 'Submit',
      })
    );

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  // invalid login validation
  it('should show validation errors for invalid login input', async () => {
    const user = userEvent.setup();

    renderAuthForm('login');

    await user.type(screen.getByLabelText('Email'), 'abc');
    await user.type(screen.getByLabelText('Password'), 'abcdefgh');

    await user.click(
      screen.getByRole('button', {
        name: 'Submit',
      })
    );

    expect(await screen.findByText('Invalid email')).toBeInTheDocument();

    expect(
      await screen.findByText(
        'Password must contain uppercase, lowercase, number and special character'
      )
    ).toBeInTheDocument();
  });

  // empty signup validation
  it('should show validation errors for empty signup form', async () => {
    const user = userEvent.setup();

    renderAuthForm('signup');

    await user.click(
      screen.getByRole('button', {
        name: 'Submit',
      })
    );

    expect(await screen.findByText('Name is required')).toBeInTheDocument();

    expect(await screen.findByText('Email is required')).toBeInTheDocument();

    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  // invalid signup validation
  it('should show validation errors for invalid signup input', async () => {
    const user = userEvent.setup();

    renderAuthForm('signup');

    await user.type(screen.getByLabelText('Name'), 'ab');
    await user.type(screen.getByLabelText('Email'), 'abc');
    await user.type(screen.getByLabelText('Password'), 'abcdefgh');

    await user.click(
      screen.getByRole('button', {
        name: 'Submit',
      })
    );

    expect(
      await screen.findByText('Name must be at least 3 characters')
    ).toBeInTheDocument();

    expect(await screen.findByText('Invalid email')).toBeInTheDocument();

    expect(
      await screen.findByText(
        'Password must contain uppercase, lowercase, number and special character'
      )
    ).toBeInTheDocument();
  });
});

/*
=========================================================
Q1. What does this line do?

const emailInput = screen.getByLabelText("Email");
=========================================================
It finds the input field associated with the label "Email".

Example:
<label for="email">Email</label>
<input id="email" type="email" />

Steps:
1. Finds the <label> with text "Email".
2. Reads its htmlFor (or the associated input). ie, "email"
3. Finds the corresponding <input>.
4. Returns the <input> element.

This lets us interact with the input just like a user would.
------------------------------------------------------------

=========================================================
Q2. Which screen method should I use?
=========================================================

React Testing Library recommends this priority:

1. getByRole()
2. getByLabelText()
3. getByPlaceholderText()
4. getByText()
5. getByDisplayValue()
6. getByAltText()
7. getByTitle()
8. getByTestId()

The goal is to query elements the same way users find them.
------------------------------------------------------------

=========================================================
Q3. How do I decide which query to use?
=========================================================

Start from the top and stop when you find a suitable query.

Can I identify it by its ROLE?
        │
       Yes
        │
 use getByRole()
        │
       No
        │
Can I identify it by its LABEL?
        │
       Yes
        │
 use getByLabelText()
        │
       No
        │
Can I identify it by its PLACEHOLDER?
        │
       Yes
        │
 use getByPlaceholderText()
        │
       No
        │
Can I identify it by visible TEXT?
        │
       Yes
        │
 use getByText()
        │
       No
        │
Use getByTestId() only as a last option.

------------------------------------------------------------

=========================================================
Q4. Why do we use queryByLabelText() for the Name field?
=========================================================

Login mode should NOT display the Name field.

queryBy... returns null when an element doesn't exist.

Example:

const nameInput = screen.queryByLabelText("Name");

expect(nameInput).not.toBeInTheDocument();

If we used getByLabelText(), the test would fail immediately
because getBy... throws an error when it can't find the element.

------------------------------------------------------------

=========================================================
Q5. How do I know the role of an element for getByRole("role") ?
=========================================================

Use logRoles().

Example:

import { logRoles } from "@testing-library/dom";

const { container } = render(...);
logRoles(container);

Run the test.

The console prints all accessible roles found in the component.

Example output:

heading
button
textbox
link
paragraph
img
checkbox
radio

Then use those roles with getByRole().

------------------------------------------------------------

Example:

<button>Submit</button>

↓ role = "button"

screen.getByRole("button", {
  name: "Submit",
});

------------------------------------------------------------

<a href="/signup">Sign up</a>

↓ role = "link"

screen.getByRole("link", {
  name: "Sign up",
});

------------------------------------------------------------

=========================================================
Q6. Why do we check the href attribute?
=========================================================

Example:

expect(signupLink).toHaveAttribute("href", "/signup");

This verifies that the link points to the correct destination.

It doesn't click the link.
It simply confirms that navigation is configured correctly.

------------------------------------------------------------

=========================================================
Q7. Why are we testing AuthForm instead of Login or Signup?
=========================================================

Login.jsx

<AuthForm mode="login" />

Signup.jsx

<AuthForm mode="signup" />

These pages only render AuthForm.

The actual logic is inside AuthForm:

- Conditional rendering
- Validation
- Navigation links
- Form submission

Testing AuthForm automatically covers both Login and Signup
without duplicating tests.

------------------------------------------------------------

=========================================================
Q8. Why do we wrap AuthForm with MemoryRouter?
=========================================================

AuthForm contains React Router <Link> components.

Without a Router, React Router throws an error.

MemoryRouter provides a lightweight Router for testing,
allowing Link components to work correctly.

------------------------------------------------------------

=========================================================
Q9. getBy... vs queryBy...
=========================================================

Use getBy...

✔ When the element SHOULD exist.

If it isn't found, the test fails immediately.

------------------------------------------------------------

Use queryBy...

✔ When the element SHOULD NOT exist.

If it isn't found, it returns null instead of throwing an error.

------------------------------------------------------------

Rule of thumb:

Element should exist
↓

getBy...

Element should NOT exist
↓

queryBy...
*/
