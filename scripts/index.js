console.log(document.querySelector('.botao1'));
function loadComponent(id, path) {
    fetch(path) 
        .then(resposta => resposta.text())
        .then(dados => {
            document.getElementById(id).innerHTML = dados
        })
        .catch(erro => console.error('Erro ao carregar componente', erro));
}

loadComponent ('header_placeholder', '/paginas/header.html');



const botao1 = document.getElementById ('btn_cascata1');
const menu1 = document.getElementById ('menu_lores');

const botao2 = document.getElementById ('btn_cascata2');
const menu2 = document.getElementById ('menu_fontes');

botao1.addEventListener ('click', function() {
    menu1.classList.toggle('aberto')
});

botao2.addEventListener ('click', function() {
    menu2.classList.toggle('aberto')
})

window.onclick = function(event) {
    if(!event.target.matches('#btn_cascata1')) {
        if(menu1.classList.contains('aberto')) {
            menu1.classList.remove('aberto')
        }
    }

    if(!event.target.matches('#btn_cascata2')) {
        if(menu2.classList.contains('aberto')) {
            menu2.classList.remove('aberto')
        }
    }
}



