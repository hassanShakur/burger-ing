const fs = require('fs');
const dotenv = require('dotenv');

const mongoose = require('mongoose');

const Burger = require(`${__dirname}/../models/burgerModel`);


dotenv.config({ path: `${__dirname}/../config.env` });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.ENCODED_DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//   })
//   .then((con) => {
//     console.log(con.connection.name);
//     console.log('DB connection successful...');
//   });

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then((con) => {
  console.log('DB connection successful...');
});

const burgers = JSON.parse(
  fs.readFileSync(`${__dirname}/burgers.json`, 'utf8')
);


const importData = async () => {
  try {
    await Burger.create(burgers);
    console.log('Data imported successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Burger.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();

console.log(process.argv);
