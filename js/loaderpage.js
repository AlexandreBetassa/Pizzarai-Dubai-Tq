
var permitidoUsarStorage = false;
var msgExibida = false;

//exibir msg LGPD
function mostrarMensagemLGPD() {

    if (!verificarMensagemExibida()) {
        var r = confirm("Nós armazenamos dados temporariamente para melhorar a sua experiência de navegação e recomendar conteúdo de seu interesse. Ao selecionar 'OK', você concorda com o uso desses dados.");
        permitidoUsarStorage = r;
        marcarMensagemExibida();
    } else {
        permitidoUsarStorage = verificarMensagemExibida();
    }

}

//Verificar se msg LGPD foi exibida
function verificarMensagemExibida() {
    return localStorage.getItem("msgExibida") == 'sim';
}

//Marcar que a msg LGPD ja foi exibida
function marcarMensagemExibida() {
    localStorage.setItem("msgExibida", 'sim');
}

//carregar pagina inicial
function iniciarPagina() {
    mostrarMensagemLGPD();
    carregarDoStorage();
}

function carregarDoStorage() {
    if (!permitidoUsarStorage)
        return;
    var cliente = localStorage.getItem('cliente');
    if (!!cliente) {
        pedidoPizzas.cliente = JSON.parse(cliente);
        document.getElementById("nome").value = pedidoPizzas.cliente.nome;
        document.getElementById("tel").value = parseInt(pedidoPizzas.cliente.telefone);
        document.getElementById("rua").value = pedidoPizzas.cliente.rua;
        document.getElementById("numero").value = pedidoPizzas.cliente.numero;
        document.getElementById("bairro").value = pedidoPizzas.cliente.bairro;
        document.getElementById("complemento").value = pedidoPizzas.cliente.complemento;
    }
}

//guardar dados no LocalStorage
function guardarDados() {
    if (!permitidoUsarStorage)
        return;
    var cliente = JSON.stringify(pedidoPizzas.cliente);
    localStorage.setItem('cliente', cliente);
}
