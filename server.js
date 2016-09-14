const Agenda = require('agenda')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/agenda'
const agenda = new Agenda({
  db: {
    address: MONGO_CONNECTION_STRING,
    collection: 'jobs'
  },
  defaultlocklimit: 5000
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))


app.post('/request', function(req, res) {
  var query = req.body;

  if (!query.hasOwnProperty('url')) {
    res.sendStatus(422);
    return;
  }

  var requestJob = agenda.create('request url', {
    'something': Math.random(),
    'url': query.url
  })

  requestJob.unique({
    'data.url': 1
  })

  requestJob.save();
  res.end()
})

app.listen(3000)
