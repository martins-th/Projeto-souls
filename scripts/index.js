
function loadComponent(id, path) {
    return fetch(path) 
        .then(resposta => resposta.text())
        .then(dados => {
            document.getElementById(id).innerHTML = dados;
        })
        .catch(erro => console.error('Erro ao carregar componente', erro));
};

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

console.log("quem leu é gay");
