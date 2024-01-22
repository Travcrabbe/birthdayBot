const fs = require("fs"); // Import required for reading/writing files

module.exports = class ConfigReader {
    static configGet(key) {
        try {
            const data = fs.readFileSync('config.json', 'utf-8');
            const jsonData = JSON.parse(data);
     
            if (jsonData.hasOwnProperty(key)) {
                return jsonData[key];
            } else {
                console.error(`Key ${key} not found in the config file.`);
                return null;
            }
        } catch (err) {
            console.error("Error reading config file:", err);
            throw err;
        }
    }

    static writeDateFile(currentDate) {
        let jsonData = JSON.stringify(currentDate);

        try {
            fs.writeFileSync("dateLastRan.json", jsonData);
        } catch (error) {
            console.error(error);
        }   

    }

    static readDateFile() {
        try {
            const data = fs.readFileSync('dateLastRan.json', 'utf-8');
            const jsonData = JSON.parse(data);
            return new Date(jsonData);
        } catch (err) {
            console.error("Error reading dateLastRan.json file:", err);
            throw err;
        }
    }

    static generateTimeStamp() {
        let currentDate = new Date();
        let timeStamp = ("[" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " " + 
                    currentDate.getHours() + ":" + currentDate.getMinutes()+ "] ");
        return timeStamp;
    }
}