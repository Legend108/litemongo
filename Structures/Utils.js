class Utils {
  constructor() {
    throw new Error("Utils class should not be instantiated", "UtilsError");
  }

  parse(key) {
    let v = key.replace(".", "");

    return v;
  }
}

module.exports = Utils;
