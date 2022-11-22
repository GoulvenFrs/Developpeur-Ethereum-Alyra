function Card5({ winningList}) {

  return (
    <p className="BeforeVote"> Hooray ! The votes have been tallied. <br/> {winningList.length>1 ?
        <span> It appears we have an equality between those {winningList.length} proposals :</span>:
        <span> It appears you have chosen this proposal :</span>}
      </p>
  );
}

export default Card5;