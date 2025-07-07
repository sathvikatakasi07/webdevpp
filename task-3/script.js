// ======== Carousel ==========
const images = [
  "https://picsum.photos/id/1018/400/200",
  "https://picsum.photos/id/1015/400/200",
  "https://picsum.photos/id/1016/400/200"
];
let imageIndex = 0;

function showCarouselImage() {
  document.getElementById("carouselImage").src = images[imageIndex];
}
function nextImage() {
  imageIndex = (imageIndex + 1) % images.length;
  showCarouselImage();
}
function prevImage() {
  imageIndex = (imageIndex - 1 + images.length) % images.length;
  showCarouselImage();
}
showCarouselImage(); // Initial display

// ======== Quiz ==========
const questions = [
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Laravel"],
    answer: "Laravel"
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      if (option === q.answer) score++;
      nextQuestion();
    };
    optionsDiv.appendChild(btn);
  });
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz").innerHTML = `<h3>Your score: ${score}/${questions.length}</h3>`;
  }
}
loadQuestion();

// ======== Joke API ==========
async function getJoke() {
  const jokeText = document.getElementById("joke");
  const loader = document.getElementById("loader");
  jokeText.textContent = "";
  loader.classList.remove("hidden");

  try {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    });
    const data = await res.json();
    jokeText.textContent = data.joke;
  } catch (error) {
    jokeText.textContent = "Oops! Couldn't fetch a joke.";
  } finally {
    loader.classList.add("hidden");
  }
}
