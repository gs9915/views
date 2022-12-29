import './App.css';
import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { Storage } from 'aws-amplify';


function Upload() {
  async function onChange(e) {
  const file = e.target.files[0];
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

  const result = await Storage.put(makeid(6), file)
  console.log({ result })
  window.location.assign(`${result.key}`);
  }
  return (
  <div className="App">
  <h1>Test</h1>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
  </div>
  <input type="file" onChange={onChange}/>
  </div>
  );
  }

  function VView() {
    const key = window.location.pathname.slice(1);
    console.log(key)
    async function file() {
      const result = await Storage.get(key)
      }
    return (
      <img src={`https://viewsd0291515dedc415db669bdf57a2b4cf685846-staging.s3.us-east-2.amazonaws.com/public/${key}`}/>
    )
  }

  function App() {
    const windows = window.location.pathname;
    if (windows === "/") {
      return <Upload />;
    }
    return <VView />;
  }

  export default App;