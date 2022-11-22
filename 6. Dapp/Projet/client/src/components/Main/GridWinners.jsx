function GridWinners({winningList}) {

    return (
        <div className ="CardContainer">
        {winningList.map( (propositions,index)=>(
          <div className ="Card" key={index}>
            <p className ="CardCount">{Number(propositions.voteCount)} vote(s)</p>
            <p className ="CardText">{propositions.description}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default GridWinners;