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

function isObjectEmpty(obj){
    for(var prop in obj){
        if(obj.hasOwnProperty(prop)){
            return false;

        }
    }
    return true;
}

function route(url,res){
    var path = purl.parse(url).pathname;
    var query = querystring.parse(purl.parse(url).query);
    if(path === "/" && isObjectEmpty(query)){
        res.write(JSON.stringify(Helper.getRoots()));
        res.end();
    }
    else if(path === Helper.getRootFaculty() && isObjectEmpty(query)){
        displayFaculties(res);
    }
    else if(path === Helper.getRootDepartment() && isObjectEmpty(query)){
        displayDepartments(res);
    }
    else if(path === Helper.getRootCourse()){
        displayCourses(res);
    }
    else if(path === Helper.getRootQuestion()){
        displayQuestions(res);
    }
    else{
        res.write("path not specified");
    }
    


}


function displayFaculties(response){
    var faculties = [];
    db.each("SELECT * FROM "+ft.name+";",function(err,row){
        var nFaculty = new Faculty(row.name,row.xid);
        faculties.push(nFaculty);
            
    },function(err,val){
        response.write(JSON.stringify(faculties));
        response.end();
     });
}

function displayDepartments(response){
    var departments = [];
    db.each("SELECT * FROM "+dt.name+";",
    function(err,row){
        var nDepartment = new Department(row.name,row.xid,row.fxid);
        departments.push(nDepartment);
    }
    ,function(err,val){
        response.write(JSON.stringify(departments));
        response.end();
    });
    
    
}

function displayCourses(response){
    var courses = [];
    db.each("SELECT * FROM "+ct.name+";",
    function(err,row){
        var nCourse = new Course(row.title,row.code,row.xid,row.dxid);
        courses.push(nCourse);

    },
    function(err,val){
        response.write(JSON.stringify(courses));
        response.end();

    });
    
}

function displayQuestions(response){
   
}
module.exports = route;