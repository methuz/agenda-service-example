const host = 'http://www.google.com'
const request = require('request')

module.exports = function(agenda) {
    agenda.define('request url', function(job, done) {
        let url = job.attrs.data.url;
        request(host, done)
    })
}
