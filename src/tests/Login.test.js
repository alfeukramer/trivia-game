import React from 'react';
import App from '../App'
import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Login from '../Pages/Login';

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
  beforeEach(mockFetch);
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
  test('Testa se o botão fica desabilitando com um input vazio', () => {
   const { history } = renderWithRouterAndRedux(<App />);
    const buttonPlay = screen.getByTestId('btn-play')
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(buttonPlay).toBeDisabled();

    userEvent.type(inputName, 'Lucas');
    userEvent.type(inputEmail, '');
    expect(buttonPlay).toBeDisabled();
  })
  test('Verifica se o botão fica habilitado ao preencher os dois inputs', () => {
    renderWithRouterAndRedux(<App />);
    const buttonPlay = screen.getByTestId('btn-play')
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputName, '');
    userEvent.type(inputEmail, 'lucaslindo@gmail.com'); 
    expect(buttonPlay).toBeDisabled();
    userEvent.type(inputName, 'Lucas');
    userEvent.type(inputEmail, 'lucaslindo@gmail.com');
    expect(buttonPlay).not.toBeDisabled();
    fireEvent.change(inputName, { target: { value: '' } });
    expect(buttonPlay).toBeDisabled();

  })
  test('Verifica o botão Play', async () => {
    renderWithRouterAndRedux(<Login />)
    const buttonPlay = screen.getByTestId('btn-play')
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputName, 'Lucas');
    userEvent.type(inputEmail, 'lucaslindao@hotmail.com');
    userEvent.click(buttonPlay);
    expect(global.fetch).toHaveBeenCalled();
  });
  test(`Verifica se o botão "configuração"
  redireciona para a página correta`, () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByTestId('btn-settings');
    userEvent.click(buttonSettings);
    const { pathname } = history.location;
    expect(pathname).toEqual("/settings");
    
  });
  test('Testa se é redirecionado para a página de configurações ao clicar no botão',  async() => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByTestId('btn-settings');
    userEvent.click(buttonSettings);
    expect(history.location.pathname).toEqual('/settings');
  });
})