const url = "https://script.google.com/macros/s/AKfycbwlGVE52j5cU7jkl8CnLM74rpP2Xx0GOfIE8uECtaBQaZILvRhCcX48BCMmyxwLawz1/exec";

let correctAnswer = "";
let questions = [];
let currentQuestionIndex = 0;
let totalQuestions = 0;
let answersGiven = [];

document.addEventListener("DOMContentLoaded", () => {
    const profileCreator = document.getElementById("profile-creator");
    const mainContent = document.getElementById("main-content");
    const profile = document.getElementById("profile");
    const questionCountSelector = document.getElementById("question-count-selector");
    const loadingScreen = document.getElementById("loading-screen");
    const quizContainer = document.getElementById("quiz-container");
    const quizResults = document.getElementById("quiz-results");
    const correctSound = document.getElementById("correct-sound");
    const incorrectSound = document.getElementById("incorrect-sound");

    const savedName = localStorage.getItem("name");
    const savedPhoto = localStorage.getItem("photo") || "imgs/default-photo.png";
    const overallCorrectCount = parseInt(localStorage.getItem("overallCertas")) || 0;
    const overallWrongCount = parseInt(localStorage.getItem("overallErradas")) || 0;
    const overallAverage = calculateOverallAverage(overallCorrectCount, overallWrongCount);
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

    if (savedName) {
        profileCreator.style.display = "none";
        mainContent.style.display = "flex";
        profile.style.display = "block";
        document.getElementById("profile-name").textContent = savedName;
        document.getElementById("overall-correct-score").textContent = `Total de respostas corretas: ${overallCorrectCount}`;
        document.getElementById("overall-wrong-score").textContent = `Total de respostas erradas: ${overallWrongCount}`;
        document.getElementById("overall-average").textContent = `Indíce de Bom Caloiro: ${overallAverage}%`;
        document.getElementById("profile-photo").src = savedPhoto;
        displayQuizHistory(quizHistory);
        questionCountSelector.style.display = "block";
    } else {
        profileCreator.style.display = "block";
    }

    document.getElementById("profile-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const photoInput = document.getElementById("photo");
        const reader = new FileReader();

        if (photoInput.files.length > 0) {
            reader.onload = function (e) {
                const photoDataUrl = e.target.result;
                localStorage.setItem("name", name);
                localStorage.setItem("photo", photoDataUrl);
                profileCreator.style.display = "none";
                mainContent.style.display = "flex";
                profile.style.display = "block";
                document.getElementById("profile-name").textContent = name;
                document.getElementById("profile-photo").src = photoDataUrl;
                document.getElementById("overall-correct-score").textContent = `Total de respostas corretas: ${overallCorrectCount}`;
                document.getElementById("overall-wrong-score").textContent = `Total de respostas erradas: ${overallWrongCount}`;
                document.getElementById("overall-average").textContent = `Indíce de Bom Caloiro: ${overallAverage}%`;
                displayQuizHistory(quizHistory);
                questionCountSelector.style.display = "block";
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            localStorage.setItem("name", name);
            localStorage.setItem("photo", "imgs/default-photo.png");
            profileCreator.style.display = "none";
            mainContent.style.display = "flex";
            profile.style.display = "block";
            document.getElementById("profile-name").textContent = name;
            document.getElementById("profile-photo").src = "imgs/default-photo.png";
            document.getElementById("overall-correct-score").textContent = `Total de respostas corretas: ${overallCorrectCount}`;
            document.getElementById("overall-wrong-score").textContent = `Total de respostas erradas: ${overallWrongCount}`;
            document.getElementById("overall-average").textContent = `Indíce de Bom Caloiro: ${overallAverage}%`;
            displayQuizHistory(quizHistory);
            questionCountSelector.style.display = "block";
        }
    });

    document.querySelectorAll(".question-count").forEach(button => {
        button.addEventListener("click", () => {
            totalQuestions = parseInt(button.getAttribute("data-count"));
            questionCountSelector.style.display = "none";
            loadingScreen.classList.remove("hidden");
            loadingScreen.style.display = "flex";
            loadQuiz();
        });
    });

    document.getElementById("restart-quiz").addEventListener("click", () => {
        quizResults.style.display = "none";
        questionCountSelector.style.display = "block";
        currentQuestionIndex = 0;
        localStorage.setItem("certas", 0);
        localStorage.setItem("erradas", 0);
        answersGiven = [];
        location.reload();
        updatePercentage();
        updateProgressBar(); // Atualize a barra de progresso ao reiniciar o quiz
    });

    document.getElementById("submit-answer").addEventListener("click", () => {
        console.log("Submit answer clicked");
        const selectedAnswer = document.querySelector("#answers li.selected");

        if (selectedAnswer) {
            console.log("Selected answer:", selectedAnswer.textContent);
            answersGiven[currentQuestionIndex] = selectedAnswer.textContent;
            if (selectedAnswer.textContent === correctAnswer) {
                updateLocalStorage("certas");
                updateOverallLocalStorage("overallCertas");
                correctSound.play(); // Tocar som de resposta correta
            } else {
                updateLocalStorage("erradas");
                updateOverallLocalStorage("overallErradas");
                incorrectSound.play(); // Tocar som de resposta incorreta
            }

            currentQuestionIndex++;
            document.getElementById("submit-answer").disabled = true;
            displayQuestion();
            updatePercentage();
            updateProgressBar(); // Atualize a barra de progresso ao enviar uma resposta
        } else {
            console.log("No answer selected");
        }
    });

    document.getElementById("previous-question").addEventListener("click", () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });
});

function loadQuiz() {
    console.log("Loading quiz...");
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data loaded:", data);
            if (!Array.isArray(data) || data.length < 2) {
                throw new Error("Invalid data format");
            }
            // Assuming first row is headers and subsequent rows have questions and answers
            questions = data.slice(1).map(row => ({
                question: row[0],
                answers: row.slice(1),
                correct: row[1] // Assuming the first answer is the correct one
            }));

            // Shuffle the questions array
            questions = shuffle(questions).slice(0, totalQuestions);

            // Hide the loading screen immediately
            const loadingScreen = document.getElementById("loading-screen");
            loadingScreen.style.display = "none";
            const quizContainer = document.getElementById("quiz-container");
            quizContainer.style.display = "block";
            console.log("Quiz container displayed");

            displayQuestion();
            updatePercentage();
            updateProgressBar(); // Atualize a barra de progresso ao carregar o quiz
        })
        .catch(error => {
            console.error("Erro ao carregar os dados:", error);
            document.getElementById("question").textContent = "Erro ao carregar a pergunta.";
        });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayQuestion() {
    console.log("Displaying question:", currentQuestionIndex);
    const questionElement = document.getElementById("question");
    const answersList = document.getElementById("answers");
    const resultElement = document.getElementById("result");
    resultElement.textContent = "";

    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    correctAnswer = currentQuestion.correct;

    questionElement.textContent = currentQuestion.question;
    const shuffledAnswers = shuffle([...currentQuestion.answers]);
    answersList.innerHTML = shuffledAnswers.map(ans => `<li>${ans}</li>`).join("");

    const answerItems = document.querySelectorAll("#answers li");
    answerItems.forEach(item => {
        item.addEventListener("click", () => {
            answerItems.forEach(i => i.classList.remove("selected"));
            item.classList.add("selected");
            document.getElementById("submit-answer").disabled = false;
        });
    });

    // Selecionar a resposta previamente dada, se houver
    if (answersGiven[currentQuestionIndex]) {
        const previousAnswer = answersGiven[currentQuestionIndex];
        answerItems.forEach(item => {
            if (item.textContent === previousAnswer) {
                item.classList.add("selected");
                document.getElementById("submit-answer").disabled = false;
            }
        });
    }

    // Mostrar ou esconder o botão "Voltar"
    document.getElementById("previous-question").style.display = currentQuestionIndex > 0 ? "block" : "none";

    updateProgressBar(); // Atualize a barra de progresso ao exibir uma nova pergunta
}

function updateLocalStorage(key) {
    let count = localStorage.getItem(key);
    count = count ? parseInt(count) + 1 : 1;
    localStorage.setItem(key, count);
}

function updateOverallLocalStorage(key) {
    let count = localStorage.getItem(key);
    count = count ? parseInt(count) + 1 : 1;
    localStorage.setItem(key, count);
}

function updatePercentage() {
    const correctCount = parseInt(localStorage.getItem("certas")) || 0;
    const wrongCount = parseInt(localStorage.getItem("erradas")) || 0;
    const total = correctCount + wrongCount;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    document.querySelector(".number").textContent = `${percentage}%`;
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        console.log(`Updating progress bar: ${progress}%`); // Debugging log
        progressBar.style.width = `${progress}%`;
    } else {
        console.error("Progress bar element not found");
    }
}

function showResults() {
    const quizContainer = document.getElementById("quiz-container");
    const quizResults = document.getElementById("quiz-results");
    const correctCount = parseInt(localStorage.getItem("certas")) || 0;
    const wrongCount = parseInt(localStorage.getItem("erradas")) || 0;
    const overallCorrectCount = parseInt(localStorage.getItem("overallCertas")) || 0;
    const overallWrongCount = parseInt(localStorage.getItem("overallErradas")) || 0;
    const overallAverage = calculateOverallAverage(overallCorrectCount, overallWrongCount);
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

    quizHistory.push({
        correctCount,
        wrongCount,
        date: new Date().toLocaleString()
    });
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));

    quizContainer.style.display = "none";
    quizResults.style.display = "block";
    document.getElementById("correct-count").textContent = `Respostas corretas: ${correctCount}`;
    document.getElementById("wrong-count").textContent = `Respostas erradas: ${wrongCount}`;
    document.getElementById("overall-correct-count").textContent = `Total de respostas corretas: ${overallCorrectCount}`;
    document.getElementById("overall-wrong-count").textContent = `Total de respostas erradas: ${overallWrongCount}`;
    document.getElementById("overall-average").textContent = `Indíce de Bom Caloiro: ${overallAverage}%`;
    displayQuizHistory(quizHistory);
}

function calculateOverallAverage(correctCount, wrongCount) {
    const total = correctCount + wrongCount;
    return total > 0 ? Math.round((correctCount / total) * 100) : 0;
}

function displayQuizHistory(quizHistory) {
    const quizHistoryList = document.getElementById("quiz-history-list");
    quizHistoryList.innerHTML = "";
    quizHistory.forEach(quiz => {
        const listItem = document.createElement("li");
        listItem.textContent = `Data: ${quiz.date}, Corretas: ${quiz.correctCount}, Erradas: ${quiz.wrongCount}`;
        quizHistoryList.appendChild(listItem);
    });
    const overallCorrectCount = parseInt(localStorage.getItem("overallCertas")) || 0;
    const overallWrongCount = parseInt(localStorage.getItem("overallErradas")) || 0;
    const overallAverage = calculateOverallAverage(overallCorrectCount, overallWrongCount);
}