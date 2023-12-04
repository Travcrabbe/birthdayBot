module.exports = class Birthday {


constructor(userId, birthday) {
    this.userId = userId;
    this.birthday = new Date();

    // Parse date
    this.birthday.setMonth(birthday.substring(0, 2));
    this.birthday.setDate(parseInt(birthday.substring(3,5)) - 1);
    this.birthday.setFullYear(birthday.substring(6));

}

getBirthdayString() {
    const month = this.birthday.getMonth() + 1; // Adding 1 to convert to 1-based month
    const day = this.birthday.getDate();
    const year = this.birthday.getFullYear();

    return `${month}/${day}/${year}`;
}


}