const currentDate = new Date();

module.exports = class Birthday {


    constructor(userId, birthdateString) {

        this.userId = userId;
        this.date = new Date();
        if (birthdateString.length == 10) {
            let month = parseInt(birthdateString.substring(0, 2) - 1); // subtract 1 to convert to 0-based month
            let day = parseInt(birthdateString.substring(3,5));
            let year = parseInt(birthdateString.substring(6));

            // Parse date
            this.date.setMonth(month);
            this.date.setDate(day); 
            this.date.setFullYear(year);
        }
    }

    getBirthdayString() {
        const month = this.date.getMonth() + 1; // Adding 1 to convert to 1-based month
        const day = this.date.getDate();
        const year = this.date.getFullYear();

        return `${month}/${day}/${year}`;
    }

    static validateInput(birthdate) {
        if (birthdate.length == 10) {
            let month = birthdate.substring(0, 2);
            let day = birthdate.substring(3,5);
            let year = birthdate.substring(6);

            if (month < 1 || month > 12) {
                return "Error: Birthday month must be between 1 and 12.";
            } else if (day < 1 || day > 31) {
                return "Error: Birthday day must be between 1 and 30.";
            } else if (year < 1900 || year > currentDate.getFullYear) {
                return "Error: Birthday year must be greater than 1900 and cannot be in the future."
            } else {
                return "validated";
            }
        } else {
            return "invalid date length";
        }
    }
}