"use strict"
String.prototype.format = function(){
    var i = 0;
    var args = arguments;
    return this.replace(/{}/g,function(){
        return typeof args[i] != "undefined" ? args[i++]: "";
    });
}
class Helper{
    static getPassword(){return "letmepass";}
    static getRootFaculty(){ return "/faculties";}
    static getRootDepartment(){ return "/departments";}
    static getRootCourse(){return "/courses";}
    static getRootQuestion(){return "/questions";}
    static getRoots(){return ["/faculties","/departments","/courses","/questions"];}
    static getRoot(){return "/";}
    static toSelectQuery(columns,table,query){
        if(Array.isArray(columns))var columns = columns.join(" , ");
        var props = this.getListOfObjectProps(query);
        var qs = "";
        if(this.isObjectEmpty(query)) qs = "SELECT "+columns+" FROM "+table.name;
        else qs = "SELECT "+columns+" FROM "+table.name+" WHERE ";
        var sqslist = [];
        for(var i=0;i<props.length;i++){
            var sqs = String(props[i]+" = "+query[props[i]]);
            sqslist.push(sqs);
        }
        qs += sqslist.join(" AND ");
        qs+= ";";
        console.log(qs);
        return qs;

    }
    static toInsertQuery(passwd,table,query){
        if(passwd!==this.getPassword()) {console.log("wrong password");return;}
        if(this.isObjectEmpty(query)) {console.log("no query");return;}
        var props = this.getListOfObjectProps(query);
        var columns = props.join(" , ");
        var values = this.getListOfObjectKeys(query).join(" , ");
        console.log(values);
        var qs = "INSERT INTO {} ({}) VALUES ({});";
        qs = qs.format(table.name,columns,values);
        console.log(qs);
        return qs;

        

    }

    static  numberOfObjectProps(obj){
        var attr_count = 0;
        for(var prop in obj){
            if(obj.hasOwnProperty(prop)){
                attr_count++;
            }
        }
        return attr_count;

    }
    static getListOfObjectProps(obj){
        var props = [];
        for(var prop in obj){
            if(obj.hasOwnProperty(prop)){
                props.push(prop);
            }
        }
        return props; 
    }
    static getListOfObjectKeys(obj){
        var keys = [];
        for(var prop in obj){
            if(obj.hasOwnProperty(prop)){
                keys.push(obj[prop]);
            }
        }
        return keys;
    }
    static  isObjectEmpty(obj){
        for(var prop in obj){
            if(obj.hasOwnProperty(prop)){
               return false;

            }
        }
        return true;
    }
}

module.exports = Helper;