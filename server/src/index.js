const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connection = require('./config/db');
const UserMdoel = require("./model/userMdoel");

const app = express();
app.use(express.json())
app.use(cors())

// routes 
app.post('/login', async (req, res) => {
    const { name } = req.body
    try {
        const data = await UserMdoel.find({ name })
        if (data.length > 0) {
            res.status(200).send(data[0])
        } else {
            let user = new UserMdoel({ name })
            await user.save()
            res.status(200).send(user)
        }
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

// get all user detail 
app.get('/alluser', async (req, res) => {
    try {
        const data = await UserMdoel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

// update user score
app.patch('/userscore', async (req, res) => {
    let name = req.body.name
    try {
        const updatedUser = await UserMdoel.findOneAndUpdate({ name }, { score: req.body.score }, { new: true });
        res.json(updatedUser);
    } catch (error) {

    }
})


app.put('/pausegame', async (req, res) => {
    const userName = req.body.name
    try {
        const updatedUser = await UserMdoel.findOneAndUpdate({ name: userName }, { ...req.body }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const port = 8080;
app.listen(port, async () => {
    try {
        await connection
        console.log('connected to db..')
    } catch (error) {
        console.log('connection failed', error.message)
    }
    console.log(`Listenting on port ${port}...`)
}
);