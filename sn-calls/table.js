var sn = require('../config/sn');
var btoa = require('btoa');
var unirest = require('unirest');

// method for the servicenow table api
module.exports = function(tableName, query, limit){
    if(!query) { var query = ''; }
    if(!limit) { var limit = 50; }
    var url = `https://${sn.instance}.service-now.com/api/now/table/${tableName}?sysparm_query=${query}&sysparm_display_value=all&sysparm_limit=${limit}`;
    return unirest.get(url).headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(sn.username + ':' + sn.password)});
};
