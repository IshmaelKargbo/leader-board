import axios from 'axios';

class LeaderBoard {
    constructor() {
      this.baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
      this.game = localStorage.getItem('game') || null;
    }

    newGame = async (name) => {
      this.game = await axios.post(`${this.baseURL}`, { name })
        .then((response) => {
          const { result } = response.data;
          const game = result.slice(14, 34);
          localStorage.setItem('game', game);
          return game;
        })
        .catch((error) => {
          throw new Error(error);
        });
    }

    createScore = async ({ name, score }) => {
      await axios.post(`${this.baseURL}${this.game}/scores/`, {
        user: name,
        score,
      }).then((response) => {
        const { result } = response.data;
        return result;
      }).catch((error) => {
        throw new Error(error);
      });
    }

    allScores = async () => {
      if (!this.game) await this.newGame('FPL');

      const scores = await axios.get(`${this.baseURL}${this.game}/scores/`)
        .then((response) => {
          const { result } = response.data;
          return result;
        }).catch((error) => {
          throw new Error(error);
        });

      return scores;
    }
}

export default new LeaderBoard();