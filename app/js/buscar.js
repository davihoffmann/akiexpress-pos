$(document).ready(function () {

    //pegar a palavra
    var palavra = retornaPagina();

    //colocar mensagem
    $("#msg").html("<img src='imgs/load.gif' /> Aguarde, carregando...");

    $.getJSON("http://pos.professorburnes.com.br/akiexpress/json/produtos.php?op=busca&palavra="+palavra, function () {

    }).done(function (dados) {
        $.each(dados, function (key, val) {
           $(".row").append(
               "<div class='col-md-3 col-sm6 text-center'>" +
                   "<div class='thumbnail'>"+val.imagem+"</div>" +
                   "<h2>"+val.nome+"</h2>" +
                   "<p class='valor'>R$" + val.valor + "</p>" +
                   "<p><a href='produto.html?id="+val.id+"' class='btn btn-danger btn-lg'>Detalhes</a></p>" +
               "</div>"
           );
        });
        $("#msg").html("Resultado da busca por:" + palavra);
    });

});