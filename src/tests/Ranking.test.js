import React from 'react';
import App from '../App';
import md5 from 'crypto-js/md5';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

const initialStateMore3 = {
    player: {
        gravatarEmail: 'fring@gmail.com',
        name: 'Gustavo',
        score: 45,
        assertions: 3,
    },
};

describe('Teste da página de ranking', () => {
    it('teste 1', () => {
        const emailHash = md5('fring@gmail.com').toString();
        const emailHash1 = md5('tsalamanca@gmail.com').toString();
        const gravatar0 = `https://www.gravatar.com/avatar/${emailHash}`;
        const gravatar1 = `https://www.gravatar.com/avatar/${emailHash1}`;
        const data = [{
            picture: gravatar1,
            name: 'Tuco',
            score: 26,
            assertions: 1,
        },
        {
            picture: gravatar0,
            name: 'Gustavo',
            score: 45,
            assertions: 3,
        }];

        const { history } = renderWithRouterAndRedux(<App />); 
        global.localStorage.setItem('ranking', JSON.stringify(data));
        history.push('/ranking');
        const imgPlayer = screen.getAllByAltText('userImg');
        expect(imgPlayer).toHaveLength(2);
        expect(imgPlayer[0]).toHaveAttribute('src', gravatar0);
        expect(imgPlayer[1]).toHaveAttribute('src', gravatar1);
        const player0Name = screen.getByTestId('player-name-0');
        const player0Score = screen.getByTestId('player-score-0');
        const player1Name = screen.getByTestId('player-name-1');
        const player1Score = screen.getByTestId('player-score-1');
        expect(screen.getByTestId('btn-go-home')).toBeInTheDocument();
        expect(player0Name).toBeInTheDocument();
        expect(player0Score).toBeInTheDocument();
        expect(player0Name).toHaveTextContent('Gustavo');
        expect(player0Score).toHaveTextContent('45');
        expect(player1Name).toBeInTheDocument();
        expect(player1Score).toBeInTheDocument();
        expect(player1Name).toHaveTextContent('Tuco');
        expect(player1Score).toHaveTextContent('26');
    })
})