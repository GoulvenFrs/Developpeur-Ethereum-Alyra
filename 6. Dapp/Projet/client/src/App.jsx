import { EthProvider } from "./contexts/EthContext";

import {Background} from './components/Background';
import Main from './components/Main';

import "./App.css";

function App() {

  return (
    <EthProvider>
      <div id="App" >
          <Background/>
          <Main/>
      </div>
    </EthProvider>
  );
}

export default App;
