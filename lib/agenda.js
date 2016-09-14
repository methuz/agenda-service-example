const Agenda = require('agenda');

const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/agenda'
const agenda = new Agenda({
  db: {
    address: MONGO_CONNECTION_STRING,
    collection: 'jobs'
  },
  defaultlocklimit: 5000
})

agenda.on('ready', function() {
  let jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [];

  jobTypes.forEach(function(type) {
    require('./jobs/' + type)(agenda);
    console.log('loaded', type)
  })
  if (jobTypes.length) {
    agenda.start();
  }
})

agenda.on('error', function(err) {
    console.log(err);
})

module.exports = agenda;
