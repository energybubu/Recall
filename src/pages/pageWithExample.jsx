import { useState } from 'react'

import Chatbox from './chatboxWithExample'
import DialogueHistory from './DialogueHistory'
import LoadEx from './LoadEx'
import '../css/pageWithExample.css'

const PageWithExample = ({storyId, loading, setLoading}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [example, setExample] = useState(null);
    const [whichExample, setWhichExample] = useState("recall")
    return (
      <>
        <div id="page1">
          <div className="button-container">
            <LoadEx  messages={messages} setMessages={setMessages} newMessage={newMessage} setNewMessage={setNewMessage} example={example} setExample={setExample} storyId={storyId} setLoading={setLoading} whichExample={whichExample} setWhichExample={setWhichExample}/>
          </div>
					<div className="chatbox-container">
						<Chatbox  messages={messages} setMessages={setMessages} newMessage={newMessage} setNewMessage={setNewMessage} example={example} storyId={storyId} loading={loading} setLoading={setLoading} setWhichExample={setWhichExample}/>
					</div>
          <div className='summary-lifelog-container'>

            <a href='/Recall/#' className='story-chooser'>Rechoose the Story</a>
            
            <div className='summary-container'>
              <div className="lifelog-title">Story Summary</div>
              <div className="lifelog-content">
                {example && example.summaries[storyId]}
              </div>
            </div>
            
            <br/>
            
            <div className="lifelog-container">
              
              <div className="lifelog-title">Related Life Logs</div>
              <div className="lifelog-content">
                {example? 
                  example.stories[storyId].split('\n\n').map((log, index) => 
                    <div key={index}>
                      <p>
                        {log.split("\n").map((a, i)=><p key={i}>{a}</p>)}
                      </p>
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