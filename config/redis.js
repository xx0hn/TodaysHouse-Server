const redis = require('redis');

const redisClient = redis.createClient(6379);
const setCache = async (key, value) => {
  await redisClient.connect();
  redisClient.set(key, JSON.stringify(value));
  await redisClient.quit();
};
const getCache = async (req, res, next) => {
  await redisClient.connect();
  let key = 'search/' + req.query.searchName;
  try {
    const data = JSON.parse(await redisClient.get(key));
    if (data) {
      res.status(200).json({
        data: data,
      });
    } else next();
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: err,
    });
  }
  await redisClient.quit();
};
module.exports = {
  setCache,
  getCache,
};
