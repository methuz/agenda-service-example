const Agenda = require('agenda');

const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/agenda'
const agenda = new Agenda(MONGO_CONNECTION_STRING);

const jobTypes = process.env.JOB_TYPES ? process.env.JOBTYPES.split(',') : [];

jobTypes.forEach(function(type) {
    require('./lib/jobs/' + type)(agenda);
})

if (jobTypes.length) {
    agenda.start();
}

agenda.start();

module.exports = agenda;
