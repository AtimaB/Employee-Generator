const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "team.html");
// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMember = [];


function createManager() {
    console.log ("Let's build your team!")
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Which type of team member would you like to add?",
            choices: ["Manager"],
        },
        {
            type: "input",
            name: "name",
            message: "What is the Manager's name?",
            validate: data => {
                if (data !== "") {
                    return true;
                }
                return "Please enter the Manager's name."
            }
            
        },
        {
            type: "input",
            name: "id",
            message: "What is the Manager's ID number?",
            validate: data => {
                const valid = data.match(
                    /^[1-9]\d*$/
                );
                if (valid) {
                    return true;
                }
                return "Please enter a valid ID number.";
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is the Manager's email?",
            default: () => { },
            validate: function (email) {

                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                }
                    return "Please enter a valid email.";
                }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the Manager's office number?",
            validate: data => {
                const valid = data.match(
                    /^[1-9]\d*$/
                );
                if (valid) {
                    return true;
                }
                return "Please enter a valid office number.";
            }
        },
        {
            type: "list",
            name: "position",
            message: "Which type of team member would you like to add?",
            choices: [ "Engineer", "Intern","Exit!"],
        }
    ]) .then (data => {
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
        teamMember.push(manager);

        switch (data.position){
            case "Engineer" :
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                createHtml();
        }
    }); 
}

function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Engineer's name?",
            validate: data => {
                if (data !== "") {
                    return true;
                }
                return "Please enter the Engineer's name."
            }
        },
        {
            type: "input",
            name: "id",
            message: "What is the Engineer's ID number?",
            validate: data => {
                const valid = data.match(
                    /^[1-9]\d*$/
                );
                if (valid) {
                    return true;
                }
                return "Please enter a valid ID number.";
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is the Engineer's email?",
            default: () => { },
            validate: function (email) {

                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                }
                    return "Please enter a valid email.";
                }
        },
        {
            type: "input",
            name: "github",
            message: "Please enter the Engineer's GitHub username.",
            validate: data => {
                if (data !== "") {
                    return true;
                }
                return "Please enter the Engineer's GitHub username."
            }
        },
        {
            type: "list",
            name: "position",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern","Exit!"],
        }
    ]) .then (data => {
        const engineer = new Engineer(data.name, data.id, data.email, data.github);
        teamMember.push(engineer);

        switch (data.position){
            case "Engineer" :
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                createHtml();
        }
    }); 
}

function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Intern's name?",
            validate: data => {
                if (data !== "") {
                    return true;
                }
                return "Please enter the Intern's name."
            }
        },
        {
            type: "input",
            name: "id",
            message: "What is the Intern's ID number?",
            validate: data => {
                const valid = data.match(
                    /^[1-9]\d*$/
                );
                if (valid) {
                    return true;
                }
                return "Please enter a valid ID number.";
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is the Intern's email?",
            default: () => { },
            validate: function (email) {

                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                }
                    return "Please enter a valid email.";
                }
        },
        {
            type: "input",
            name: "school",
            message: "Please enter the name of the Intern's school.",
            validate: data => {
                if (data !== "") {
                    return true;
                }
                return "Please enter the name of the Intern's school."
            }
        },
        {
            type: "list",
            name: "position",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern","Exit!"],
        }
    ]) .then(data => {
        const intern = new Intern(data.name, data.id, data.email, data.school);
        teamMember.push(intern);

        switch (data.position){
            case "Engineer" :
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                createHtml();
        }
    }); 
}

function createHtml (){
    fs.writeFileSync(OUTPUT_DIR, render(teamMember), "utf-8");
    // fs.writeFileSync(outputPath, render(teamMember), "utf-8")
    console.log ("Successfully created your team!")
} 


createManager();

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
