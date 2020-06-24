// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

// works fine here..
const Employee = require("./employee");

class Intern extends Employee
{
    constructor(_name, _id = 0, _email = "", _school = "")
    {
        super(_name, _id, _email);

        this.role = "Intern";
        this.school = _school;
    }

    getSchool() { return this.school }
}

module.exports = Intern;
