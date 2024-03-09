const express = require("express");
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
const port = 3000;


const Users = mongoose.model('Users', {
    name: String,
    senha: String,
    age: Number,
    image_url: String
});


app.get('/inicio', (require, response) => {
    response.send("API Running")
});

app.delete('/delete/:id', async (request, response) => {
    const users_delete = await Users.findByIdAndDelete(request.params.id)
    return response.send(users_delete)
});

app.put("/update/:id", async (request, response) => {
    const update_user = await Users.findByIdAndUpdate(request.params.id, {
        name: request.body.name,
        senha: request.body.senha,
        age: request.body.age,
        image_url: request.body.image_url
    }, {
        new: true
    });

    return response.send(update_user)
});


app.get('/users', async (request, response) => {
    const users_list = await Users.find();
    response.send(users_list)
});


app.post(('/cadastro'), async (request, response) => {
    const users_cadastro = new Users({
        name: request.body.name,
        senha: request.body.senha,
        age: request.body.age,
        image_url: request.body.image_url
    })

    await users_cadastro.save();
    return response.send(users_cadastro)
});


app.listen(port, () => {
    mongoose.connect('mongodb+srv://test:test@test.teste.mongodb.net/?retryWrites=true&w=majority&appName=teste');
    console.log("Api funcionando")
});
