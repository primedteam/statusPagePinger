var tcpp = require('tcp-ping');
var config = require('./config.json');
var http = require('https');

function call() {
    tcpp.ping({ address: config.ip }, function(err, returnData) {
        if (err) return console.log(err);
   
        var url = config.apiBase + '/pages/' + config.pageId + '/metrics/' + config.metricId + '/data.json';
        var options = { method: 'POST', headers: { 'Authorization': 'OAuth ' + config.apiKey } };

        var data = {
            timestamp: Math.floor(new Date() / 1000),
            value: returnData.avg,
        };
        var request = http.request(url, options, function (res) {
            if (res.statusMessage === "Unauthorized") {
              console.log("Error encountered. Please ensure that your page code and authorization key are correct.");
            }
            res.on("data", function () {
              console.log("Submitted avg ping of " + returnData.avg + "ms!");
            });
            res.on("end", function () {});
            res.on("error", (error) => {
              console.error(`Error caught: ${error.message}`);
            });
          });
         
          request.end(JSON.stringify({ data: data }));
    });
}

call()
setInterval(call, (config.call * (60 * 1000)))