var url = require("url");
var querystring = require("querystring");
var Faculty = require("./models/faculty.js");
var Department = require("./models/department.js");
var Course = require("./models/course.js");
var Question = require("./models/question.js");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("storage.db");

function isObjectEmpty(obj){
    for(var prop in obj){
        if(obj.hasOwnProperty(prop)){
            return false;

        }
    }
    return true;
}

function route(rurl,res){
    var path = url.parse(rurl).pathname;
    var query = querystring.parse(url.parse(rurl).query);
    res.write(JSON.stringify(query)+"\n");
    if(path === "/" && isObjectEmpty(query)){
        var roots = ["/faculties","/departments","/courses","/questions"];
        res.write(JSON.stringify(roots));
        res.end();
    }
    else if(path === "/faculties" && isObjectEmpty(query)){
        displayFaculties(res);
    }
    else if(path === "/departments" && isObjectEmpty(query)){
        displayDepartments(res);
    }
    else if(path === "/courses"){
        displayCourses(res);
    }
    else if(path === "/questions"){
        displayQuestions(res);
    }
    else{
        res.write("path not specified");
    }
    


}

function displayFaculties(response){
    var faculties = [];
    db.each("SELECT * FROM faculty;",function(err,row){
        var nFaculty = new Faculty(row.name,row.xid);
        faculties.push(nFaculty);
            
    },function(err,val){
        response.write(JSON.stringify(faculties));
        response.end();
     });
}

function displayDepartments(response){
    
}

function displayCourses(response){
    
}

function displayQuestions(response){
   
}
module.exports = route;