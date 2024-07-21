import inquirer from "inquirer";

class Student {
    static counter: 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];      //Initialize an empty array for courses
        this.balance = 100;
    }

    //Method to enroll a student in a course
    enroll_course(course: string){
        this.courses.push(course)
    }

    //Method to view a student balance
    view_balance(){
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }

    //Method to pay tution fees
    pay_fees(amount: number){
        this.balance -= amount; 
        console.log(`$${amount} Fees paid successfully for ${this.name}`)
    }

    //Method to display student status
    show_status(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}

//Defining a student manager class to manage students
class student_manager{
    students: Student[];

    constructor(){
        this.students = [];
    }

    //Method to add new students
    new_student(name: string){
        let studentt = new Student(name);
        this.students.push(studentt);
        console.log(`Student: ${name} added successfully. Student ID: ${studentt.id}`);
    }

    //Method to enroll student in a course
    enroll_student(student_id: number, course: string){
        let std = this.find_student(student_id)
        if (std) {
            std.enroll_course(course)
            console.log(`${std.name} enrolled in ${course} successfully!`);
        };
    }

    //Method to view a student balance
    viw_student_balance(student_id: number){
        let std = this.find_student(student_id)
        if (std) {
            std.view_balance
        } 
        else {
            console.log("Student not found, please enter a correct student ID");
            
        }
    }

    //Method to pay student fees
    pay_student_fees(student_id: number, amount: number){
        let std = this.find_student(student_id)
        if (std) {
            std.pay_fees(amount)
        } 
        else {
            console.log("Student not found, please enter a correct student ID");
            
        }
    }

    //Method to display student status
    show_student_status(student_id:number){
        let std = this.find_student(student_id)
        if (std) {
            std.show_status();
        }
    }    

    //Method to find a student by student id
    find_student(student_id: number){
        return this.students.find(std => std.id === student_id)
    }
}    

//Main funtion to run the program

async function main() {
    console.log("Welcome to student management system");
    console.log("=".repeat(50));

    let studentmanager = new student_manager();

    while (true) {
        let choice = await inquirer.prompt<{choice:string;}>([
            {
                name: "choice",
                message: "Select an option: ",
                type: "list",
                choices: [                    
                    "Add Student",
                    "Enroll Student",
                    "View Student balance",
                    "Pay fees",
                    "Show status",
                    "Exit",
                ],
            }
        ]);

        //Using switch for user input
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt<{name: string}>([
                {
                    name: "name",
                    type: "input",
                    message: "Enter a name: ",
                }
            ]);
                studentmanager.new_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt<{Student_ID: number; course: string;}>([
                    {
                        name: "Student_ID",
                        type: "number",
                        message: "Enter a student ID: "
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name: ",
                    }
                ]);
                studentmanager.enroll_student(course_input.Student_ID, course_input.course);
                break;
            case "View Student balance":
                let balance_input = await inquirer.prompt<{student_id: number;}>([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a number: ",
                    }
                ]);
                studentmanager.viw_student_balance(balance_input.student_id);
                break;
            case "Pay fees":
                let fees_input = await inquirer.prompt<{student_Id: number; amount: number}>([
                    {
                        name: "student_Id",
                        type: "number",
                        message: "Enter a Student ID: ",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    }
                ]);
                studentmanager.pay_student_fees(fees_input.student_Id, fees_input.amount);
                break;
            case "Show status":
                let status_input = await inquirer.prompt<{student_id: number;}>([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID: ",
                    }
                ]);
                studentmanager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit;  
        }
    }       
}   

//Calling a main function 
main();