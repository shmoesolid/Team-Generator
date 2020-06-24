
/////////////////////////////////////////////////////////////////
// REQUIRE CONSTANTS
//
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


/////////////////////////////////////////////////////////////////
// OTHER CONSTANTS
//
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const EMP_TYPE = Object.freeze({ Engineer:0, Intern:1, Manager:2 });
const EMP_CONVERT = ["engineer","intern","manager"];


/////////////////////////////////////////////////////////////////
// EMPLOYEES VARIABLE (oh so looonnnlleeeey)
//
var employees = [];


/////////////////////////////////////////////////////////////////
// QUESTIONS STANDARD 
//

/**
 * handles standard common questions amongst the masses
 * 
 * @param {EMP_TYPE} type 
 */
const standardQues = (type) =>
[
    {
        name: 'name',
        type: 'input',
        message: `What is the ${EMP_CONVERT[type]}\'s name?`,
        // TODO: add filter, must not be blank
    },
    {
        name: 'id',
        type: 'input',
        message: `What is the ${EMP_CONVERT[type]}\'s ID?`,
        // TODO: add filter, must be number
    },
    {
        name: 'email',
        type: 'input',
        message: `What is the ${EMP_CONVERT[type]}\'s email?`,
        // TODO: add filter, must be email
    },
];


/////////////////////////////////////////////////////////////////
// QUESTIONS LOOPBACK/TYPE
//
const loopQues = 
[
    {
        name: 'add',
        type: 'confirm',
        message: 'Would you like to add an employee?',
    }
];
const typeQues = 
[
    {
        name: 'type',
        type: 'list',
        message: 'What type of employee would you like to add?',
        choices: 
        [   
            //Array.from(EMP_CONVERT) // naaahhh
            "Engineer",
            "Intern",
            // manager is already taken care of
        ]
    }
];


/////////////////////////////////////////////////////////////////
// QUESTIONS BY SPECIFIC TYPE
//
const managerQues =
[
    {
        name: 'office',
        type: 'input',
        message: 'What is your manager\'s office number?',
        // TODO: add filter, must be number
    }
];
const engineerQues = 
[
    {
        name: 'github',
        type: 'input',
        message: 'What is your engineer\'s Github username?',
        // TODO: add filter, must NOT be blank
    }
];
const internQues =
[
    {
        name: 'school',
        type: 'input',
        message: 'What is your intern\'s school name?',
        // TODO: add filter, must NOT be blank
    }
];


/////////////////////////////////////////////////////////////////
// VARIOUS MENUS
//

/**
 * basically main loopback to confirm if continuing or ending
 */
const loopMenu = () =>
{
    // run inquirer
    inquirer
        .prompt( loopQues )
        .then(answer => {

            // run type menu or end it all
            answer.add === true 
                ? typeMenu() 
                : endMenu();
        });
};

/**
 * handles sub menus based on type selected
 */
const typeMenu = () =>
{
    // run inquirer
    inquirer
        .prompt( typeQues )
        .then(answer => { subMenu(EMP_TYPE[answer.type]) });
};

/**
 * handles actual employee questions with some extra functionality
 * 
 * @param {EMP_TYPE} employeeType 
 */
const subMenu = (employeeType) =>
{
    // define standard and empty extra
    var allQues = standardQues(employeeType);
    var extraQues = [];

    // deal with extra types
    switch(employeeType)
    {
        case EMP_TYPE.Engineer: extraQues = engineerQues; console.log(extraQues); break;
        case EMP_TYPE.Intern: extraQues = internQues; console.log(extraQues); break;
        case EMP_TYPE.Manager: extraQues = managerQues; console.log(extraQues); break;
    }

    // add on extra questions specific to type if exists
    Array.prototype.push.apply(allQues, extraQues);

    // run inquirer
    inquirer
        .prompt( allQues )
        .then(answer => 
        {
            // establish empty new object type
            var newObj = {};

            // deal with specific answers
            switch(employeeType)
            {
                case EMP_TYPE.Manager: 
                    newObj = new Manager(answer.name, answer.id, answer.email, answer.office); 
                    break;
                case EMP_TYPE.Engineer: 
                    newObj = new Engineer(answer.name, answer.id, answer.email, answer.github); 
                    break;
                case EMP_TYPE.Intern: 
                    newObj = new Intern(answer.name, answer.id, answer.email, answer.school); 
                    break;
                default:
                    newObj = new Employee(answer.name, answer.id, answer.email);
            }

            // push to employees array
            employees.push( newObj );

            // back to loop menu
            loopMenu();
        });
};

/**
 * ends it all
 * 
 */
const endMenu = () => // jk no menu actually, wrap it up
{
    // render the employees data to html
    var data = render(employees);

    // make directory if doesn't exist
    fs.mkdir(OUTPUT_DIR, {recursive: true}, (err) => { if (err) throw err; });

    // write our data to output location
    fs.writeFile(outputPath, data, 'utf-8', (err) => { if (err) throw err; });
};


/////////////////////////////////////////////////////////////////
// start the inquirer prompts with submenu first forcing manager
//
subMenu(EMP_TYPE.Manager);


/////////////////////////////////////////////////////////////////
// comments added by the powers that be
//
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
