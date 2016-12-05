var sqlite3 = require("sqlite3").verbose();
var purl = require("url");
var querystring = require("querystring");
var Faculty = require("./models/faculty.js");
var Department = require("./models/department.js");
var Course = require("./models/course.js");
var dbh = require("./dbhelper.js");
var Helper = require("./helper.js");

var db = new sqlite3.Database(dbh.getName());
var ft = dbh.getFacultyTable(); 
var dt = dbh.getDepartmentTable();
var ct = dbh.getCourseTable();
var qt = dbh.getQuestionTable(); 


function addFaculty(faculty){
    db.run("INSERT INTO "+ft.name+" VALUES (?,?);",[faculty.name,faculty.xid]);
}
function addDepartment(department){
    db.run("INSERT INTO "+dt.name+" VALUES (?,?,?);",[department.name,department.xid,department.fxid]);
}
function addCourse(course){
    db.run("INSERT INTO "+ct.name+" VALUES (?,?,?,?);",[course.title,course.code,course.xid,course.dxid]);
}



function poster(url,response){
    var pathname = purl.parse(url).pathname;
    var query = querystring.parse(purl.parse(url).query);
    if(pathname === Helper.getRootFaculty()){
        var fname = query.name;
        var fxid = query.xid;
        if(fname && fxid){
            var nFaculty = new Faculty(fname,fxid);
            addFaculty(nFaculty);
            response.write("faculty added successfully");
            response.end();
        }
        else{
            response.write("request is invalid");
            response.end();
            return;
        }


    }
    else if(pathname === Helper.getRootDepartment()){
        var dname = query.name;
        var dxid = query.xid;
        var dfxid = query.fxid;
        if(dname && dxid && dfxid){
            var nDepartment = new Department(dname,dxid,dfxid);
            addDepartment(nDepartment);
            response.write("department added succesfully");
            response.end();
        }
        else{
            response.write("request is invalid");
            response.end();
            return;
        }

    }
    else if(pathname === Helper.getRootCourse()){
        var ctitle = query.title;
        var ccode = query.code;
        var cxid = query.xid;
        var cdxids = query.dxids;
        if(ctitle && ccode  && cxid && cdxids){
            var nCourse = new Course(ctitle,ccode,cxid,cdxids);
            addCourse(nCourse);
            response.write("course added succesfully");
            response.end();

        }
        else{
            response.write("request is invalid");
            response.end();
            return;
        }

    }
    else if(pathname === Helper.getRootQuestion()){

    }
    else{
        response.write("Not a valid request")

    }
    

}
module.exports = poster;