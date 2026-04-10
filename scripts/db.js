//estou chamando o driver do mysql2 pra uma variável (pegamos a referência do package.json e usamos através dessa variável)
const mysql = require ('mysql2/promise');
//criando o banco que dados que vamos utilizar (no caso, já ta criado e nós só colocamos os mesmos dados que estavam no docker compose)
const db = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: 'senha',
    database: 'souls_db'
});

//permite que esse banco (db) seja exportado para qualquer arquivo desse projeto.
module.exports = db;