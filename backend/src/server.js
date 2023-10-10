const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())

const PORT = process.env.PORT || 5000

app.get('/',(req, res, next)=>{
    res.send([
        {
            name: 'hieu',
            value:'1'
        },
        {
            name: 'kaka',
            value: '2'
        }

    ])
})

app.listen(PORT, ()=>{
    console.log(`${PORT} is running...`)
})