const redis = require("redis");
const client = redis.createClient(6379);
const util = require("util");
client.get = util.promisify(client.get);
client.set = util.promisify(client.set);

client.on("error", (error) => {
  console.error(error);
});

const redis_get = async (param) => {
  try {
    return await client.get(param);
  } catch (error) {
    console.log("Err: ", error);
  }
};

const redis_set = async (param, data) => {
  try {
    return await client.set(param, data);
  } catch (error) {
    console.log("Err: ", error);
  }
};

module.exports = { redis_get, redis_set, client };
