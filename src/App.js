import './App.css';
import React, { useState, useEffect } from "react";
//import "@aws-amplify/ui-react/styles.css";
import { Storage } from 'aws-amplify';
import { API } from "aws-amplify";
import { DataStore } from '@aws-amplify/datastore';
import { Image } from './models';




function Upload() {
  // onChange
  
  async function onChange(e) {
  const file = e.target.files[0];
  
  // makeid
  function makeid(length) {
    var resultid           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        resultid += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return resultid;
  }
  // makeid
  const result = await Storage.put(makeid(6), file)
  console.log({ result })
  const datastores = await DataStore.save(
    new Image({
		"image": `${result.key}`,
		"name": "name",
		"description": "desc"
	})
);
  window.x = result.key;
  console.log(window.x)
  document.getElementById("submit").style.display="none";
  document.getElementById("uploaded").style.display="block";
  return window.x;
  }
  // onChange

  function returnText(){
  window.titleA = document.getElementById("userInput").value;
   return window.titleA;
}


  
  async function onSubmit(){
    //pass value of key from onChange
    const key = window.x;
    returnText()

    const newTitle = window.titleA;

    const original = await DataStore.query(Image, c => c.image.contains(key));
    await DataStore.save(
      Image.copyOf(original[0], updated => {
        updated.name = newTitle
      })
    );
    console.log(window.x)
    console.log("sex")
    window.location.assign(`${window.x}`);
   // alert(urlVal);
  }

  return (
  <div className="App">
  <form className='forms'>
    <table>
    <tbody>
      <tr><th><label id="submit" class="custom-file-upload"><input type="file" onChange={onChange}/>Select Image</label></th></tr>
      <tr><th><div id="uploaded" class="custom-file-uploaded">Uploaded</div></th></tr>
      <tr><th><input className="textInput" id="userInput" name="text" placeholder="Description" type="text"/></th></tr>
      <tr><th><input className="button" type="button" onClick={onSubmit}/></th></tr>
    </tbody>
    </table>
    
  
  
  
  </form>
  </div>
  );
  }

  function VView() {
    const key = window.location.pathname.slice(1);
    console.log(key)

    const copyToClipboard = () => {
      navigator.clipboard.writeText(window.location.href).then(function() {
        document.getElementById("link1").style.display="none";
        document.getElementById("link").style.display="block";
      }, function(err) {
        console.log('Failed to copy');
      })};

    //async function file() {
      //const result = await Storage.get(key)
      //}
     // file()
    const [models, setData] = useState([]);

    useEffect(() => {
       //just like before, increment the value of Count
    
    async function query() {
      const models = await DataStore.query(Image, c => c.image.contains(key));
      setData(models);
      console.log(models);
      return models;
      }
      query()
    }, []);
    
    return (
      
      <div className="App">

      <div className="Image">
      <div className="sendTo">
        <div className="linkCopied1" id="link1">Link Copied!</div>
        <div className="linkCopied" id="link">Link Copied!</div>
        <button className="share" onClick={copyToClipboard}> + </button>  
       </div>
      <img className="imgSrc" src={`https://viewsd0291515dedc415db669bdf57a2b4cf685846-staging.s3.us-east-2.amazonaws.com/public/${key}`}/>
      <div className="meta">
      <h1 className="description">{models.map(models => <div>{models.name}</div>)}</h1>
      <div className="logo"><img className="logoimg" src="https://viewsd0291515dedc415db669bdf57a2b4cf685846-staging.s3.us-east-2.amazonaws.com/public/uploadi.png" /></div>
      </div>
      </div>
      </div>
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

  