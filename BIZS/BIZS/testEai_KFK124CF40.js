var axios = require('axios');
var data = JSON.stringify({
  "custIdnfr": "1006756394"  
});

var config = {
  method: 'post',
  url: 'http://10.141.32.52:1950/KFK124CF40/SOC',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'APIkey VMP4iLpNSTKxgxXm6sNgtF62a1651703470979_okE7S43o0r6eh33hPvbNuuNB6'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

