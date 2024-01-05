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
}