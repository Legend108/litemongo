const mongoose = require("mongoose");
const schema = require("../Schemas/schema");

class database {
  /**
   * Create/Connect to database
   * @param {string} mongooseUrl - mongo db url
   */
  constructor(mongooseUrl) {
    this.connection = mongoose.connect(mongooseUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  }

  /**
   * Set value to a key
   * @param {string} key
   * @param {string} value
   */
  async set(key, value) {
    if (!key) throw new Error("Invalid key type", "databaseError");
    if (typeof key !== "string")
      throw new Error(
        "The typeof key has to be a string for this version",
        "databaseError"
      );
    if (!value) throw new Error("Invalid value type", "databaseError");

    await schema
      .findOneAndUpdate({ _id: key }, { value: value }, { upsert: true })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Find a key
   * @param {string} key
   * @returns {{ key: string, value: string }}
   */
  async find(key) {
    if (!key) throw new Error("The key has to be provided", "databaseError");

    let val = await schema.findById(key);

    return val.value;
  }

  /**
   * Find all key
   * @returns {{ key: string, value: string} [] }
   */
  async all() {
    let val = await schema.find({});

    return val;
  }

  /**
   * Delete an key
   * @param {string} key
   * @returns {{ key: string, value: any }}
   */
  async delete(key) {
    if (!key) throw new Error("The key has to be provided", "databaseError");
    return await schema.findOneAndDelete({ _id: key });
  }

  /**
   * Clear whole database
   */
  async clear() {
    await schema.deleteMany();
    // Added the clear function
  }

  async add(key, number) {
    if (!key) throw new Error("The key has to be provided!", "databaseError");
    if (!number)
      throw new Error("The number to add has to be provided", "databaseError");
    if (typeof number !== "number")
      throw new Error(
        "The typeof the number to add has to be a number, received " +
          typeof number
      );

    this.find(key)
      .then((v) => {
        this.set(key, number + v);
        return true;
      })
      .catch((e) => {
        throw new Error(e);
      });
  }
}

module.exports = database;
