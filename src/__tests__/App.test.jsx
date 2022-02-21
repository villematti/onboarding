
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import '@testing-library/jest-dom'

import App from '../App';
import { SITE_TITLE } from '../constants/constants';

describe('App', () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
    render(<BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/users/:id' element={<App />}/>
        </Routes>
      </BrowserRouter>);
  });

  test('title renders correctly', () => {
    const siteTitle = screen.getByText(SITE_TITLE);
    expect(siteTitle).toBeInTheDocument();
  });

  test('should render users correctly', async () => {
    expect(await waitFor(() => screen.getByRole('link', {name: 'Test user'}))).toBeInTheDocument();
    expect(await waitFor(() => screen.getByRole('link', {name: 'Test user2'}))).toBeInTheDocument();
  })

  test('should show correct icon when isCompleted is set to true', async () => {
    const el = await waitFor(() => screen.getByRole('checkbox', {name: 'delectus aut autem'}));
    fireEvent.click(el);
    expect(await waitFor(() => screen.getByTestId('delectus aut autem-complete-icon'))).toBeInTheDocument();
  })

  test('should render correct task list on link click', async () => {
    const el = await waitFor(() => screen.getByRole('link', {name: 'Test user2'}))
    fireEvent.click(el)
    expect(await waitFor(() => screen.getByRole('checkbox', {name: 'et itaque necessitatibus maxime molestiae qui quas velit'})))
  })
})

