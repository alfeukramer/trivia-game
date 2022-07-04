import React from 'react';
import App from '../App';
import md5 from 'crypto-js/md5';
import { findAllByTestId, screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Game from '../Pages/Game';

const initialState = {
    player: {
        gravatarEmail: 'fring@gmail.com',
        name: 'Gustavo',
        score: 0,
        assertions: 0,
        token: '704dd1967dc78756ef20d2b7decb393de2ce882d38b668edc4b29973815cbd64',
    },
};

const initialStateInvalid = {
    player: {
        token: '',
    }
};

const data = {
    "response_code": 0,
    "results": [
        {
            "category": "Entertainment: Television",
            "type": "multiple",
            "difficulty": "easy",
            "question": "What was the name of the police officer in the cartoon &quot;Top Cat&quot;?",
            "correct_answer": "Dibble",
            "incorrect_answers": [
                "Barbrady",
                "Mahoney",
                "Murphy"
            ]
        },
        {
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "medium",
            "question": "Which English guitarist has the nickname &quot;Slowhand&quot;?",
            "correct_answer": "Eric Clapton",
            "incorrect_answers": [
                "Mark Knopfler",
                "Jeff Beck",
                "Jimmy Page"
            ]
        },
        {
            "category": "Entertainment: Video Games",
            "type": "boolean",
            "difficulty": "hard",
            "question": "In &quot;Super Mario 64&quot;, collecting 100 coins on a level will give you a 1-UP.",
            "correct_answer": "False",
            "incorrect_answers": [
                "True"
            ]
        },
        {
            "category": "Geography",
            "type": "multiple",
            "difficulty": "hard",
            "question": "What is the most populous Muslim-majority nation in 2010?",
            "correct_answer": "Indonesia",
            "incorrect_answers": [
                "Saudi Arabia",
                "Iran",
                "Sudan"
            ]
        },
        {
            "category": "Animals",
            "type": "multiple",
            "difficulty": "medium",
            "question": "What is the common term for bovine spongiform encephalopathy (BSE)?",
            "correct_answer": "Mad Cow disease",
            "incorrect_answers": [
                "Weil&#039;s disease",
                "Milk fever",
                "Foot-and-mouth disease"
            ]
        }
    ]
}

const emailHash = md5('fring@gmail.com').toString();
const emailHash1 = md5('tsalamanca@gmail.com').toString();
const gravatar0 = `https://www.gravatar.com/avatar/${emailHash}`;
const gravatar1 = `https://www.gravatar.com/avatar/${emailHash1}`;
const storageData = [{
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

const mockFetch = () => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(data),
    }));
  };

describe('Teste da página do jogo', () => {
    beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());
    it('Teste se a página exibe uma questão ao ser carregada', async () => {
        jest.setTimeout(40000);
        renderWithRouterAndRedux(<Game />, initialState);
       await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        const category = await screen.findByTestId('question-category');
        const questionText = await screen.findByTestId('question-text');
        const buttonNext = await waitFor(() => screen.queryByTestId('btn-next'));
        const correctAnswer = await screen.findAllByTestId('correct-answer');
        expect(correctAnswer).toHaveLength(1);
        expect(buttonNext).toBe(null);
        expect(questionText).toHaveTextContent(data.results[0].question);
        expect(category).toHaveTextContent(data.results[0].category);
        const next = await waitFor(() => screen.getByTestId('btn-next'), {timeout: 35000});
        expect(next).toBeDefined();    
    });
    it('Testa se ao clicar em uma resposta o botão next aparece', async () => {
        renderWithRouterAndRedux(<Game />, initialState);
        global.localStorage.setItem('ranking', JSON.stringify(storageData));
         const buttonNext = await waitFor(() => screen.queryByTestId('btn-next'));
         const correctAnswer = await screen.findAllByTestId('correct-answer');
         userEvent.click(correctAnswer[0]);
         expect(buttonNext).toBeDefined();
    });
    it('Testa se ao clicar no botão Next, uma nova pergunta aparece', async () => {
        renderWithRouterAndRedux(<Game />, initialState);
        global.localStorage.setItem('ranking', JSON.stringify(storageData));
        const category = await screen.findByTestId('question-category');
        const questionText = await screen.findByTestId('question-text');
         const correctAnswer = await screen.findAllByTestId('correct-answer');
         userEvent.click(correctAnswer[0]);
         const next = await screen.findByTestId('btn-next');
         expect(next).toBeDefined();
         userEvent.click(next);
         expect(category).toHaveTextContent(data.results[1].category);
         expect(questionText).toHaveTextContent(data.results[1].question);
    });
    it('Testa se é redirecionada ao entrar com um token inválido', () => {
      const { history } = renderWithRouterAndRedux(<App />, initialStateInvalid);
      history.push('/game');
    waitFor(() => expect(history.location.pathname).toBe('/') );
    console.log(history);
    });
    it('Testa se a pontuação aumenta ao acertar', async () => {
        renderWithRouterAndRedux(<Game />, initialState);
        global.localStorage.setItem('ranking', JSON.stringify(storageData));
        const score = await screen.findByTestId('header-score');
        expect(score).toHaveTextContent('0');
        const correctAnswer = await screen.findAllByTestId('correct-answer');
        userEvent.click(correctAnswer[0]);
        expect(score).toHaveTextContent('40');
        const next = await screen.findByTestId('btn-next');
        userEvent.click(next);
        const correctAnswer1 = await screen.findAllByTestId('correct-answer');
        userEvent.click(correctAnswer1[0]);
        expect(score).toHaveTextContent('110');
        const nextButton = await screen.findByTestId('btn-next');
        userEvent.click(nextButton);
        const correctAnswer2 = await screen.findAllByTestId('correct-answer');
        userEvent.click(correctAnswer2[0]);
        expect(score).toHaveTextContent('210');
        const nextButton1 = await screen.findByTestId('btn-next');
        userEvent.click(nextButton1);
        const wrongAnswer = await screen.findByTestId('wrong-answer-0');
        userEvent.click(wrongAnswer);
        expect(score).toHaveTextContent('210');
    });
    it('Testa o timer', async () => {
        renderWithRouterAndRedux(<Game />, initialState);
        global.localStorage.setItem('ranking', JSON.stringify(storageData));
        const timer = await screen.findByTestId('timer');
       await waitFor(() => expect(timer).toHaveTextContent('26'), {timeout: 4500});
    })
});