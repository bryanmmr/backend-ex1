const express = require('express')

const app = express()
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
app.get('/api/persons',(req, res) => {
    res.json(data)
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.write(`Phonebook has info for ${data.length} people\n`)
    res.write(date.toString())
    res.end()
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})