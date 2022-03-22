console.log("\nLooping a Triangle"); // prints title of exercise
for(let triangle = "o"; triangle.length < 10; triangle += "o") // loop that sets variable equal to 'o' for each line up to line 9
    console.log(triangle); // calls console.log to print 9 lines of 'o' in a left-hand triangle

console.log("\nFizzBuzz"); // prints title of exercise
for (i=1; i<=100; i++) { // loop that checks if each number, starting at 1 and ending at 100, is one of the 3 exceptions
    if ( !(i%7) && !(i%3) ) { // checks if number is divisible by 3 and 7
        console.log('Divisible by both 3 and 7'); // prints "Divisible by both 3 and 7" instead of the number if true
    } else if ( !(i%7) && (i%3)) { // checks if number is divisible by 7 but not 3
        console.log('Divisible by 7, but not 3'); // prints "Divisible by 7, but not 3" instead of the number if true
    } else if ( !(i%3) ) { //checks if number is divisible by 3
        console.log('Divisible by 3'); // prints "Divisible by 3" instead of the number if true
    } else { // runs if no exception is found to be true
        console.log(i); // prints number
    } // ends else statement
} // ends for loop

console.log("\nn-by-n Grid"); // prints title of exercise
var block = '*'; // fills every other block with * character
var space = ' '; // fills every other block with a space character
function grid(size) {
    for (var i = 1; i <= size; i++) { // loop that creates grid
        var line = ''; // variable that holds contents of each line

        for (var y = 1; y <= size; y++) { // loop that fills grid with alternating spaces and blocks
            if (i % 2) { // alternates each row starting with space and block
                if (y % 2) { // fills each row with alternating spaces and blocks
                    line = line + space; // adds space to row
                } else { // checks if space was added
                    line = line + block; // adds block to row
                }
            } else { // alternates each row starting with space and block
                if (y % 2) { // fills each row with alternating spaces and blocks
                    line = line + block; // adds block to row
                } else { // checks if block was added
                    line = line + space; // adds space to row
                }
            }
        }
        console.log(line); // prints grid by line alternating spaces and blocks both vertically and horizontally
    }
}
console.log("\nsize = 6"); // prints size of n-by-n grid
grid(6); // creates 6 by 6 grid
console.log("\nsize = 12"); // prints size of n-by-n grid
grid(12); // creates 12 by 12 grid
