import ContactForm from '@/components/ContactForm';
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';

describe('ContactForm component successfully', () => {
  it('submits the form successfully', async () => {
    // Mock fetch function
    const mockFetch = jest.fn().mockResolvedValueOnce({ ok: true });

    // Replace global fetch with mock fetch
    global.fetch = mockFetch;

    // Render the component
    const { getByLabelText, getByText } = render(<ContactForm />);

    // Fill out the form
    fireEvent.change(getByLabelText('Name:'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Message:'), { target: { value: 'Test message' } });

    // Submit the form
    fireEvent.click(getByText('Submit'));

    // Wait for the success message
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    // Expect the success message
    expect(getByText('Mensagem enviada com sucesso!')).toBeInTheDocument();
  });
});
