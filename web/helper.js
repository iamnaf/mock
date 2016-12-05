"use strict"
class Helper{
    static getRootFaculty(){ return "/faculties";}
    static getRootDepartment(){ return "/departments";}
    static getRootCourse(){return "/courses";}
    static getRootQuestion(){return "/questions";}
    static getRoots(){return ["/faculties","/departments","/courses","/questions"];}
}
module.exports = Helper;