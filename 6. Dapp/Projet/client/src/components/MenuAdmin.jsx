import { useEffect,useState } from "react";
import useEth from "../contexts/EthContext/useEth";

function MenuAdmin({setStatus, status, contract, accounts }) {

  const [list, setList] = useState([]);
  /* console.log("status admin",status) */

  async function sendList(_list) {
    let tempList=_list.split(',')
    try{
      await contract.methods.registerListVoter(tempList).send({from: accounts[0] });
    }catch(err) {
      console.log(err)
    }
  }

  async function openProposals() {
    await contract.methods.openProposals().send({from: accounts[0]});
    setStatus(1);

  }

  async function closeProposals() {
    await contract.methods.closeProposals().send({from: accounts[0] });
    setStatus(2);

  }
  
  async function openVotes() {
    try{
      await contract.methods.openVotes().send({from: accounts[0] });
      setStatus(3);
    }catch(err) {
      console.log(err)
    }
  }

  async function closeVotes() {
    try{
      await contract.methods.closeVotes().send({from: accounts[0] });
      setStatus(4);
    }catch(err) {
      console.log(err)
    }
  }

  async function pickWinner() {
    try{
      await contract.methods.pickWinner().send({from: accounts[0] });
      setStatus(5);
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="AdminMenu">
      <p>Hi Admin !</p>
      {status === 0 && (
        <div>
          <form>
            <textarea
              className="ListInput"
              placeholder="Enter here the list of voters : 0x00,0x01,..."
              cols="20"
              rows="5"
              value={list}
              onChange={(e) => setList(e.target.value)}
            ></textarea>
          </form>
          <button className="AdminButton" onClick={() => sendList(list)}>
            Register voters
          </button>
        </div>
      )}
      {status === 0 && list !== [] && (
        <button className="AdminButton" onClick={openProposals}>
          Open proposals registration
        </button>
      )}
      {status === 1 && (
        <button className="AdminButton" onClick={closeProposals}>
          Close proposals registration
        </button>
      )}
      {status === 2 && (
        <button className="AdminButton" onClick={openVotes}>
          Open votes
        </button>
      )}
      {status === 3 && (
        <button className="AdminButton" onClick={closeVotes}>
          Close votes
        </button>
      )}
      {status === 4 && (
        <button className="AdminButton" onClick={pickWinner}>
          Tally votes
        </button>
      )}
    </div>
  );
}

export default MenuAdmin;
