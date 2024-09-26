const gameBoard = document.getElementById('gameBoard');
const attemptsDisplay = document.createElement('div');
const gameOverMessage = document.createElement('div');

// Substituindo letras por caminhos de imagens
const cardValues = [
    'img/img7.jpg', 'img/img9.jpg', 'img/img11.jpg', 'img/D.jpg',
    'img/img8.jpg', 'img/img10.jpg', 'img/img12.jpg', 'img/H.jpg',
    'img/img7.jpg', 'img/img9.jpg', 'img/img11.jpg', 'img/D.jpg',
    'img/img8.jpg', 'img/img10.jpg', 'img/img12.jpg', 'img/H.jpg'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let attempts = 10; // Número de tentativas permitidas

// Exibe o número de tentativas restantes
function updateAttemptsDisplay() {
    attemptsDisplay.textContent = `Tentativas restantes: ${attempts}`;
}

// Embaralha o array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Cria uma nova carta
function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    // Adiciona a imagem ao card
    const img = document.createElement('img');
    img.src = value; // Caminho da imagem
    img.alt = value;
    img.style.display = 'none'; // Oculta a imagem inicialmente

    card.appendChild(img);
    card.textContent = '?';
    card.addEventListener('click', flipCard);
    return card;
}

// Vira a carta e verifica correspondências
function flipCard() {
    if (lockBoard || this === firstCard) return;
    const img = this.querySelector('img');
    img.style.display = 'block'; // Mostra a imagem
    this.textContent = ''; // Remove o texto '?'
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    attempts--; // Reduz o número de tentativas restantes
    updateAttemptsDisplay(); // Atualiza a exibição de tentativas

    checkForMatch();
}

// Verifica se as cartas viradas são um par
function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matches += 2;
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    } else {
        if (attempts <= 0) {
            setTimeout(() => {
                gameOverMessage.textContent = 'Você ficou sem tentativas! Game Over.';
                gameOverMessage.classList.add('game-over');
                document.body.appendChild(gameOverMessage);
            }, 500);
            disableAllCards();
        } else {
            setTimeout(() => {
                const firstImg = firstCard.querySelector('img');
                const secondImg = secondCard.querySelector('img');
                firstImg.style.display = 'none'; // Oculta a imagem
                secondImg.style.display = 'none'; // Oculta a imagem
                firstCard.textContent = '?'; // Restaura o texto '?'
                secondCard.textContent = '?'; // Restaura o texto '?'
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }
    }
}

// Desativa todas as cartas
function disableAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.removeEventListener('click', flipCard));
}

// Reseta o estado das cartas
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
    if (matches === cardValues.length) {
        setTimeout(() => {
            const winMessage = document.createElement('div');
            winMessage.textContent = 'Você ganhou!';
            winMessage.classList.add('game-over');
            document.body.appendChild(winMessage);
        }, 500);
    }
}

// Configura o jogo inicial
function setupGame() {
    const shuffledValues = shuffle([...cardValues]);
    shuffledValues.forEach(value => {
        gameBoard.appendChild(createCard(value));
    });

    attemptsDisplay.classList.add('attempts-display');
    document.body.insertBefore(attemptsDisplay, gameBoard);
    updateAttemptsDisplay(); // Mostra o número inicial de tentativas
}

setupGame();
