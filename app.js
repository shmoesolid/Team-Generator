const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const EMP_TYPE = Object.freeze({ Engineer:0, Intern:1, Manager:2 });
const EMP_CONV = ["Engineer","Intern","Manager"];

const standardQues = (type) =>
[
    {
        name: 'name',
        message: `What is the ${EMP_CONV[type]}\'s name?`,
        type: 'input',
        // TODO: add filter, must not be blank
    },
    {
        name: 'id',
        message: `What is the ${EMP_CONV[type]}\'s ID?`,
        type: 'input',
        // TODO: add filter, must be number
    },
    {
        name: 'email',
        message: `What is the ${EMP_CONV[type]}\'s email?`,
        type: 'input',
        // TODO: add filter, must be email
    },
];

const loopQues = 
[
    {
        name: 'add',
        type: 'confirm',
        message: 'Would you like to add an employee?',
    },
    {
        name: 'type',
        type: 'list',
        message: 'What type of employee would you like to add?',
        choices: 
        [   
            //Array.from(EMP_CONV) // naaahhh
            "Engineer",
            "Intern",
            // manager is already taken care of
        ]
    }
];

const managerQues =
[
    {
        name: 'number',
        type: 'input',
        message: 'What is your manager\'s office number?'
        // TODO: add filter, must be number
    }
];

const engineerQues = 
[
    {
        name: 'github',
        type: 'input',
        message: 'What is your engineer\'s Github username?'
    }
];

const internQues =
[
    {
        name: 'school',
        type: 'input',
        message: 'What is your intern\'s school name?'
    }
];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
var employees = [];

// DEBUG
//employees.push( new Manager("fooman", 1, "test@test.com", "github") );
//employees.push( new Intern("foo", 2, "test@test.com", "UTSA") );
// DEBUG

const loopMenu = () =>
{
    // run inquirer
    inquirer
        .prompt([
            loopQues
        ])
        .then(answer => {

            // run submenu based off employee_type
            if (answer.menu === true && answer.employee_type) 
                subMenu(answer.employee_type); 

            // go back to main
            else if (answer.menu === true)
                loopMenu();

        });
};

const subMenu = (employeeType) =>
{
    // define standard and empty extra
    var allQues = standardQues(employeeType);
    var extraQues = [];

    // deal with extra
    switch(employeeType)
    {
        case EMP_TYPE.Manager: extraQues = managerQues; break;
        case EMP_TYPE.Engineer: extraQues = engineerQues; break;
        case EMP_TYPE.Intern: extraQues = internQues; break;
    }

    // add on extra questions specific to type
    allQues.concat(extraQues);

    // run inquirer
    inquirer
        .prompt( allQues )
        .then(answer => 
        {
            // ..
        });
};

// start the inquirer prompts with submenu first forcing manager
subMenu(EMP_TYPE.Manager);

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
//var data = render(employees);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// make directory if doesn't exist
//fs.mkdir(OUTPUT_DIR, {recursive: true}, (err) => { if (err) throw err; });

// write our data
//fs.writeFile(outputPath, data, 'utf-8', (err) => { if (err) throw err; });

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
