import './App.css';
import React, { useRef, useState, useEffect } from "react";
//import "@aws-amplify/ui-react/styles.css";
import { Storage } from 'aws-amplify';
import { API } from "aws-amplify";
import { DataStore } from '@aws-amplify/datastore';
import { Image } from './models';




function Upload() {
  // onChange


  
  async function onChange(e) {
  const file = e.target.files[0];
  var extension = e.target.files[0].type
  console.log(extension)
  
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
  const result = await Storage.put(makeid(6) + file.name.substring(file.name.lastIndexOf('.')+0, file.name.length), file)
  const filename = result.key.substring(0,result.key.lastIndexOf('.'));
  console.log({ result })
  const datastores = await DataStore.save(
    new Image({
		"image": `${result.key}`,
		"name": "name",
		"description": `${extension}`,
    "filename": `${filename}`
	})
);

 const drip = filename;
 console.log(drip);

  window.x = result.key;
  console.log(window.x)
  document.getElementById("submit").style.display="none";
  document.getElementById("uploaded").style.display="block";
  document.getElementById("uploaded1").style.display="block";
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
    window.location.assign(`${window.x}`);
   // alert(urlVal);
  }

  return (
  <div className="App">
   
    <script src="https://kit.fontawesome.com/e6bb64b9ef.js" crossorigin="anonymous"></script>
    
  <form className='forms'>
    <table>
    <tbody>
      <tr><th><label id="submit" className="custom-file-upload"><input type="file" onChange={onChange}/>Select File</label></th></tr>
      <tr><th><div id="uploaded" className="custom-file-uploaded">File Uploaded</div></th></tr>
      <tr><th><input className="textInput" id="userInput" name="text" placeholder="Type File Description" type="text"/></th></tr>
      <tr><th><input id="uploaded1" className="button" type="button" value="Post Content" onClick={onSubmit}/></th></tr>
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
  
  
  const [models, setData] = useState([0]);

  useEffect(() => {

    async function query() {
      const models = await DataStore.query(Image, c => c.image.contains(key));
      setData(models);
      console.log(models);
      return models;
      }
      query()

    }, []);

  const [imagess, setDescription] = useState([0]);
  const renderSrc = useRef(true);
  useEffect(() => {
    renderSrc.current = false;
    async function isIt() {
      const imagess = await DataStore.query(Image, c => c.image.contains(key));
      const description = imagess.map(imagess => imagess.description)
      setDescription(description);
      console.log(description);
      const swag = `${description}`;
      const word = swag.includes('video');

     if (word == true) {
      document.getElementById('videoo').style.display="block";
      document.getElementById('imgSrcz').style.display="none";
     } else {
      document.getElementById('videoo').style.display="none";
      document.getElementById('imgSrcz').style.display="block";
     }
    }
    isIt();

    }, []);

    const [namess, setName] = useState([0]);
    const firstRender = useRef(true);
    useEffect(() => {
      firstRender.current = false;
      async function checkName() {
        const namess = await DataStore.query(Image, c => c.image.contains(key));
        const rname = namess.map(namess => namess.name)
        setName(rname);
        console.log(rname);
      }
      checkName();
  
      }, []);

      const [filenamess, setFileName] = useState([0]);
      const firstRenders = useRef(true);
      useEffect(() => {
        firstRenders.current = false;
        async function checkFileName() {
          const filenamess = await DataStore.query(Image, c => c.image.contains(key));
          const fname = filenamess.map(filenamess => filenamess.filename)
          setFileName(fname);
          console.log(fname);
        }
        checkFileName();
    
        }, []);

    const realKey = filenamess;
    console.log(realKey)

    const [getKeyss, setKeyss] = useState([0]);
    const firstRenderss = useRef(true);
    useEffect(() => {
      firstRenderss.current = false;
      async function checkKeyss() {
        const keyss = await DataStore.query(Image, c => c.image.contains(key));
        const gKey = keyss.map(keyss => keyss.image)
        setKeyss(gKey);
        console.log("got Key", gKey);
      }
      checkKeyss();
  
      }, []);

    const realKeys = getKeyss;
    console.log(realKeys);
    const titleName = namess;
    const imgUrl = `https://viewsd0291515dedc415db669bdf57a2b4cf685846-staging.s3.us-east-2.amazonaws.com/public/${key}`;
    
    return (
      
      <div className="App">

      <div className="Image">
      <div className="sendTo">
        <div className="linkCopied1" id="link1">Link Copied!</div>
        <div className="linkCopied" id="link">Link Copied!</div>
        <button className="share" onClick={copyToClipboard}> <i class="fa-solid fa-share"></i> </button>  
       </div>

      <div id="videoo">
      <video className="vidSrc" controls muted loop playsInline controlsList="nofullscreen nodownload">
        <source src={imgUrl}></source>
      </video>
      </div>

      <div id="imgSrcz">
      <img className="imgSrc" src={imgUrl}/>
      </div>

      <div className="meta">
     
      <h1 className="description"><div>{titleName}</div></h1>
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

  