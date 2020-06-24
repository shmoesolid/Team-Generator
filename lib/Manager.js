// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

// works fine here..
const Employee = require("./employee");

class Manager extends Employee
{
    constructor(_name, _id = 0, _email = "", _officeNumber = 0)
    {
        super(_name, _id, _email);

        this.role = "Manager";
        this.officeNumber = _officeNumber;
    }

    getOfficeNumber() { return this.officeNumber }
}

module.exports = Manager;