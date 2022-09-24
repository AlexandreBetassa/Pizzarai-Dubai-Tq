window.jQuery = $;

var pedidoPizzas = {
    cliente: {
        nome: '',
        telefone: '',
        endereco: '',
        complemento: '',
        bairro: '',
        rua: '',
        numero: ''
    },
    pizzasPedido: [],
    dadosPizza: [],
};

var permitidoUsarStorage = false;
var msgExibida = false;
var id = 0;
var idPizza = 0;
var qtdCards = 0;

iniciarPagina();

//funções da aplicação
document.getElementById('button').addEventListener('click', function () {

    if (verConcluir() == true) {
        concluirPedido();
    }
});

//inserir dados das pizzas
document.getElementById('insertpizza').addEventListener('click', function () {

    //let size = document.getElementById('size').value;
    let sabor1 = document.getElementById('sabor1').value;
    let sabor2 = document.getElementById('sabor2').value;
    let borda = document.getElementById('borda').value;
    let qtd = document.getElementById('qtd').value;
    let obs = document.getElementById('obs').value;

    if (valuesPizzas() == true && verQtdCards() == true) {
        let removerBox = document.createElement("div");
        removerBox.setAttribute("class", "d-grid gap-2");
        let remover = document.createElement('button');
        remover.setAttribute("class", "btn btn-dark");
        removerBox.appendChild(remover);

        let pRemover = document.createElement("p");
        remover.innerHTML = "Remover";

        remover.addEventListener("click", function () {
            if (window.confirm("Deseja realmente excluir?") == true) {
                var aux = this.parentElement.parentElement.parentElement.getAttribute("idPizza");
                aux = parseInt(aux);
                aux = localizar(aux);
                this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
                pedidoPizzas.dadosPizza.splice(aux, 1);
                removePizza(aux);
                qtdCards -= 1;
                toastr["success"]("Exclusão efetuada com sucesso!!!", "SUCESSO")
            }
        });

        var Card = document.getElementById("card");
        let item = document.createElement("div");
        let corpoCard = document.createElement("div");
        let corpoText = document.createElement("div");

        item.setAttribute("class", "col-12 col-sm-4 col-md-3 col-lg-2 flex-column flex-lg-row my-3");
        corpoCard.setAttribute("class", "card text-dark");
        corpoText.setAttribute("class", "card-text p-1");
        corpoText.setAttribute("id", "card-text");
        let div = document.createElement("div");
        div.setAttribute("idPizza", idPizza);
        div.setAttribute("class", "p-1")

        let pPed = document.createElement('p');
        pPed.innerHTML = "<b> PEDIDO </b>"

        //let pSize = document.createElement("p");
        //pSize.innerHTML = "<b>Tamanho: </b> " + size;

        let pSabor1 = document.createElement('p');
        pSabor1.innerHTML = "<b>Sabor 1: </b> " + sabor1;

        let pSabor2 = document.createElement("p");
        pSabor2.innerHTML = "<b>Sabor 2: </b>" + sabor2;

        let pBorda = document.createElement("p");
        pBorda.innerHTML = "<b>Borda: </b>" + borda;

        let pQtd = document.createElement('p');
        pQtd.innerHTML = "<b>Quantidade: </b>" + qtd;

        let pObs = document.createElement('p');
        pObs.innerHTML = "<b>Observação:</b> " + obs;

        pRemover.appendChild(removerBox)
        div.appendChild(pPed);
        div.appendChild(pSabor1);
        div.appendChild(pSabor2);
        div.appendChild(pBorda);
        div.appendChild(pQtd);
        div.appendChild(pObs);
        div.appendChild(pRemover);
        corpoText.appendChild(div);
        corpoCard.appendChild(corpoText);
        item.appendChild(corpoCard);
        Card.appendChild(item);

        // cardCache.push(Card);
        addPizza();
        let pizza = ("\n*Sabor 1:* " + sabor1 + ", *Sabor 2:* " + sabor2 + ", *Borda:* " + borda + ", *Quantidade:* " + qtd + " - unidade(s)" + "\n*OBS:* " + obs);
        pedidoPizzas.dadosPizza.push({ "Escolha": idPizza, "Pizza": pizza });
        toastr["success"]("Pizza inserida com sucesso", "Sucesso");
        idPizza = idPizza + 1;
        qtdCards += 1;
    }
});

function removePizza(id) {
    var narray = [];
    pedidoPizzas.pizzasPedido.forEach(x => {
        if (id != x.id) {
            narray.push(x);
        }
    });
    pedidoPizzas.pizzasPedido = narray;
}

function addPizza() {
    pedidoPizzas.pizzasPedido.push({
        id: idPizza,
        sabor1: document.getElementById('sabor1').value,
        sabor2: document.getElementById('sabor2').value,
        borda: document.getElementById('borda').value,
        qtd: document.getElementById('qtd').value,
        obs: document.getElementById('obs').value
    });
}

//verificar campos vazios dos dados
function verificarCamposDados() {
    let nome = document.getElementById('nome').value;
    let telefone = document.getElementById('tel').value;
    let rua = document.getElementById('rua').value;
    let numero = document.getElementById('numero').value;
    let bairro = document.getElementById('bairro').value;

    if (nome == '') {
        toastr["error"]("Certifique-se de que o campo Nome não está vazio!!!", "Campo Nome VAZIO");
        return false;
    } else if (telefone == '') {
        toastr["error"]("Certifique-se de que o campo Telefone não está vazio!!!", "Campo Telefone VAZIO");
        return false;
    } else if (rua == '') {
        toastr["error"]("Certifique-se de que o campo Rua não está vazio!!!", "Campo Rua VAZIO")
        return false;
    } else if (numero == '') {
        toastr["error"]("Certifique-se de que o campo Número não está vazio!!!", "Campo Número VAZIO");
        return false;
    } else if (bairro == '') {
        toastr["error"]("Certifique-se de que o campo Bairro não está vazio!!!", "Campo Bairro VAZIO")
        return false;
    }
}

//verificar Tamanho dos textos nos campos
function dadosLength() {
    let nome = document.getElementById('nome').value;
    let telefone = document.getElementById('tel').value;
    let rua = document.getElementById('rua').value;
    let bairro = document.getElementById('bairro').value;

    if (nome.length > 50) {
        toastr["error"]("A quantidade de caracteres no campo Nome não pode ser maior que 50", "ATENÇÃO");
        return false;
    } else if (telefone.length > 11) {
        window.alert("A quantidade de caracteres no campo Telefone não pode ser maior que 11");
        return false;
    } else if (rua.length > 50) {
        toastr["error"]("A quantidade de caracteres no campo Rua não pode ser maior que 50", "ATENÇÃO");
        return false;
    } else if (bairro.length > 50) {
        toastr["error"]("A quantidade de caracteres no campo Bairro não pode ser maior que 50", "ATENÇÃO");
        return false;
    }
}

//verificação de quantidades de cards
function verQtdCards() {
    if (qtdCards > 10) {
        toastr["warning"]("Por motivos de segurança você atingiu a cota de pizzas por pedidos.\nPor favor, envie esse e faça novamente!!!", "ATENÇÃO")
        return false;
    } else {
        return true;
    }
}

//verificar valores dos campos pizzas
function valuesPizzas() {
    let sabor1 = document.getElementById('sabor1').value;
    let sabor2 = document.getElementById('sabor2').value;
    let borda = document.getElementById('borda').value;
    let qtd = document.getElementById('qtd').value

    if (sabor1 == 'Selecione') {
        toastr["warning"]("Selecione o Sabor 1", "ATENÇÃO");
        return false;

    } else if (sabor2 == 'Selecione') {
        toastr["warning"]("Selecione o Sabor 2", "ATENÇÃO");
        return false;

    } else if (borda == 'Selecione') {
        toastr["warning"]("Selecione a Borda", "ATENÇÃO");
        return false;

    } else if (qtd < 1) {
        toastr["warning"]("Verifique a Quantidade (Mínimo 1)", "ATENÇÃO");
        return false;
    } else {
        return true;
    }
}

//verifcar inserção de pizzas no pedido
function verificarCamposPizzas() {
    if (pedidoPizzas.dadosPizza.length == 0) {
        toastr["error"]("Seu carrinho está VAZIO", "ATENÇÃO");
        return false;
    } else {
        return true;
    }
}

function guardarDados() {
    if (!permitidoUsarStorage)
        return;
    var cliente = JSON.stringify(pedidoPizzas.cliente);
    localStorage.setItem('cliente', cliente);
}

//concluir pedido
function concluirPedido() {
    let titulo = "_*PIZZARIA DUBAI*_\n";
    let quebra = "*______________________________*\n";
    var allPizza;
    insertDados();
    var nPedido = pedidoPizzas.cliente.telefone;
    allPizza = insertAllPizzas();
    guardarDados();
    let dados = encodeURI(titulo + "*PEDIDO: " + nPedido + "*\n" + quebra + "*Nome:* " + pedidoPizzas.cliente.nome + "\n" + "*Telefone:* " + pedidoPizzas.cliente.telefone + "\n" + "*Rua/Av.:* " + pedidoPizzas.cliente.endereco + '\n' + quebra + "*ESCOLHA:*" + allPizza + quebra);
    let url = "http://wa.me/5516997208491/?text=" + dados;
    window.open(url);
    window.location.href = "reload.html";
}

//montar string com todas as pizzas
function insertAllPizzas(allPizza) {
    let index = 0;
    while (index < pedidoPizzas.dadosPizza.length) {
        if (index == 0) {
            allPizza = pedidoPizzas.dadosPizza[index].Pizza + '\n';
        } else {
            allPizza = allPizza + pedidoPizzas.dadosPizza[index].Pizza + '\n';
        }
        index++;
    }
    return allPizza;
}

//inserir dados no objeto
function insertDados() {
    let nome = document.getElementById('nome').value;
    let telefone = document.getElementById('tel').value;
    let rua = document.getElementById('rua').value;
    let numero = document.getElementById('numero').value;
    let bairro = document.getElementById('bairro').value;
    let complemento = document.getElementById('complemento').value;

    pedidoPizzas.cliente.nome = nome;
    pedidoPizzas.cliente.telefone = telefone;
    pedidoPizzas.cliente.rua = rua;
    pedidoPizzas.cliente.numero = numero;
    pedidoPizzas.cliente.bairro = bairro;
    pedidoPizzas.cliente.complemento = complemento;
    pedidoPizzas.cliente.endereco = rua + ", n°: " + numero + ", " + bairro + ", " + complemento;
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

//localizar
function localizar(n1) {
    let x = 0;
    while (n1 != pedidoPizzas.dadosPizza[x].Escolha) {
        x++;
    } if (pedidoPizzas.dadosPizza[x].Escolha == n1) {
        return x;
    } else {
        window.alert("Houve um erro em sua solicitação.");
    }
}

//verificar telefone
function verificarTel() {
    let tel = document.getElementById("tel").value;
    if (isNaN(tel) == true) {
        toastr["error"]("Informe somente números no campo Telefone", "ATENÇÃO");
        return true;
    }
}

//verificação para conclusão
function verConcluir() {
    if (dadosLength() == false || verificarCamposDados() == false || verificarCamposPizzas() == false || verificarTel() == true) {
        return false;
    } else {
        return true;
    }

}

//verificação do campo telefone
function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    if (charCode != 8 && charCode != 9) {
        let max = 2;
        let num = document.getElementById('qtd');


        if ((charCode < 48 || charCode > 57) || (num.value.length >= max)) {
            return false;
        }

    }
}

//verificação do campo numero
function somenteNumerosNum(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    if (charCode != 8 && charCode != 9) {
        let max = 6;
        let num = document.getElementById('numero');
        if ((charCode < 48 || charCode > 57) || (num.value.length >= max)) {
            return false;
        }

    }
}

//verificação do campo telefone
function somenteNumerosTel(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    if (charCode != 8 && charCode != 9) {
        let max = 11;
        let num = document.getElementById('tel');
        if ((charCode < 48 || charCode > 57) || (num.value.length >= max)) {
            return false;
        }

    }
}

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

//toaters
toastr.options = {
    "closeButton": false,
    "debug": true,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

//<![CDATA[
    $(window).on('load', function () {
        $('#preloader .inner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow'); 
        $('body').delay(350).css({'overflow': 'visible'});
    })
    //]]>