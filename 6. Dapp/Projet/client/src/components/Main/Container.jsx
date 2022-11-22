import { useEffect,useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

import MenuAdmin from "../MenuAdmin";
import Card0 from "./Card0";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Card4 from "./Card4";
import Card5 from "./Card5";
import GridProposals from "./GridProposals";
import GridWinners from "./GridWinners";

function Container({ status, setStatus }) {

  const [proposalsList, setProposalsList] = useState([]);
  const [winningList, setWinningList] = useState('');

  require('dotenv').config();
  const owner = process.env.REACT_APP_OWNER ;

  const {
    state: { contract, accounts },
  } = useEth();

  useEffect(() => {
    fetchStatus();
    fetchProposals();
    fetchWinningList();
  }, [status]);

  async function fetchStatus() {
    const value = await contract.methods.state().call({ from: accounts[0] });
    setStatus(Number(value));
  }

  async function fetchProposals() {
    const value = await contract.methods.getProposals().call({ from: accounts[0] });
    setProposalsList(value);
  }

  async function fetchWinningList(){
    const value = await contract.methods.getWinner().call({ from: accounts[0] });
    setWinningList(value);
  }

  return (

    <div className="Container" >
        {accounts[0]===owner && <MenuAdmin status={status} setStatus={setStatus} contract={contract} accounts={accounts}  />}
        {status===0 && <Card0/> }
        {status===1 && <Card1 contract={contract} accounts={accounts} fetchProposals={fetchProposals}/> }
        {status===2 && <Card2 /> }
        {status===3 && <Card3 contract={contract} accounts={accounts} /> }
        {status===4 && <Card4 /> }
        {proposalsList && status!==5 && <GridProposals proposalsList={proposalsList} setProposalsList={setProposalsList} status={status} contract={contract} accounts={accounts} /> }
        {status===5 && <Card5 winningList={winningList} /> }
        {status===5 && winningList.length!==0  && <GridWinners winningList={winningList} /> }
    </div>


  );
}

export default Container;
