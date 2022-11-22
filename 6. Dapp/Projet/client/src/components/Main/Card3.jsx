import { useState } from "react";

function Card3({ contract, accounts}) {

  const [friend, setFriend] = useState("");
  const [resultFriend, setResultFriend] = useState("");

  async function checkVote(_addr) {
    const value = await contract.methods.getVote(_addr).call({ from: accounts[0] });
    setResultFriend(value);
  }

  return (
    <div className="Proposal">
      <p className="ProposalTitle">
        {" "}
        Now is the time to vote. You only have one vote so choose wisely !
      </p>
      <div className="Friend">
        <form className="Form">
          <label className="LabelInput">
            Enter your colleague's address to see his vote :{" "}
          </label>
          <input
            type="text"
            className="ProposalInput"
            placeholder="0x000"
            cols="25"
            rows="1"
            value={friend}
            onChange={(e) => setFriend(e.target.value)}
          ></input>
        </form>
        <button className="ChoiceButton" onClick={() => checkVote(friend)}>
          {" "}
          View choice
        </button>
      </div>
      {resultFriend !== "" && (
        <p className="LabelInput">
          {" "}
          Your friend has voted for : "{resultFriend}"
        </p>
      )}
    </div>
  );
}

export default Card3;
