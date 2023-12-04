const fs = require("fs"); // Import required for reading/writing files
const Birthday = require("./Birthday.js"); // Import js for Birthday class file

module.exports = class BirthdayManager {



    constructor() {

        this.birthdays = [];

        try {
            const birthdayData = fs.readFileSync('birthdays.json', 'utf-8');
            const birthdayJsonData = JSON.parse(birthdayData);

            for (let i = 0; i < birthdayJsonData.length; i++) {
                this.birthdays.push(new Birthday(birthdayJsonData[i].userId, birthdayJsonData[i].birthday))
            }

            this.birthdays.sort((a, b) => a.birthday - b.birthday);
            
        } catch (err) {
            console.error("Error reading birthday file:", err);
            throw err;
        }
    }

    printBirthdays() {
        for (let i = 0; i < this.birthdays.length; i++) {
            console.log("User: " + this.birthdays[i].userId);
            console.log("Bday: " + this.birthdays[i].getBirthdayString());
        }
    }

    

}