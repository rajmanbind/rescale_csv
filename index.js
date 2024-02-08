"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var fs = require("node:fs");
function createRandomUser() {
    var sex = faker_1.fakerEN_IN.person.sexType();
    var firstName = faker_1.fakerEN_IN.person.firstName(sex);
    var lastName = faker_1.fakerEN_IN.person.lastName();
    var email = faker_1.fakerEN_IN.internet
        .email({ firstName: firstName, lastName: lastName, provider: "gmail.com" })
        .toLowerCase();
    return {
        _id: faker_1.fakerEN_IN.string.uuid(),
        avatar: faker_1.fakerEN_IN.image.avatar(),
        birthday: faker_1.fakerEN_IN.date.birthdate(),
        email: email,
        firstName: firstName,
        lastName: lastName,
        sex: sex,
        subscriptionTier: faker_1.fakerEN_IN.helpers.arrayElement([
            "free",
            "basic",
            "business",
        ]),
        city: faker_1.fakerEN_IN.location.city(),
        state: faker_1.fakerEN_IN.location.state(),
        lat: faker_1.fakerEN_IN.location.latitude(),
        long: faker_1.fakerEN_IN.location.longitude(),
        phone: faker_1.fakerEN_IN.phone.number(),
    };
}
// Define the CSV header
var header = [
    { id: "firstName", title: "First Name" },
    { id: "lastName", title: "Last Name" },
    { id: "email", title: "Email" },
    { id: "phone", title: "Mobile" },
    { id: "sex", title: "Gender" },
    { id: "city", title: "City" },
    { id: "birthday", title: "Birthday" },
    { id: "lat", title: "Latitude" },
    { id: "long", title: "Longitude" },
];
// Generate user data
var userList = [];
for (var i = 0; i < 10000; i++) {
    var user = createRandomUser();
    user = __assign(__assign({}, user), { phone: user.phone.replace(/-/g, "") });
    userList.push(user);
}
// Convert user data to CSV format
var csvContent = userList.map(function (user) {
    return [
        user.firstName,
        user.lastName,
        user.email,
        user.phone,
        user.sex,
        user.city,
        user.birthday.toISOString().split("T")[0], // Format birthday as YYYY-MM-DD
        user.lat,
        user.long,
    ].join(",");
});
// Add header to CSV content
csvContent.unshift(header.map(function (h) { return h.title; }).join(","));
// Write CSV content to file
var csvData = csvContent.join("\n");
fs.writeFileSync("users.csv", csvData);
console.log("User data saved to users.csv file.");
