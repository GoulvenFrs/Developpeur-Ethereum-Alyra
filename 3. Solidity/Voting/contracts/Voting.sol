// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Voting is Ownable{

    using Counters for Counters.Counter;
    Counters.Counter proposalId;

    uint256 public countVoters;
    uint256 public countVotes;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedProposalId;
    }

    mapping(address=> Voter) public whiteList; // mapping des voters

    struct Proposal {
        string description;
        uint256 voteCount;
    }

    Proposal[] public proposals;  // Array contenant les propositions
    Proposal[] public winningProposals;   // Array contenant la(es) proposition(s) gagnante(s)

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public state;  // Etat du contrat 

    event VoterRegistered(address voterAddress); 
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted (address voter, uint proposalId);

    constructor(){
        state=WorkflowStatus.RegisteringVoters;
        countVoters=0;
        countVotes=0;
    }

    modifier onlyWhiteListed{
        require(whiteList[msg.sender].isRegistered==true,"You're not a registered voter");
        _;
    }

    function registerListVoter(address [] memory _list) public onlyOwner{
        require(_list.length>0,"The list is empty !");
        for(uint256 i=0;i<_list.length;i++){
            require(_list[i]!=address(0),"The adress is invalid !");
            require(whiteList[_list[i]].isRegistered == false,"The voter is already registered !");
            whiteList[_list[i]].isRegistered = true;
            whiteList[_list[i]].hasVoted = false;
            countVoters+=1; // supplément front 
            emit VoterRegistered(_list[i]);
        }
    }

    function openProposals() public onlyOwner{
        require(state==WorkflowStatus.RegisteringVoters,"The voters registration isn't closed");
        state=WorkflowStatus.ProposalsRegistrationStarted;
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters,WorkflowStatus.ProposalsRegistrationStarted);
    }

    function sendProposal(string memory _proposal) public onlyWhiteListed{
        require(state==WorkflowStatus.ProposalsRegistrationStarted,"The proposals registration isn't opened");
        Proposal memory proposal = Proposal(_proposal,0); 
        proposals.push(proposal);
        emit ProposalRegistered(proposalId.current());
        proposalId.increment();
    } 

    function closeProposals() public onlyOwner{
        require(state==WorkflowStatus.ProposalsRegistrationStarted,"The proposals registration isn't opened");
        state=WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted,WorkflowStatus.ProposalsRegistrationEnded);
    }

    function openVotes() public onlyOwner{
        require(state==WorkflowStatus.ProposalsRegistrationEnded,"The proposals registration isn't closed");
        state=WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded,WorkflowStatus.VotingSessionStarted);
    }

    function voteProposal(uint256 _proposalId) public onlyWhiteListed{
        require(state==WorkflowStatus.VotingSessionStarted,"The voting session isn't opened");
        require (_proposalId>=0 && _proposalId<=proposalId.current(), "This proposal doesn't exist");
        require (whiteList[msg.sender].hasVoted==false, "You already voted");
        whiteList[msg.sender].hasVoted=true;
        whiteList[msg.sender].votedProposalId=_proposalId;
        proposals[_proposalId].voteCount+=1;
        countVotes+=1; // supplément front
        emit Voted (msg.sender,_proposalId);
    }

    function closeVotes() public onlyOwner{
        require(state==WorkflowStatus.VotingSessionStarted,"The voting session isn't opened");
        state=WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted,WorkflowStatus.VotingSessionEnded);
    }

    function pickWinner() public onlyOwner {
        require(state==WorkflowStatus.VotingSessionEnded,"The voting session isn't closed");
        uint256 bestScore =0;
        for (uint256 i =0; i<proposalId.current();i++){
            if (proposals[i].voteCount>bestScore){
                bestScore=proposals[i].voteCount;
                if(winningProposalId.length>0){   
                    delete winningProposals;        
                }
                winningProposals.push(proposals[i]);
            }else if (proposals[i].voteCount==bestScore){
                winningProposals.push(proposals[i]);
            }
        }
        state=WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded,WorkflowStatus.VotesTallied);
    }

    function getVote(address _idVoter) public view onlyWhiteListed returns(Proposal memory){
        require(whiteList[_idVoter].isRegistered==true,"This person isn't a registered voter");
        require(whiteList[_idVoter].hasVoted==true, "This person haven't voted");
        return proposals[whiteList[_idVoter].votedProposalId];
    }

    function getWinner() public view returns(Proposal[] memory){
        require(state==WorkflowStatus.VotesTallied,"The votes haven't been tallied !");
        return winningProposals;
    }

    // front

    function getProposals() public view returns(Proposal[] memory){
        return proposals;
    }


}