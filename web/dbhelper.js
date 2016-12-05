"use strict";
class Dbhelper{
    static name = "storage.db";
    static faculty_table = new Table("faculty",["name","xid"]);
    static department_table = new Table("department",["name","xid","fxid"]);
    static course_table = new Table("course",["title","code","xid","dxid"]);
    static question_table = new Table("question",["title","answer","xid","cxid"]);
}
class Table{
    constructor(name,columns){
        this.name = name;
        this.columns = columns;
    }
}

