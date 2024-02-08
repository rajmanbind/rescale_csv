import { fakerEN_IN } from "@faker-js/faker";
import * as fs from "node:fs";

type SubscriptionTier = "free" | "basic" | "business";

interface User {
  _id: string;
  avatar: string;
  birthday: Date;
  email: string;
  firstName: string;
  lastName: string;
  sex: string;
  subscriptionTier: SubscriptionTier;
  city: string;
  state: string;
  lat: number;
  long: number;
  phone: string;
}
function createRandomUser(): User {
  const sex = fakerEN_IN.person.sexType();
  const firstName = fakerEN_IN.person.firstName(sex);
  const lastName = fakerEN_IN.person.lastName();
  const email = fakerEN_IN.internet
    .email({ firstName: firstName, lastName: lastName, provider: "gmail.com" })
    .toLowerCase();

  return {
    _id: fakerEN_IN.string.uuid(),
    avatar: fakerEN_IN.image.avatar(),
    birthday: fakerEN_IN.date.birthdate(),
    email,
    firstName,
    lastName,
    sex,
    subscriptionTier: fakerEN_IN.helpers.arrayElement([
      "free",
      "basic",
      "business",
    ]),
    city: fakerEN_IN.location.city(),
    state: fakerEN_IN.location.state(),
    lat: fakerEN_IN.location.latitude(),
    long: fakerEN_IN.location.longitude(),
    phone: fakerEN_IN.phone.number(),
  };
}

// Define the CSV header
const header = [
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
const userList: User[] = [];
for (let i = 0; i < 10000; i++) {
  var user = createRandomUser();
  user = {
    ...user,
    phone: user.phone.replace(/-/g, ""),
  };
  userList.push(user);
}

// Convert user data to CSV format
const csvContent = userList.map((user) =>
  [
    user.firstName,
    user.lastName,
    user.email,
    user.phone,
    user.sex,
    user.city,
    user.birthday.toISOString().split("T")[0], // Format birthday as YYYY-MM-DD
    user.lat,
    user.long,
  ].join(",")
);

// Add header to CSV content
csvContent.unshift(header.map((h) => h.title).join(","));

// Write CSV content to file
const csvData = csvContent.join("\n");
fs.writeFileSync("users.csv", csvData);

console.log("User data saved to users.csv file.");
