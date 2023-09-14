import { useState } from 'react'

import Chatbox from './chatboxWithExample'
import DialogueHistory from './DialogueHistory'
import LoadEx from './LoadEx'
import '../css/pageWithExample.css'

const PageWithExample = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [example, setExample] = useState(null);
    const [lifelog, setLifelog] = useState(null);
    return (
      <>
        <div id="page1">
          <div className="button-container">
            <LoadEx  messages={messages} setMessages={setMessages} newMessage={newMessage} setNewMessage={setNewMessage} example={example} setExample={setExample} lifelog={lifelog} setLifelog={setLifelog}/>
          </div>
					<div className="chatbox-container">
						<Chatbox  messages={messages} setMessages={setMessages} newMessage={newMessage} setNewMessage={setNewMessage} example={example} setLifelog={setLifelog}/>
					</div>
          <div className="lifelog-container">
            <div className="lifelog-title">Related Life Logs</div>
            <div className="lifelog-content">
              {lifelog? 
                lifelog.split('\n\n').map((log, index) => 
                  <div key={index}>
                    <p>{index+1}</p>
                    <br/>
                    <p>
                      {log.split("\n").map((a, i)=><p key={i}>{a}</p>)}
                    </p>
                    <br/>
                  </div>)
                : <></>
              }
            </div>
          </div>
        </div>
      </>
    )
  }

export default PageWithExample;