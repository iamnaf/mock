"use strict";
class Table{
    constructor(name,columns){
        this.name = name;
        this.columns = columns;
    }
}

class Dbhelper{
    static getName() {return "storage.db";}
    static getFacultyTable() {return new Table("faculty",["xid","name"]);}
    static getDepartmentTable() {return new Table("department",["xid","name","fxid"]);}
    static getCourseTable() {return new Table("course",["xid","title","code","unit","dxid"]);}
    static getQuestionTable(){ return new Table("question",["xid","title","cxid"]);}
    static getOptionTable(){return new Table("option",["one","two","three","answer","qxid"])}
}

module.exports = Dbhelper;

