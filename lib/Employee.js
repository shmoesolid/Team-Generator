// DONE: Write code to define and export the Employee class
class Employee
{
    constructor(_name, _id = 0, _email = "")
    {
        this.name = _name;
        this.id = _id;
        this.email = _email;
        
        this.role = "Employee";
    }

    // methods
    getName() { return this.name }
    getId() { return this.id }
    getEmail() { return this.email }
    getRole() { return this.role }
}

// export
module.exports = Employee;
