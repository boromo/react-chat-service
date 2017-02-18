var bodyparser = require('body-parser');

module.exports = function (router) {
  // deprecating this route since it just gets all channels
  router.get('/admin', function (req, res) {
    res.status(200).end('Hello from admin');
  });
}
