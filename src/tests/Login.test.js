import React from 'react';
import App from '../App'
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

const data = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
};

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
  .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(data),
  }));
};

describe('Teste da página Login', () => {
  beforeEach(mockFetch)
  afterEach(() => jest.clearAllMocks());
  test('Verifica se os inputs estão renderizados', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play')
    const buttonSettings = screen.getByTestId('btn-settings')
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();
    userEvent.type(inputName, 'Lucas');
    userEvent.type(inputEmail, 'lucaslindao@hotmail.com');
    expect(buttonPlay).not.toBeDisabled();
  });
  test('Verifica o butão Play', async () => {
    renderWithRouterAndRedux(<App />)
    const buttonPlay = screen.getByTestId('btn-play')
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputName, 'Lucas');
    userEvent.type(inputEmail, 'lucaslindao@hotmail.com');
    userEvent.click(buttonPlay);
    expect(global.fetch).toHaveBeenCalled();
  });
  test(`Verifica se o butão "configuração"
  redireciona para a página correta`, () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByTestId('btn-settings');
    userEvent.click(buttonSettings);
    const { pathname } = history.location;
    expect(pathname).toEqual("/settings");
    
  });
  test('', () => {
    renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByTestId('btn-settings');
    userEvent.click(buttonSettings);
    const divSeting = screen.findByTestId('settings-title');
    expect(divSeting).toBeDefined();
  });
})