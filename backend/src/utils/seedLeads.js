import mongoose from "mongoose";
import faker from "faker";
import dotenv from "dotenv";
import Lead from "../models/Lead.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const leads = [];

for (let i = 0; i < 500; i++) {
  leads.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    status: faker.random.arrayElement(["new", "contacted", "converted"]),
    source: faker.random.arrayElement(["facebook", "google", "referral"]),
  });
}

await Lead.insertMany(leads);
console.log("Leads seeded");
process.exit();
