"use strict";
class Table{
    constructor(name,columns){
        this.name = name;
        this.columns = columns;
    }
}

class Dbhelper{
    static getName() {return "storage.db";}
    static getFacultyTable() {return new Table("faculty",["name","xid"]);}
    static getDepartmentTable() {return new Table("department",["name","xid","fxid"]);}
    static getCourseTable() {return new Table("course",["title","code","xid","dxid"]);}
    static getQuestionTable(){ return new Table("question",["title","answer","xid","cxid"]);}
}

module.exports = Dbhelper;

