import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import {Configuration , OpenAIApi} from 'openai'

const app = express()
env.config()

app.use(cors())
app.use(bodyParser.json())

const configuration = new Configuration({
    organization : "org-7BTWF6Lol5MwHemoobTC2lG6",
    apiKey : process.env.API_KEY
})

const openai = new OpenAIApi(configuration)

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.post('/', async(req,res)=>{
    const {message} = req.body

    try {
        const response = await openai.createCompletion({
            model:"text-davinci-003",
            prompt:`${message}`,
            max_tokens:1000,
            temperature: .5
        })

        res.json({message:response.data.choices[0].text})
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})