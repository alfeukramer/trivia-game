import React from 'react';
import Feedback from '../Pages/Feedback';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import md5 from 'crypto-js/md5';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

const initialStateLess3 = {
    player: {
        gravatarEmail: 'tsalamanca@hotmail.com',
        name: 'Tuco',
        score: 26,
        assertions: 1,
    },
};
const initialStateMore3 = {
    player: {
        gravatarEmail: 'fring@gmail.com',
        name: 'Gustavo',
        score: 45,
        assertions: 3,
    },
};

describe('Teste de página Feedback', () => {

    it('Testa se o Header possui as informações relevantes', () => {
        renderWithRouterAndRedux(<Feedback />, initialStateLess3)
        const emailHash = md5(initialStateLess3.player.gravatarEmail).toString();
        const gravatar = `https://www.gravatar.com/avatar/${emailHash}`;
        const userImg = screen.getByTestId('header-profile-picture');
        const playerName = screen.getByTestId('header-player-name');
        const playerScore = screen.getByTestId('header-score');

        expect(userImg).toHaveAttribute('src', gravatar);
        expect(playerName).toHaveTextContent(initialStateLess3.player.name);
        expect(playerScore).toHaveTextContent(initialStateLess3.player.score);
    })

    it('Testa se é exibida a mensagem correta quando abaixo de 3', () => {
       
        renderWithRouterAndRedux(<Feedback />, initialStateLess3)
        const results = screen.getByTestId('feedback-text');
        expect(results).toBeDefined();
        expect(results).toHaveTextContent('Could be better...');
    })
    it('Testa se é exibida a mensagem correta quando acima de 3', () => {
        renderWithRouterAndRedux(<Feedback />, initialStateMore3)
        const results = screen.getByTestId('feedback-text');
        expect(results).toBeDefined();
        expect(results).toHaveTextContent('Well Done!');
    })
    it('Testa se os botões estão na página e se funcionam', () => {
        const { history } =  renderWithRouterAndRedux(<Feedback />);
        const playAgain = screen.getByTestId('btn-play-again');
        const ranking = screen.getByTestId('btn-ranking');
        expect(playAgain).toBeDefined();
        expect(ranking).toBeDefined();
        fireEvent.click(playAgain);
        expect(history.location.pathname).toEqual('/');
        fireEvent.click(ranking);
        expect(history.location.pathname).toEqual('/ranking');

    })
})