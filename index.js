const mp = require('rage-mp');

mp.events.add('playerJoin', player => {
    player.outputChatBox('¡Bienvenido/a al servidor de roleplay!');
});