var sn = require('../config/sn');
var btoa = require('btoa');
var unirest = require('unirest');

// method for the servicenow table api
module.exports = function(groups){
    var arr = groups.split(",");
    var str = "assignment_group=" + arr.join("^ORassignment_group=");
    var url = `https://${sn.instance}.service-now.com/api/now/table/task?sysparm_query=${str}^active=true^sys_class_name!=sysapproval_group^sys_class_name=incident&sysparm_display_value=all`;
    return unirest.get(url).headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(sn.username + ':' + sn.password)});
};
