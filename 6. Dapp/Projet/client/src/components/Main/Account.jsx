
import useEth from "../../contexts/EthContext/useEth";

function Account() {

    const {state: {accounts}} =useEth();

    return (
      <>
        <p className="Account">
            {accounts[0].slice(0, 7)}...{accounts[0].slice(accounts[0].length-7)}
        </p>
      </>
    );
  }
  
  export default Account;