const redis = require('redis');
const { cli } = require('winston/lib/winston/config');
const client = redis.createClient(6379);

await client.connect();

const setCache = async (key, value) => {
  await client.set(key, JSON.stringify(value));
};

const deleteCache = async key => {
  await client.delAsync(key);
};

const getSearchCache = async (req, res, next) => {
  let key = 'search/' + req.query.keyword;
  try {
    const data = JSON.parse(await client.getAsync(key));
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
};

const getPopularCache = async (req, res, next) => {
  let key = 'polular/' + req.query.categoryId;
  try {
    const data = JSON.parse(await client.getAsync(key));
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
};

const checkKey = async key => {
  return client.exists(key);
};

module.exports = {
  setCache,
  deleteCache,
  getSearchCache,
  getPopularCache,
  checkKey,
};
