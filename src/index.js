import "./style.css";

const tableScores = document.querySelector(".table-scores");
const submitScore = document.querySelector(".submit-game");
const name = document.querySelector(".name-input");
const playerScore = document.querySelector(".score-input");
const refresh = document.querySelector(".refresh-btn");
const url =
  "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/IPWYQeHR5U8y45jrsCzj/scores/";

const renderLeaderboard = (users) => {
  const user = users.result;
  let leaderboard = "";
  user.forEach((gameUser) => {
    leaderboard += `<li class='scores'>${gameUser.user}: ${gameUser.score}</li>`;
    tableScores.innerHTML = leaderboard;
  });
};

const getScores = async () => {
  const response = await fetch(url);
  const data = await response.json();
  renderLeaderboard(data);
};

refresh.addEventListener("click", () => {
  getScores();
});

const scoreForm = async () => {
  const response = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: name.value,
      score: playerScore.value,
    }),
  });
  const data = await (await response).json();
  name.value = "";
  playerScore.value = "";
  return data;
};

submitScore.addEventListener("submit", (e) => {
  e.preventDefault();
  scoreForm();
});
