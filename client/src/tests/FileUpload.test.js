import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FileUpload from '../components/FileUpload';

jest.mock('axios', () => ({
  put: jest.fn(() => Promise.resolve({ status: 200, data: { imageUrl: 'example-url' } })),
}));

describe('FileUpload Component', () => {
  it('renders the component with the initial state', () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(<FileUpload />);
    expect(getByText('Upload Your Image')).toBeInTheDocument();
    expect(getByLabelText('Click to Upload File')).toBeInTheDocument();
    expect(getByPlaceholderText('Set expiration time (min)')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('displays an error message when submitting without selecting a file', async () => {
    const { getByText } = render(<FileUpload />);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(getByText('Choose an image to upload.')).toBeInTheDocument();
    });
  });

  it('displays the selected image when a file is chosen', async () => {
    const { getByLabelText, getByAltText } = render(<FileUpload />);
    const fileInput = getByLabelText('Click to Upload File');
    const file = new File(['file content'], 'image.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    await waitFor(() => {
      expect(getByAltText('Selected')).toBeInTheDocument();
    });
  });

  it('clears submitted state and error message when closing the modal', async () => {
    const { getByLabelText, getByText, queryByText } = render(<FileUpload />);
    const fileInput = getByLabelText('Click to Upload File');
    const submitButton = getByText('Submit');
    fireEvent.change(fileInput, { target: { files: [new File(['file content'], 'image.jpg', { type: 'image/jpeg' })] } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      fireEvent.click(getByText('X'));
      expect(queryByText('Here is your Image Link')).toBeNull();
      expect(queryByText('Success:')).toBeNull();
      expect(queryByText('An error occurred while uploading the image.')).toBeNull();
    });
  });
});
