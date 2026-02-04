const Sequelize = require('sequelize');
const sequelize = new Sequelize ('test', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(function() {
    console.log("conexão realizada com sucesso")
})
.catch(function(erro) {
    console.log("falha ao se conectar: "+erro)
})

//criação de uma tabela
const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    }
})
//ativação para que o node se comunique com o server mysql
Usuario.sync()

