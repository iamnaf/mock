"use strict"
class Helper{
    static getRootFaculty(){ return "/faculties";}
    static getRootDepartment(){ return "/departments";}
    static getRootCourse(){return "/courses";}
    static getRootQuestion(){return "/questions";}
    static getRoots(){return ["/faculties","/departments","/courses","/questions"];}
    static toSelectQuery(columns,table,query){
        if(Array.isArray(columns))var columns = columns.join(" , ");
        var props = this.getListOfObjectProps(query);
        var qs = "";
        if(this.isObjectEmpty(query)) qs = "SELECT "+columns+" FROM "+table.name;
        else qs = "SELECT "+columns+" FROM "+table.name+" WHERE ";
        var sqslist = [];
        for(var i=0;i<props.length;i++){
            var sqs = String(props[i]+" = "+"\""+query[props[i]]+"\"");
            sqslist.push(sqs);
        }
        qs += sqslist.join(" AND ");
        qs+= ";";
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