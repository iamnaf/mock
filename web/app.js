"use strict";
String.prototype.format = function(){
    var i = 0;
    var args = arguments;
    return this.replace(/{}/g,function(){
        return typeof args[i] != "undefined" ? args[i++]: "";
    });
}

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
var ot = dbh.getOptionTable();

db.serialize(function(){
    db.run("PRAGMA foreign_keys = ON");
    db.run("CREATE TABLE IF NOT EXISTS {} ({} TEXT PRIMARY KEY NOT NULL, {} TEXT);".format(ft.name,ft.columns[0],ft.columns[1]));
    db.run("CREATE TABLE IF NOT EXISTS {} ({} TEXT PRIMARY KEY NOT NULL, {} TEXT, {} TEXT NOT NULL, FOREIGN KEY({}) REFERENCES {}({}));".format(dt.name,dt.columns[0],dt.columns[1],dt.columns[2],dt.columns[2],ft.name,ft.columns[0]));
    db.run("CREATE TABLE IF NOT EXISTS {} ({} TEXT PRIMARY KEY NOT NULL, {} TEXT, {} TEXT, {} INTEGER, {} TEXT NOT NULL, FOREIGN KEY({}) REFERENCES {}({}));".format(ct.name,ct.columns[0],ct.columns[1],ct.columns[2],ct.columns[3],ct.columns[4],ct.columns[4],dt.name,dt.columns[0]));
    db.run("CREATE TABLE IF NOT EXISTS {} ({} TEXT PRIMARY KEY NOT NULL, {} TEXT, {} TEXT NOT NULL, FOREIGN KEY({}) REFERENCES {}({}));".format(qt.name,qt.columns[0],qt.columns[1],qt.columns[2],qt.columns[2],ct.name,ct.columns[0]));
    db.run("CREATE TABLE IF NOT EXISTS {} ({} TEXT, {} TEXT ,{} TEXT, {} TEXT, {} TEXT NOT NULL, FOREIGN KEY({}) REFERENCES {}({}));".format(ot.name,ot.columns[0],ot.columns[1],ot.columns[2],ot.columns[3],ot.columns[4],ot.columns[4],qt.name,qt.columns[0]));
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
