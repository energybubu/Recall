import React, { useEffect, useState } from 'react';
import '../css/chatbox.css';
import { postData } from './httpsender';
import { URL } from './constant.jsx'
import ScrollableWindow from '../components/ScrollableWindow';
import CircularProgress from '@mui/material/CircularProgress';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SendIcon from '@mui/icons-material/Send';
import { Avatar } from '@mui/material';


const Chatbox = ( {messages, setMessages, newMessage, setNewMessage, example, storyId, loading, setLoading, setWhichExample} ) => {
  const [ansFromS2, setAnsFromS2] = useState("");
  const [gptRes, setGptRes] = useState("");
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const [gptCorrected, setGptCorrected] = useState(false);
  const [warningMsg, setWarningMsg] = useState('');
  const notify = (msg) => toast(msg);
  var conflictFound = false;
  var msgs = [];
  var resCnt = 0;
  const handleSetNewMessage = (msg, flag) => {
    setNewMessage(msg);
    setGptCorrected(flag);
  }
  const handlePostData = async (apiRoute, dataToSend) => {
    try {
      const response = await postData(URL+apiRoute, dataToSend);
      return response;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    resCnt = messages.length;
  }, []);
  useEffect(()=>{

    console.log("newMessageFlag", newMessageFlag, "gptCorrected:", gptCorrected)
  }, [newMessageFlag, gptCorrected])
  useEffect(() => {
    if (gptRes && gptRes.length > resCnt){
      resCnt+=1;
      if (gptRes[gptRes.length-1].type === "Detect Conflict"){
        notify(
          <div className='toast-container'>
            <h2>Conflicts Found! </h2>
  
            {gptRes[gptRes.length-1].ans.ans}
            <br/><br/>
            <button style={{background: "rgb(87, 210, 87)", padding: "5px", margin: "5px" }} onClick={()=>{handleConf3();}}>Auto Resolve Conflicts</button>
            or click anywhere to close
          </div>
        )
      } else if (gptRes[gptRes.length-1].type === "No Conflict"){
        notify(
          <div className='toast-container'>
            <h2>{gptRes[gptRes.length-1].type + " Found!"} </h2>
          </div>
        )
      }else if (gptRes[gptRes.length-1].type === "Conf Step3"){
        notify(
          <div className='toast-container'>
            <h2>The suggested sentence</h2>
  
            {gptRes[gptRes.length-1].ans.ans}
            <br/><br/>
            <button style={{background: "rgb(87, 210, 87)", padding: "5px", margin: "5px" }} onClick={()=>{handleSetNewMessage(gptRes[gptRes.length-1].ans.ans, true);}}>Set as sending message</button>
            or click anywhere to close
          </div>
        )
      }else if (gptRes[gptRes.length-1].ans.ans === "Nothing to Recall!"){
        notify(
          <div className='toast-container'>
            <h2>{gptRes[gptRes.length-1].ans.ans}</h2>
  
          </div>
        )
      }else {
        notify(
          <div className='toast-container'>
            <h2>The suggested sentence</h2>
  
            {gptRes[gptRes.length-1].ans.ans}
            <br/><br/>
            <button style={{background: "rgb(87, 210, 87)", padding: "5px", margin: "5px" }} onClick={()=>{handleSetNewMessage(gptRes[gptRes.length-1].ans.ans, true);setNewMessageFlag(true);setGptCorrected(true)}}>
              Set as sending message
            </button>
            or click anywhere to close
          </div>
        )
      }
    }
  }, [gptRes]);
  const handleRecall = async () => {

    if (messages.length === 0 || messages[messages.length-1].sender!='bot') {
      notify(
        <div  className='toast-container'>
          <h2>
            The last message needs to be sent by your friend S2.
            <br/>
            Please hit the 
            <button onClick={()=>handleRobotReply([])}  style={{padding:"0.3em 0.6em",background:"#00000042"}}>Get Reply</button> 
            button first!
            <br/>
            Or use the 
            <button className='example-button' onClick={() => {setMessages([{sender:"bot", text:example.recallExamples[storyId]}]);setNewMessage('');setWhichExample('recall')}} style={{padding:"0.3em 0.6em",background:"#00000042"}}>Example</button>
            for Recalling.
          </h2>
        </div>)
      return;
    }
    setWarningMsg('Recalling ...')
    const ans = await handlePostData('/api/recall', {new_dialogue: messages});
    setWarningMsg('')
    setGptRes([...gptRes, { type: "Recall", ans: ans }]);

  }
  const handleConf1 = async () => {
    setWarningMsg('Detecting Conflicts ...')
    const ans = await handlePostData('/api/conf1', {new_dialogue: [...messages, {sender:"user", text: newMessage}]});
    if (ans.ans === "Yes"){
      conflictFound = true;
      const ans2 = await handlePostData('/api/conf2', {new_dialogue: [...messages, {sender:"user", text: newMessage}]});
      setAnsFromS2(ans2.ans);
      console.log("ans2", ans2.ans)
      setGptRes([...gptRes, { type: "Detect Conflict", ans: ans2 }]);
    }else{
      setGptRes([...gptRes, { type: "No Conflict", ans: {ans:"There is no conflict."} }]);
    }
    setWarningMsg('')
  }
  const handleConf3 = async () => {
    setWarningMsg('Auto Resolvings Conflicts ...')
    const ans = await handlePostData('/api/conf3', {new_dialogue: [...messages, {sender:"user", text: newMessage}], ans_from_S2: ansFromS2});
    setWarningMsg('')
    setGptRes([...gptRes, { type: "Conf Step3", ans: ans }]);
  }
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    if (newMessageFlag==false){
      setNewMessageFlag(true)
      await handleConf1();
      if (conflictFound){
        conflictFound=false;
        return;
      }
    }

    var updatedMessages;
    if (gptCorrected) updatedMessages = [...messages, { text: newMessage, sender: 'user', special: 1}];
    else updatedMessages = [...messages, { text: newMessage, sender: 'user'}];
    
    setMessages(updatedMessages);
    handleSetNewMessage('', false);
    setNewMessageFlag(false);
    console.log(updatedMessages)
    await handleRobotReply(updatedMessages);
  };
  const handleRobotReply = async (updatedMessages) => {
    if (updatedMessages.length === 0) {
      setMessages([{sender:"bot", text: example.recallExamples[storyId]}])
      return;
    }
    setWarningMsg('S2 is typing ...')
    const res = await handlePostData('/api/chat', {messages: updatedMessages});
    setWarningMsg('')
    var updatedMessages = [...updatedMessages, { text: res.res, sender: 'bot' }];
    setMessages(updatedMessages);
  }
  const handleClearMessage = () => {
    setMessages([]);
    handleSetNewMessage('', false);
    setNewMessageFlag(false);
  }
  return (
    <>
      <div className="messenger-chatbox">


        <div className='chatbox-title'>
          <button style={{visibility:"hidden"}}>Clear</button>  
          <h2 >Chatroom</h2>
          <button style={{background:"#00000042"}} onClick={handleClearMessage}>Clear</button>  
        </div>
        <hr/>
        <ScrollableWindow
          className="message-container"
          topic="ChatRoom"
          messages={messages}
          loading={loading}
          renderMessage={(message, index) => (
            <div className={`per-message-wrapper ${message.sender}`}>
              {message.sender==='bot'? <Avatar style={{margin:"10px"}}>S2</Avatar>:<Avatar style={{margin:"10px"}}>S1</Avatar>}
              {'special' in message?
                <div key={index} className={`message special`}>
                  {message.text}
                </div>
              :<div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>}
            </div>
          )}
        />
        <hr/>

      {warningMsg && 
        <div
          style={{
            backgroundColor:'hsl(50, 100%, 65%)', 
            borderRadius:'5px', 
            padding:'10px', 
            fontWeight:'bold',
            textAlign:'center',
            opacity:'0.8',
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
          }}
        >
          
          <CircularProgress 
            style={{
              margin:'0 10px'
            }}
            size="30px"
          />
            {warningMsg}

        </div>
      }
        <div className="remind-container">
            <button style={{backgroundColor:'hsl(50, 100%, 65%)'}} onClick={handleRecall}>Recall</button>
            {/* <button style={{backgroundColor:'hsl(50, 100%, 65%)'}} onClick={handleConf1}>Detect Conflict</button> */}
            {/* <button onClick={handleRobotReply}  style={{display:"flex", flexDirection:"row", alignItems:'center', marginLeft: "auto", padding:"0.2em 0.6em"}} >
              <Avatar style={{margin:'0 10px'}}>S2</Avatar> Reply
            </button> */}
          <ToastContainer 

            position="top-right"
            draggable={false}
            closeOnClick={true}
            pauseOnFocusLoss
            autoClose={12000}
            newestOnTop={true}
            // transition="zoom"
          />
        </div>
        <div className="input-container">
          <textarea
            rows="4"
            type="input"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => {
              if (!warningMsg){
                setNewMessage(e.target.value)
              }
            }}
            onKeyDown={(e)=>{

              if (warningMsg){return}
              if(e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <SendIcon className="send-button" onClick={handleSendMessage}>Send</SendIcon>
        </div>
      </div>

    </>
  );
};

export default Chatbox;
