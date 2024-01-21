
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
// Inicializa o número secreto e o contador de tentativas
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função para exibir texto em elementos HTML
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do numero secreto");
  exibirTextoNaTela("p", "Escolha um número de 1 a 10");
}
exibirMensagemInicial();

// Função principal para verificar o palpite do usuário
function verificarChute() {
  // Obtém o valor inserido pelo usuário no elemento input
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    // Caso o palpite seja correto
    exibirTextoNaTela("h1", "Acertou!");

    // Determina a palavra "tentativa" ou "tentativas" com base no número de tentativas
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";

    // Gera a mensagem de tentativas e exibe na tela
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela("p", mensagemTentativas);

    // Ativa o botão de reiniciar
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    // Caso o palpite não seja correto
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior");
    }

    // Incrementa o número de tentativas
    tentativas++;

    // Limpa o campo de entrada
    limparCampo();
  }
}

// Função para gerar um número aleatório entre 1 e 10
function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeElementos = listaDeNumerosSorteados.length;
         
        if (quantidadeElementos == numeroLimite ) {
          listaDeNumerosSorteados = [];
        }
     if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
     } else {
      listaDeNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido;
     }
}

// Função para limpar o campo de entrada após cada tentativa
function limparCampo() {
  let campo = document.querySelector("input");
  campo.value = "";
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  // Gera um novo número secreto e reinicia as variáveis
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;

  // Exibe a mensagem inicial e desativa o botão de reiniciar
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
