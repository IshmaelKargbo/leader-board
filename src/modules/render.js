const board = document.getElementById('board');

export const renderScore = (scores) => {
    scores.forEach((score) => {
        const liScore = document.createElement('li');

        const pTag = document.createElement('p');

        pTag.innerText = `${score.user}: ${score.score}`;

        liScore.appendChild(pTag);

        board.appendChild(liScore);
    });
}

export const loadState = () => {
    board.innerHTML = '';
}