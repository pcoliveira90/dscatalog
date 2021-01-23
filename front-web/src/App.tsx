import React , {useState}from 'react';

const App = () => {
  const [ counter, setCounter] = useState(0);

  return (
      <div className="container mt-5">
        <button 
          className="btn btn-primary mr-5"
          onClick={() => setCounter(counter+1)}> 
          + 
        </button>
        
        <span> {counter} </span>
        
        <button 
          className="btn btn-danger ml-5"
          onClick={() => setCounter(counter-1)}> 
          - 
        </button>
      </div>
    )
  }

export default App;