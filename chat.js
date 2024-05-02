const mp = require('rage-mp');

// Función para transmitir un mensaje formateado a todos los jugadores en un rango específico
function broadcastMessage(player, message, color) {
    let displayName = player.getVariable('known') ? player.name : player.getVariable('hash');
    mp.players.broadcastInRange(player.position, 10, `<span style="color: ${color};">${displayName} dice: ${message}</span>`);
}

// Evento para manejar mensajes de chat
mp.events.add("playerChat", (player, message) => {
    if (message.startsWith("/me")) {
        // Comando /me en color lila/morado
        broadcastMessage(player, `<b>${player.name} ${message.slice(3)}</b>`, "purple");
    } else if (message.startsWith("/do")) {
        // Comando /do en color verde
        broadcastMessage(player, `<b>${message.slice(3)}</b>`, "green");
    } else if (message.startsWith("/b")) {
        // Comando /b para chat OOC
        broadcastMessage(player, `<i>(${message.slice(2)})</i>`, "gray");
    } else {
        // Chat general
        broadcastMessage(player, `<b>${player.name} dice:</b> ${message}`, "white");
    }
});