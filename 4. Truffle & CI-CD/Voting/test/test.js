const Voting = artifacts.require("./Voting");

const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const constants = require('@openzeppelin/test-helpers/src/constants');


contract("Voting", accounts => {

    const _owner=accounts[0];
    const _voter1= accounts[1];
    const _voter2= accounts[2];

    _RegisteringVoters= new BN(0);
    _ProposalsRegistrationStarted= new BN(1);
    _ProposalsRegistrationEnded= new BN(2);
    _VotingSessionStarted= new BN(3);
    _VotingSessionEnded= new BN(4);
    _VotesTallied= new BN(5);

    const _proposal0="GENESIS"
    const _proposal1="proposal1";
    const _proposal2="proposal2";
    const _proposal0Id= new BN(0);
    const _proposal1Id= new BN(1);
    const _proposal2Id= new BN(2);


    let VotingInstance;

    // ::::::::::::: WORKFLOWSTATUS TESTING ::::::::::::: //
    context("WorkflowStatus",function(){
        context("Normal evolution",function(){

            before(async function(){
                VotingInstance=await Voting.new({from: _owner});
            });
    
            it("Check initial state workflowStatus is 0", async () => {
                let workflowStatus = await VotingInstance.workflowStatus.call();
                expect(workflowStatus).to.be.bignumber.equal(_RegisteringVoters);
            });
    
            it("Check startProposalsRegistering() change workflowStatus to 1 and emit according event", async () => {
                expectEvent (await VotingInstance.startProposalsRegistering({from: _owner}),"WorkflowStatusChange",{ previousStatus:_RegisteringVoters,newStatus:_ProposalsRegistrationStarted});
                let workflowStatus = await VotingInstance.workflowStatus.call();
                expect(workflowStatus).to.be.bignumber.equal(_ProposalsRegistrationStarted);
            });
    
            it("Check endProposalsRegistering() change workflowStatus to 2 and emit according event", async () => {
                expectEvent (await VotingInstance.endProposalsRegistering({from: _owner}),"WorkflowStatusChange",{ previousStatus:_ProposalsRegistrationStarted,newStatus:_ProposalsRegistrationEnded});
                let workflowStatus = await VotingInstance.workflowStatus.call();
                expect(workflowStatus).to.be.bignumber.equal(_ProposalsRegistrationEnded);
            });
    
            it("Check startVotingSession() change workflowStatus to 3 and emit according event", async () => {
                expectEvent (await VotingInstance.startVotingSession({from: _owner}),"WorkflowStatusChange",{ previousStatus:_ProposalsRegistrationEnded,newStatus:_VotingSessionStarted});
                let workflowStatus = await VotingInstance.workflowStatus.call();
                expect(workflowStatus).to.be.bignumber.equal(_VotingSessionStarted);
            });
    
            it("Check endVotingSession() change workflowStatus to 4 and emit according event", async () => {
                expectEvent (await VotingInstance.endVotingSession({from: _owner}),"WorkflowStatusChange",{ previousStatus:_VotingSessionStarted,newStatus:_VotingSessionEnded});
                let workflowStatus = await VotingInstance.workflowStatus.call();
                expect(workflowStatus).to.be.bignumber.equal(_VotingSessionEnded);
            });
    
            it("Check tallyVotes() change workflowStatus to 5 and emit according event", async () => {
                expectEvent (await VotingInstance.tallyVotes({from: _owner}),"WorkflowStatusChange",{ previousStatus:_VotingSessionEnded,newStatus:_VotesTallied});
                let workflowStatus = await VotingInstance.workflowStatus.call();
                expect(workflowStatus).to.be.bignumber.equal(_VotesTallied);
            });
        })
    
        context("Wrong evolution",function(){
    
            before(async function(){
                VotingInstance=await Voting.new({from: _owner});
            });
    
            it("Revert endProposalsRegistering() when workflowStatus isn't ProposalsRegistrationStarted", async () => {
                await expectRevert(VotingInstance.endProposalsRegistering({from: _owner}),"Registering proposals havent started yet")
            });
            it("Revert startVotingSession() when workflowStatus isn't ProposalsRegistrationEnded", async () => {
                await expectRevert(VotingInstance.startVotingSession({from: _owner}),"Registering proposals phase is not finished")
            });
            it("Revert endVotingSession() when workflowStatus isn't VotingSessionStarted", async () => {
                await expectRevert(VotingInstance.endVotingSession({from: _owner}),"Voting session havent started yet")
            });
            it("Revert tallyVotes() when workflowStatus isn't VotingSessionEnded", async () => {
                await expectRevert(VotingInstance.tallyVotes({from: _owner}),"Current status is not voting session ended")
            });
            it("Revert startProposalsRegistering() when workflowStatus isn't RegisteringVoters", async () => {
                await VotingInstance.startProposalsRegistering({from: _owner});
                await expectRevert(VotingInstance.startProposalsRegistering({from: _owner}),"Registering proposals cant be started now")
            });
    
        });
    });

    // ::::::::::::: ADDVOTER TESTING ::::::::::::: //
    context("addVoter()",function(){

        beforeEach(async function(){
            VotingInstance=await Voting.new({from: _owner});
        })

        it("Revert because sender isn't the owner ", async () => {
            await expectRevert(VotingInstance.addVoter(_voter1, {from: _voter1}),"Ownable: caller is not the owner");
        });

        it("Revert because workflowStatus isn't RegisteringVoters ", async () => {
            await VotingInstance.startProposalsRegistering({from: _owner});
            await expectRevert(VotingInstance.addVoter(_voter1, {from: _owner}),"Voters registration is not open yet");
        });

        it("Revert because voter is already registered ", async () => {
            await VotingInstance.addVoter(_voter1,{from: _owner});
            await expectRevert(VotingInstance.addVoter(_voter1, {from: _owner}),"Already registered");
        });

        it("Check the voter is registered =true", async () => {
            await VotingInstance.addVoter(_voter1,{from: _owner});
            let voter1 = await VotingInstance.getVoter(_voter1,{from: _voter1});
            expect(voter1.isRegistered).to.be.true;
        });

        it("Should emit event on addVoter", async () => {
            expectEvent(
              await VotingInstance.addVoter(_voter1, { from: _owner }),
              "VoterRegistered",
              { voterAddress: _voter1 }
            );
        });

    });

    // ::::::::::::: ADDPROPOSAL TESTING ::::::::::::: //
    context("addProposal()",function(){

        beforeEach(async function(){
            VotingInstance=await Voting.new({from: _owner});
            await VotingInstance.addVoter(_voter1,{from: _owner});
        });

        it("Revert because workflowStatus isn't ProposalsRegistrationStarted ", async () => {
            await expectRevert(VotingInstance.addProposal(_proposal1, {from: _voter1}),"Proposals are not allowed yet");
        });

        context("",function(){
            beforeEach(async function(){
                await VotingInstance.startProposalsRegistering({from: _owner});
            });

            it("Check the proposal's list initialisation",async()=>{
                let proposal0 = await VotingInstance.getOneProposal(_proposal0Id,{from: _voter1});
                expect(proposal0.description).to.equal(_proposal0);
            })

            it("Revert because sender isn't a registered voter ", async () => {
                await expectRevert(VotingInstance.addProposal(_proposal1, {from: _voter2}),"You're not a voter");
            });

            it("Revert because proposal is empty ", async () => {
                await expectRevert(VotingInstance.addProposal("", {from: _voter1}),"Vous ne pouvez pas ne rien proposer");
            });

            it("Check the proposal is well registered", async () => {
                await VotingInstance.addProposal(_proposal1,{from: _voter1});
                let proposal1 = await VotingInstance.getOneProposal(_proposal1Id,{from: _voter1});
                expect(proposal1.description).to.equal(_proposal1);
            });

            it("Should emit event on addPoposal", async () => {
                expectEvent(
                  await VotingInstance.addProposal(_proposal1, { from: _voter1 }),
                  "ProposalRegistered",
                  { proposalId: _proposal1Id }
                );
            });

        });
        
    });

    // ::::::::::::: SETVOTE TESTING ::::::::::::: //
    context("setVote()",function(){
        
        beforeEach(async function(){
            VotingInstance=await Voting.new({from: _owner});
            await VotingInstance.addVoter(_voter1,{from: _owner});
            await VotingInstance.addVoter(_voter2,{from: _owner});
            await VotingInstance.startProposalsRegistering({from: _owner});
            await VotingInstance.addProposal(_proposal1,{from: _voter1});
            await VotingInstance.addProposal(_proposal2,{from: _voter2});
            await VotingInstance.endProposalsRegistering({from: _owner});
        });

        it("Revert because workflowStatus isn't VotingSessionStarted ", async () => {
            await expectRevert(VotingInstance.setVote(_proposal1Id, {from: _voter1}),"Voting session havent started yet");
        });

        context("",function(){
            beforeEach(async function(){
                await VotingInstance.startVotingSession({from: _owner});
            });

            it("Revert because sender isn't a registered voter ", async () => {
                await expectRevert(VotingInstance.setVote(_proposal1Id, {from: _owner}),"You're not a voter");
            });

            it("Revert because vote id is invalid", async () => {
                await expectRevert(VotingInstance.setVote(new BN(3), {from: _voter1}),"Proposal not found");
            });

            it("Revert because sender has already voted ", async () => {
                await VotingInstance.setVote(_proposal1Id, {from: _voter2});
                await expectRevert(VotingInstance.setVote(_proposal2Id, {from: _voter2}),"You have already voted");
            });

            it("Check the voter.hasVoted is true", async () => {
                await VotingInstance.setVote(_proposal1Id, {from: _voter2});
                let voter2 = await VotingInstance.getVoter(_voter2,{from: _voter1});
                expect(voter2.hasVoted).to.be.true;
            });

            it("Check the vote is well registered", async () => {
                await VotingInstance.setVote(_proposal1Id, {from: _voter2});
                let voter2 = await VotingInstance.getVoter(_voter2,{from: _voter2});
                expect(new BN(voter2.votedProposalId)).to.deep.equal(_proposal1Id);
            });

            it("Check the proposal receive the vote", async () => {
                await VotingInstance.setVote(_proposal1Id, {from: _voter2});
                let proposal1 = await VotingInstance.getOneProposal(_proposal1Id,{from: _voter2});
                expect(new BN(proposal1.voteCount)).to.deep.equal(BN(1));
            });

            it("Should emit an event on setVote", async () => {
                expectEvent( await VotingInstance.setVote(_proposal1Id, {from: _voter2}),"Voted",{voter:_voter2,proposalId:_proposal1Id});
            });

        });

    });

});