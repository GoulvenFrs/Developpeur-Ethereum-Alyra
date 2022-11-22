function GridProposals({status,proposalsList,setProposalsList,contract,accounts}) {

    async function voteProposal(_id) {
        try{
            await contract.methods.voteProposal(_id).send({ from: accounts[0] });
        }catch(err) {
            console.log(err)
        }
      }

    return (
        <div className ="CardContainer">
        {proposalsList.map( (propositions,index)=>(
          <div className ="Card" key={index}>
            <p className ="CardIndex">{index}</p>
            <p className ="CardText">{propositions.description}</p>
            {status===3 &&<button className="RegisterButton" onClick={()=>voteProposal(index)}>Vote !</button>}
          </div>
        ))}
      </div>
    );
  }
  
  export default GridProposals;