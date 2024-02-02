import inquirer from 'inquirer';
import chalk, { Chalk } from 'chalk';
import chalkAnimation, { karaoke } from 'chalk-animation';

let secretNumber = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
let attempts = 0;
const welcomeMessage = chalkAnimation.rainbow('Welcome to the Number Guessing Game! by Sherazi');

const playGame = async () => {
    resetGame();
   
    console.log(chalk.blue('Please guess a number between 1 and 10. You have 3 attempts.'));
    while (true) {
        const { userGuess } = await inquirer.prompt({
            type: 'number',
            name: 'userGuess',
            message: 'Guess a number:',
        });

        attempts++;

        if (isNaN(userGuess)) {
            console.log(chalk.red('Invalid input. Please enter a number.'));

            continue;
        }

        if (userGuess < secretNumber) {
            console.log(chalk.magentaBright(`Too low! Try again.\n You have ${3 - attempts} attempts left.`));

        } else if (userGuess > secretNumber) {
            console.log(chalk.magentaBright(`Too high! Try again. \n You have ${3 - attempts} attempts left.`));
        } else {
            console.log(chalk.green(`Congratulations! You guessed the correct number ${secretNumber} in ${attempts} attempts.`));

            chalkAnimation.neon("-------------------------------------------------------------------------- \n                    Congratulations! You guessed it!\n-------------------------------------------------------------------------- ").start();
            exitConfirmation();
            break;
        }

        if (attempts >= 3) {
            console.log(chalk.red(`Sorry, you've reached the maximum number of attempts. The correct number was ${secretNumber}.`));
            chalkAnimation.neon('Game Over').start();
            exitConfirmation();
            break;

        }
    }
};
function resetGame() {
    attempts = 0;
    secretNumber = Math.floor(Math.random() * 10) + 1;
}

// playGame();

async function welcome() {
    welcomeMessage.start();
    setTimeout(() => {
        welcomeMessage.stop();
        playGame();
    }, 1000);
}

function exitConfirmation() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'repeat',
            message: 'Would you like to play again?'
        }
    ]).then((answers) => {
        if (answers.repeat) {
            playGame();
        } else {
            console.log('Thanks for playing!');
            process.exit();
        }
    });
}
welcome();
