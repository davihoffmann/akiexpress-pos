/**
 * Created by DaviHoffmann on 15/07/2017.
 */
$(document).ready(function () {

    //pegas as categorias para montar o menu
    $.getJSON("http://pos.professorburnes.com.br/akiexpress/json/categorias.php", function () {
       //mensagem
        $("#msg").html("<div class='alert alert-danger'><img src='imgs/load.gif' />Carregando...</div>");
    }).done(function (dados) {

        $("#msg").html("");
        $.each(dados, function (key, val) {
            console.log(val.id);
           $(".navbar-nav").prepend("<li><a href='categorias.html?id="+val.id+"'>"+val.nome+"</a></li>")
        });

    }).fail(function () {
        $("#msg").html("<div class='alert alert-danger'>Erro! Requisição Inválida</div>");
    })

});
