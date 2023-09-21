import { useState } from 'react'

import Chatbox from './chatboxWithExample'
import DialogueHistory from './DialogueHistory'
import LoadEx from './LoadEx'
import '../css/pageWithExample.css'

const PageWithExample = ({storyId}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [example, setExample] = useState(null);
    const [whichExample, setWhichExample] = useState("recall")
    const [forceSend, setForceSend] = useState(false)
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const [warningMsg, setWarningMsg] = useState('');
    return (
      <>
        <div id="page1">
          <div className="button-container">
            <LoadEx  messages={messages} setMessages={setMessages} newMessage={newMessage} setNewMessage={setNewMessage} example={example} setExample={setExample} storyId={storyId} warningMsg={warningMsg} setWarningMsg={setWarningMsg} whichExample={whichExample} setWhichExample={setWhichExample} setForceSend={setForceSend} setNewMessageFlag={setNewMessageFlag}/>
          </div>
					<div className="chatbox-container">
						<Chatbox  messages={messages} setMessages={setMessages} newMessage={newMessage} setNewMessage={setNewMessage} example={example} storyId={storyId} whichExample={whichExample} setWhichExample={setWhichExample} forceSend={forceSend} setForceSend={setForceSend} newMessageFlag={newMessageFlag} setNewMessageFlag={setNewMessageFlag} warningMsg={warningMsg} setWarningMsg={setWarningMsg}/>
					</div>
          <div className='summary-lifelog-container'>

            <a href='/Recall/#' className='story-chooser'>Rechoose the Story</a>
            
            <div className='summary-container'>
              <div className="lifelog-title">What S1(You) has done.</div>
              <div className="lifelog-content">
                {example && example.summaries[storyId].split('\n').map((log, index) =>(
                  
                  <ul>
                    <li key={index}>{log}</li>
                  </ul>
                ))}
              </div>
            </div>
            
            <br/>
            
            <div className="lifelog-container">
              
              <div className="lifelog-title">Related Life Logs</div>
              <div className="lifelog-content">
                {example? 
                  example.stories[storyId].split('\n\n').map((log, index) => 
                    <div key={index}>
                      <div >
                        {log.split("\n").map((a, i) => (
                          <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
                            <p style={{margin:'3px'}}>{a.split(": ")[0]}： </p>
                            <p style={{margin:'3px'}}>{a.split(": ")[1]}</p>
                          </div>
                        ))}
                      </div>
                      <br/>
                      <hr style={{width:"100%"}}/>
                      <br/>
                    </div>)
                  : <></>
                }
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

export default PageWithExample;