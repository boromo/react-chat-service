import bodyparser from 'body-parser';
import { getConnection } from '../db';

module.exports = function(router) {
  router.use(bodyparser.json());

  const db = getConnection();

  // get usernames for validating whether a username is available
  router.get('/messages', function (req, res) {
    res.json(db.messages.find());
  });
  
  // query DB for messages for a specific channel
  router.get('/messages/:channel', function(req, res) {
    res.json(db.messages.find({channelID: req.params.channel}));
  })
};
