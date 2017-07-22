$(document).ready(function () {

    var id = retornaPagina();

    $.getJSON("http://pos.professorburnes.com.br/akiexpress/json/produtos.php?op=produto&id=" + id, function () {

    }).done(function (dados) {

        localStorage.setItem("produto", JSON.stringify(dados));

        $.each(dados, function (key, val) {
            $(".foto").html(val.imagem);
            $(".descricao").html("<p>"+val.descricao+"</p>" +
                "<p class='text-center'>" +
                "<a href='carrinho.html?op=add' class='btn btn-danger btn-lg'>Comprar</a>" +
                "</p>");
            $("h1").html(val.nome);
        });
    });

});