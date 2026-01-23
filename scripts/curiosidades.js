async function carregaIceberg () {
    try {
        const resposta = await fetch("../curiosidades.json");
        const dados = await resposta.json();

        const lista = document.getElementById("iceberg");

        let itensListaAcumulado = "";

        for(let i=0; i< dados.length; i ++ ) {
            if (i % 4 === 0){
                let numeroCamada = (i/4) + 1;
                itensListaAcumulado += `<li class="camada_titulo">Camada ${numeroCamada}</li>`;
            };

            itensListaAcumulado += `<li class="camada_item">
                        <img src="${dados[i].imagem}">
                        <p>${dados[i].texto}</p>
                        </li>`;
        }

        lista.innerHTML = itensListaAcumulado;

    }
    catch (erro) {
        console.error("erro ao carregar dados", erro);
    }
}

carregaIceberg();