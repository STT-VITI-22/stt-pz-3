import {render, screen} from '@testing-library/react';
import renderer from "react-test-renderer";
import App from './App';

test('renders learn anapioficeandfire link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Learn An API of Ice And Fire/i);
  expect(linkElement).toBeInTheDocument();
});

test("Matches DOM Snapshot", () => {
  const domTree = renderer.create(<App />).toJSON();
  expect(domTree).toMatchSnapshot();
});
