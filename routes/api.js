var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var SN = require('../models/servicenow');
var router = express.Router();
var snTable = require('../sn-calls/table');
var snChange = require('../sn-calls/change');

router.post('/servicenowtest', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
    snTable(req.body.table, req.body.query, req.body.limit)
        .end(response => {
            if(res.code == 200) {
                var nw = new SN;
                nw.type = tableName;
                nw.data = res.body;
                nw.save(function(err, doc){
                    if(err) { console.log(err); }
                });
            } else {
                console.log('bad');
            }
            res.json(response);
        });
});

router.get('/change', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
    SN.findOne({type: "team-change"}).sort('-date').exec(function(err, doc){
      if(err) { console.log(err); }
      else {
        res.json(doc.data.result);
      }
    });
});

router.get('/incident', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
    SN.findOne({type: "team-incident"}).sort('-date').exec(function(err, doc){
      if(err) { console.log(err); }
      else {
        res.json(doc.data.result);
      }
    });
});

module.exports = router;
