import SpecialityMenu from './SpecialityMenu';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

// need to update this change the arrange on the basis of how data is accesed
describe('SpecialityMenu', () => {
  //arrange
  it('should render all specialities', () => {
    render(
      <MemoryRouter>
        <SpecialityMenu />
      </MemoryRouter>
    );

    // Act
    const generalPhysician = screen.getByText('General physician');

    // Assert
    expect(generalPhysician).toBeInTheDocument();
  });

  // test Link navigation (need to do after the data aceess)
});
