# statusPagePinger
A Status Page to test your server ping!


## Config

```
ip: The ip you will want to ping 
    (default = 1.1.1.1)
call: How many mins to wait to reping
    (default = 1)
apiBase: The url to call to report to statuspage.io
metricId: the metric to send it to
pageId: The status page
apiKey: Can be found in the api page of statuspage.io
```

## Start Here
1. npm install
2. edit config
3. npm start OR pm2 start