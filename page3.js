const words = ['escravidão', 'tráfico', 'carga humana', 'direitos humanos', 'abolição'];
let chosenWord;
let guessedLetters;
let wrongLetters;
let attempts;
let displayWord;

function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongLetters = [];
    attempts = 6;
    displayWord = chosenWord.split('').map(letter => '_').join(' ');
    document.getElementById('word').textContent = displayWord;
    document.getElementById('attemptsLeft').textContent = attempts;
    document.getElementById('message').textContent = '';
    document.getElementById('letterInput').value = '';
    document.getElementById('newRoundButton').style.display = 'none'; // Esconder o botão de nova rodada
    document.getElementById('wrongLettersList').textContent = ''; // Limpar letras erradas
}

function guessLetter() {
    const input = document.getElementById('letterInput');
    const letter = input.value.toLowerCase();
    input.value = '';

    if (letter === '' || guessedLetters.includes(letter) || wrongLetters.includes(letter)) return;

    if (chosenWord.includes(letter)) {
        guessedLetters.push(letter);
        displayWord = chosenWord.split('').map((l) => 
            guessedLetters.includes(l) ? l : '_'
        ).join(' ');
        document.getElementById('word').textContent = displayWord;

        if (!displayWord.includes('_')) {
            document.getElementById('message').textContent = 'Você ganhou!';
            document.getElementById('newRoundButton').style.display = 'block'; // Mostrar o botão de nova rodada
            return;
        }
    } else {
        attempts--;
        wrongLetters.push(letter);
        document.getElementById('attemptsLeft').textContent = attempts;
        document.getElementById('wrongLettersList').textContent = wrongLetters.join(', '); // Atualizar letras erradas
        
        if (attempts === 0) {
            document.getElementById('message').textContent = 'Você perdeu! A palavra era ' + chosenWord;
            document.getElementById('newRoundButton').style.display = 'block'; // Mostrar o botão de nova rodada
            return;
        }
    }
}

document.addEventListener('DOMContentLoaded', startGame);
