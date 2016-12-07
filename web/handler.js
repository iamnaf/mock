"use strict"
var Helper = require("./helper.js");
var sqlite3 = require("sqlite3").verbose();
var dbh = require("./dbhelper.js");
var Faculty = require("./models/faculty.js");
var Department = require("./models/department.js");
var Course = require("./models/course.js");
var Question = require ("./models/question.js");
var sqlite3 = require("sqlite3").verbose();


var db = new sqlite3.Database(dbh.getName());
var ft = dbh.getFacultyTable(); 
var dt = dbh.getDepartmentTable();
var ct = dbh.getCourseTable();
var qt = dbh.getQuestionTable();

function  insertError(err){
    if(err){
        console.log("insert not successful");
        console.log(err);
        return;
    }       
    console.log("insert succesful")
}
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
    if(method === "GET"){
        var faculties = [];
        var qs = Helper.toSelectQuery("*",ft,query);
        db.each(qs,
        function(err,row){
            var nFaculty = new Faculty(row.name,row.xid);
            faculties.push(nFaculty);

        }
        ,function(err,val){
            response.writeHead(200,{"Content-Type":"text/json"});
            response.write(JSON.stringify(faculties));
            response.end();

        });

    }
    else if(method === "POST"){
        var qs = Helper.toInsertQuery("letmepass",ft,query);
        db.exec(qs,insertError);
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("insert succesful");
        response.end();

    }
    else{
        response.writeHead(404,{"Content-Type":"text/plain"});
        response.write("404 Not found");
        response.end();

    }
         

}
function departmentRequested(query,method,response){
    if(method==="GET"){
        var departments = [];
        var qs = Helper.toSelectQuery("*",dt,query);
        db.each(qs,
            function(err,row){
                var nDepartment = new Department(row.name,row.xid,row.fxid);
                departments.push(nDepartment);
            },
            function(err,val){
                response.writeHead(200,{"Content-Type":"text/json"});
                response.write(JSON.stringify(departments));
                response.end();
            });

    }
    else if(method === "POST"){
        var qs = Helper.toInsertQuery("letmepass",dt,query);
        db.exec(qs,insertError);
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("insert successful");
        response.end();

    }
    else{
        response.writeHead(404,{"Content-Type":"text/plain"});
        response.write("404 Not found");
        response.end();
    }

 }
function courseRequested(query,method,response){
    if(method === "GET"){
        var courses = [];
        var qs = Helper.toSelectQuery("*",ct,query);
        db.each(qs,
        function(err,row){
            var nCourse = new Course(row.title,row.code,row.xid,row.dxids);
            courses.push(nCourse);
        },
        function(err,val){
            response.writeHead(200,{"Content-Type":"text/json"});
            response.write(JSON.stringify(courses));
            response.end();
        });

    }
    else if(method === "POST"){
        var qs = Helper.toInsertQuery("letmepass",ct,query);
        db.exec(qs,insertError);
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("insert succesful");
        response.end();

    }
    else{
        response.writeHead(404,{"Content-Type":"text/plain"});
        response.write("404 Not found");
        response.end();
    }
}
function questionRequested(query,method,response){
    if(method === "GET"){
        var questions = [];
        var qs = Helper.toSelectQuery("*",qt,query);
        db.each(qs,
        function(err,row){
            var nQuestion = new Question(row.title,row.answer,row.xid,row.cxid);
            questions.push(nQuestion);

         },
        function(err,val){
            response.writeHead(200,{"Content-Type":"text/json"});
            response.write(JSON.stringify(questions));
            response.end();

        });

    }
    else if(method === "POST"){
        var qs = Helper.toInsertQuery("letmepass",qt,query);
        db.exec(qs,insertError);
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("insert succesful");
        response.end();

    }
    else{
        response.writeHead(404,{"Content-Type":"text/plain"});
        response.write("404 Not found");
        response.end();
    }

}

var handle = {};
handle["/"] = homeRequested;
handle["/faculties"] = facultyRequested;
handle["/departments"] = departmentRequested;
handle["/courses"] = courseRequested;
handle["/questions"] = questionRequested;



module.exports =  handle;