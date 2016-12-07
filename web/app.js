"use strict";
var route = require("./router.js");
var purl = require("url");
var sqlite3 = require("sqlite3").verbose();
var querystring = require("querystring");
var dbh = require("./dbhelper.js");
var handle = require("./handler.js");
var Helper = require("./helper.js")


var db = new sqlite3.Database(dbh.getName());
var ft = dbh.getFacultyTable();
var dt = dbh.getDepartmentTable();
var ct = dbh.getCourseTable();
var qt = dbh.getQuestionTable();

db.serialize(function(){
    db.run("CREATE TABLE IF NOT EXISTS "+ft.name+"("+ft.columns[0]+" TEXT , "+ft.columns[1]+" TEXT);");
    db.run("CREATE TABLE IF NOT EXISTS "+dt.name+"("+dt.columns[0]+" TEXT, "+dt.columns[1]+" TEXT, "+dt.columns[2]+" TEXT );");
    db.run("CREATE TABLE IF NOT EXISTS "+ct.name+"("+ct.columns[0]+" TEXT, "+ct.columns[1]+" TEXT, "+ct.columns[2]+" TEXT, "+ct.columns[3]+" TEXT );");
    db.run("CREATE TABLE IF NOT EXISTS "+qt.name+"("+qt.columns[0]+" TEXT, "+qt.columns[1]+" TEXT, "+qt.columns[2]+" TEXT, "+qt.columns[3]+" TEXT );");
});
db.close();







function sunction(req,res){
    var pathname = purl.parse(req.url).pathname;
    var query = querystring.parse(purl.parse(req.url).query);
    var method = req.method;
    route(pathname,query,method,res,handle);
    
}

var http = require("http");
var server = http.createServer(sunction);
server.listen(8080);
