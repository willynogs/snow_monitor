var sn = require('../config/sn');
var btoa = require('btoa');
var unirest = require('unirest');

module.exports = function(instance){
    var url = `https://${instance}.service-now.com/api/now/table/sys_upgrade_history?sysparm_query=from_version!=n/a^ORfrom_version=NULL^ORDERBYupgrade_finished`;
    return unirest.get(url).headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(sn.username + ':' + sn.password)});
};
