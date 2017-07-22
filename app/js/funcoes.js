/**
 * Created by DaviHoffmann on 15/07/2017.
 */
$(document).ready(function () {

    //verificar se o usuario esta logado
    var idCliente = sessionStorage.getItem("id");
    if(idCliente) {
        var nomeCliente = sessionStorage.getItem("nome");
        var texto = "Seja bem vindo " + nomeCliente + " (ID:" + idCliente + ")" +
            "<br /><br />" +
            "<button class='btn btn-danger btn-cancelar btn-lg'>Cancelar</button> " +
            "<button class='btn btn-danger btn-sair btn-lg'>Sair</button>";

        $("#login form").html(texto);
    }

    //pegar conteudo do cache
    var data = localStorage.getItem("menuCategorias");

    //verificar se existe algo
    if(data) {
        //se exisgtir carregar do cache
        console.log("Carregando menu do cache...");

        var cache = JSON.parse(data);
        preencherCategorias(cache);

    } else {
        //pegas as categorias para montar o menu
        $.getJSON("http://pos.professorburnes.com.br/akiexpress/json/categorias.php", function () {
            //mensagem
            $("#msg").html("<div class='alert alert-danger'><img src='imgs/load.gif' />Carregando...</div>");
        }).done(function (dados) {

            //guardar os dados no localstore
            var cache = JSON.stringify(dados);
            localStorage.setItem("menuCategorias", cache);

            //mandar preencher o menu
            preencherCategorias(dados);
        }).fail(function () {
            $("#msg").html("<div class='alert alert-danger'>Erro! Requisição Inválida</div>");
        });
    }


    function preencherCategorias(dados) {
        $("#msg").html("");
        $.each(dados, function (key, val) {
            $(".navbar-nav").prepend("<li><a href='categorias.html?id=" + val.id + "'>" + val.nome + "</a></li>")
        });
    }

    //funcao para fechar janela da mascara
    $(".btn-cancelar").click(function () {
        $(".mascara").hide("slow");
    });

    //funcao para mostrar janela da mascara
    $(".logar").click(function () {
        $("#login").show("slow");
        $("#email").focus();
    });

    //funcao para validar o login
    $(".btn-logar").click(function () {
       //pegar dados form
       var email = $("#email").val();
       var senha = $("#senha").val();

       $.post("http://pos.professorburnes.com.br/akiexpress/json/login.php", {email: email, senha: senha}, function (dados) {
            var msg = dados.split(";");

            if(msg[0] == "erro") {
                alert(msg[1]);
            } else {
                localStorage.setItem("email", email);
                sessionStorage.setItem("id", msg[1]);
                sessionStorage.setItem("nome", msg[2]);

                //redirecionar pagina principal
                location.href = "index.html";
            }
        });
    });

    //funcao para sair
    $(".btn-sair").click(function () {
        if (confirm("Você deseja mesmo sair?")) {
            sessionStorage.clear();
            location.href = "index.html";
        }
    });


    //mostrar tela de busca
    $(".buscar").click(function () {
        $("#busca").show("fast");
    })

});

function retornaPagina() {
    //pegar url visitada no momento
    var url = window.location.href;
    var id = url.split("=");
    if(id.length > 1) {
        id = id[1];
    }
    return id;
}

//verificar se existe compatibilidade e registrar o service worker
if("serviceWorker" in navigator) {
    //registrar o arquivo
    navigator.serviceWorker.register("sw.js").then(function () {
        console.log("Service Worker registrado com sucesso!");
    });
} else {
    alert("Seu navegador não possui suporte a service worker, por favor atualize!");
}