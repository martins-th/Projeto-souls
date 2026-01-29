async function carregaTudo () {
    try {
        const resposta = await fetch("../curiosidades.json");
        const dados = await resposta.json();

        const urlTextoCriador = dados.criador[0].texto;
        const buscaTexto = await fetch(urlTextoCriador);
        const textoFinal = await buscaTexto.text();

        renderizaIceberg(dados.iceberg);
        renderizaEaster(dados.easterEggs);
        renderizaFilosofia(dados.filosofia);
        renderizaCriador(textoFinal);
        //passando os arrays de objeto como argumento

    }
    catch (erro) {
        console.error("erro ao carregar dados", erro);
    }
}

function renderizaIceberg (icebergDados) {
    const lista = document.getElementById("iceberg");
    if(!lista) return;

    let itensListaAcumulado = "";

    for(let i=0; i< icebergDados.length; i ++ ) {
        if (i % 4 === 0){
            let numeroCamada = (i/4) + 1;
            itensListaAcumulado += `<li class="camada_titulo">Camada ${numeroCamada}</li>`;
        };

        itensListaAcumulado += `<li class="camada_item">
                    <img src="${icebergDados[i].imagem}">
                    <p>${icebergDados[i].texto}</p>
                    </li>`;
    }

    lista.innerHTML = itensListaAcumulado;
};
//aqui a função recebe icebergDados como parâmetro. Pelo uso do for perceb-se que o parametro é um array e vai ser utilizado ao longo de
//toda a função. Qualquer função vai rodar somente quando eu chamar a carrega tudo 
//(ela vai ser um inicializador de funções com parametros escolhidos)

function renderizaEaster (easterDados) {

    const listaEaster = document.getElementById("easter");
    if(!listaEaster) return;

    let itensEasterAcumulado = "";

    for(let i=0; i< easterDados.length; i ++){
        itensEasterAcumulado += `<li class="camada_item">
        <p>${easterDados[i].texto}</p></li>`;
    }

    listaEaster.innerHTML = itensEasterAcumulado;
}

function renderizaFilosofia (filosofiaDados) {
    const listaFilosofia = document.getElementById("filosofia");
    if(!listaFilosofia) return;

    let itensFilosofiaAcumulado = "";

    for(i=0; i< filosofiaDados.length; i++){
        itensFilosofiaAcumulado += `<li class="camada_filosofia">
            <p>${filosofiaDados[i].titulo}</p>
            <p>${filosofiaDados[i].texto}</p></li>`;
    }

    listaFilosofia.innerHTML = itensFilosofiaAcumulado;
}

function renderizaCriador (criadorDados) {
    document.querySelector("#biografia").textContent = criadorDados;
}

carregaTudo();