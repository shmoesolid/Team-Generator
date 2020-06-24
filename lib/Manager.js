// DONE: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./employee");

class Manager extends Employee
{
    constructor(_name, _id = 0, _email = "", _officeNumber = 0)
    {
        // main class constructor
        super(_name, _id, _email);

        // subclass specific
        this.role = "Manager";
        this.officeNumber = _officeNumber;
    }

    // methods
    getOfficeNumber() { return this.officeNumber }
}

// export
module.exports = Manager;