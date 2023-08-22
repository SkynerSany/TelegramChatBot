import axios from 'axios'
// import fs from 'fs-extra'
// import { join } from 'path'
import bodyParser from 'body-parser';
import { config } from 'dotenv'
import express from 'express'

config()
const app = express()

const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`

app.use(bodyParser.json());
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }))

app.post('/newMessage', async (req, res) => {
  const { message } = req.body
  console.log(message);
  const messageText = message?.text?.toLowerCase()?.trim()
  const chatId = message?.chat?.id
  console.log('chatId:' + chatId);
  if (!messageText || !chatId) {
    return res.sendStatus(400)
  }

  let responseText = 'I have nothing to say.'
  // generate responseText
  if (messageText === 'joke') {
    responseText = 'If Rusya Huy its normal'
  }

  // send response
  try {
    console.log('ttttttttttttttttttt')
    await axios.post(TELEGRAM_URI, {
      chat_id: chatId,
      text: responseText
    })
    res.send('Done')
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})