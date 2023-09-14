import React, { useEffect, useState } from 'react';
import '../css/RealChatbox.css';
import { postData } from './httpsender';
import { URL } from './constant.jsx'
import ScrollableWindow from '../components/ScrollableWindow';
const Chatbox = ( {messages, setMessages, newMessage, setNewMessage, example} ) => {
  const [ansFromS2, setAnsFromS2] = useState("");
  const [gptRes, setGptRes] = useState("");
  const [who, setWho] = useState("A");
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
    console.log(gptRes)
  }, [gptRes]);
  const handleRecall = async () => {
    if (messages[who].length === 0) return;
    console.log(messages[who])
    const ans = await handlePostData('/api/recall', {new_dialogue: messages[who][messages[who].length-1].text});
    setGptRes([...gptRes, { type: "Recall", ans: ans }]);

  }
  const handleConf1 = async () => {
    if (messages[who].length === 0) return;
    console.log("messages", messages[who])
    const ans = await handlePostData('/api/conf1', {new_dialogue: messages[who][messages[who].length-1].text});
    setGptRes([...gptRes, { type: "Conf Step1", ans: ans }]);
  }
  const handleConf2 = async () => {
    if (messages[who].length === 0) return;
    const ans = await handlePostData('/api/conf2', {new_dialogue: messages[who][messages[who].length-1].text});
    setAnsFromS2(ans.ans)
    setGptRes([...gptRes, { type: "Conf Step2", ans: ans }]);
  }
  const handleConf3 = async () => {
    if (messages[who].length === 0) return;
    const ans = await handlePostData('/api/conf3', {new_dialogue: messages[who][messages[who].length-1].text, ans_from_S2: ansFromS2});
    setGptRes([...gptRes, { type: "Conf Step3", ans: ans }]);
  }
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    const newMsg = newMessage
    setNewMessage('');
    const updatedMessages = {...messages, [who]: [...messages[who], { text: newMsg, sender: 'user' }]}
    setMessages(updatedMessages);
    
    const response = await handlePostData('/api/chat', {messages: updatedMessages[who]});
    setMessages(prevState => ({...prevState, [who]: [...prevState[who], { text: response.res, sender: 'bot' }]}));
  };
  useEffect(() => {
    console.log(messages)
  }, [messages]);
  const handleChangeWho = (who) => {
    setWho(who);
  }
  return (
    <>
      <div className="icon-container">
        <button className="icon" onClick={() => handleChangeWho("A")}>A</button>
        <button className="icon" onClick={() => handleChangeWho("B")}>B</button>
        <button className="icon" onClick={() => handleChangeWho("C")}>C</button>
      </div>
      <div className="messenger-chatbox">

        <ScrollableWindow
          className="message-container"
          topic={"ChatRoom with "+who}
          messages={messages[who]}
          renderMessage={(message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text.split("\n").map((a, i)=><p key={i}>{a}</p>)}
            </div>
          )}
        />
        <div className="remind-container">

          <button onClick={handleRecall}>Recall</button>

          <button onClick={handleConf1}>ConfStep1</button>
          <button onClick={handleConf2}>ConfStep2</button>
          <button onClick={handleConf3}>ConfStep3</button>
        </div>
        <div className="input-container">
          <textarea
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
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>

      <div className="history-box">
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
      </div>
      <ScrollableWindow
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
      />
    </>
  );
};

export default Chatbox;
