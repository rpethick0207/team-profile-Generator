const fs = require('fs'); 
const inquirer = require('inquirer');
const path = require("path");
const generateHTML = require('./src/generateHTML');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const teamArray = []; 


// Manager information
const addManager = () => {
    return inquirer.prompt ([
        //Name
        {
            type: 'input',
            name: 'name',
            message: 'What is the managers name?', 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Enter manager's name.");
                    return false; 
                }
            }
        },
        {
            //Id
            type: 'input',
            name: 'id',
            message: "Enter manager's ID.",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("Enter the manager's ID.")
                    return false; 
                } else {
                    return true;
                }
            }
        },

        {

            //Email
            type: 'input',
            name: 'email',
            message: "Enter manager's email.",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('Enter an email.')
                    return false; 
                }
            }
        },
        {
            //Office Number
            type: 'input',
            name: 'officeNumber',
            message: "Enter manager's office number.",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ('Enter an office number.')
                    return false; 
                } else {
                    return true;
                }
            }
        }
    ])
    .then(managerInput => {
        const  { name, id, email, officeNumber } = managerInput; 
        const manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager); 
        console.log(manager); 
    })
};


// Employee information
const addEmployee = () => {
    console.log('Add team employees');

    return inquirer.prompt ([
        {
            //Position
            type: 'list',
            name: 'position',
            message: "Choose the employee's position.",
            choices: ['Engineer', 'Intern']
        },
        {
            //Name
            type: 'input',
            name: 'name',
            message: "What's the employee's name?", 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Enter employee's name.");
                    return false; 
                }
            }
        },
        {
            //ID
            type: 'input',
            name: 'id',
            message: "Enter employee's ID.",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("Enter the employee's ID.")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            //Email
            type: 'input',
            name: 'email',
            message: "Enter employee's email.",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('Enter an email.')
                    return false; 
                }
            }
        },
        {
            //Github
            type: 'input',
            name: 'github',
            message: "What is the employee's GitHub?",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ("Enter employee's github username.")
                }
            }
        },
        {
            //School
            type: 'input',
            name: 'school',
            message: "What is the intern's school?",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Enter intern's school.")
                }
            }
        },
        {
            //confirm
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Do you want to add more team members?',
            default: false
        }
    ])
    .then(employeeData => {
        let { name, id, email, role, github, school, confirmAddEmployee } = employeeData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);
            console.log(employee);
        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);
            console.log(employee);
        }
        teamArray.push(employee); 
        if (confirmAddEmployee) {
            return addEmployee(teamArray); 
        } else {
            return teamArray;
        }
    })
};