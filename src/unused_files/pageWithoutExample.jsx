import { useState } from 'react'

import Chatbox from './chatboxWithoutExample'
import DialogueHistory from './DialogueHistory'
import LoadEx from './LoadEx'
import '../css/pageWithExample.css'

const PageWithoutExample = () => {
    const [messages, setMessages] = useState({A:[], B:[], C:[]});
    const [newMessage, setNewMessage] = useState('');
    const [example, setExample] = useState(null);
    return (
        <div id="page1">
					<div className="chatbox-container">
						<Chatbox  messages={messages} setMessages={setMessages} newMessage={newMessage} setNewMessage={setNewMessage} example={example}/>
					</div>
        </div>
    )
  }

export default PageWithoutExample;