const io = require('socket.io')(3000, {
    cors: {
        origin: ['https://app.shinpostudios.com'],
        methods: ["GET"],
    },
})

io.on('connection', socket => {
    socket.on('player-join', (lobbyId,playerId,name,pronouns,role) => {
        if (lobbyId !== '') {
            console.log(lobbyId,playerId,name,pronouns,role);
            socket.to(lobbyId).emit('player-join-info', {lobbyId,playerId,name,pronouns,role});
        }
    });
    socket.on('join-lobby', lobbyId => {
        socket.join(lobbyId);
    });
    socket.on('report-resolution', (height,width) => {
       console.log(height,width);
    });
    socket.on('show-player', (playerId, role) => {
        console.log('show-player', playerId, role);
        socket.to(playerId).emit('get-role', role);
    });
});
