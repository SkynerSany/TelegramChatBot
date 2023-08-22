const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

// Токен вашего бота, полученный от BotFather
const token = '6450005981:AAHBINvOdwmyvUtxAOzfbresVKqPUEarQyQ';

// Создаем экземпляр Express
const app = express();
app.use(bodyParser.json());

// Маршрут для обработки входящих сообщений
app.post('/message', (req, res) => {
  // Получаем текст сообщения из запроса
  const { message } = req.body;
  const { chat } = message;
  const chatId = chat.id;
  const text = message.text;

  // Отвечаем на сообщение
  const response = {
    chat_id: chatId,
    text: `Согласен - ${text}`
  };

  // Отправляем ответ об успешной обработке запроса
  res.sendStatus(200);

  // Отправляем ответное сообщение бота
  const postData = JSON.stringify(response);
  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${token}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      // Обработка ответа от Telegram API, если необходимо
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(postData);
  req.end();
});

// Запускаем сервер
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});