$(document).ready(function () {
    $(".btn-limpar").click(function () {
       localStorage.setItem("carrinho", "");
       location.href = "carrinho.html";
    });

    $(".btn-continuar").click(function () {
        location.href = "index.html";
    });

    //verificar para adicionar o produto no carrinho
    var op = retornaPagina();
    if(op == "add") {
        //pegar o produto
        var produto = JSON.parse(localStorage.getItem("produto"));
        var carrinho = JSON.parse(localStorage.getItem("carrinho"));

        //verificar se tem algo no carrinho
        if(!carrinho) {
            carrinho = [];
        }

        $.each(produto, function (key, val) {
            produto = {
                id: val.id,
                nome: val.nome,
                imagem: val.imagem,
                valor: val.valor
            }
        });

        carrinho.push(produto);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }

    //listar produtos do carrinho
    carrinho = localStorage.getItem("carrinho");
    if(carrinho) {
        produto = JSON.parse(carrinho);
        var total = 0;

        $.each(produto, function (key, val) {
            $("tbody").append(
                "<tr id='linha"+key+"'>" +
                    "<td>"+val.imagem+"</td>" +
                    "<td>"+val.nome+"</td>" +
                    "<td>"+val.valor+"</td>" +
                    "<td>" +
                        "<button class='btn btn-danger' type='button' onclick='removerItem("+key+")'>" +
                            "<i class='glyphicon glyphicon-remove'></i>" +
                    "</button>" +
                    "</td>" +
                "</tr>");


            var valor = formatar(val.valor);
            total = total + valor;
        });

        total = formatarReal(total);
        $("tfoot").html(
            "<tr>" +
                "<td colspan='2'>TOTAL:</td>" +
                "<td colspan='2'> R$ " + total + "</td>" +
            "</tr>"
        );
    }
});

//funcao para remover item do carrinho
function removerItem(key) {
    if(confirm("Deseja remover este item?")) {
        var carrinho = localStorage.getItem("carrinho");

        //remover item do carrinho
        carrinho = JSON.parse(carrinho);
        carrinho.splice(key, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        //apagar a linha
        $("#linha"+key).hide("fast");

        location.href = "carrinho.html";
    }
}

//forma simples de formatar valores

function formatar(valor) {
    valor = valor.replace(".","");
    return parseFloat(valor.replace(",","."));
}

function formatarReal(valor) {
    valor = valor.toFixed(2).split('.');
    valor[0] = valor[0].split(/(?=(?:...)*$)/).join('.');
    return valor.join(',');
}