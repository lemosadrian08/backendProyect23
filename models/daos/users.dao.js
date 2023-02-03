const MongoContainer = require("../containers/mongo.container");
const usersSchema = require('../schemas/users.schema')


const collection = "users";


class UsersDao extends MongoContainer {
  constructor() {
    super(collection, usersSchema);
  }
  async getByEmail(email) {
    const document = await this.model.findOne({ email }, { __v: 0 });
    if (!document) {
      return null
    }
    return document;
  }

}

module.exports= UsersDao