import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';
import { UsersService } from '@/services/userService';

// Mock UsersService methods
jest.mock('@/services/userService', () => ({
  UsersService: {
    login: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe('LoginForm', () => {
  test('should display an error message for invalid email', async () => {
    render(<LoginForm onLogin={jest.fn()} />);

    // Simulate entering an invalid email
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    // Simulate form submission
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    // Wait for error message to appear
    await waitFor(() => screen.getByText(/please enter a valid email address/i));

    // Assert that the error message is displayed
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test('should call UsersService.login and onLogin when email is valid', async () => {
    render(<LoginForm onLogin={jest.fn()} />);

    // Mock successful login
    (UsersService.login as jest.Mock).mockResolvedValue(true);
    (UsersService.findAll as jest.Mock).mockResolvedValue([]);

    // Simulate entering a valid email
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    // Simulate form submission
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    // Wait for onLogin to be called
    await waitFor(() => expect(UsersService.login).toHaveBeenCalledWith('john.doe@example.com'));
    await waitFor(() => expect(UsersService.findAll).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText(/login/i)).not.toBeInTheDocument());
  });

  test('should not call onLogin if login fails', async () => {
    render(<LoginForm onLogin={jest.fn()} />);

    // Mock failed login
    (UsersService.login as jest.Mock).mockResolvedValue(null);

    // Simulate entering a valid email
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    // Simulate form submission
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    // Wait for login to fail
    await waitFor(() => expect(UsersService.login).toHaveBeenCalledWith('john.doe@example.com'));
    expect(screen.getByText(/please enter a valid email address/i)).not.toBeInTheDocument();
  });
});
