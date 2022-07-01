import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
    state = {
      ranking: [],
    }

    componentDidMount() {
      this.rankingContent();
    }

    rankingContent = () => {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const rankingClone = [...ranking];
      rankingClone.sort((a, b) => b.score - a.score);
      this.setState({ ranking: rankingClone });
    }

    render() {
      const { ranking } = this.state;
      return (
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          {
            ranking[0] && (
              ranking.map((player, index) => (
                <div key={ player.name }>
                  <img
                    src={ player.picture }
                    alt="userImg"
                  />
                  <span data-testid={ `player-name-${index}` }>{player.name}</span>
                  <span data-testid={ `player-score-${index}` }>{player.score}</span>
                </div>
              ))
            )
          }
          <Link to="/">
            <button type="button" data-testid="btn-go-home">
              Inicio
            </button>
          </Link>
        </div>
      );
    }
}

export default Ranking;
