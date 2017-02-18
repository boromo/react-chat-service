import { getConnection } from './db';

module.exports = function(io) {
  io.on('connection', function(socket) {
    const db = getConnection();

    socket.join('Lobby');
    socket.on('chat mounted', function(user) {
      // TODO: Does the server need to know the user?
      socket.emit('receive socket', socket.id)
    })
    socket.on('leave channel', function(channel) {
      socket.leave(channel)
    })
    socket.on('join channel', function(channel) {
      socket.join(channel)
    })
    socket.on('new message', function(msg) {
      db.messages.save(msg);
      io.sockets.in(msg.channelID).emit('new bc message', msg);
    });
  });
}
