import React from 'react';
import Login from './Login';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// window.MutationObserver = require("mutation-observer");
// import MutationObserver from '@sheerun/mutationobserver-shim';
// window.MutationObserver = MutationObserver ;

describe('Login', () => {
  it("User should see a title, a username input, and two buttons when viewing the login page", () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <MemoryRouter>
        <Login 
          username={'Temp Name'}
          setUsername={Function}
          loggedIn={false}
          setLoggedIn={Function}
        />
      </MemoryRouter>
    );

    const loginMsg = getByText('Learn how', {exact: false});
    const usernameInput = getByPlaceholderText('username');
    const over21Button = getByLabelText('over-21-button');
    const under21Button = getByLabelText('under-21-button');

    expect(loginMsg).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(over21Button).toBeInTheDocument();
    expect(under21Button).toBeInTheDocument();
  });

  it('Buttons should be disabled if input is empty', () => {
    const mockVerifyUser = jest.fn();

    const { getByLabelText } = render(
      <MemoryRouter>
        <Login
          username={''}
          setUsername={Function}
          loggedIn={false}
          setLoggedIn={mockVerifyUser}
        />
      </MemoryRouter>
    );

    const over21Button = getByLabelText('over-21-button');

    fireEvent.click(over21Button);

    expect(mockVerifyUser).toHaveBeenCalledTimes(0);
  });

  it('User should be able to login if they fill out the input and click the over 21 button', () => {
    const mockVerifyUser = jest.fn();

    const { getByLabelText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Login
          username={'Yahoo Serious'}
          setUsername={Function}
          loggedIn={false}
          setLoggedIn={mockVerifyUser}
        />
      </MemoryRouter>
    );
    
    const usernameInput = getByPlaceholderText('username');
    const over21Button = getByLabelText('over-21-button');

    fireEvent.change(usernameInput);
    fireEvent.click(over21Button);

    expect(mockVerifyUser).toHaveBeenCalledTimes(1);
  });

  // Skipped to complete in the morning
  it.skip('User should not be allowed to login if they are under 21', async () => {
    const mockDenyUser = jest.fn();

    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Login
          username={'Yahoo Serious'}
          setUsername={Function}
          loggedIn={false}
          setLoggedIn={mockDenyUser}
        />
      </MemoryRouter>
    );
    
    const usernameInput = getByPlaceholderText('username');
    const under21Button = getByLabelText('over-21-button');
    

    fireEvent.change(usernameInput);
    fireEvent.click(under21Button);

    // await waitFor(() => {
    //   const errorMsg = getByText('Sorry, come back in a few years');
    //   expect(errorMsg).toBeInTheDocument();
    // })

    const errorMsg = await waitFor(() => getByText('Sorry, come back in a few years'));

    expect(mockDenyUser).toHaveBeenCalledTimes(1);
    expect(errorMsg).toBeInTheDocument();
  })

})