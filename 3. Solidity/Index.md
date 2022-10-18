
# Salut, cher correcteur !

Pour pouvoir jouer avec le front :
- Instalation : `npm install --save-dev`
- Le smart contract est là : `\Voting\contracts\Voting.sol`
- Déployer le smart contract dans remix sur goerli (metamask) , copier l'adresse 
- Modifier le fichier `\Voting\src\utils\contract.js` avec les adresses du smart contract et du propriétaire.
- Lancement : `npm start`

Le comportement du contrat devrait être fidèle à l'énoncé à l'exeption de ces modification :
- Ajout de deux variables uint pour pouvoir nourrir le front 
- Pour gérer le cas d'égalité (deux propositions ayant le plus et autant de vote), ajout d'un tableau Proposal contenant la(es) vainqueurs

Amuse-toi bien :) 