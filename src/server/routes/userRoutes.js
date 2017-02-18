import bodyparser from 'body-parser';
import { getConnection } from '../db';

module.exports = function (router) {
  router.use(bodyparser.json());

  const db = getConnection();

  router.post('/sign_up', function (req, res) {
    if (req.body && req.body.username) {
      const storedUser = db.users.save(req.body);
      res.json({ newUser: storedUser, users: db.users.find() });
    }
  });

  router.post('/user_delete', function (req, res) {
    if (req.body && req.body.username && !req.body.admin) {
      db.users.remove({ username: req.body.username });
      console.log('remove', req.body);
      db.messages.remove({ user: req.body.channelID });
    }
    res.json(db.users.find());
  });

  // get usernames for validating whether a username is available
  router.get('/all_usernames', function (req, res) {
    res.json(db.users.find());
  })
};
