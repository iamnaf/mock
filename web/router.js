var purl = require("url");
var querystring = require("querystring");
var Faculty = require("./models/faculty.js");
var Department = require("./models/department.js");
var Course = require("./models/course.js");
var Question = require("./models/question.js");
var sqlite3 = require("sqlite3").verbose();
var dbh = require("./dbhelper.js");
var Helper = require("./helper.js");

var db = new sqlite3.Database(dbh.getName());
var ft = dbh.getFacultyTable(); 
var dt = dbh.getDepartmentTable();
var ct = dbh.getCourseTable();
var qt = dbh.getQuestionTable(); 



function route(url,res){
    var path = purl.parse(url).pathname;
    var query = querystring.parse(purl.parse(url).query);
    if(path === "/" && Helper.isObjectEmpty(query)){
        res.write(JSON.stringify(Helper.getRoots()));
        res.end();
    }
    else if(path === Helper.getRootFaculty()){
        var faculties = [];
        var qs = Helper.toSelectQuery("*",ft,query);
        db.each(qs,
        function(err,row){
            var nFaculty = new Faculty(row.name,row.xid);
            faculties.push(nFaculty);

        }
        ,function(err,val){
            res.write(JSON.stringify(faculties));
            res.end();

        });
    }
    else if(path === Helper.getRootDepartment()){
        var departments = [];
        var qs = Helper.toSelectQuery("*",dt,query);
        db.each(qs,
        function(err,row){
            var nDepartment = new Department(row.name,row.xid,row.fxid);
            departments.push(nDepartment);
        },
        function(err,val){
            res.write(JSON.stringify(departments));
            res.end();
        });
    }
    else if(path === Helper.getRootCourse()){
        var courses = [];
        var qs = Helper.toSelectQuery("*",ct,query);
        db.each(qs,
        function(err,row){
            var nCourse = new Course(row.title,row.code,row.xid,row.dxids);
            courses.push(nCourse);
        },
        function(err,val){
            res.write(JSON.stringify(courses));
            res.end();
        });
    }
    else if(path === Helper.getRootQuestion()){
        var questions = [];
        var qs = Helper.toSelectQuery("*",qt,query);
        db.each(qs,
    function(err,row){
        var nQuestion = new Question(row.title,row.answer,row.xid,row.cxid);
        questions.push(nQuestion);

    },
    function(err,val){
        res.write(JSON.stringify(questions));
        res.end();

    });
    }
    else{
        res.write("path not specified");
        res.end();
    }
    


}









module.exports = route;

