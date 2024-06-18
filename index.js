// Importation des modules nécessaires
const { Plugin } = require('vencord');

// Création du plugin
module.exports = class ShowMessageTimestamp extends Plugin {
  // Méthode d'initialisation du plugin
  onStart() {
    // Écoute des nouveaux messages
    this.on('MESSAGE_CREATE', this.showTimestamp);
  }

  // Méthode de déchargement du plugin
  onStop() {
    // Nettoyer les écouteurs ou les modifications
  }

  // Méthode pour afficher l'horodatage du message
  showTimestamp(message) {
    // Vérifier si le message est valide
    if (!message || !message.timestamp) return;

    // Extraire la date et l'heure du message
    const date = new Date(message.timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

    // Créer une chaîne de caractères avec l'horodatage complet
    const fullTimestamp = `[${hours}:${minutes}:${seconds}.${milliseconds}]`;

    // Ajouter l'horodatage au contenu du message
    message.content += ` ${fullTimestamp}`;

    // Mettre à jour l'affichage du message
    message.update();
  }
};