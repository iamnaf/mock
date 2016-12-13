"use strict"
var Helper = require("./helper.js");
var sqlite3 = require("sqlite3").verbose();
var dbh = require("./dbhelper.js");
var Faculty = require("./models/faculty.js");
var Department = require("./models/department.js");
var Course = require("./models/course.js");
var Question = require ("./models/question.js");
var Option = require("./models/option.js")
var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");

var db = new sqlite3.Database(dbh.getName());
var ft = dbh.getFacultyTable(); 
var dt = dbh.getDepartmentTable();
var ct = dbh.getCourseTable();
var qt = dbh.getQuestionTable();
var ot = dbh.getOptionTable();

function homeRequested(query,method,response){
    if(method === "GET"){
        response.writeHead(200,{"Content-Type":"text/json"});
        response.write(JSON.stringify(Helper.getRoots()));
        response.end();
    }
    else{
        response.writeHead(404,{"Content-Type":"text/plain"});
        response.write("404 Not found");
        response.end();
    }
        

}

function facultyRequested(query,method,response){
    meth[method](ft,"*",query,Faculty,response);
}
function departmentRequested(query,method,response){
    meth[method](dt,"*",query,Department,response);

 }
function courseRequested(query,method,response){
    meth[method](ct,"*",query,Course,response);
}
function questionRequested(query,method,response){
    meth[method](qt,"*",query,Question,response);
}
function optionRequested(query,method,response){
    meth[method](ot,"*",query,Option,response)
}



function getMethod(table,columns,query,clas,response){
    var result = [];
    var qs = Helper.toSelectQuery(columns,table,query);
    db.each(qs,
    function(err,row){
        var props = Helper.getListOfObjectProps(row);
        var nObject = new clas();
        for(var i = 0;i<props.length;i++){
            nObject[props[i]] = row[props[i]];
        }
        result.push(nObject);

    },
    function(err,val){
        response.writeHead(200,{"Content-Type":"text/json"});
        response.write(JSON.stringify(result));
        response.end();

    });

}
function postMethod(table,columns,query,clas,response){
    if(Helper.isObjectEmpty(query)){
        console.log("no query"); 
        response.write("No data to be inserted");
        response.end();
        return;
    }
    var qs = Helper.toInsertQuery("letmepass",table,query);
    db.serialize(function(){
        db.run("PRAGMA foreign_keys = ON");
        db.exec(qs,function(err){
            if(err){
                console.log("insert not successful");
                console.log(err);
                response.write("insert not succesful");
                response.end();
                return

            }
            response.writeHead(200,{"Content-Type":"text/plain"});
            response.write("insert succesful");
            response.end();

        });

    });
    

}

var handle = {};
handle[Helper.getRoot()] = homeRequested;
handle[Helper.getRootFaculty()] = facultyRequested;
handle[Helper.getRootDepartment()] = departmentRequested;
handle[Helper.getRootCourse()] = courseRequested;
handle[Helper.getRootQuestion()] = questionRequested;
handle[Helper.getRootOption()] = optionRequested;

var meth = {};
meth["GET"] = getMethod;
meth["POST"] = postMethod;



module.exports =  handle;