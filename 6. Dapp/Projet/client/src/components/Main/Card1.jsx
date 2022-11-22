import { useState } from "react";

function Card1({contract,accounts,fetchProposals}) {

  const [proposal, setProposal] = useState("");

  async function sendProposal(_proposal) {
    await contract.methods.sendProposal(_proposal).send({from: accounts[0] });
    fetchProposals();
  }
  
  return (
    <div className="Proposal">
      <p className="ProposalTitle">
        Now is the time to share with us all of your proposals :
      </p>
      <form>
        <textarea
          className="ProposalInput"
          placeholder="Write your proposals one by one please !"
          cols="60"
          rows="5"
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
        ></textarea>
      </form>
      <button className="RegisterButton" onClick={() => sendProposal(proposal)}>
        {" "}
        Send proposal
      </button>
    </div>
  );
}

export default Card1;
