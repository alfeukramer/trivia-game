import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import { updateScore } from '../redux/actions';

const correctAnswer = 'correct-answer';

class Games extends React.Component {
state = {
  questions: {},
  hashValidate: true,
  questionsIndex: 0,
  loading: true,
  correctBackground: 'white',
  incorrectBackground: 'white',
  answers: [],
  disableButtons: false,
  seconds: 30,
};

  componentDidMount = async () => {
    await this.request();
    this.setState({
      loading: false,
    });
    this.answers();
    this.timerFunction();
    const timer = 1000;
    this.scoreTimer = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, timer);
  }

  componentDidUpdate = () => {
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.scoreTimer);
    }
  }

  onClick = (obj) => {
    const { scoreAction } = this.props;
    const { seconds } = this.state;
    this.setState({ correctBackground: 'rgb(6, 240, 15)',
      incorrectBackground: 'red' });
    const { questionsIndex, questions } = this.state;
    const { difficulty } = questions.results[questionsIndex];
    let valorFinal = 0;
    const pontoFixo = 10;
    const hard = 3;
    if (obj.testId === correctAnswer) {
      if (difficulty === 'hard') {
        valorFinal += pontoFixo + (hard * seconds);
      } else if (difficulty === 'medium') {
        valorFinal += pontoFixo + (seconds * 2);
      } else {
        valorFinal += pontoFixo + seconds;
      }
      scoreAction(valorFinal);
    }
  }

  request = async () => {
    const { token } = this.props;
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const requisicao = await fetch(URL);
    const requisicaoJson = await requisicao.json();
    this.setState({
      questions: requisicaoJson,
    });
    const tres = 3;
    if (requisicaoJson.response_code === tres) {
      localStorage.removeItem('token');
      this.setState({
        hashValidate: false,
      });
    }
  }

  // a seguinte função consultamos do stackOverFlow: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  answers = () => {
    const { questions, questionsIndex } = this.state;
    const qstSelect = questions.results ? (
      questions.results.find((qst, index) => (index === questionsIndex))
    ) : '';
    const respostas = [...qstSelect.incorrect_answers, qstSelect.correct_answer];
    const respostasNew = [];
    respostas.forEach((resposta, index) => {
      const value = resposta === qstSelect.correct_answer ? (correctAnswer)
        : `wrong-answer-${index}`;
      const obj = {
        resposta,
        testId: value,
      };
      respostasNew.push(obj);
    });
    this.shuffleArray(respostasNew);
    this.setState({ answers: respostasNew });
  }

  timerFunction = () => {
    const endTime = 30000;
    setTimeout(() => {
      const { correctBackground } = this.state;
      if (correctBackground === 'white') {
        this.setState({
          correctBackground: 'rgb(6, 240, 15)',
          incorrectBackground: 'red',
          disableButtons: true });
      }
    }, endTime);
  }

  render() {
    const { hashValidate, questions,
      questionsIndex, loading,
      correctBackground, incorrectBackground, answers,
      disableButtons } = this.state;
    const qstSelect = !loading ? (
      questions.results.find((qst, index) => (index === questionsIndex))
    ) : '';
    return (
      <div>
        {
          !hashValidate && <Redirect to="/" />
        }
        <Header />
        {
          !loading && (
            <div>
              <h3 data-testid="question-category">
                {qstSelect.category}
              </h3>
              <p data-testid="question-text">
                {qstSelect.question}
              </p>

              <ul data-testid="answer-options">
                {answers.map((resp, index) => {
                  const value = resp.testId === correctAnswer ? (
                    correctBackground) : incorrectBackground;
                  return (
                    <button
                      data-testid={ resp.testId }
                      style={ { backgroundColor: value,
                        border: value !== 'white' && `3px solid ${value}` } }
                      key={ index }
                      type="button"
                      onClick={ () => this.onClick(resp) }
                      disabled={ disableButtons }
                    >
                      {resp.resposta}
                    </button>
                  );
                })}
              </ul>
            </div>
          )
        }
      </div>
    );
  }
}

Games.propTypes = {
  token: PropTypes.string.isRequired,
  scoreAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.player.token,
});

const mapDispatchToProps = (dispatch) => ({
  scoreAction: (numero) => dispatch(updateScore(numero)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);
