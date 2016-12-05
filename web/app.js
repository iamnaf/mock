"use strict";
var route = require("./router.js");
var Faculty = require("./models/faculty.js");
var Department = require("./models/department.js");
var Course = require("./models/course.js");
var Question = require ("./models/question.js");
var sqlite3 = require("sqlite3").verbose();
var poster = require("./posthandler.js");
var purl = require("url");
var querystring = require("querystring");


var db = new sqlite3.Database("storage.db");
db.serialize(function(){
    db.run("CREATE TABLE IF NOT EXISTS faculty (name TEXT, xid TEXT);");
    db.run("CREATE TABLE IF NOT EXISTS department (name TEXT, xid TEXT, fxid TEXT);");
    db.run("CREATE TABLE IF NOT EXISTS course (title TEXT,code TEXT, xid TEXT, dxid TEXT);");
    db.run("CREATE TABLE IF NOT EXISTS question (title TEXT,answer TEXT, xid TEXT, cxid TEXT);");
    
});
db.close();





function sunction(req,res){
    if(req.method === "GET"){
        route(req.url,res);
    }
    else if(req.method === "POST"){
        poster(req.url,res);
    }
    else res.end();
    
}

var http = require("http");
var server = http.createServer(sunction);
server.listen(8080);
