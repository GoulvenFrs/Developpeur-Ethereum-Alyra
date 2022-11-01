# Vote System With Unit testing

## Setup

Download the project workspace on your local machine.

```bash
git clone https://github.com/GoulvenPablo/Developpeur-Ethereum-Alyra.git
cd Developpeur-Ethereum-Template/4.\ Truffle\ \&\ CI-CD/
```

```bash
npm install @openzeppelin/contracts
npm install @openzeppelin/test-helpers 
npm install @truffle/hdwalletprovider 
npm install eth-gas-reporter
```

Depending on your local settings you might need to update the truffle.congi.js file in order to let your environment variable matching the project config.

```bash
ganache
#Those commands need to be runed in a new terminal
truffle migrate
truffle test
```


## Test coverage

> Test have been organized with nested context. 

> Hook before() and beforeEach() have been used to manage the configuration of the voting session in order to get revelant unit test without too much manipulation within the test functions itself.

### WorkflowStatus

testing functions can be found under the following structure :

```JS
context("WorkflowStatus", function () {...}
```

#### List of test case

- Normal evolution
  - [x] Check initial state workflowStatus is 0
  - [x] Check startProposalsRegistering() change workflowStatus to 1 and emit according event
  - [x] Check endProposalsRegistering() change workflowStatus to 2 and emit according event
  - [x] Check startVotingSession() change workflowStatus to 3 and emit according event
  - [x] Check endVotingSession() change workflowStatus to 4 and emit according event
  - [x] Check tallyVotes() change workflowStatus to 5 and emit according event
- Wrong evolution
  - [x] Revert startProposalsRegistering() when workflowStatus isn't RegisteringVoters
  - [x] Revert endProposalsRegistering() when workflowStatus isn't ProposalsRegistrationStarted
  - [x] Revert startVotingSession() when workflowStatus isn't ProposalsRegistrationEnded
  - [x] Revert endVotingSession() when workflowStatus isn't VotingSessionStarted
  - [x] Revert tallyVotes() when workflowStatus isn't VotingSessionEnded

---

### addVoter()

testing functions can be found under the following structure :

```JS
context("addVoter()", function () {...}
```

#### List of test case

- AddVoter test list
  - [x] Revert because sender isn't the owner
  - [x] Revert because workflowStatus isn't RegisteringVoters
  - [x] Revert because voter is already registered
  - [x] Check the voter is registered =true
  - [x] Should emit event on addVoter


---

### addProposal()

testing functions can be found under the following structure :

```JS
context("addProposal()", function () {...}
```

#### List of test case

- AddProposal test list
  - [x] Revert because workflowStatus isn't ProposalsRegistrationStarted
  - [x] Check the proposal's list initialisation
  - [x] Revert because sender isn't a registered voter
  - [x] Revert because proposal is empty
  - [x] Check the proposal is well registered
  - [x] Should emit event on addPoposal

---

### setVote()

testing functions can be found under the following structure :

```JS
context("setVote()", function () {...}
```

#### List of test case

- Voting test list
  - [x] Revert because workflowStatus isn't VotingSessionStarted
  - [x] Revert because sender isn't a registered voter
  - [x] Revert because vote id is invalid
  - [x] Revert because sender has already voted
  - [x] Check the voter.hasVoted is true
  - [x] Check the vote is well registered
  - [x] Check the proposal receive the vote
  - [x] Should emit an event on setVote

---



### Result of eth-Gas-reporter

| Solc version: 0.8.13+commit.abaa5c0e |                           | Optimizer enabled: false |         |  Runs: 200 | Block limit: 6718946 gas |           |
| :----------------------------------- | :------------------------ | :----------------------: | :-----: | ---------: | :----------------------: | :-------: |
| Methods                              |                           |                          |         |            |                          |           |
|                                      |                           |                          |         |            |                          |           |
| Contract                             | Method                    |           Min            |   Max   |        Avg |         # calls          | eur (avg) |
|                                      |                           |                          |         |            |                          |           |
| Voting                               | addProposal               |            -             |    -    |      58063 |            20            |     -     |
| Voting                               | addVoter                  |            -             |    -    |      49619 |            29            |     -     |
| Voting                               | endProposalsRegistering   |            -             |    -    |      30155 |            11            |     -     |
| Voting                               | endVotingSession          |            -             |    -    |      30098 |            2             |     -     |
| Voting                               | setVote                   |            -             |    -    |      77064 |            9             |     -     |
| Voting                               | startProposalsRegistering |            -             |    -    |      94266 |            22            |     -     |
| Voting                               | startVotingSession        |            -             |    -    |      30113 |            11            |     -     |
| Voting                               | tallyVotes                |            -             |    -    |      37320 |            1             |     -     |
| Deployments                                                      |                          |         |            |            % of limit    |           |
| Voting                                                           |            -             |    -    |    1069040 |                15.9 %    |     -     |