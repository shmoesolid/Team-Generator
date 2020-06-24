// DONE: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./employee");

class Engineer extends Employee
{
    constructor(_name, _id = 0, _email = "", _github = "")
    {
        // main class constructor
        super(_name, _id, _email);

        // subclass specific
        this.role = "Engineer";
        this.github = _github;
    }

    // methods
    getGithub() { return this.github }
}

// export
module.exports = Engineer;
