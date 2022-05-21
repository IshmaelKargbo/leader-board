class LeaderBoard {
  constructor() {
    this.baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    this.game = localStorage.getItem('game') || null;
  }

  newGame = async (name) => {
    this.game = await fetch(`${this.baseURL}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then(({ result }) => {
        const game = result.slice(14, 34);
        localStorage.setItem('game', game);
        return game;
      })
  }

  createScore = async ({ name, score }) => {
    await fetch(`${this.baseURL}${this.game}/scores/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user: name,
        score: score,
      }),
    })
  }

  allScores = async () => {
    if (!this.game) await this.newGame('FPL');

    const scores = fetch(`${this.baseURL}${this.game}/scores/`)
      .then((res) => res.json())
      .then((res) => res.result);

    return scores;
  }
}

export default new LeaderBoard();