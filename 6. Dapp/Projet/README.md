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
npm install dotenv @truffle/hdwalletprovider
# you can configure a .env with MNEMONIC and INFURA_PROJECT_ID
truffle migrate --network goerli
```



Once the smart contract is deployed, you'll need to add the owner public address into the Dapp :

```bash
# cd .. 
cd client
```

Create a file .env at the root :

```JS
REACT_APP_OWNER =0x...
```

Then setup the client to use the Dapp :

```bash
npm install
npm start 
```


## Deployed app 

The deployed App is here : https://dappvoting-mk3pz8kz3-goulvenpablo.vercel.app/

## Demonstration

The demo video is right here :  https://www.loom.com/share/95118a58470a44c2bb0d0149ff75a559