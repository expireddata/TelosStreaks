import React from 'react';
import './App.css';
import { streakChance } from "./calc";
import styled from "styled-components"; 

const Input = styled.input`
  display: inline-block; 
  margin: 20px;
`

const StyledForm = styled.div`
  text-align: center
`

const App = () => {
  const [start, setStart] = React.useState(""); 
  const [end, setEnd] = React.useState("");
  const [lotd, setlotd] = React.useState(false);
  
  let dropChance = ""; 

  if(start !== "" && end !== ""){ 
    const streakObj = streakChance(+start, +end, lotd);
    let {p, perKill} = streakObj; 
     dropChance = <><div>{`Your drop chance is ${p.toFixed(6)}, or 1 in ${(1/p).toFixed(3)} streaks.`}</div><div>{`Your average chance per kill on this streak is 1 in ${perKill.toFixed(3)}`}</div></>;
  }
  return (
    <div className="App">
      <Input type="number" placeholder="Starting Enrage" value={start} onChange={(e) => setStart(e.target.value)} />
      <Input type="number" placeholder="Ending Enrage" value={end} onChange={(e) => setEnd(e.target.value)} />
      <div>Lotd: <input type="checkbox" value={lotd} onChange={(e) => setlotd(e.target.checked)} /></div>
      <div>{dropChance}</div> 
    </div>
  );
}

export default App;
