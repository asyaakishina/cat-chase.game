const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options");
const messageBox = document.getElementById("message");
const statsBox = document.getElementById("stats");
const rewardBox = document.getElementById("reward"); // новый блок для табличек

let currentRound = 0;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let totalErrors = 0;


// === Испытания ===
const rounds = [
    {
        title: "Испытание 1: am / is / are",
        questions: [
            { fullText: "He ___ happy.", correct: "is", options: ["am", "is", "are"] },
            { fullText: "I ___ a student.", correct: "am", options: ["am", "is", "are"] },
            { fullText: "They ___ from London.", correct: "are", options: ["am", "is", "are"] },
            { fullText: "She ___ tired.", correct: "is", options: ["am", "is", "are"] },
            { fullText: "We ___ at school.", correct: "are", options: ["am", "is", "are"] },
            { fullText: "It ___ blue.", correct: "is", options: ["am", "is", "are"] },
            { fullText: "You ___ ready.", correct: "are", options: ["am", "is", "are"] },
            { fullText: "My friend ___ here.", correct: "is", options: ["am", "is", "are"] },
            { fullText: "The cats ___ on the sofa.", correct: "are", options: ["am", "is", "are"] },
            { fullText: "I ___ excited.", correct: "am", options: ["am", "is", "are"] }
        ]
    },
    {
        title: "Испытание 2: have / has got",
        questions: [
            { fullText: "I ___ a dog.", correct: "have got", options: ["have got", "has got"] },
            { fullText: "He ___ many friends.", correct: "has got", options: ["have got", "has got"] },
            { fullText: "They ___ time.", correct: "have got", options: ["have got", "has got"] },
            { fullText: "My mum ___ a car.", correct: "has got", options: ["have got", "has got"] },
            { fullText: "We ___ a problem.", correct: "have got", options: ["have got", "has got"] },
            { fullText: "Tom ___ long hair.", correct: "has got", options: ["have got", "has got"] },
            { fullText: "You ___ a plan.", correct: "have got", options: ["have got", "has got"] },
            { fullText: "My parents ___ a big house.", correct: "have got", options: ["have got", "has got"] },
            { fullText: "She ___ blue eyes.", correct: "has got", options: ["have got", "has got"] },
            { fullText: "My sister ___ a cat.", correct: "has got", options: ["have got", "has got"] }
        ]
    },
    {
        title: "Испытание 3: can / can't",
        questions: [
            { fullText: "I ___ swim very well.", correct: "can", options: ["can", "can't"] },
            { fullText: "He ___ speak English. He is from London.", correct: "can", options: ["can", "can't"] },
            { fullText: "People ___ fly.", correct: "can't", options: ["can", "can't"] },
            { fullText: "Dolphins ___ jump high.", correct: "can", options: ["can", "can't"] },
            { fullText: "She ___ ride a bike fast. She like it.", correct: "can", options: ["can", "can't"] },
            { fullText: "You ___ read the book in the library.", correct: "can", options: ["can", "can't"] },
            { fullText: "The frog ___ talk.", correct: "can't", options: ["can", "can't"] },
            { fullText: "My brother ___ play the piano. He plays it at the school concerts.", correct: "can", options: ["can", "can't"] },
            { fullText: "The baby ___ walk.", correct: "can't", options: ["can", "can't"] },
            { fullText: "We ___ see the stars tonight. It's cloudy.", correct: "can't", options: ["can", "can't"] }
        ]
    }
];

// === Переключатель экранов ===
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
    document.getElementById(screenId + "-screen").classList.add("active");
}
// === Сообщение после раунда ===
function showRewardMessage(message) {
    questionBox.textContent = "Молодец!";
    optionsBox.innerHTML = "";
    messageBox.innerHTML = `<p>${message}</p>`;
    statsBox.style.display = "none";

    setTimeout(() => {
        nextRound();
    }, 5000); // 5 секунд
}

// === Отображение вопроса ===
function showQuestion() {
    const round = rounds[currentRound];
    const q = round.questions[currentQuestionIndex];

    updateStats();

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
        correctAnswers++;
        updateStats();

        setTimeout(() => {
            messageBox.innerHTML = "";
            currentQuestionIndex++;
            if (currentQuestionIndex < 10) {
                showQuestion();
            } else {
                // После 1 раунда
                if (currentRound === 0) {
                    showRewardMessage("Ты увидел кота в окне!");
                }
                // После 2 раунда
                else if (currentRound === 1) {
                    showRewardMessage("На полу ты заметил следы...");
                }
                // После 3 раунда
                else if (currentRound === 2) {
                    showRewardMessage("Он оставил свою игрушку на диване.");
                }
            }
        }, 1000);
    } else {
        button.classList.add("wrong");
        totalErrors++;
        updateStats();
        messageBox.innerHTML = "<p style='color:red;'>Неправильно. Подумай ещё!</p>";

        setTimeout(() => {
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove("wrong");
            });
        }, 1000);
    }
}

// === Пауза между раундами (5 секунд) ===
function showPauseBetweenRounds() {
    questionBox.textContent = "Подожди немного...";
    optionsBox.innerHTML = `<p>Следующее испытание начнётся через 5 секунд</p>`;
    messageBox.innerHTML = "";
    statsBox.style.display = "none";

    setTimeout(() => {
        nextRound();
    }, 5000); // 5 секунд
}

// === Переход на следующий уровень ===
function nextRound() {
    currentRound++;
    currentQuestionIndex = 0;
    statsBox.style.display = "block";

    if (currentRound >= rounds.length) {
        endGame();
    } else {
        const round = rounds[currentRound];
        questionBox.textContent = round.title;
        showQuestion();
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
    optionsBox.innerHTML = `
        <p>${ending}</p>
        <button onclick="restartGame()">Играть заново</button>
    `;
    messageBox.innerHTML = "";
}

// === Сброс игры ===
function restartGame() {
    currentRound = 0;
    currentQuestionIndex = 0;
    correctAnswers = 0;
    totalErrors = 0;
    updateStats();

    const round = rounds[currentRound];
    questionBox.textContent = round.title;
    showQuestion();
}

// === Обновление статистики ===
function updateStats() {
    statsBox.textContent = `Правильных: ${correctAnswers} | Ошибок: ${totalErrors}`;
}

// === Старт игры ===
function startGame() {
    showScreen("game");
    questionBox.textContent = rounds[currentRound].title;
    showQuestion();
}

// === Автозагрузка ===
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu-screen");
    const resumeBtn = document.createElement("button");
    resumeBtn.textContent = "Начать игру";
    resumeBtn.onclick = () => {
        resetGame();
        showScreen("game");
        showQuestion();
    };
    menu.appendChild(resumeBtn);
});

function resetGame() {
    currentRound = 0;
    currentQuestionIndex = 0;
    correctAnswers = 0;
    totalErrors = 0;
    updateStats();
}
