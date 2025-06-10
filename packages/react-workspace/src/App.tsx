import React from 'react';
import './App.css';
import { MyButton } from 'stencil-library/dist/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>React App</p>
        <MyButton text="Hello from React" />
      </header>
    </div>
  );
}

export default App;
