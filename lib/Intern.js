// DONE: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./employee");

class Intern extends Employee
{
    constructor(_name, _id = 0, _email = "", _school = "")
    {
        // main class constructor
        super(_name, _id, _email);

        // subclass specific
        this.role = "Intern";
        this.school = _school;
    }

    // methods
    getSchool() { return this.school }
}

// export
module.exports = Intern;
