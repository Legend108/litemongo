const mongoose = require("mongoose");
const schema = require("../Schemas/schema");

class ScyllaDB {
  constructor(mongooseUrl) {
    this.connection = mongoose.connect(mongooseUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  }

  async set(key, value) {
    if (!key) throw new Error("Invalid key type", "ScyllaError");
    if (typeof key !== "string")
      throw new Error(
        "The typeof key has to be a string for this version",
        "ScyllaError"
      );
    if (!value) throw new Error("Invalid value type", "ScyllaError");

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
    if (!key) throw new Error("The key has to be provided", "ScyllaError");

    let val = await schema.findOne({ key: key });

    return val;
  }

  async all(){
    let val = await schema.find({})

    return val;
  }

  async delete(key) {
    if(!key) throw new Error("The key has to be provided", "ScyllaError");

    await schema.findOneAndDelete({ key: key });
  }

  // async delete(key){
  //   if(!key) throw new Error()
  // }
}

module.exports = ScyllaDB;
