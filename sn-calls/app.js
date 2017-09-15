var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var SN = require('../models/servicenow');
var snTable = require("./table");
var snChange = require("./change");
var snIncident = require("./incident");
var snVersion = require("./version");

// method for the servicenow table api
module.exports = function(){
  snChange("7c76ca722be1a140c0d5696d59da15bb,4d82689741572940565c6f3e39172a00,bfa318476f083604deec5ddd5d3ee44a,ad1a97462b986608d849bdbee8da1543,d22b89d0ff686440b82b391d087efe06,2367eca813691e407d0bbd122244b046,5f721d93c0a8010e015533746de18bf9")
    .end(response => {
      if(response.status == 200) {
        var nw = new SN;
        nw.type = "team-change";
        nw.data = response.body;
        nw.save(function(err, doc){
          if(err) { console.log(err); }
        });
      } else {
        console.log('bad');
      }
    });

  snIncident("7c76ca722be1a140c0d5696d59da15bb,4d82689741572940565c6f3e39172a00,bfa318476f083604deec5ddd5d3ee44a,ad1a97462b986608d849bdbee8da1543,d22b89d0ff686440b82b391d087efe06,2367eca813691e407d0bbd122244b046,5f721d93c0a8010e015533746de18bf9")
    .end(response => {
      if(response.status == 200) {
        var nw = new SN;
        nw.type = "team-incident";
        nw.data = response.body;
        nw.save(function(err, doc){
          if(err) { console.log(err); }
        });
      } else {
        console.log('bad');
      }
    });

  snVersion('osuitsm')
    .end(response => {
      handleVersion(response);
    });
  snVersion('osuitsmdev')
    .end(response => {
      handleVersion(response);
    });
  snVersion('osuitsmtest')
    .end(response => {
      handleVersion(response);
    });
  snVersion('osuittraining')
    .end(response => {
      handleVersion(response);
    });
  snVersion('osuituat')
    .end(response => {
      handleVersion(response);
    });

  function handleVersion(response) {
    var raw = response.body.result.pop();
    var ver = raw.to_version.split('-');
    var patch = ver[4].split('__')[1];
    var res = ver[1] + ' ' + patch;
    console.log(res);
  }
};
