const url = "https://script.google.com/macros/s/AKfycbwlGVE52j5cU7jkl8CnLM74rpP2Xx0GOfIE8uECtaBQaZILvRhCcX48BCMmyxwLawz1/exec";

let correctAnswer = "";
let questions = [];
let currentQuestionIndex = 0;
let totalQuestions = 0;
let answersGiven = [];
let selectedTheme = "geral";
let backgroundMusic;

console.log("               FEITO POR CALOIROS DE TDM 2024/2025");
const asciiArt = `
                     ▗▄▄▙▟████████▟▄▙▄▄                     
                  ▄▟████▀▀▀▀▀▀▀▀▀▀▀▀▀▜███▙▄▖                
               ▗▟██▛▀                   ▀▀███▖              
              ▐██▀          ▄▟█▄ ▜█▄▄        ▀▜█▙▖            
             ▟█▛        ▗██████ ▜███▄        ▜██            
            ▟█▛        ▟██████▀ ▖ ▀███        ▝█▙▖          
           ▗██        ▗█████▀ ▄███▙▗▝▜▙        ▜█▖          
           ▐█▌ ▄█▖    ▐████▘▗▟██████▙▖▚     ▟▙▖ ██          
           ▜█ ▐█▛     ▐██▛▘▄██████████▖     ▝██▝▜█          
           ▟█ ▐█▌      ██▘▗███████████▖     ▐██ ▟█          
           ▟█▌▝██      ▝▙▗███████████▀      ▄█▛ ██          
           ▐█▙ ▜█▌       ▐███████▛▙▛▘      ▗██▘▗█▛          
            ██▖▐█▙  ▗▄▄▖   ▀▀▛▛▛▀▀   ▗▄▄▗  ▗██ ▟█▘          
            ▝██▄█▛ ▐█████▙▄       ▗▄█████▙  ██▟█▘           
             ▝███▌ ▐████████▙   ▗█████████ ▝███▀            
     ▗▗        ██▘ █████████▙   ▐█████▜▟█▟▌ ██▖      ▖▄▗    
    ▗████▄     ██  ▜███████▀     ▘▜███████  ▐█▙    ▗████▙   
    ██▖▝██▖    █▌   ▀▀▀▀▀▘   ▟▖█▖   ▝▀▀▀▀▘  ▗█▙   ▗█▛▘ ▜█▘  
   ▐█▛  ▝▜█▄   ██▖          ▟█ ▟█▖          ██▌ ▗▄██▀  ▐█▌  
  ▟█▛▘    ▝▜█▙▄▟█▙▄        ▐██▘██▛        ▄▟█▟▙███▀     ▀██▖
 ▐█▌  ▗▄▄    ▀▜██████▙▄    ▐██▘▜█▛    ▗▟██████▀▀    ▄▄▄  ▗██
 ▝▜█████▜█▙▄▖   ▝▀▜█████▖  ▝▛▀  ▜▀   ▟██▜█▛▀    ▗▄▟██▟█████▀
         ▝▀███▄▄   █▙▜███           ▟██▛▟█▌  ▗▄██▛▛▘        
             ▀▀██▙▄▟█▖█▜▛▙▄▄▄▄▄▄▄▄▄▄▀██▐██▄▟██▛▀            
                ▝▀▜██▘▐█▙▟ █▐▘▜ █▐▘▜▗██▚█▜▛▀                
                  ▗██▖▐█▌▜▚█▟▙█▄█▟▌█▘██ ██▖                 
               ▄▟████▌ ▀▚█ █▐▖▟ █▐▖▜▄▛▘▝██▜█▙▄▖             
      ▄▄▄▄▄▄▄▙██▀▘  ▜█   ▝▀▀▞▌▛▀▛▀▀▘   ██▌  ▀▜██▙▄▗▗▄▄▖     
     ▟█▀▜▛█▜▜▀▘   ▗▄███▖             ▗▟██▄▄    ▘▀█▜█▀▜██▖   
     ▜█▙       ▄▟██▛▀▝▜██▄▄       ▗▄▟█▛▘▀▜██▙▄▖      ▄▟█▘   
      ▜██▄   ▟██▀▘     ▝▀███████████▀▀     ▝▜██▙▖   ██▛▘    
       ▝██  ▟█▌            ▘▘▀▀▘▀▝            ▝▜█▌  █▌      
       ▝█▙▄▟█▛                                  ██▄▟█▙      
        ▀██▛▘                                    ▀███       `;

console.log(asciiArt);
console.log("               Renato Sobral pv28267");
console.log("               Alexandre Nogueira pv30210");
console.log("               Miguel Cruz pv30227");
console.log("               Ana Caló pv30249");
console.log("               Diana Santos pv30233");
console.log("               Gabriel Santos pv31352");
console.log("               Daniel Pereira pv30229");
console.log("               Simbell Quadros pv30252");
console.log("               Rodrigo Albuquerque pv30224");
console.log("               Gabriela Ferreira pv30219");
console.log("               Dinis Alves pv28377");

const musicFiles = [
    "sounds/musica/EstudantedeViseu.mp3",
    "sounds/musica/ViseuGraciosa.mp3",
    "sounds/musica/CaravelasMeninadaSaiaPreta.mp3",
    "sounds/musica/AmorVadio.mp3",
    "sounds/musica/BaladadoPadeiro.mp3"
];

function playRandomMusic() {
    const backgroundMusic = document.getElementById("background-music");
    const randomIndex = Math.floor(Math.random() * musicFiles.length);
    backgroundMusic.src = musicFiles[randomIndex];

    // When one song ends, play another random one
    backgroundMusic.onended = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * musicFiles.length);
        } while (newIndex === randomIndex && musicFiles.length > 1); // Avoid playing same song twice in a row
        backgroundMusic.src = musicFiles[newIndex];
        backgroundMusic.play();
    };
}

function calculateThemePerformance() {
    // Get theme stats from localStorage
    const themeStats = JSON.parse(localStorage.getItem('themeStats') || '{}');
    
    // Calculate error rate for each theme
    const themePerformance = Object.entries(themeStats)
        .map(([theme, stats]) => {
            const total = stats.correct + stats.wrong;
            if (total === 0) return null;

            // Calculate error rate (percentage of wrong answers)
            const errorRate = (stats.wrong / total) * 100;
            return {
                theme,
                errorRate,
                total,
                wrong: stats.wrong,
                correct: stats.correct
            };
        })
        .filter(item => item !== null) // Remove themes with no attempts
        .sort((a, b) => {
            // First sort by number of wrong answers
            if (b.wrong !== a.wrong) {
                return b.wrong - a.wrong;
            }
            // Then by error rate if wrong answers are equal
            return b.errorRate - a.errorRate;
        });

    return themePerformance;
}

function organizeThemes() {
    const themePerformance = calculateThemePerformance();
    const recommendedThemesDiv = document.querySelector('.recommended-themes');
    const specialThemesDiv = document.querySelector('.special-themes');
    const otherThemesDiv = document.querySelector('.other-themes');
    
    
    // Clear existing buttons
    recommendedThemesDiv.innerHTML = '';
    specialThemesDiv.innerHTML = '';
    otherThemesDiv.innerHTML = '';

    // Calculate wrong answers count
    const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const wrongAnswersTracking = new Map(); // Track wrong and correct answers
    
    quizHistory.forEach(quiz => {
        if (quiz.answers) {
            quiz.answers.forEach(answer => {
                const questionId = answer.questionId;
                if (!wrongAnswersTracking.has(questionId)) {
                    wrongAnswersTracking.set(questionId, answer.isCorrect);
                } else if (answer.isCorrect) {
                    // If question was answered correctly, update tracking
                    wrongAnswersTracking.set(questionId, true);
                }
            });
        }
    });

    // Count questions that were answered wrong and never correctly
    const uncorrectedWrongCount = Array.from(wrongAnswersTracking.values())
    .filter(isCorrect => !isCorrect).length;



    // Get the themes with most wrong answers (excluding 'geral')
    const recommendedThemes = ['geral']; // Always include 'geral'
    
    // Add the top 3 themes with most wrong answers
    themePerformance
        .filter(t => t.theme !== 'geral')
        .slice(0, 3)
        .forEach(t => recommendedThemes.push(t.theme));
    
    // Special quizzes themes
    const specialThemes = [];
    
    // Add "Perguntas Erradas" button only if there are wrong questions
    if (uncorrectedWrongCount > 0) {
        specialThemes.push({ 
            id: 'erradas', 
            name: `❌ Perguntas Erradas (${uncorrectedWrongCount})` 
        });
    }

    // Always add "Perguntas Novas" button
    specialThemes.push({ 
        id: 'novas', 
        name: '📝 Perguntas Novas' 
    });

    // Regular themes
    const allThemes = [
        { id: 'geral', name: 'Quiz Geral' },
        { id: 'ruas', name: 'Ruas' },
        { id: 'hierarquia', name: 'Hierarquia' },
        { id: 'trajes', name: 'Trajes' },
        { id: 'cv', name: 'IPV e Conselho Viriato' },
        { id: 'hostes', name: 'Hostes' },
        { id: 'horas', name: 'Horas' },
        { id: 'protecoes', name: 'Proteções' },
        { id: 'insignias', name: 'Insígnias' }
    ];

    // Add special quizzes buttons
    specialThemes.forEach(theme => {
        const button = document.createElement('button');
        button.className = 'theme-button';
        button.setAttribute('data-theme', theme.id);
        button.textContent = theme.name;
        specialThemesDiv.appendChild(button);
    });

    // Organize regular themes
    allThemes.forEach(theme => {
        const button = document.createElement('button');
        button.className = 'theme-button';
        button.setAttribute('data-theme', theme.id);
        button.textContent = theme.name;

        if (theme.id === selectedTheme) {
            button.classList.add('selected');
        }

        if (recommendedThemes.includes(theme.id)) {
            recommendedThemesDiv.appendChild(button);
        } else {
            otherThemesDiv.appendChild(button);
        }
    });

    // Add click event listeners
    document.querySelectorAll('.theme-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.theme-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
            selectedTheme = button.getAttribute('data-theme');
        });
    });
}

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
    const toggleMusicButton = document.getElementById("toggle-music");
    const musicIcon = document.getElementById("music-icon");
    const savedName = localStorage.getItem("name");
    const savedPhoto = localStorage.getItem("photo") || "imgs/standart.png";
    const overallCorrectCount = parseInt(localStorage.getItem("overallCertas")) || 0;
    const overallWrongCount = parseInt(localStorage.getItem("overallErradas")) || 0;
    const overallAverage = calculateOverallAverage(overallCorrectCount, overallWrongCount);
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    const isMusicMuted = localStorage.getItem("musicMuted") !== "true";
    const importBtn = document.getElementById('import-data');
    const importFile = document.getElementById('import-file');
    const importBtnManagement = document.getElementById('import-data-management');
    const importFileManagement = document.getElementById('import-file-management');
    const toggleMusicMobile = document.getElementById("toggle-music-mobile");
    const musicIconMobile = document.getElementById("music-icon-mobile");


    backgroundMusic = document.getElementById("background-music");
    backgroundMusic.muted = isMusicMuted;
    musicIcon.textContent = isMusicMuted ? "🔇" : "🔊";
    playRandomMusic(); // Initialize with random music

    if (savedName) {
        profileCreator.style.display = "none";
        mainContent.style.display = "flex";
        profile.style.display = "block";
        document.getElementById("profile-name").textContent = savedName;
        document.getElementById("overall-correct-score").textContent = overallCorrectCount;
        document.getElementById("overall-wrong-score").textContent = overallWrongCount;
        document.getElementById("overall-average").textContent = `${overallAverage}%`;
        document.getElementById("overall-tests-count").textContent = quizHistory.length;
        document.getElementById("profile-photo").src = savedPhoto;
        displayQuizHistory(quizHistory);
        questionCountSelector.style.display = "block";
    } else {
        profileCreator.style.display = "block";
    }

    document.querySelector('.profile-photo').addEventListener('click', () => {
        const profileCreator = document.getElementById('profile-creator');
        const mainContent = document.getElementById('main-content');
        
        // Show profile creator and hide main content
        profileCreator.style.display = 'block';
        mainContent.style.display = 'none';
        
        // Pre-fill existing data
        const name = document.getElementById('profile-name').textContent;
        document.getElementById('name').value = name;
        
        // Pre-fill photo if exists
        const currentPhoto = document.getElementById('profile-photo').src;
        document.getElementById('photo-preview').src = currentPhoto;
    });


    // Handle import functionality
    function handleImport(fileInput) {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);

                    // Validate data structure
                    const requiredKeys = ['name', 'photo', 'overallCertas', 'overallErradas', 'quizHistory'];
                    if (!requiredKeys.every(key => key in data)) {
                        throw new Error('Formato de dados inválido');
                    }

                    // Import data to localStorage
                    for (const [key, value] of Object.entries(data)) {
                        if (typeof value === 'object') {
                            localStorage.setItem(key, JSON.stringify(value));
                        } else {
                            localStorage.setItem(key, value);
                        }
                    }

                    alert('Dados importados com sucesso! A página será recarregada.');
                    window.location.reload();
                } catch (error) {
                    console.error('Erro ao importar:', error);
                    alert('Erro ao importar dados. Verifique se o arquivo é válido.');
                }
            };
            reader.readAsText(file);
        }
    }

    if (importBtn && importFile) {
        importBtn.addEventListener('click', () => {
            importFile.click();
        });
        importFile.addEventListener('change', (event) => {
            handleImport(event.target);
        });
    }

    if (importBtnManagement && importFileManagement) {
        importBtnManagement.addEventListener('click', () => {
            importFileManagement.click();
        });
        importFileManagement.addEventListener('change', (event) => {
            handleImport(event.target);
        });
    }

    // Mobile navigation
    const mobileNav = document.getElementById("mobile-nav");
    const showProfileButton = document.getElementById("show-profile");
    const showQuizButton = document.getElementById("show-quiz");
    const quizSection = document.getElementById("question-count-selector");

    function showProfile() {
        // Hide all sections first
        profile.classList.remove("active");
        quizSection.classList.remove("active");
        quizContainer.classList.remove("active");

        // Show profile
        profile.classList.add("active");

        // Update button styles
        showProfileButton.style.backgroundColor = "#682145";
        showQuizButton.style.backgroundColor = "rgb(65 65 65 / 28%)";
    }

    function showQuiz() {
        // Hide all sections first
        profile.classList.remove("active");
        quizSection.classList.remove("active");
        quizContainer.classList.remove("active");

        // Show appropriate quiz section
        if (!quizContainer.style.display || quizContainer.style.display === "none") {
            quizSection.classList.add("active");
        } else {
            quizContainer.classList.add("active");
        }

        // Update button styles
        showProfileButton.style.backgroundColor = "rgb(65 65 65 / 28%)";
        showQuizButton.style.backgroundColor = "#682145";
    }

    // Initialize mobile navigation
    if (window.innerWidth <= 700) {
        mobileNav.style.display = "flex";
        showProfile(); // Show profile by default
    }

    // Add event listeners for mobile navigation
    if (showProfileButton && showQuizButton) {
        showProfileButton.addEventListener("click", showProfile);
        showQuizButton.addEventListener("click", showQuiz);
    }

// Sync initial state with main music button
musicIconMobile.textContent = musicIcon.textContent;

// Check localStorage for music mute state and set initial icon
musicIconMobile.textContent = isMusicMuted ? "🔇" : "🔊";


// Add click handler for mobile music toggle
toggleMusicMobile.addEventListener("click", () => {
    if (backgroundMusic.muted) {
        backgroundMusic.muted = false;
        backgroundMusic.play();
        musicIcon.textContent = "🔊";
        musicIconMobile.textContent = "🔊";
        localStorage.setItem("musicMuted", "false");
    } else {
        backgroundMusic.muted = true;
        musicIcon.textContent = "🔇";
        musicIconMobile.textContent = "🔇";
        localStorage.setItem("musicMuted", "true");
    }
});


    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth <= 700) {
            mobileNav.style.display = "flex";
            if (!profile.classList.contains("active") &&
                !quizSection.classList.contains("active") &&
                !quizContainer.classList.contains("active")) {
                showProfile(); // Default to profile if nothing is active
            }
        } else {
            mobileNav.style.display = "none";
            // Reset displays for desktop view
            profile.style.display = "block";
            profile.classList.remove("active");
            quizSection.classList.remove("active");
            quizContainer.classList.remove("active");
        }
    });

    document.getElementById("cancel-quiz").addEventListener("click", () => {
        if (confirm("Tem certeza que deseja cancelar? Todas as perguntas não respondidas serão contadas como erradas.")) {
            // Count remaining questions as wrong
            const remainingQuestions = totalQuestions - currentQuestionIndex;
            const currentWrong = parseInt(localStorage.getItem("erradas")) || 0;
            localStorage.setItem("erradas", currentWrong + remainingQuestions);
            
            // Update overall wrong count
            const overallWrong = parseInt(localStorage.getItem("overallErradas")) || 0;
            localStorage.setItem("overallErradas", overallWrong + remainingQuestions);
    
            // Mark quiz as cancelled in history
            const quizData = {
                theme: selectedTheme || 'geral',
                totalQuestions: totalQuestions,
                correctCount: parseInt(localStorage.getItem("certas")) || 0,
                wrongCount: parseInt(localStorage.getItem("erradas")) || 0,
                date: new Date().toISOString(),
                cancelled: true, // Add this flag
                answers: questions.map((q, index) => ({
                    questionId: q.id,
                    isCorrect: index < currentQuestionIndex ? answersGiven[index] === q.correct : false,
                    userAnswer: index < currentQuestionIndex ? answersGiven[index] : null,
                    correctAnswer: q.correct
                }))
            };
    
            // Add to quiz history
            const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
            quizHistory.push(quizData);
            localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
    
            // Show results
            showResults();
            window.location.reload();
        }
    });


    toggleMusicButton.addEventListener("click", () => {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false;
            backgroundMusic.play();
            musicIcon.textContent = "🔊";
            localStorage.setItem("musicMuted", "false"); // Save preference
        } else {
            backgroundMusic.muted = true;
            musicIcon.textContent = "🔇";
            localStorage.setItem("musicMuted", "true"); // Save preference
        }
    });
    // Modificar a função showResults para parar a música
    function showResults() {
        const quizContainer = document.getElementById("quiz-container");
        const quizResults = document.getElementById("quiz-results");

        // Keep mobile navigation visible if on mobile
        const mobileNav = document.getElementById("mobile-nav");
        if (mobileNav && window.innerWidth <= 700) {
        mobileNav.style.display = "flex";
    }

        quizContainer.style.display = "none";
        quizResults.style.display = "block";

        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        document.getElementById("music-icon").textContent = "🔇";
        document.getElementById("music-icon-mobile").textContent = "🔇";

    }

    function getFormattedName(title, name) {
        switch (title) {
            case 'grao-viriato':
                return `Exc. ${name}`;
            case 'viriato':
                return `Exc. ${name}`;
            case 'sertorio':
                return `Exc. ${name}`;
            case 'illustre':
                return `Illustre ${name}`;
            case 'infante':
                return name;
            case 'professional':
                return `Dr/Eng/Enf ${name}`;
            case 'caloiro':
                return `Caloiro ${name}`;
            default:
                return name;
        }
    }

    document.getElementById('photo').addEventListener('change', function (e) {
        const file = e.target.files[0];
        const preview = document.getElementById('photo-preview');
        const fileInfo = this.closest('.file-input-group').querySelector('.file-info');

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
                fileInfo.textContent = file.name;
            }

            reader.readAsDataURL(file);
        } else {
            preview.src = 'imgs/standart.png';
            fileInfo.textContent = 'Nenhum ficheiro selecionado';
        }
    });


    document.getElementById("profile-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const name = document.getElementById("name").value;
        const photoInput = document.getElementById("photo");
        const reader = new FileReader();

        // Validate form
        if (!title || !name.trim()) {
            alert("Por favor preencha todos os campos");
            return;
        }

        const handleProfileUpdate = (photoDataUrl) => {
            // Format name based on title
            const formattedName = getFormattedName(title, name);

            // Save to localStorage
            localStorage.setItem("name", formattedName);
            localStorage.setItem("photo", photoDataUrl);

            // Initialize stats if not exists
            if (!localStorage.getItem("overallCertas")) localStorage.setItem("overallCertas", "0");
            if (!localStorage.getItem("overallErradas")) localStorage.setItem("overallErradas", "0");
            if (!localStorage.getItem("quizHistory")) localStorage.setItem("quizHistory", "[]");

            // Update UI visibility
            document.getElementById("profile-creator").style.display = "none";
            document.getElementById("main-content").style.display = "flex";
            document.getElementById("profile").style.display = "block";
            document.getElementById("question-count-selector").style.display = "block";

            // Update profile display
            document.getElementById("profile-name").textContent = formattedName;
            document.getElementById("profile-photo").src = photoDataUrl;

            // Update stats display
            const overallCorrectCount = localStorage.getItem("overallCertas") || "0";
            const overallWrongCount = localStorage.getItem("overallErradas") || "0";
            const overallAverage = calculateOverallAverage(
                parseInt(overallCorrectCount),
                parseInt(overallWrongCount)
            );

            document.getElementById("overall-correct-score").textContent = overallCorrectCount;
            document.getElementById("overall-wrong-score").textContent = overallWrongCount;
            document.getElementById("overall-average").textContent = `${overallAverage}%`;

            // Display quiz history
            const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
            document.getElementById("overall-tests-count").textContent = quizHistory.length;
            displayQuizHistory(quizHistory);
        };

        // Handle photo upload
        if (photoInput.files.length > 0) {
            reader.onload = (e) => handleProfileUpdate(e.target.result);
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            // Use default photo
            handleProfileUpdate("imgs/standart.png");
        }

    });

    organizeThemes();


    // Adicionar eventos aos botões de tema
    document.querySelectorAll(".theme-button").forEach(button => {
        button.addEventListener("click", () => {
            // Remover seleção anterior
            document.querySelectorAll(".theme-button").forEach(btn => {
                btn.classList.remove("selected");
            });
            // Adicionar seleção ao botão clicado
            button.classList.add("selected");
            selectedTheme = button.getAttribute("data-theme");
        });
    });

    document.getElementById('export-data').addEventListener('click', () => {
        const profileName = localStorage.getItem('name') || 'Utilizador';
        // Clean the profile name to make it safe for filenames
        const safeProfileName = profileName
            .replace(/[^a-zA-Z0-9]/g, '_') // Replace special characters with underscore
            .replace(/_+/g, '_') // Replace multiple underscores with single one
            .trim();
    
        const data = {
            name: localStorage.getItem('name'),
            photo: localStorage.getItem('photo'),
            overallCertas: localStorage.getItem('overallCertas'),
            overallErradas: localStorage.getItem('overallErradas'),
            musicMuted: localStorage.getItem('musicMuted'),
            quizHistory: JSON.parse(localStorage.getItem('quizHistory') || '[]')
        };
    
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${safeProfileName} - Perfil Bom Caloiro.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    document.getElementById('import-data').addEventListener('click', () => {
        document.getElementById('import-file').click();
    });

    document.getElementById('import-file').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);

                    // Validate data structure
                    const requiredKeys = ['name', 'photo', 'overallCertas', 'overallErradas', 'quizHistory'];
                    if (!requiredKeys.every(key => key in data)) {
                        throw new Error('Formato de dados inválido');
                    }

                    // Import data to localStorage
                    for (const [key, value] of Object.entries(data)) {
                        if (typeof value === 'object') {
                            localStorage.setItem(key, JSON.stringify(value));
                        } else {
                            localStorage.setItem(key, value);
                        }
                    }

                    alert('Dados importados com sucesso! A página será recarregada.');
                    window.location.reload();
                } catch (error) {
                    console.error('Erro ao importar:', error);
                    alert('Erro ao importar dados. Verifique se o arquivo é válido.');
                }
            };
            reader.readAsText(file);
        }
    });

    document.getElementById('clear-data').addEventListener('click', () => {
        if (confirm('Tem certeza que deseja apagar todos os dados? Não será possível voltar atás (só se guardou o ficheiro).')) {
            localStorage.clear();
            alert('Dados apagados com sucesso! A página será recarregada.');
            window.location.reload();
        }
    });

    function getShareTitle(name) {
        const fullName = name || 'Utilizador';
        // Don't show "Caloiro" title for non-caloiros when sharing
        return fullName.startsWith('Caloiro ') ? fullName : fullName.replace(/^(Excelentíssimo |Illustre |Dr\/Eng\/Enf )/, '');
    }

    document.getElementById('share-stats').addEventListener('click', async () => {
        const canvas = document.getElementById('shareCanvas');
        const ctx = canvas.getContext('2d');
    
        canvas.width = 1200;
        canvas.height = 800;
    
        const backgroundImage = new Image();
        backgroundImage.src = 'imgs/share-bg.jpg';
    
        backgroundImage.onload = async () => {
            // Clear canvas
            ctx.fillStyle = '#682145';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
    
            // Draw background with overlay
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(104, 33, 69, 0.8)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
    
            // Load profile photo
            const profilePhoto = document.getElementById('profile-photo');
            const profilePhotoSize = 150; // Increased size
            
            // Center the profile photo horizontally and position it higher
            const photoX = canvas.width/2;
            const photoY = 200; // Adjusted position
            
            // Draw profile photo in a circle
            ctx.save();
            ctx.beginPath();
            ctx.arc(photoX, photoY, profilePhotoSize/2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
    
            await new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 
                        photoX - profilePhotoSize/2, 
                        photoY - profilePhotoSize/2, 
                        profilePhotoSize, 
                        profilePhotoSize
                    );
                    resolve();
                };
                img.onerror = reject;
                img.src = profilePhoto.src;
            });
            ctx.restore();
    
            // Text settings
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
    
            // Draw title
            ctx.font = 'bold 60px Montserrat';
            ctx.fillText('BoaPraxe - Estatísticas', canvas.width / 2, 70);
    
            // Get user stats with modified name display
            const name = getShareTitle(localStorage.getItem('name'));
            const correctCount = localStorage.getItem('overallCertas') || '0';
            const wrongCount = localStorage.getItem('overallErradas') || '0';
            const average = calculateOverallAverage(parseInt(correctCount), parseInt(wrongCount));
            const testsCount = JSON.parse(localStorage.getItem('quizHistory') || '[]').length;
    
            // Draw name below photo
            ctx.font = '40px Montserrat';
            ctx.fillText(name, canvas.width / 2, photoY + profilePhotoSize/2 + 50);
    
            // Center and space out the stats vertically
            const startY = photoY + profilePhotoSize/2 + 150; // Start stats below name
            const lineSpacing = 80; // Increased spacing between lines
    
            ctx.font = '36px Montserrat';
            ctx.fillText(`✅ Respostas Corretas: ${correctCount}`, canvas.width / 2, startY);
            ctx.fillText(`❌ Respostas Erradas: ${wrongCount}`, canvas.width / 2, startY + lineSpacing);
            ctx.fillText(`🎓 Índice de Bom Caloiro: ${average}%`, canvas.width / 2, startY + lineSpacing * 2);
            ctx.fillText(`📝 Testes Realizados: ${testsCount}`, canvas.width / 2, startY + lineSpacing * 3);
    
            // Add timestamp at bottom
            const currentDate = new Date().toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            ctx.font = '24px Montserrat';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillText(`Gerado em ${currentDate}`, canvas.width / 2, canvas.height - 40);
    
            // Share functionality remains the same
            try {
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    
                if (navigator.share) {
                    const file = new File([blob], 'boapraxe-stats.png', { type: 'image/png' });
                    await navigator.share({
                        files: [file],
                        title: 'Minhas Estatísticas BoaPraxe',
                        text: `Estatísticas na BoaPraxe:\n✅ ${correctCount}\n❌ ${wrongCount}\n🎓 ${average}%\n📝 ${testsCount} testes`
                    });
                } else {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'boapraxe-stats.png';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }
            } catch (error) {
                console.error('Error sharing stats:', error);
                alert('Erro ao partilhar estatísticas. Tente novamente.');
            }
        };
    
        backgroundImage.onerror = () => {
            console.error('Error loading background image');
            alert('Erro ao carregar imagem de fundo.');
        };
    });



    // Modificar o evento de clique nos botões de contagem
    document.querySelectorAll(".question-count").forEach(button => {
        button.addEventListener("click", () => {
            if (!selectedTheme) {
                alert("Por favor, selecione um tema primeiro!");
                return;
            }
            totalQuestions = parseInt(button.getAttribute("data-count"));
            questionCountSelector.style.display = "none";
            loadingScreen.classList.remove("hidden");
            loadingScreen.style.display = "flex";

            // Hide mobile navigation when quiz starts
            const mobileNav = document.getElementById("mobile-nav");
            if (mobileNav) {
                mobileNav.style.display = "none";
            }

            // Remove active class from all sections
            profile.classList.remove("active");
            quizSection.classList.remove("active");
            quizContainer.classList.remove("active");

            // Add active class to quiz container
            quizContainer.classList.add("active");

            // Initialize music as muted by default if no preference is saved
            const isMusicMuted = localStorage.getItem("musicMuted") === null ? true : localStorage.getItem("musicMuted") === "true";
            backgroundMusic = document.getElementById("background-music");
            backgroundMusic.muted = isMusicMuted;
            musicIcon.textContent = isMusicMuted ? "🔇" : "🔊";

            document.body.classList.add('quiz-active');


            // Start quiz with random music
            backgroundMusic.volume = 0.02;
            playRandomMusic();
            backgroundMusic.play();
            loadQuiz();
            
            document.getElementById('cancel-quiz').classList.add('active');
        });
    });

    document.getElementById("restart-quiz").addEventListener("click", () => {
        const quizResults = document.getElementById("quiz-results");
        const questionCountSelector = document.getElementById("question-count-selector");
        const mobileNav = document.getElementById("mobile-nav");
        window.location.reload(true);

        // Hide results and show question selector
        quizResults.style.display = "none";
        questionCountSelector.style.display = "block";
        questionCountSelector.classList.add("active");

        // Show mobile navigation if on mobile
        if (window.innerWidth <= 700) {
            mobileNav.style.display = "flex";
        }

        // Stop background music
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }

        // Reset quiz state
        currentQuestionIndex = 0;
        localStorage.setItem("certas", 0);
        localStorage.setItem("erradas", 0);
        answersGiven = [];

        document.body.classList.remove('quiz-active');

        // Update UI
        updatePercentage();
        updateProgressBar();
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
    updateThemeStats();
});

function loadQuiz() {
    console.log("Loading quiz...");
    console.log("Selected theme:", selectedTheme);

    const loadingTimeout = setTimeout(() => {
        const loadingScreen = document.getElementById("loading-screen");
        if (loadingScreen.style.display !== "none") {
            console.error("Loading timeout - forcing quiz display");
            loadingScreen.classList.add("hidden");
            loadingScreen.style.display = "none";
            const quizContainer = document.getElementById("quiz-container");
            quizContainer.style.display = "block";
            quizContainer.classList.add("active");
        }
    }, 5000); // 5 second timeout

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Get wrong answers from history
            const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
            const wrongAnswers = new Set();
            
            // Verificar todas as respostas do histórico
            quizHistory.forEach(quiz => {
                if (quiz.answers) {
                    quiz.answers.forEach(answer => {
                        if (!answer.isCorrect) {
                            wrongAnswers.add(answer.questionId);
                        }
                    });
                }
            });

            // Map all questions
            const allQuestions = data.slice(1).map((row, index) => ({
                id: index,
                question: row[0],
                answers: row.slice(1, 5),
                correct: row[1],
                explanation: row[6],
                theme: row[5]
            }));

            let filteredQuestions;

            if (selectedTheme === 'erradas') {
                // Filter questions that were answered incorrectly
                filteredQuestions = allQuestions.filter(q => wrongAnswers.has(q.id));
                
                if (filteredQuestions.length === 0) {
                    alert("Não existem perguntas erradas no histórico!");
                    window.location.reload();
                    return;
                }
            } else if (selectedTheme === 'geral') {
                filteredQuestions = allQuestions;
            } else {
                filteredQuestions = allQuestions.filter(q => 
                    q.theme.toLowerCase() === selectedTheme.toLowerCase()
                );
            }

            if (filteredQuestions.length === 0) {
                alert(selectedTheme === 'erradas' 
                    ? "Não existem perguntas erradas no histórico!" 
                    : "Não existem questões disponíveis para este tema.");
                return;
            }

            questions = shuffle(filteredQuestions).slice(0, totalQuestions);

            // Show quiz container
            const quizContainer = document.getElementById("quiz-container");
            quizContainer.style.display = "block";

            // Hide loading screen
            const loadingScreen = document.getElementById("loading-screen");
            loadingScreen.classList.add("hidden");
            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 500);

            displayQuestion();
            updatePercentage();
            updateProgressBar();
        })
        .catch(error => {
            console.error("Erro ao carregar os dados:", error);
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

    console.log("Current question:", currentQuestion);

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

function updateThemeStats() {
    const themeStats = JSON.parse(localStorage.getItem('themeStats') || '{}');
    
    // Calculate success rate and total answers for each theme
    const themeRates = Object.entries(themeStats)
        .filter(([_, stats]) => (stats.correct + stats.wrong) > 0) // Filtrar temas sem respostas
        .map(([theme, stats]) => {
            const total = stats.correct + stats.wrong;
            const rate = total > 0 ? (stats.correct / total * 100).toFixed(1) : 0;
            return {
                theme,
                rate: parseFloat(rate),
                correct: stats.correct,
                wrong: stats.wrong,
                total: total
            };
        });

    // Find best theme (prioriza número de respostas corretas, depois taxa de acerto)
    const bestTheme = themeRates.reduce((best, current) => {
        if (current.correct > best.correct) return current;
        if (current.correct === best.correct && current.rate > best.rate) return current;
        return best;
    }, themeRates[0] || { theme: 'N/A', rate: 0, correct: 0, wrong: 0 });
    
    // Find worst theme (prioriza número de respostas erradas, depois taxa de erro)
    const worstTheme = themeRates.reduce((worst, current) => {
        if (current.wrong > worst.wrong) return current;
        if (current.wrong === worst.wrong && current.rate < worst.rate) return current;
        return worst;
    }, themeRates[0] || { theme: 'N/A', rate: 0, correct: 0, wrong: 0 });

    // Update best theme stats
    document.getElementById('best-theme').textContent = bestTheme.theme;
    document.getElementById('best-theme-rate').textContent = 
        `${bestTheme.rate}% (${bestTheme.correct}/${bestTheme.total})`;

    // Update worst theme stats
    document.getElementById('worst-theme').textContent = worstTheme.theme;
    document.getElementById('worst-theme-rate').textContent = 
        `${worstTheme.rate}% (${worstTheme.correct}/${worstTheme.total})`;
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
    const questionsReview = document.getElementById("questions-review");
    
    document.getElementById('cancel-quiz').classList.remove('active');

    const quizData = {
        theme: selectedTheme || 'geral',
        totalQuestions: totalQuestions,
        correctCount: correctCount,
        wrongCount: wrongCount,
        date: new Date().toISOString(),
        questionIds: questions.map(q => q.id),
        // Adicionar informação sobre respostas corretas/erradas
        answers: questions.map((q, index) => ({
            questionId: q.id,
            isCorrect: answersGiven[index] === q.correct,
            userAnswer: answersGiven[index],
            correctAnswer: q.correct
        }))
    };


    // Create object to store theme statistics
    const themeStats = {};

    // Count correct and wrong answers by theme
    questions.forEach((question, index) => {
        const theme = question.theme;
        const userAnswer = answersGiven[index];
        const isCorrect = userAnswer === question.correct;

        // Initialize theme stats if not exists
        if (!themeStats[theme]) {
            themeStats[theme] = {
                correct: 0,
                wrong: 0
            };
        }

        // Increment correct or wrong count
        if (isCorrect) {
            themeStats[theme].correct++;
        } else {
            themeStats[theme].wrong++;
        }
    });

    // Store theme statistics in localStorage
    const existingThemeStats = JSON.parse(localStorage.getItem('themeStats') || '{}');

    // Merge new stats with existing stats
    Object.keys(themeStats).forEach(theme => {
        if (!existingThemeStats[theme]) {
            existingThemeStats[theme] = {
                correct: 0,
                wrong: 0
            };
        }
        existingThemeStats[theme].correct += themeStats[theme].correct;
        existingThemeStats[theme].wrong += themeStats[theme].wrong;
    });

    localStorage.setItem('themeStats', JSON.stringify(existingThemeStats));
    updateThemeStats();

    // Update scores
    document.getElementById("correct-count").textContent = `Respostas Corretas: ${correctCount}`;
    document.getElementById("wrong-count").textContent = `Respostas Erradas: ${wrongCount}`;

    // Clear and populate questions review
    questionsReview.innerHTML = "";
    questions.forEach((question, index) => {
        const userAnswer = answersGiven[index];
        const isCorrect = userAnswer === question.correct;
    
        const questionDiv = document.createElement("div");
        questionDiv.className = `question-review ${isCorrect ? 'correct' : 'incorrect'}`;
        questionDiv.innerHTML = `
            <div class="review-header">
                <h3>Pergunta ${index + 1}</h3>
                <span class="theme">Tema: ${question.theme}</span>
            </div>
            <div class="review-question">
                <p class="question-text">${question.question}</p>
                <p class="user-answer">A sua Resposta: ${userAnswer || 'Não respondida'}</p>
            </div>
            <div class="review-answer">
                <p class="correct-answer">Resposta Correta: ${question.correct}</p>
                ${question.explanation ? `<div class="question-explanation"><strong>Explicação:</strong> ${question.explanation}</div>` : ''}
            </div>
        `;
        questionsReview.appendChild(questionDiv);
    });

    // Show results section
    quizContainer.style.display = "none";
    quizResults.style.display = "block";


    function displayQuestionsReview(questions, userAnswers) {
        const reviewContainer = document.getElementById('questions-review');
        reviewContainer.innerHTML = '';

        questions.forEach((question, index) => {
            const isCorrect = question.correct === userAnswers[index];
            const reviewDiv = document.createElement('div');
            reviewDiv.className = `question-review ${isCorrect ? 'correct' : 'incorrect'}`;

            reviewDiv.innerHTML = `
                <h3>Pergunta ${index + 1}</h3>
                <p class="question-text">${question.question}</p>
                <p class="correct-answer">Resposta Correta: ${question.answers[question.correct]}</p>
                <p class="user-answer">A sua Resposta: ${question.answers[userAnswers[index]]}</p>
                ${question.explanation ? `<p class="question-explanation"><strong>Explicação:</strong> ${question.explanation}</p>` : ''}
            `;

            reviewContainer.appendChild(reviewDiv);
        });
    }

    quizHistory.push(quizData);
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));

    document.getElementById("overall-tests-count").textContent = quizHistory.length;


    // Hide quiz container and remove active class
    quizContainer.style.display = "none";
    quizContainer.classList.remove("active");

    // Show results
    quizResults.style.display = "block";

    // Show mobile navigation if on mobile
    const mobileNav = document.getElementById("mobile-nav");
    if (mobileNav && window.innerWidth <= 700) {
        mobileNav.style.display = "flex";
    }

    // Update results display
    document.getElementById("correct-count").textContent = `Respostas corretas: ${correctCount}`;
    document.getElementById("wrong-count").textContent = `Respostas erradas: ${wrongCount}`;
    document.getElementById("overall-correct-count").textContent = `Total de respostas corretas: ${overallCorrectCount}`;
    document.getElementById("overall-wrong-count").textContent = `Total de respostas erradas: ${overallWrongCount}`;
    document.getElementById("overall-average").textContent = `Índice de Bom Caloiro: ${overallAverage}%`;
    displayQuizHistory(quizHistory);
}

function calculateOverallAverage(correctCount, wrongCount) {
    const total = correctCount + wrongCount;
    return total > 0 ? Math.round((correctCount / total) * 100) : 0;
}

function displayQuizHistory(quizHistory) {
    const quizHistoryList = document.getElementById("quiz-history-list");
    quizHistoryList.innerHTML = "";

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    [...quizHistory].reverse().forEach(quiz => {
        const listItem = document.createElement("li");
        const formattedDate = formatDate(quiz.date);
        
        // Add cancelled class if quiz was cancelled
        if (quiz.cancelled) {
            listItem.classList.add('cancelled');
        }

        listItem.innerHTML = `
            💡: ${quiz.theme} | 
            🔢: ${quiz.totalQuestions || "N/A"} | 
            ✅: ${quiz.correctCount} | 
            ❌: ${quiz.wrongCount} | 
            📅: ${formattedDate}
            ${quiz.cancelled ? ' | 🚫 Desistiu' : ''}
        `.trim();
        quizHistoryList.appendChild(listItem);
    });
    const overallCorrectCount = parseInt(localStorage.getItem("overallCertas")) || 0;
    const overallWrongCount = parseInt(localStorage.getItem("overallErradas")) || 0;
    const overallAverage = calculateOverallAverage(overallCorrectCount, overallWrongCount);
}