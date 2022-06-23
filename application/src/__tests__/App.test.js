import { render, screen } from '@testing-library/react';
import App from '../components/App.jsx';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hexlet Chat/i);
  expect(linkElement).toBeInTheDocument();
});
