const User = require('../db');
const mp = require('rage-mp');

setInterval(() => {
  mp.players.forEach(async (player) => {
    if (player.isLoggedIn) {
      let user = await User.findById(player.dbId);
      if (user) {
        user.experience += 1/60; // Añadir 1 punto de experiencia por cada hora de juego
        user.bankAccount += calculatePayment(user.level); // Añadir pago por hora según el nivel

        // Actualizar el nivel del usuario si es necesario
        const nextLevelExp = calculateExpForNextLevel(user.level);
        if (user.experience >= nextLevelExp) {
          user.level += 1;
          user.experience = 0; // O mantener el excedente para el siguiente nivel
          player.outputChatBox("¡Has subido de nivel! Ahora eres nivel " + user.level);
        }
        
        await user.save();
      }
    }
  });
}, 3600000); // Ejecuta cada hora

function calculateExpForNextLevel(level) {
  return 4 + 2 * (level - 1) * (level - 1); // Fórmula de ejemplo para el incremento en las horas requeridas
}

function calculatePayment(level) {
  return 100 * level; // Pago aumenta con el nivel
}