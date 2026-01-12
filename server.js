import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {

   const users = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(users); /* 201 é status de criado */
});

app.get('/users', async (req, res) => {

    let users = [];

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                email: req.query.email,
                name: req.query.name,
                age: req.query.age ? Number(req.query.age) : undefined
            }
        });
    } else {
        users = await prisma.user.findMany();
    }

    res.status(200).json(users);
});

app.put('/users/:id', async (req, res) => { //o :id é um parâmetro (variavel) dinâmico e oq faz isso é o :

    await prisma.user.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(200).json({ message: 'User updated successfully' });
});

app.delete('/users/:id', async (req, res) => { //o :id é um parâmetro (variavel) dinâmico e oq faz isso é o :

    await prisma.user.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json({ message: 'User deleted successfully' });
});

app.listen(3000);