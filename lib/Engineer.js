const Employee = require("./Employee");

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

// for some reason it will not let me use this here....
//const Employee = require("./employee");

class Engineer extends Employee
{
    constructor(_name, _id = 0, _email = "", _github = "")
    {
        super(_name, _id, _email);

        this.role = "Engineer";
        this.github = _github;
    }

    getGithub() { return this.github }
}

module.exports = Engineer;
