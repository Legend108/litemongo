const mongoose = require("mongoose");
const schema = require("../Schemas/schema");

class database {
  constructor(mongooseUrl) {
    this.connection = mongoose.connect(mongooseUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
  }

  async set(key, value) {
    if (!key) throw new Error("Invalid key type", "databaseError");
    if (typeof key !== "string")
      throw new Error(
        "The typeof key has to be a string for this version",
        "databaseError"
      );
    if (!value) throw new Error("Invalid value type", "databaseError");

    await schema
      .findOneAndUpdate(
        {
          key: key,
        },
        {
          value: value,
        },
        {
          upsert: true,
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }

  async find(key) {
    if (!key) throw new Error("The key has to be provided", "databaseError");

    let val = await schema.findOne({ key: key });

    return val;
  }

  async all() {
    let val = await schema.find({});

    return val;
  }

  async delete(key) {
    if (!key) throw new Error("The key has to be provided", "databaseError");

    await schema.findOneAndDelete({ key: key });
  }

  async clear() {
    await schema.deleteMany();
  }
}

module.exports = database;
