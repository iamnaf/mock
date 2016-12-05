var sqlite3 = require("sqlite3").verbose();
var purl = require("url");
var querystring = require("querystring");
var Faculty = require("./models/faculty.js");
var Department = require("./models/department.js");


var db = new sqlite3.Database("storage.db");

function addFaculty(faculty){
    db.run("INSERT INTO faculty VALUES (?,?);",[faculty.name,faculty.xid]);
}
function addDepartment(department){
    db.run("INSERT INTO department VALUES (?,?,?);",[department.name,department.xid,department.fxid]);
}



function poster(url,response){
    var pathname = purl.parse(url).pathname;
    var query = querystring.parse(purl.parse(url).query);
    response.write(JSON.stringify(query)+"\n");
    if(pathname === "/faculties"){
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
    else if(pathname === "/departments"){
        var dname = query.name;
        var dxid = query.xid;
        var dfxid = query.fxid;
        if(dname && dxid && dfxid){
            var nDepartment = new Department(dname,dxid,dfxid);
            addDepartment(nDepartment);
            response.write("department added succesfully");
        }
        else{
            response.write("request is invalid");
            response.end();
            return;
        }

    }
    else if(pathname === "/courses"){

    }
    else if(pathname === "/questions"){

    }
    else{
        response.write("Not a valid request")

    }
    response.end();

}
module.exports = poster;