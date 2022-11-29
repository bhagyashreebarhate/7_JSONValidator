import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  

  const [title, setTitle] = useState('Getting Started learning a React Hooks');
  const [year, setYear] = useState(2019);
  const [emails, setEmail] = useState([
    {name: 'my name', email: 'myemail@example.com'},
    {name: 'my second name',email: 'myemail@gmail.com'},
    {name: 'my third name',email: 'myemail@yahoo.com'},
    {name: 'my alias name',email: 'myemail@msn.com'}
  ]);

  const [count, setCount] = useState(0);


  useEffect(() => {
  const timer = setTimeout(() => {
    console.log('This will run after 5 second!')
  }, 1000);
},[]);

  useEffect(() => {
    
    console.log("count changed")
  }, [count]);

  useEffect(() => {
    const listener = () => {
      console.log(`The screen is clicked`);
    };
    window.addEventListener("click", listener);

    return () => {
      window.removeEventListener("click", listener);
    };
  })

  return (
    <div className="App">
      <h2>{title}</h2>
      <h2>{year}</h2>
      <dl>
        {emails.map((item, idx) => (
          <dd>{item.name}, {item.email}</dd>
        ))}
      </dl>
      <button onClick={() => {
        setTitle('Another React Hooks Book');
        setYear(2022);
        setEmail([
          {name: 'Mayank', email: 'mayank.@gmail.com'},
          {name: 'Mayank', email: 'mayank.@gmail.com'},
          {name: 'Mayank', email: 'mayank.@gmail.com'},
          {name: 'Mayank', email: 'mayank.@gmail.com'}
        ]);
      }}>
        Change Title
      </button>

      <button onClick={()=>setCount((c)=>c+1)}>​+</button>
      <p>{count}</p>
    </div>
  );
}

export default App;
