# DApp Voting System 

## Setup

Download the project workspace on your local machine.

```bash
git clone https://github.com/GoulvenPablo/Developpeur-Ethereum-Alyra.git
cd Developpeur-Ethereum-Template/6.\ Dapp/Projet
```

First setup the truffle environment to deploy the contract :

```bash
cd truffle
npm install
truffle migrate --network goerli
```

Then setup the client to use the Dapp :

```bash
# cd .. 
cd client
npm install
npm start 
```

Once the smart contract is deployed, you'll need to add the owner public address into the Dapp :

```bash
cd client/src/components/Main/Container.jsx
```

```JS
# line 20 :
const owner ="0x"
```

