import LeaderBoard from './modules/leaderboard.js';
import { loadState, renderScore } from './modules/render.js';
import './style.css';

const state = document.getElementById('board-state');

const form = document.getElementById('form');
const refresh = document.getElementById('refresh');
const load = document.getElementById('form-load');

const fetchScores = async () => {
  loadState();
  state.style.display = 'block';

  const scores = await LeaderBoard.allScores();

  if (scores.length === 0) {
    state.style.display = 'block';
    state.innerText = 'No Data';
    return;
  }

  state.style.display = 'none';
  renderScore(scores);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const errors = [];

  const data = Object.fromEntries(new FormData(e.target).entries());

  Object.entries(data).forEach((object) => {
    const [key, value] = object;

    const form = e.target;
    const element = form.elements[key];

    if (!value) {
      element.classList.add('error');
      errors.push({
        name: key,
        error: true,
      });
    } else {
      element.classList.remove('error');
      errors.push({
        name: key,
        error: false,
      });
    }
  });

  const hasError = errors.find((error) => (error.error));

  if (hasError) return;

  load.style.display = 'block';
  LeaderBoard.createScore(data)
    .finally(() => {
      e.target.reset();
      load.style.display = 'none';
    });
});

refresh.onclick = () => {
  fetchScores();
};

window.onload = () => {
  fetchScores();
};