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
});