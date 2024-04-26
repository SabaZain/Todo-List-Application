#! /usr/bin/env node
// Todo List Application
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let condition = true;
console.log(chalk.magentaBright.bold("\n \tWelcome to Code With Saba - Todo List Application\n"));
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.blue("Select an option you want to do:"),
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo List", "Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            condition = false;
        }
    }
};
// Function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.yellow("Enter your new task:")
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.green.bold(`\n ${newTask.task} task added successfully in todo List`));
};
// Function to view all Todo List Tasks
let viewTask = async () => {
    console.log("\n Your Todo List: \n");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
};
//Function to delete a task from the list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.blue("Enter the 'index no' of the task you want to delete:"),
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.green.bold(`\n ${deletedTask} this task has been deleted successfully from your Todo List\n`));
};
// Function to update task
let updateTask = async () => {
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.blue("Enter the index no of the task you want to update:")
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.blue("Enter new task name:"),
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task;
    console.log(chalk.green.bold(`\n Task at index no ${update_task_index.index - 1} updated successfully [For updated list check option: "View Todo List"]`));
};
main();
