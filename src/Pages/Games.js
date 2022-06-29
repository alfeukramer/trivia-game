import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';

class Games extends React.Component {
state = {
  questions: {},
  hashValidate: true,
  questionsIndex: 0,
  loading: true,
};

  componentDidMount = async () => {
    await this.request();
    const { questions } = this.state;
    console.log('request', questions);
    this.setState({
      loading: false,
    });
  }

  request = async () => {
    const { token } = this.props;
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const requisicao = await fetch(URL);
    const requisicaoJson = await requisicao.json();
    console.log('json', requisicaoJson);
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
    console.log('fgaf', qstSelect);
    const respostas = [...qstSelect.incorrect_answers, qstSelect.correct_answer];
    const respostasNew = [];
    this.shuffleArray(respostas);
    respostas.forEach((resposta, index) => {
      const value = resposta === qstSelect.correct_answer ? ('correct-answer')
        : `wrong-answer-${index}`;
      const obj = {
        resposta,
        testId: value,
      };
      respostasNew.push(obj);
    });
    this.shuffleArray(respostasNew);
    return respostasNew;
  }

  render() {
    const { hashValidate, questions, questionsIndex, loading } = this.state;

    const qstSelect = !loading ? (
      questions.results.find((qst, index) => (index === questionsIndex))
    ) : '';
    console.log(questions);
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
                {this.answers().map((resp, index) => (
                  <button
                    data-testid={ resp.testId }
                    key={ index }
                    type="button"
                  >
                    {resp.resposta}
                  </button>
                ))}
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
};

const mapStateToProps = (state) => ({
  token: state.logRdc.token,
});

export default connect(mapStateToProps)(Games);
