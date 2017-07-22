$(document).ready(function () {

    var id = retornaPagina();

    var produto = localStorage.getItem("produto");
    if(produto) {
        console.log("produto do cache");
        dados = JSON.parse(localStorage.getItem("produto"));
        preencherProdutos(dados);
    } else {
        $.getJSON("http://pos.professorburnes.com.br/akiexpress/json/produtos.php?op=produto&id=" + id, function () {

        }).done(function (dados) {
            console.log("armazenando produto no cache");
            localStorage.setItem("produto", JSON.stringify(dados));
            preencherProdutos(dados);
        });
    }

    function preencherProdutos(dados) {
        $.each(dados, function (key, val) {
            $(".foto").html(val.imagem);
            $(".descricao").html(
                "<p>"+val.descricao+"</p>" +
                "<p class='text-center'>" +
                    "<a href='carrinho.html?op=add' class='btn btn-danger btn-lg'>Comprar</a>" +
                "</p>");

            $("h1").html(val.nome);
        });
    }
});