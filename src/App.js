import './App.css';
import React, { useRef, useState, useEffect, useReducer } from "react";
//import "@aws-amplify/ui-react/styles.css";
import { Storage } from 'aws-amplify';
import { API } from "aws-amplify";
import { DataStore } from '@aws-amplify/datastore';
import { Image } from './models';
import ReactDOM from 'react-dom'





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
      const [imagess, setDescription] = useState([0]);
      const [namess, setName] = useState([0]);
      const [filenamess, setFileName] = useState([0]);
      const [getKeyss, setKeyss] = useState([0]);
      const videoRef = useRef(null);
      const [playing, setPlaying] = useState(false);
      const [currentTime, setCurrentTime] = useState(0);
      const [videoTime, setVideoTime] = useState(0);
      const firstUpdate = useRef(true);


    
        async function query() {
            const models = await DataStore.query(Image, c => c.image.contains(key));
            setData(models);
            console.log(models);
    
            const description = models.map(models => models.description)
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
    
            const rname = models.map(models => models.name)
            setName(rname);
            console.log(rname);

            
    
            const fname = models.map(models => models.filename)
            setFileName(fname);
            console.log(fname);
    
            const gKey = models.map(models => models.image)
            setKeyss(gKey);
            console.log("got Key", gKey);
            
             
          return;
          }
          

          const [isLoading, setIsLoading] = useState(true);
          const [data, setDatas] = useState([]);

          useEffect(() => {
            // Create function inside useEffect so that the function is only
            // created everytime the useEffect runs and not every render.
            const fetchData = async () => {
                const resultkey = await query();
                setDatas(resultkey);
                setIsLoading(false);
                query();
                // setData will update state asynchronously.
                // Log the value stored instead.
                console.log(resultkey);
            };
        
            //Run data fetching function.
            fetchData();
        
          }, 
          [setDatas, setIsLoading]);
         
    
      const videoHandler = (control) => {
        if (control === "play") {
        videoRef.current.play();
        setPlaying(true);
        var vid = document.getElementById("video1");
        setVideoTime(vid.duration);
        } else if (control === "pause") {
          videoRef.current.pause();
          setPlaying(false);
        }
      };


    const titleName = namess;
    const imgUrl = `https://viewsd0291515dedc415db669bdf57a2b4cf685846-staging.s3.us-east-2.amazonaws.com/public/${key}`
    const vidUrl = `https://viewsd0291515dedc415db669bdf57a2b4cf685846-staging.s3.us-east-2.amazonaws.com/public/${key}#t=0.1`;;
    
    return (
      
      <div className="App" >
      <div className="Image">
      <div className="logo"><img className="logoimg" src="https://viewsd0291515dedc415db669bdf57a2b4cf685846-staging.s3.us-east-2.amazonaws.com/public/s6e2El.png" /></div>

      <div id="videoo">

      <video ref={videoRef} id="video1" className="vidSrc" loop playsInline preload="auto" controlsList="nofullscreen nodownload">
      
        <source src={vidUrl}></source>
      </video>
      <div className="controlsContainer">
        <div className="controls">
          {playing ? (
            <img
              onClick={() => videoHandler("pause")}
              className="controlsIcon--small"
              alt=""
              src="https://viewsd0291515dedc415db669bdf57a2b4cf685846-staging.s3.us-east-2.amazonaws.com/public/9kEQLY.png"
            />
          ) : (
            <img
              onClick={() => videoHandler("play")}
              className="controlsIcon--small"
              alt=""
              src="https://viewsd0291515dedc415db669bdf57a2b4cf685846-staging.s3.us-east-2.amazonaws.com/public/kuUwhW.png"
            />
          )}
        </div>
      </div>
      </div>

      <div id="imgSrcz">
      <img className="imgSrc" src={imgUrl}/>
      </div>

      <div className="meta">
     
      <h1 className="description"><div>{titleName}</div></h1>
      <div className="sendTo">
        <button className="share" onClick={copyToClipboard}> <img style={{width:"17px", height:"17px",padding:"3px 0 0 0"}}src="https://viewsd0291515dedc415db669bdf57a2b4cf685846-staging.s3.us-east-2.amazonaws.com/public/5Zpd08.png" /> </button>  
       </div>
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

  