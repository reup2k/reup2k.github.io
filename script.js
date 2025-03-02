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
    const isMusicMuted = localStorage.getItem("musicMuted") !== "true"; // Changed this line
    backgroundMusic = document.getElementById("background-music");
    backgroundMusic.muted = isMusicMuted;
    musicIcon.textContent = isMusicMuted ? "🔇" : "🔊";
    


    if (savedName) {
        profileCreator.style.display = "none";
        mainContent.style.display = "flex";
        profile.style.display = "block";
        backgroundMusic = document.getElementById("background-music");
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

            const mobileNav = document.getElementById("mobile-nav");
            if (mobileNav && window.innerWidth <= 700) {
                mobileNav.style.display = "flex";
            }
        
            quizContainer.style.display = "none";
            quizResults.style.display = "block";

            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            document.getElementById("music-icon").textContent = "🔇";
        

        }

        function getFormattedName(title, name) {
            switch(title) {
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
        
        document.getElementById('photo').addEventListener('change', function(e) {
            const file = e.target.files[0];
            const preview = document.getElementById('photo-preview');
            const fileInfo = this.closest('.file-input-group').querySelector('.file-info');
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
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
        a.download = 'boapraxe-dados.json';
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
                    alert('Erro ao importar dados. O arquivo provavelmente não é válido.');
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
        canvas.height = 630;
        
        const backgroundImage = new Image();
        backgroundImage.src = 'imgs/share-bg.jpg';
        
        backgroundImage.onload = async () => {
            // Clear canvas
            ctx.fillStyle = '#682145';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            let renderWidth = canvas.width;
            let renderHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            // Add overlay
            ctx.fillStyle = 'rgba(104, 33, 69, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw background
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(104, 33, 69, 0.8)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Text settings
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            
            // Draw title
            ctx.font = 'bold 60px Montserrat';
            ctx.fillText('BoaPraxe - Estatísticas', canvas.width/2, 100);
            
            // Get user stats with modified name display
            const name = getShareTitle(localStorage.getItem('name'));
            const correctCount = localStorage.getItem('overallCertas') || '0';
            const wrongCount = localStorage.getItem('overallErradas') || '0';
            const average = calculateOverallAverage(parseInt(correctCount), parseInt(wrongCount));
            const testsCount = JSON.parse(localStorage.getItem('quizHistory') || '[]').length;
            
            // Draw stats with modified name
            ctx.font = '40px Montserrat';
            ctx.fillText(name, canvas.width/2, 180);
            
            ctx.font = '36px Montserrat';
            ctx.fillText(`✅ Respostas Corretas: ${correctCount}`, canvas.width/2, 300);
            ctx.fillText(`❌ Respostas Erradas: ${wrongCount}`, canvas.width/2, 380-25);
            ctx.fillText(`🎓 Índice de Bom Caloiro: ${average}%`, canvas.width/2, 460-50);
            ctx.fillText(`📝 Testes Realizados: ${testsCount}`, canvas.width/2, 540-75);

            const currentDate = new Date().toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            ctx.font = '24px Montserrat';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillText(`Gerado em ${currentDate}`, canvas.width/2, canvas.height - 40);
    
            
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

                    // Start quiz
                    backgroundMusic.volume = 0.02;
                    backgroundMusic.play();
                    loadQuiz();
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
});

function loadQuiz() {
    console.log("Loading quiz...");
    console.log("Selected theme:", selectedTheme); // Debug do tema selecionado

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
            if (!Array.isArray(data) || data.length < 2) {
                throw new Error("Invalid data format");
            }

            // Filtrar questões por tema
            const allQuestions = data.slice(1).map(row => ({
                question: row[0],
                answers: row.slice(1, 5),
                correct: row[1],
                theme: row[row.length - 1] // Assumindo que o tema está na última coluna
            }));

            console.log("All questions loaded:", allQuestions);

            // Filtrar questões pelo tema selecionado
            const themeQuestions = selectedTheme === "geral" 
                ? allQuestions 
                : allQuestions.filter(q => q.theme === selectedTheme);

            console.log("Filtered questions by theme:", themeQuestions);

            // Embaralhar e selecionar o número de questões desejado
            questions = shuffle(themeQuestions).slice(0, totalQuestions);

            console.log("Selected questions:", questions);

            // Exibir o quiz primeiro
            const quizContainer = document.getElementById("quiz-container");
            quizContainer.style.display = "block";
            console.log("Quiz container displayed");

            // Hide the loading screen with a smooth fade-out
            const loadingScreen = document.getElementById("loading-screen");
            setTimeout(() => {
                loadingScreen.classList.add("hidden");
                setTimeout(() => {
                    loadingScreen.style.display = "none";
                }, 500); // Match the duration of the CSS transition
            }, 100); // Small delay to ensure quiz is displayed first

            displayQuestion();
            updatePercentage();
            updateProgressBar(); // Atualize a barra de progresso ao carregar o quiz
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
    

        // Update scores
        correctCount.textContent = `Respostas Corretas: ${localStorage.getItem("certas") || 0}`;
        wrongCount.textContent = `Respostas Erradas: ${localStorage.getItem("erradas") || 0}`;
    
        // Clear and populate questions review
        questionsReview.innerHTML = "";
        questions.forEach((question, index) => {
            const userAnswer = answersGiven[index];
            const isCorrect = userAnswer === question.correct;
            
            const questionDiv = document.createElement("div");
            questionDiv.className = `question-review ${isCorrect ? 'correct' : 'incorrect'}`;
            questionDiv.innerHTML = `
            <h3>Pergunta ${index + 1}</h3>
            <p class="question-text">${question.question}</p>
            <p class="correct-answer">Resposta Correta: ${question.correct}</p>
            <p class="user-answer">Sua Resposta: ${userAnswer || 'Não respondida'}</p>
        `;
        questionsReview.appendChild(questionDiv);
    });
    
    // Show results section
    quizContainer.style.display = "none";
    quizResults.style.display = "block";
    


    // Add quiz to history
    quizHistory.push({
        correctCount,
        wrongCount,
        theme: selectedTheme,
        date: new Date().toLocaleString(),
        totalQuestions: totalQuestions  // Add this line
    });
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

    quizHistory.forEach(quiz => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `💡: ${quiz.theme} |  🔢: ${quiz.totalQuestions || "N/A"} | 🕒: ${quiz.date} | ✅: ${quiz.correctCount} | ❌: ${quiz.wrongCount}`;
        quizHistoryList.appendChild(listItem);
    });

    const overallCorrectCount = parseInt(localStorage.getItem("overallCertas")) || 0;
    const overallWrongCount = parseInt(localStorage.getItem("overallErradas")) || 0;
    const overallAverage = calculateOverallAverage(overallCorrectCount, overallWrongCount);
}