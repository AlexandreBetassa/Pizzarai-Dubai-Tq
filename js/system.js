
var ped = pedido();
var passo = 0;//0-escolhendo pizza,1- perguntando se eh metade ou nao, 2, se for metade, pergunta o outro sabor


function usuario() {
    return {
        nome: '',
        sobrenome: '',
        endereco: '',
        numero: '',
        bairro: ''
    };
}

function pedido() {
    return {
        pizzas: [],
        usuario: {},
        idPedido: 0
    };
}

function pizza() {
    return {
        inteira: 0,
        metade1: 1,
        metade2: 0,
        quantidade: 0,
        tamanho: 0,
        bordaRecheada: 0,
        observacoes: ''
    };
}

function sabores() {
    return ['4 queijos', 'calabresa', 'portuguesa'];
}

function tamanhos() {
    return ['pequeno', 'media', 'grande'];
}

function sistemaMensagem(mensagem) {
    var balao = document.createElement('div');
    balao.classList.add("balao-sistema");
    balao.innerHTML = mensagem;
    document.getElementById("mensagens").appendChild(balao);
}

function usuarioMensagem(mensagem) {
    var balao = document.createElement('div');
    balao.classList.add("balao-usuario");
    balao.innerHTML = mensagem;
    document.getElementById("mensagens").appendChild(balao);
}

function clickDoBotao() {
    usuarioMensagem(document.getElementById('valorDigitado').value);
}

function mostrarSabores() {
    var sab = sabores();
    var lista = '';
    var i = 0;
    sab.forEach(el=> {
        lista += i + ' - ' + el;
        i++;
    });
    sistemaMensagem("Temos os sabores: " + lista);
}

function iniciarPedido() {
    sistemaMensagem("Ola usuario, qual piza desejza?");
    mostrarSabores();
}

document.getElementById("enviar").addEventListener('click', clickDoBotao);

iniciarPedido();