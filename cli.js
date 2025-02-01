#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { program } from 'commander';
import fetch from 'node-fetch';

let apiKey = '';
let userId = '';

async function getModules() {
  try {
    const response = await fetch(`https://kzmfs7kn0ovlpqiubhw4.lite.vusercontent.net/api/user-modules?userId=${userId}`, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch modules');
    }
    
    const data = await response.json();
    return data.modules;
  } catch (error) {
    console.error(chalk.red('Error fetching modules:', error.message));
    return [];
  }
}

async function authenticate() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'apiKey',
      message: 'Enter your API key:',
      validate: input => input.length > 0 || 'API key is required'
    },
    {
      type: 'input',
      name: 'userId',
      message: 'Enter your user ID:',
      validate: input => input.length > 0 || 'User ID is required'
    }
  ]);

  apiKey = answers.apiKey;
  userId = answers.userId;
}

async function mainMenu() {
  await authenticate();

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Install NexusBilling',
        'Install Modules',
        'Update NexusBilling',
        'Update Modules'
      ]
    }
  ]);

  switch (action) {
    case 'Install NexusBilling':
      await installNexusBilling();
      break;
    case 'Install Modules':
      await moduleMenu('install');
      break;
    case 'Update NexusBilling':
      await updateNexusBilling();
      break;
    case 'Update Modules':
      await moduleMenu('update');
      break;
  }
}

async function moduleMenu(action) {
  const availableModules = await getModules();
  
  if (availableModules.length === 0) {
    console.log(chalk.yellow('No modules available for your account'));
    return;
  }

  const { selectedModule } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedModule',
      message: `Select module to ${action}:`,
      choices: availableModules
    }
  ]);

  if (action === 'install') {
    await installModule(selectedModule);
  } else {
    await updateModule(selectedModule);
  }
}

async function installNexusBilling() {
  console.log(chalk.green('Installing NexusBilling...'));
  // Add installation logic here
  console.log(chalk.green('NexusBilling installation completed!'));
}

async function updateNexusBilling() {
  console.log(chalk.yellow('Updating NexusBilling...'));
  // Add update logic here
  console.log(chalk.green('NexusBilling update completed!'));
}

async function installModule(module) {
  console.log(chalk.green(`Installing ${module}...`));
  // Add module installation logic here
  console.log(chalk.green(`${module} installation completed!`));
}

async function updateModule(module) {
  console.log(chalk.yellow(`Updating ${module}...`));
  // Add module update logic here
  console.log(chalk.green(`${module} update completed!`));
}

program
  .version('1.0.0')
  .description('Nexus CLI Tool')
  .action(mainMenu)
  .parse(process.argv);