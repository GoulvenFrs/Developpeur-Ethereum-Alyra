import React from 'react';
import { useState, useEffect } from 'react';
import {  ethers } from 'ethers';
import Voting from './artifacts/contracts/Voting.sol/Voting.json';
import {votingAddress} from './utils/contract';
import {adminAddress} from './utils/contract';
import {Background} from './components/Background';
import Popup from './components/Popup';
import './App.css';

function App() {
 
  const [error, setError] = useState('');
  const [account,setAccount]=useState([]);
  const [list, setList] = useState([]);
  const [voters, setVoters] = useState("");
  const [friend, setFriend] = useState("");
  const [resultFriend, setResultFriend] = useState("");
  const [votes, setVotes] = useState("");
  const [state, setState] = useState({});
  const [proposal, setProposal] = useState("");
  const [proposalsList, setProposalsList] = useState([]);
  const [winningList, setWinningList] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [popupStyle, setPopupStyle] = useState("");
 
  const togglePopup = (_style) => {
    setPopupStyle(_style);
    setIsOpen(!isOpen);
  }
  
  useEffect(() => { 
      getAccounts();
      fetchData();
    }, []);

    async function getAccounts() {
      if(typeof window.ethereum !== 'undefined') {
          let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
          setAccount(accounts);
        }
    }

  async function fetchData() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(votingAddress, Voting.abi, provider);
      try {
        let state  = await contract.state();
        setState(state);
        let countVoters  = await contract.countVoters();
        setVoters(countVoters.toNumber());
        if(state!==0){
          let proposals = [...await contract.getProposals()];
          setProposalsList(proposals);
          if(state===3){
            let countVotes  = await contract.countVotes();
            setVotes(countVotes.toNumber());
          }
          if(state===5){
            let winners = [...await contract.getWinner()];
            setWinningList(winners);
          }
        }

      }
      catch(err) {
        setError(err.message);
        togglePopup("error");
      }
    }
  }


  async function sendList(_list) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
    let _list2=_list.split(',')
    try {
      const transaction  = await contract.registerListVoter(_list2);
      togglePopup("submitList");
      await transaction.wait();
      fetchData();
    }
    catch(err) {
      setError(err.message);
      togglePopup("error");
    }
  }

  async function openProposals() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
    try {
      const transaction  = await contract.openProposals();
      togglePopup("openPropo");
      await transaction.wait();
      fetchData();
      
    }
    catch(err) {
      setError(err.message);
      togglePopup("error");
    }
  }

  async function sendProposal(_proposal) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
    try {
      const transaction  = await contract.sendProposal(_proposal);
      togglePopup("submitPropo");
      await transaction.wait();
      fetchData();
    }
    catch(err) {
      setError(err.message);
      togglePopup("error");
    }
  }

  async function closeProposals() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
    try {
      const transaction  = await contract.closeProposals();
      togglePopup("closePropo");
      await transaction.wait();
      fetchData();
    }
    catch(err) {
      setError(err.message);
      togglePopup("error");
    }
  }

  async function openVotes() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
    try {
      const transaction  = await contract.openVotes();
      togglePopup("openVote");
      await transaction.wait();
      fetchData();
    }
    catch(err) {
      setError(err.message);
      togglePopup("error");
    }
  }

  async function voteProposal(_id) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
    try {
      const transaction  = await contract.voteProposal(_id);
      togglePopup("sendVote");
      await transaction.wait();
      fetchData();
    }
    catch(err) {
      setError(err.message);
      togglePopup("error");
    }
  }

  async function checkVote(_addr){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
    try{
      setResultFriend("");
      let tempResultFriend  = await contract.getVote(_addr);
      setResultFriend(tempResultFriend.description);
      fetchData();
    }catch(err) {
      setError(err.message);
      togglePopup("error");
    }
  }

  async function closeVotes() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
    try {
      const transaction  = await contract.closeVotes();
      togglePopup("closeVote");
      await transaction.wait();
      fetchData();
    }
    catch(err) {
      setError(err.message);
      togglePopup("error");
    }
  }

  async function pickWinner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
    try {
      const transaction  = await contract.pickWinner();
      togglePopup("findWinner");
      await transaction.wait();
      fetchData();
    }
    catch(err) {
      setError(err.message);
      togglePopup("error");
    }
  }

  return (
    <div className="App">
      <Background/>
      {isOpen && 
        <Popup
          content={error}
          type={popupStyle}
          handleClose={togglePopup}
        />
      }
      {account[0] === adminAddress.toLowerCase() && 
        <div className="AdminMenu">
          <p>Hi Admin !</p>
          {state===0 && 
            <div>
                <form>
                    <textarea className="ListInput" placeholder="Enter here the list of voters : 0x00,0x01,..."  cols="20" rows="5" value={list} onChange={(e) => setList(e.target.value)}></textarea>
                </form>
                <button className="AdminButton" onClick={()=>sendList(list)} >Register voters</button>
            </div>
           }
          {state===0 && voters !==0 &&<button className="AdminButton" onClick={openProposals} >Open proposals registration</button>}
          {state===1 && <button className="AdminButton" onClick={closeProposals}>Close proposals registration</button>}
          {state===2 && <button className="AdminButton" onClick={openVotes}>Open votes</button>}
          {state===3 && <button className="AdminButton" onClick={closeVotes}>Close votes</button>}
          {state===4 && <button className="AdminButton" onClick={pickWinner}>Tally votes</button>}
        </div> 
      }
      {account[0]&&
        <p className="Account">
          {account[0]}
        </p>
        }
      <div className="Container" >
        {state===0 &&
          <div className="Register">
            <p className="RegisterTitle1">Hello there !</p>
            <p className="RegisterTitle2">The admin is registering the voters, the proposals phase will soonly start !</p>
          </div>

        }
        {state===1 &&
          <div className="Proposal">
            <p className="ProposalTitle">Now is the time to share with us all of your proposals :</p>
            <form>
                <textarea className="ProposalInput" placeholder="Write your proposals one by one please !"  cols="60" rows="5" value={proposal} onChange={(e) => setProposal(e.target.value)}></textarea>
            </form>
            <button className="RegisterButton" onClick={()=>sendProposal(proposal)}> Send proposal</button>
          </div>
        }
        {proposalsList && state===2 &&
          <p className="BeforeVote"> All of the proposals have been registered, the voting session will be opened soon !</p>
        }
        {proposalsList && state===3 &&
          <div className="Proposal">
            <p className="ProposalTitle"> Now is the time to vote. You only have one vote so choose wisely !</p>
            <div className="Friend">
              <form className="Form">
                <label className="LabelInput">Enter your colleague's address to see his vote : </label>
                <input type="text" className="ProposalInput" placeholder="0x000"  cols="25" rows="1" value={friend} onChange={(e) => setFriend(e.target.value)}></input>
              </form>
              <button className="ChoiceButton" onClick={()=>checkVote(friend)}> View choice</button> 
            </div>
            {resultFriend!=="" && <p className="LabelInput"> Your friend has voted for : "{resultFriend}"</p>}


          </div>
        }
        {proposalsList && state===4 &&
          <p className="BeforeVote"> The voting session is closed. The votes will soonly be tallied !</p>
        }
        {winningList && state===5 &&
          <p className="BeforeVote"> Hooray ! The votes have been tallied. <br/> {winningList.length>1 ?
            <span> It appears we have an equality between those {winningList.length} proposals :</span>:
            <span> It appears you have chosen this proposal :</span>}
          </p>
        }
        {proposalsList && state!==5 &&
          <div className ="CardContainer">
            {proposalsList.map( (propositions,index)=>(
              <div className ="Card" key={index}>
                <p className ="CardIndex">{index}</p>
                <p className ="CardText">{propositions.description}</p>
                {state===3 &&<button className="RegisterButton" onClick={()=>voteProposal(index)}>Vote !</button>}
              </div>
            ))}
          </div>
        }
        {state===5 && winningList.length!==0  &&
          <div className ="CardContainer">
            {winningList.map( (propositions1,index)=>(
              <div className ="Card" key={index}>
                <p className ="CardCount">{propositions1.voteCount.toNumber()} vote(s)</p>
                <p className ="CardText">{propositions1.description}</p>
              </div>
            ))}
          </div>
        } 
      </div>
      { voters !=="" &&
        <div className ="Footer">
          <p className ="FooterText"> Voters registered : <span>{voters}</span></p><br/>
          {votes !=="" && <p> Has voted : <span>{votes}</span></p>}
        </div>
      }
    </div>
  );
}

export default App;
