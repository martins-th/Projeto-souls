async function carregaHistorias() {
    //cria um objeto pra armazenar os parametros da url
    const parametros = new URLSearchParams(window.location.search)
    const id = parametros.get("id")
    //faz a procura do arquivo json (mais uma forma de escrever, diferente da função acima)
    const resposta = await fetch("../personagens.json")
    const dados = await resposta.json()
    const personagens = dados.find(personagem => personagem.id === id) 
    //nessa linha, nos procuramos saber se o id do personagem no loop é o mesmo da url

    //agora iremos localizar o arquivo txt e transformar ele em texto (o fetch devolve em string e o .text transforma em texto)
    const respostaTxt = await fetch(personagens.historia)
    const texto = await respostaTxt.text()

    //agora basta associar os itens do arquivo json ao espaço correspondente no html
    document.querySelector("#foto-personagem").src = personagens.imagem
    document.querySelector("#nome-personagem").textContent = personagens.nome
    document.querySelector("#texto-personagem").textContent = texto
    //a ultima é diferente pois armazenamos o texto encontrado na propria variável a depender do id
}

carregaHistorias()