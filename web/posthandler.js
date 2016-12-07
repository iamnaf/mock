var sqlite3 = require("sqlite3").verbose();
var purl = require("url");
var querystring = require("querystring");
var Faculty = require("./models/faculty.js");
var Department = require("./models/department.js");
var Course = require("./models/course.js");
var Question = require("./models/question.js");
var dbh = require("./dbhelper.js");
var Helper = require("./helper.js");

var db = new sqlite3.Database(dbh.getName());
var ft = dbh.getFacultyTable(); 
var dt = dbh.getDepartmentTable();
var ct = dbh.getCourseTable();
var qt = dbh.getQuestionTable(); 

function insertError(err){
    if(err){
        console.log("insert not successful");
        console.log(err);
        return;
    }
    console.log("insert succesful");
}


function poster(url,response){
    var pathname = purl.parse(url).pathname;
    var query = querystring.parse(purl.parse(url).query);;
    if(pathname === Helper.getRootFaculty()){
        var qs = Helper.toInsertQuery("letmepass",ft,query);
        db.exec(qs,insertError);

    }
    else if(pathname === Helper.getRootDepartment()){
       var qs = Helper.toInsertQuery("letmepass",dt,query);
       db.exec(qs,insertError);
    }
    else if(pathname === Helper.getRootCourse()){
        var qs = Helper.toInsertQuery("letmepass",ct,query);
        db.exec(qs,insertError);

    }
    else if(pathname === Helper.getRootQuestion()){
       var qs = Helper.toInsertQuery("letmepass",qt,query);
       db.exec(qs,insertError);

    }
    else{
        response.write("Not a valid request")

    }
    response.end();
    

}
module.exports = poster;