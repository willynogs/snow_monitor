var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var SN = require('../models/servicenow');
var router = express.Router();
var sn = require('../sn-calls/table');

router.post('/servicenowtest', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
    sn(req.body.table, req.body.query, req.body.limit)
        .end(response => {
            if(res.code == 200) {
                var nw = new SN;
                nw.table = tableName;
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

module.exports = router;
