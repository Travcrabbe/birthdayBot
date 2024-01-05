const fs = require("fs"); // Import required for reading/writing files
const Birthday = require("./Birthday.js"); // Import js for Birthday class file
const bdayFile = "birthdays.json";

module.exports = class BirthdayManager {

    constructor() {

        this.birthdays = []; // Empty array to store Birthday objects

        // Read the birthdays.json file and populate the array if the file exists
        if (fs.existsSync(bdayFile)) {
            try {
                const birthdayData = fs.readFileSync('birthdays.json', 'utf-8');
                const birthdayJsonData = JSON.parse(birthdayData);
                for (let i = 0; i < birthdayJsonData.length; i++) {
                    this.birthdays.push(new Birthday(birthdayJsonData[i].userId, new Date(birthdayJsonData[i].date)));
                }
                this.sort();
            
            } catch (err) {
                console.error("Error reading birthday file:", err);
                throw err;
            }
        } else {
            console.log(bdayFile + " does not exist. Please use /add to begin.");
        }
    }

    // Print the array in a readable format
    printBirthdays() {
        let bdayList = "";
        for (let i = 0; i < this.birthdays.length; i++) {
            bdayList += ("User: " + this.birthdays[i].userId + ", ");
            bdayList += ("Bday: " + this.birthdays[i].getBirthdayString() + "\n");
        }
        return bdayList;
    }

    toString() {
        return this.printBirthdays;
    }

    // Add a birthday to the array using the userId and a String representing the date
    add(userId, birthdateString) {
        console.log("Adding user ID: " + userId);
        console.log("with date string: " + birthdateString);

        // Check if string is a valid input, return error if necessary
        let validation = Birthday.validateInput(birthdateString);
        if ( validation != "validated") {
            console.log("validation error");
            return validation;
        }
        console.log("validated");

        // Add to array and save to file after validating
        this.birthdays.push(Birthday.fromString(userId, birthdateString));
        this.sort();
        console.log("Added bday to list");

        this.saveToFile();
        console.log("Saved new bday list to " + bdayFile);
        return "Birthday added successfully.";
    }

    // Sorts based on date
    sort() {
        this.birthdays.sort((a, b) => a.date - b.date);
    }

    // Pushes from bday array to JSON file
    saveToFile() {

        let jsonData = JSON.stringify(this.birthdays);

        try {
            fs.writeFileSync(bdayFile, jsonData);
        } catch (error) {
            console.error(error);
        }   
    }

}