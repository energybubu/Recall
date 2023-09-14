import React, { useEffect, useState } from 'react';
import '../css/chatbox.css';
import { postData } from './httpsender';
import { URL } from './constant.jsx'
import ScrollableWindow from '../components/ScrollableWindow';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SendIcon from '@mui/icons-material/Send';
import { Avatar } from '@mui/material';

const Chatbox = ( {messages, setMessages, newMessage, setNewMessage, example, setLifelog} ) => {
  const [ansFromS2, setAnsFromS2] = useState("");
  const [gptRes, setGptRes] = useState("");
  const notify = (msg) => toast(msg);
  var msgs = [];
  var resCnt = 0;
  const handlePostData = async (apiRoute, dataToSend) => {
    try {
      console.log(URL+apiRoute)
      const response = await postData(URL+apiRoute, dataToSend);
      return response;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    resCnt = messages.length;
  }, []);
  useEffect(() => {
    console.log(gptRes)
    if (gptRes && gptRes.length > resCnt){
      resCnt+=1;
      if (gptRes[gptRes.length-1].type === "Detect Conflict"){
        notify(
          <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <h2>Conflicts Found! </h2>
  
            {gptRes[gptRes.length-1].ans.ans}
            <br/><br/>
            <button style={{background: "rgb(87, 210, 87)", padding: "5px", margin: "5px" }} onClick={handleConf3}>Auto Resolve Conflicts</button>
          </div>
        )
      } else if (gptRes[gptRes.length-1].type === "No Conflict"){
        notify(
          <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <h2>{gptRes[gptRes.length-1].type + " Found: "} </h2>
          </div>
        )
      }else {
        notify(
          <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <h2>The suggested sentence</h2>
  
            {gptRes[gptRes.length-1].ans.ans}
            <br/><br/>
            <button style={{background: "rgb(87, 210, 87)", padding: "5px", margin: "5px" }} onClick={()=>{setNewMessage(gptRes[gptRes.length-1].ans.ans)}}>Set as sending message</button>
          </div>
        )
      }
    }
  }, [gptRes]);
  const handleRecall = async () => {
    if (messages.length === 0) return;
    const ans = await handlePostData('/api/recall', {new_dialogue: messages[messages.length-1].text});
    setGptRes([...gptRes, { type: "Recall", ans: ans }]);

  }
  const handleConf1 = async () => {
    if (messages.length === 0) return;
    const ans = await handlePostData('/api/conf1', {new_dialogue: messages[messages.length-1].text});
    console.log(ans.ans)
    if (ans.ans === "Yes"){
      const ans2 = await handlePostData('/api/conf2', {new_dialogue: messages[messages.length-1].text});
      setGptRes([...gptRes, { type: "Detect Conflict", ans: ans2 }]);
    }else{
      setGptRes([...gptRes, { type: "No Conflict", ans: {ans:"There is no conflict."} }]);
    }
  }
  // const handleConf2 = async () => {
  //   if (messages.length === 0) return;
  //   const ans = await handlePostData('/api/conf2', {new_dialogue: messages[messages.length-1].text});
  //   setAnsFromS2(ans.ans)
  //   setGptRes([...gptRes, { type: "Conf Step2", ans: ans }]);
  // }
  const handleConf3 = async () => {
    if (messages.length === 0) return;
    const ans = await handlePostData('/api/conf3', {new_dialogue: messages[messages.length-1].text, ans_from_S2: ansFromS2});
    setGptRes([...gptRes, { type: "Conf Step3", ans: ans }]);
  }
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const updatedMessages = [...messages, { text: newMessage, sender: 'user' }];
    setMessages(updatedMessages);
    setNewMessage('');
  };
  const handleRobotReply = async () => {
    const res = await handlePostData('/api/chat', {messages: messages});
    setMessages(prev=>[...prev, { text: res.res, sender: 'bot' }]);
  }
  const handleClearMessage = () => {
    setMessages([]);
    setNewMessage('');
    setLifelog(null);
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
          renderMessage={(message, index) => (
            <div className={`per-message-wrapper ${message.sender}`}>
              {message.sender==='bot'? <Avatar style={{margin:"10px"}}>S2</Avatar>:<Avatar style={{margin:"10px"}}>S1</Avatar>}
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            </div>
          )}
        />
        <hr/>
        <div className="remind-container">
          {messages.length?
            <>
              <button onClick={handleRecall} disabled={messages[messages.length-1].sender==='user'}>Recall</button>
              <button onClick={handleConf1} disabled={messages[messages.length-1].sender==='bot'}>Detect Conflict</button>
            </>
            :<></>}
            <button onClick={handleRobotReply}  style={{marginLeft: "auto", background:"#00000042"}} >Get Reply</button>
          <ToastContainer 

            position="top-right"
            draggable={false}
            // closeOnClick={false}
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
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <SendIcon className="send-button" onClick={handleSendMessage}>Send</SendIcon>
        </div>
      </div>

      {/* <div className="history-box">
        <h2>Retrieved Dialogues</h2>
        {gptRes?
          gptRes[gptRes.length-1].ans.dias.map((obj, index) => (
            <div key={index}>
              <h3>{gptRes[gptRes.length-1].ans.ids[index]}</h3>
              {obj.split("\n").map((a, i)=><p key={i}>{a}</p>)}
              <br/>
            </div>
          )):
          <></>
        }
      </div> */}
      {/* <ScrollableWindow
        className="history-box"
        topic="Responses from GPT4"
        messages={gptRes}
        renderMessage={(obj, index) => 
          <div>
            <div key={index}>
              <h3>{obj.type}</h3>
              <p>{obj.ans.ans}<br/></p>
            </div>
          </div>
        } 
      /> */}
    </>
  );
};

export default Chatbox;
