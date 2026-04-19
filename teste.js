console.log("inicio do server");
//crio a variável (coloquei o mesmo nome db porque estão em arquivos diferentes) e esse require faz a referência ao arquivo db que a gente escreveu
//esse padrão require e module exports é devido ao express que estamos usando (é um framework node.js)
const db = require('./scripts/db');

const express = require("express");
const app = express();
const { engine } = require("express-handlebars");

app.use(express.static('public'));

//configurações
//template engine
//definindo o layout padrão
app.engine('handlebars', engine({ defaultLayout: 'main' }))
//definir a engine padrao (sempre que eu não especificar o tipo de engine, o node entende que é o handlebars)
app.set('view engine', 'handlebars')

//rotas
app.get('/universo', function (req, res) {
    res.render('universo');
});

app.get('/', function (req, res) {
    res.render('home')
});

app.get('/personagens', async (req, res) => {
    try {
        //criamos variáveis que irão armazenar as linhas do banco de dados de acordo com o comando execute escolhido (nesse caso, usando linguagem sql)
        //no código comentado abaixo, ele faz 3 solicitações com await, ou seja, espera a primeira acabar e depois segue. O segundo jeito é mais eficiente.
        /*const [rows_npc] = await db.execute('SELECT * FROM personagens WHERE tipo = 1');
        const [rows_boss] = await db.execute('SELECT * FROM personagens WHERE tipo = 2');
        const [rows_inimigos] = await db.execute('SELECT * FROM personagens WHERE tipo = 3');*/
        const [[rows_npc], [rows_boss], [rows_inimigos]] = await Promise.all([
            db.execute('SELECT * FROM personagens WHERE tipo = 1'),
            db.execute('SELECT * FROM personagens WHERE tipo = 2'),
            db.execute('SELECT * FROM personagens WHERE tipo = 3')
        ])
        //aqui o primeiro personagens é o arquivo do handlebars, o segundo é a tabela do db. (uma dica é a cor do db acima com o personagens abaixo)
        //a ideia é ter uma variável para cada consulta relativo a cada tipo de personagem (npc, boss e inimigos)
        //pelo fato de a res fechar o contato com o navegador, o ideal é entregar sempre uma resposta por consulta, então isso diz "renderiza la no personagens.handlebars esses caras aqui"
        res.render('personagens', { personagens_npc: rows_npc, personagens_boss: rows_boss, personagens_inimigos: rows_inimigos });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar personagens");
    }
});

//elaborando a rota que será a rota de amostragem da história dos personagens
//temos que :nome é uma variável para o express (nome que vai ser o do personagem)
//fizemos uma checagem para ver se o banco de fato escolhe a primeira linha que conseguir sobre o nome que solicitamos
//se tiver resposta, seremos redirecionados para a página individual e ai ela será preenchida com o conteudo que forma a linha que obtivemos como resposta
app.get('/personagens/:nome', async (req, res) => {
    const nomeRecebido = req.params.nome; //aqui temos o armazenamento do nome da requisição (resultado do clique no card)

    //foi necessário aqui usar um join porque estou relacionando a tabela lore_personagens com a 
    //tabela personagens utilizando um id de uma como chave estrangeira da outra.
    //Por convenção, utilizamos uma variável para armazenar o comando sql para facilitar a manutenção
    try {
        const query = `SELECT personagens.*, lore_personagens.lores 
        FROM personagens 
        INNER JOIN lore_personagens 
        ON personagens.lore = lore_personagens.id
        WHERE personagens.nome = ?`;

        const [rows] = await db.execute(query, [nomeRecebido]);

        if(rows.length > 0){
            res.render('individual', {personagens: rows[0]});
        }else{
            res.status(404).send("personagem não encontrado");
        }
    } catch (error) {
        console.log("O erro exato é: " + error);
        res.status(500).send("erro interno");
    }
})

/*app.get('/curiosidades', async (req, res) => {
    try {
        //esse é o mesmo tipo de consulta que fizemos no caso dos personagens (caso seja um sistema que cresça, teremos que mudar em vários lugares)
        //sei que não irá crescer, mas temos outras formas de fazer isso.
        const [[rows_camada1], [rows_camada2], [rows_camada3], [rows_camada4], [rows_camada5], [rows_camada6]] = await Promise.all([
            db.execute('SELECT * FROM curiosidades WHERE camada = 1'),
            db.execute('SELECT * FROM curiosidades WHERE camada = 2'),
            db.execute('SELECT * FROM curiosidades WHERE camada = 3'),
            db.execute('SELECT * FROM curiosidades WHERE camada = 4'),
            db.execute('SELECT * FROM curiosidades WHERE camada = 5'),
            db.execute('SELECT * FROM curiosidades WHERE camada = 6')
        ]);

        res.render('curiosidades', { curiosidades_c1: rows_camada1, curiosidades_c2: rows_camada2, curiosidades_c3: rows_camada3, curiosidades_c4: rows_camada4, curiosidades_c5: rows_camada5, curiosidades_c6: rows_camada6 });
    } catch (error) {
        console.error(error);
        res.status(500).send("erro ao carregar camadas");
    }
})
*/

//fazendo de outro modo
//deixei a rota diferente pra não dar conflito, se der certo eu mantenho esse e comento o outro.
app.get ('/curiosidades', async (req, res) =>{
    try {
        //farei uma única consulta ao banco
        const [todasAsLinhas] = await db.execute('SELECT * FROM curiosidades ORDER BY camada ASC');
        //agora criamos um objeto/array vazio para definir as camadas
        const camadas = {};
        //criamos a lógica de iteração para cada camada
        //forEach passa por cada posição do array fazendo alguma coisa. Nesse caso, ele chama cada posição de item e verifica se existe um array com o valor daquela camada
        //nessa consulta ele cria arrays para cada camada.
        todasAsLinhas.forEach(item => {
            if(!camadas[item.camada]) {      //aqui ele passa pela coluna camada de cada item dos dados que vieram do banco e verifica se já existe um array vazio com aquela numeração de camada
                camadas[item.camada] = []; //cria o array para a camada
            }
            camadas[item.camada].push(item); //se o item analizado tem a mesma camada do item.camada, então o item (linha do db) vai ser colocado dentro do array dessa camada;
        });

        //agora tentando fazer rodar sem nenhuma dúvida com a IA
        //por estar usando o hbs, tenho que entregar tudo renderizado especificando a página a ser carregada e as relações que cada item vai ter, então:
        //posso renderizar grupo a grupo especificando laços para cada section que eu fizer no html:
        //res.render('curiosidades', {curiosidades_c1: camadas[1], curiosidades_c2: camadas[2], curiosidades_c3: camadas[3], curiosidades_c4: camadas[4], curiosidades_c5: camadas[5], curiosidades_c6: camadas[6]});
        //ou renderizar tudo de uma só vez e conseguir escrever somente uma section no html deixando menos poluido ainda
        //já que tudo tá armazenado na const camadas, preciso somente renderizar isso e depois criar a estrutura html pra poder repetir
        res.render('curiosidades', {camadas});
    } catch (error){
        console.error(error);
        res.status(500).send("erro ao carregar camadas");
    }
})

app.listen(8081, function () {
    console.log("Server rodando!");
})