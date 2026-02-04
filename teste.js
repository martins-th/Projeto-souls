console.log("inicio do server");

const express = require("express");
const app = express();
const {engine} = require("express-handlebars");

app.use(express.static('public'));

//configurações
    //template engine
    //definindo o layout padrão
    app.engine('handlebars', engine({defaultLayout: 'main'}))
    //definir a engine padrao (sempre que eu não especificar o tipo de engine, o node entende que é o handlebars)
    app.set('view engine', 'handlebars')

//rotas
    app.get('/universo', function(req, res) {
        res.render('universo');
    });

    app.get('/', function(req, res){
        res.render('home')
    })

    app.get('/personagens', function(req, res) {
        res.render('personagens')
    })


app.listen(8081, function(){
    console.log("Server rodando!");
})