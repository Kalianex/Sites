let cartas = ['https://i.pinimg.com/originals/50/4f/f9/504ff9b3b9b875c22863e3c76b767fae.jpg',
    'https://i.pinimg.com/originals/50/4f/f9/504ff9b3b9b875c22863e3c76b767fae.jpg',
    'https://lyricstranslate.com/files/styles/artist/public/3ab37d218106f6b993220165c7e5ddb9.jpg',
    'https://lyricstranslate.com/files/styles/artist/public/3ab37d218106f6b993220165c7e5ddb9.jpg',
    'https://filmfare.wwmindia.com/content/2023/jun/sugabtsbollywood21686560334.jpg',
    'https://filmfare.wwmindia.com/content/2023/jun/sugabtsbollywood21686560334.jpg',
    'https://i.pinimg.com/200x/77/45/7f/77457f7fc2dcf3e6b63160f7671b04dc.jpg',
    'https://i.pinimg.com/200x/77/45/7f/77457f7fc2dcf3e6b63160f7671b04dc.jpg',
    'https://www.allkpop.com/upload/2019/12/content/120606/1576148770-1baff457-c751-428c-bbfa-7f62f473dff3.jpeg',
    'https://www.allkpop.com/upload/2019/12/content/120606/1576148770-1baff457-c751-428c-bbfa-7f62f473dff3.jpeg',
    'https://i.pinimg.com/736x/07/6f/78/076f7841524f1063c95160e8568d6347.jpg',
    'https://i.pinimg.com/736x/07/6f/78/076f7841524f1063c95160e8568d6347.jpg',
    'https://i.pinimg.com/originals/90/7e/7c/907e7c150d4b655517b81841296b40ae.jpg',
    'https://i.pinimg.com/originals/90/7e/7c/907e7c150d4b655517b81841296b40ae.jpg'];

let atual = [];
let adivinhando = false;
let correspondencias = 0;
let contagemMovimentos = 0;
let pontuacao = 100;
let vitorias = 0;
let derrotas = 0;

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function configurarCartas() {
    let tabuleiro = document.getElementById('tabuleiro');
    embaralharArray(cartas);
    for (let i = 0; i < cartas.length; i++) {
        let carta = document.createElement('div');
        carta.dataset.item = cartas[i];
        carta.dataset.index = i;
        carta.innerHTML = "<img class='card-img' src='" + cartas[i] + "' alt='imagem'><div class='cover'></div>";
        carta.onclick = aoClicarCarta;
        tabuleiro.appendChild(carta);
    }
}

function aoClicarCarta(e) {
    if (adivinhando) return;
    let alvo = e.currentTarget;
    if (atual.length < 2) {
        alvo.classList.add('flipped');
        atual.push(alvo);
    }

    contagemMovimentos++;
    document.getElementById('moves').textContent = 'Movimentos: ' + contagemMovimentos;

    if (atual.length == 2) {
        adivinhando = true;
        if (atual[0].dataset.item == atual[1].dataset.item) {
            correspondencias++;
            adivinhando = false;
            atual = [];
            if (correspondencias == cartas.length / 2) {
                alert('Você venceu!');
                vitorias++;
                document.getElementById('wins').textContent = 'Vitórias: ' + vitorias;
            }
        } else {
            setTimeout(function () {
                atual[0].classList.remove('flipped');
                atual[1].classList.remove('flipped');
                atual = [];
                adivinhando = false;
            }, 1000);
        }
    }

    pontuacao--;
    document.getElementById('score').textContent = 'Pontuação: ' + pontuacao;
    if (pontuacao <= 0) {
        alert('Você perdeu!');
        derrotas++;
        document.getElementById('losses').textContent = 'Derrotas: ' + derrotas;
        reiniciarJogo();
    }
}

function reiniciarJogo() {
    atual = [];
    adivinhando = false;
    correspondencias = 0;
    contagemMovimentos = 0;
    pontuacao = 100;

    document.getElementById('tabuleiro').innerHTML = '';
    document.getElementById('moves').textContent = 'Movimentos: ' + contagemMovimentos;
    document.getElementById('score').textContent = 'Pontuação: ' + pontuacao;

    configurarCartas();
}

configurarCartas();
