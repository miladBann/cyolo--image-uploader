import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

describe('Modal Component', () => {
  it('renders the component with the provided URL', () => {
    const url = 'https://example.com';
    const { getByText } = render(<Modal url={url} />);
    expect(getByText(url)).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    const { getByText } = render(<Modal url="https://example.com" onClose={onClose} />);
    const closeButton = getByText('X');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
  
});
