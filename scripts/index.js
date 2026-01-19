//criando função pra replicar header e footer

function loadComponent(id, path) {
    return fetch(path) 
        .then(resposta => resposta.text())
        .then(dados => {
            document.getElementById(id).innerHTML = dados;
        })
        .catch(erro => console.error('Erro ao carregar componente', erro));
};

//função pra menu cascata

function carregaMenu() {
    const botao1=document.getElementById('btn_cascata1');
    const botao2=document.getElementById('btn_cascata2');

    if(botao1){
        botao1.addEventListener('click', () => {
            document.querySelector('.botao1_lista').classList.toggle('aberto');
        });
    }
    
    if(botao2){
        botao2.addEventListener('click', ()=> {
            document.querySelector('.botao2_lista').classList.toggle('aberto');
        });
    }
}

loadComponent ('header_placeholder', '/paginas/header.html').then( () => {
    carregaMenu();
});

loadComponent ('footer_placeholder', '/paginas/footer.html');


//comportamento de botão ao interagir com a página para o menu cascata

document.addEventListener('click', (event) => {
    const btn1=document.getElementById('btn_cascata1');
    const lista1=document.querySelector('.botao1_lista');

    const btn2=document.getElementById('btn_cascata2');
    const lista2=document.querySelector('.botao2_lista');

    if (btn1 && lista1.classList.contains('aberto')) {
        const clicouNoBotao1 = btn1.contains(event.target);
        const clicouNoMenu1 = lista1.contains(event.target);

        if(!clicouNoBotao1 && !clicouNoMenu1) {
            lista1.classList.remove('aberto');
        }
    }

    if (btn2 && lista2.classList.contains('aberto')) {
        const clicouNoBotao2 = btn2.contains(event.target);
        const clicouNoMenu2 = lista2.contains(event.target);

        if(!clicouNoBotao2 && !clicouNoMenu2) {
            lista2.classList.remove('aberto');
        }
    }
})

//interação com JSON
//função para puxar os dados do json 
function carregaDados () {
    fetch("../personagens.json")
        .then(resposta => resposta.json())
        .then(personagens => {
            const catalogo = document.querySelector("#catalogo_personagens")

            personagens.map(personagem => {
                const card = document.createElement("div")
                card.classList.add("card")

                const img = document.createElement("img")
                img.src = personagem.imagem
                img.alt = personagem.nome

                const npc = document.createElement("h3")
                npc.textContent = personagem.nome

                const link = document.createElement("a")
                link.href = `./individual.html?id=${personagem.id}`
                link.textContent = "Saiba mais"

                card.appendChild(img)
                card.appendChild(npc)
                card.appendChild(link)

                catalogo.appendChild(card)
            })
        })
}

carregaDados()
//caso de erro de carregamento na imagem, abra o log e veja qual ta sendo a referencia do GET
//o arquivo json sempre vai informar o diretorio a ser aberto a partir do diretorio do html que o chamar!!!!!!

