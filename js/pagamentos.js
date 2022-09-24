//verificação do campo forma de pagamento
function pagamentoValue() {
    var pag = document.getElementById('pagamento').value;
    if (pag == 'Selecione') {
        toastr["error"]("Informe a forma de pagameneto", "ATENÇÃO");
        return false;
    } else {
        return true;
    }
}

//verificação da forma de pagamento
function pagamento() {
    if (iPay == 0) {
        let payValue = document.getElementById('pagamento').value;
        if (payValue == "Pix") {
            pix();
            iPay++;
        } else if (payValue == "Dinheiro") {
            dinheiro();
            iPay++;
        }
    } else {
        document.getElementById("pag").remove();
        iPay--;
        pagamento();
    }
}

//pagamento pix
function pix() {
    let corpo = document.getElementById('corpoPag');
    let pay = document.getElementById('pagamento').value;
    let pPay = document.createElement('p');
    pPay.setAttribute("style", 'margin-top: 20px')
    let pDiv = document.createElement("div");
    if (pay == 'Pix') {
        pPay.innerHTML = "<b>Chave PIX:</b> 43405837820 ";
        pDiv.setAttribute("id", "pag")
        let pimg = document.createElement("img");
        pimg.setAttribute("src", "imagens/qrCode/transferir.png");
        pimg.setAttribute("height", "150px");
        pimg.setAttribute("width", "150px");
        pimg.setAttribute("width", "150px");
        pimg.setAttribute("id", "pag");


        pDiv.appendChild(pPay);
       // pDiv.appendChild(pimg);
        corpo.appendChild(pDiv);
    }
}

//pagamento dinheiro
/*function dinheiro() {
    let corpo = document.getElementById('corpoPag');
    let pay = document.getElementById('pagamento').value;
    let pPay = document.createElement('p');
    let pDiv = document.createElement("div");
    if (pay == 'Dinheiro') {
        pPay.innerHTML = "<b>Troco para quanto?</b>\nR$";
        pDiv.setAttribute("id", "pag")
        let pInput = document.createElement("input");
        pInput.setAttribute("type", "number");
        pInput.setAttribute("id", "nDinheiro");
        pInput.setAttribute("onkeypress", "return somenteNumerosPay(event)")

        pDiv.appendChild(pPay);
        pDiv.appendChild(pInput);
        corpo.appendChild(pDiv);
    } else {
        document.getElementById("pag").remove();
    }
}*/

//verificação de somente numeros no valor do campo de troco
function somenteNumerosPay(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    if (charCode != 8 && charCode != 9) {
        let max = 3;
        let num = document.getElementById("nDinheiro");
        if ((charCode < 48 || charCode > 57) || (num.value.length >= max)) {
            return false;
        }

    }

}
