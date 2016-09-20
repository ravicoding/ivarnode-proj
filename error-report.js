
var structuredLogger = require('fluent-logger').createFluentSender('nodeserver', {
  host: 'localhost',
  port: 24224,
  timeout: 3.0
});

var report = function (err, req) {
  var payload = {
    serviceContext: {
      service: 'myapp'
    },
    message: err.stack,
    context: {
      httpRequest: {
        url: req.originalUrl,
        method: req.method,
        referrer: req.header('Referer'),
        userAgent: req.header('User-Agent'),
        remoteIp: req.ip,
        responseStatusCode: 500
      }
    }
  };
  structuredLogger.emit('errors', payload);
};

module.exports = report;