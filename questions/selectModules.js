import inquirer from "inquirer";

export default async (choices = []) => inquirer.prompt([
  {
    type: 'checkbox',
    name: 'tplModule',
    message: '请选择模板',
    choices
  }
])
