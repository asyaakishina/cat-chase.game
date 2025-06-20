const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options");
const messageBox = document.getElementById("message");

let currentRound = 0;
let currentQuestionIndex = 0;
let totalErrors = 0;

// === Испытания ===
const rounds = [
    {
        title: "Испытание 1: am / is / are",
        questions: [
            { fullText: "He ___ happy", correct: "is", options: ["am", "is", "are"] },
            { fullText: "I ___ a student", correct: "am", options: ["am", "is", "are"] },
            { fullText: "They ___ from London", correct: "are", options: ["am", "is", "are"] },
            { fullText: "She ___ tired", correct: "is", options: ["am", "is", "are"] },
            { fullText: "We ___ at school", correct: "are", options: ["am", "is", "are"] },
            { fullText: "It ___ blue", correct: "is", options: ["am", "is", "are"] },
            { fullText: "You ___ ready", correct: "are", options: ["am", "is", "are"] },
            { fullText: "My friend ___ here", correct: "is", options: ["am", "is", "are"] },
            { fullText: "The cats ___ on the sofa", correct: "are", options: ["am", "is", "are"] },
            { fullText: "I ___ excited", correct: "am", options: ["am", "is", "are"] }
        ]
    },
    {
        title: "Испытание 2: have / has got",
        questions: [
            { fullText: "I ___ a dog", correct: "have got", options: ["have got", "has got"] },
            { fullText: "He ___ many friends", correct: "has got", options: ["have got", "has got"] },
            { fullText: "They ___ time", correct: "have got", options: ["have got", "has got"] },
            { fullText: "My mum ___ a car", correct: "has got", options: ["have got", "has got"] },
            { fullText: "We ___ a problem", correct: "have got", options: ["have got", "has got"] },
            { fullText: "Tom ___ long hair", correct: "has got", options: ["have got", "has got"] },
            { fullText: "You ___ a plan", correct: "have got", options: ["have got", "has got"] },
            { fullText: "My parents ___ a big house", correct: "have got", options: ["have got", "has got"] },
            { fullText: "She ___ blue eyes", correct: "has got", options: ["have got", "has got"] },
            { fullText: "My sister ___ a cat", correct: "has got", options: ["have got", "has got"] }
        ]
    },
    {
        title: "Испытание 3: can / can't",
        questions: [
            { fullText: "I ___ swim", correct: "can", options: ["can", "can't"] },
            { fullText: "He ___ speak English", correct: "can", options: ["can", "can't"] },
            { fullText: "They ___ fly", correct: "can't", options: ["can", "can't"] },
            { fullText: "We ___ jump high", correct: "can", options: ["can", "can't"] },
            { fullText: "She ___ ride a bike", correct: "can", options: ["can", "can't"] },
            { fullText: "You ___ read this", correct: "can", options: ["can", "can't"] },
            { fullText: "It ___ talk", correct: "can't", options: ["can", "can't"] },
            { fullText: "My brother ___ play piano", correct: "can", options: ["can", "can't"] },
            { fullText: "The baby ___ walk", correct: "can't", options: ["can", "can't"] },
            { fullText: "We ___ see stars tonight", correct: "can", options: ["can", "can't"] }
        ]
    }
];

// === Переключатель экранов ===
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
    document.getElementById(screenId + "-screen").classList.add("active");
}

// === Сохранение прогресса ===
function saveProgress() {
    localStorage.setItem("savedRound", currentRound);
    localStorage.setItem("savedQuestion", currentQuestionIndex);
    localStorage.setItem("totalErrors", totalErrors);
}

function loadProgress() {
    const round = parseInt(localStorage.getItem("savedRound"));
    const question = parseInt(localStorage.getItem("savedQuestion"));
    const errors = parseInt(localStorage.getItem("totalErrors"));

    if (!isNaN(round)) currentRound = round;
    if (!isNaN(question)) currentQuestionIndex = question;
    if (!isNaN(errors)) totalErrors = errors;
}

// === Отображение вопроса ===
function showQuestion() {
    const round = rounds[currentRound];
    const q = round.questions[currentQuestionIndex];

    questionBox.textContent = q.fullText;
    optionsBox.innerHTML = "";
    messageBox.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "default";
        btn.textContent = option;
        btn.onclick = () => checkAnswer(btn, option, q.correct);
        optionsBox.appendChild(btn);
    });
}

// === Проверка ответа ===
function checkAnswer(button, selected, correct) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);

    if (selected === correct) {
        button.classList.remove("default");
        button.classList.add("correct");
        messageBox.innerHTML = "<p style='color:green;'>Правильно! Кот ближе!</p>";

        setTimeout(() => {
            messageBox.innerHTML = "";
            currentQuestionIndex++;
            if (currentQuestionIndex < 10) {
                showQuestion();
            } else {
                nextRound();
            }
            saveProgress();
        }, 1000);
    } else {
        button.classList.add("wrong");
        totalErrors++;
        messageBox.innerHTML = "<p style='color:red;'>Неправильно. Подумай ещё!</p>";
        saveProgress();

        setTimeout(() => {
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove("wrong");
            });
        }, 1000);
    }
}

// === Переход на следующий уровень ===
function nextRound() {
    currentRound++;
    currentQuestionIndex = 0;
    saveProgress();

    if (currentRound >= rounds.length) {
        endGame();
    } else {
        const round = rounds[currentRound];
        questionBox.textContent = round.title;
        messageBox.innerHTML = "<p>Следующее испытание начнётся через секунду...</p>";
        setTimeout(() => {
            messageBox.innerHTML = "";
            showQuestion();
        }, 1000);
    }
}

// === Конец игры ===
function endGame() {
    let ending = "";

    if (totalErrors === 0) {
        ending = "🎉 Ура! Ты нашёл кота! Он гордится тобой 🐾";
    } else if (totalErrors <= 3) {
        ending = "😺 Кот нашёлся! Но он немного обиделся... Ты почти догнал его.";
    } else if (totalErrors <= 7) {
        ending = "😿 Кот ускользнул... Но ты молодец! Попробуй ещё раз!";
    } else {
        ending = "🚫 Кот ушёл далеко. Попробуй пройти испытания лучше!";
    }

    questionBox.textContent = "Конец игры";
    optionsBox.innerHTML = "";
    messageBox.innerHTML = `<p>${ending}</p><button onclick="restartGame()">Играть заново</button>`;
}

// === Старт игры ===
function startGame() {
    showScreen("game");
    questionBox.textContent = rounds[currentRound].title;
    showQuestion();
}

// === Начать сначала ===
function restartGame() {
    localStorage.clear();
    currentRound = 0;
    currentQuestionIndex = 0;
    totalErrors = 0;
    startGame();
}

// === Автозагрузка ===
document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
});

// === Добавить кнопку "Продолжить" в меню ===
document.addEventListener("DOMContentLoaded", () => {
    const resumeBtn = document.createElement("button");
    resumeBtn.textContent = "Продолжить игру";
    resumeBtn.onclick = () => {
        if (currentRound < rounds.length) {
            showScreen("game");
            showQuestion();
        }
    };

    const menu = document.getElementById("menu-screen");
    menu.appendChild(resumeBtn);
});