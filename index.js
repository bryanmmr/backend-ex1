const { response } = require('express')
const express = require('express')

const app = express()
app.use(express.json())
const port = 3001
const data = [{
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
},
{
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-444242'
},
{
    id: 3,
    name: 'Dan Abramov',
    number: '123-1234124'
},
{
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-64342132'
}]
app.get('/',(req, res) => {
    res.send('hello')
})
// 1.1
app.get('/api/persons',(req, res) => {
    res.json(data)
})

// 1.2
app.get('/info', (req, res) => {
    const date = new Date()
    res.write(`Phonebook has info for ${data.length} people\n`)
    res.write(date.toString())
    res.end()
})

// 1.3
app.get('/api/persons/:id', (req, res) => {
    const element = data.find(element => element.id === Number(req.params.id))
    return !element ? res.status(404).end() : res.json(element)
})

// 1.4
app.delete('/api/persons/:id', (req, res) => {
    const element = data.find(element => element.id === Number(req.params.id))
    return !element ? res.status(404).end() : res.status(204).end()
})

// 1.5 y 1.6
app.post('/api/persons', (req, res) => {
    const newData = req.body
    if(!newData.name){
        return res.status(400).json({"error" : "Falta el nombre"})
    }
    else if (!newData.number){
        return res.status(400).json({"error" : "Falta el numero"})
    }
    else if (data.find(element => element.name === newData.name)){
        return res.status(409).json({"error" : "Nombre repetido"})
    }
    newData.id = Math.floor(Math.random()*0x10000)
    data.push(newData)
    res.status(201).json(data)
})


app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})