import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";

import Account from "./Account";
import Container from "./Container";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Main() {
  const { state } = useEth();
  const [status, setStatus] = useState({});

  return (
    <div className="Container">
      {!state.artifact ? (
        <NoticeNoArtifact />
      ) : !state.contract ? (
        <NoticeWrongNetwork />
      ) : (
        <div className="Container" >
          <Account />
          <Container status={status} setStatus={setStatus} />
        </div>
      )}
    </div>
  );
}

export default Main;
