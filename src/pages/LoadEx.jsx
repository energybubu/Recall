import React, { useState, useEffect } from 'react';
import { fetchData } from './httpsender';
import { URL } from './constant.jsx'
import '../css/LoadEx.css'
import Chatbox from './chatboxWithExample'
const LoadEx = ({messages, setMessages, newMessage, setNewMessage, example, setExample, lifelog, setLifelog, storyId, whichExample, setWhichExample, setForceSend, setNewMessageFlag, warningMsg, setWarningMsg}) => {

    useEffect(() => {
			const fetchDataFromAPI = async () => {
				try {
					// console.log(`${URL}/api/getExample`)
					const response = await fetchData(`${URL}/api/getExample`);

					setExample({stories:response.stories, summaries:response.summaries, recallExamples:response.recallExamples, conflictExamples:response.conflictExamples})
					setMessages([{sender:"bot", text:response.recallExamples[storyId]}]);
				} catch (error) {
					console.error('Error:', error);
				}
			};
			setWarningMsg('Loading backend resources ...')	
			fetchDataFromAPI();
			setWarningMsg('')
    }, []);
		
		const handleMultipleRecall = () => {
			if (warningMsg) return;
			setMessages([{sender:"bot", text:example.recallExamples[storyId]}]);

			setNewMessage('');
			setWhichExample("recall")
			setForceSend(false)
		}
		const handleMultipleConf = () => {
			if (warningMsg) return;
			setMessages([]);
			setNewMessage(example.conflictExamples[storyId]);
			setWhichExample("conflict")
			setForceSend(true)
			setNewMessageFlag(false)
		}

    return (
			<>
				{example? 
					<>
						{whichExample==="recall"?
							<>
								<button className='example-button' onClick={handleMultipleRecall} style={{backgroundColor:'rgb(192, 183, 183)', border:'3px solid black'}}>Get sample questions and click
									<div className='fake-button' style={{backgroundColor:'hsl(50, 100%, 65%)', color:'black'}} >Recall</div>
								</button>
								<button className='example-button' onClick={handleMultipleConf} style={{backgroundColor:'rgb(252, 240, 240)'}}>Send sample messages to try Detect Conflict</button>
							</>:whichExample==="conflict"?
							<>
								<button className='example-button' onClick={handleMultipleRecall} style={{backgroundColor:'rgb(252, 240, 240)'}}>Get sample questions and click
								<div className='fake-button' style={{backgroundColor:'hsl(50, 100%, 65%)', color:'black'}} >Recall</div>
								</button>
								<button className='example-button' onClick={handleMultipleConf} style={{backgroundColor:'rgb(192, 183, 183)', border:'3px solid black'}}>Send sample messages to try Detect Conflict</button>
							</>:<>
							
								<button className='example-button' onClick={handleMultipleRecall} style={{backgroundColor:'rgb(252, 240, 240)'}}>Get sample questions and click
									<div className='fake-button' style={{backgroundColor:'hsl(50, 100%, 65%)', color:'black'}} >Recall</div>
								</button>
								<button className='example-button' onClick={handleMultipleConf} style={{backgroundColor:'rgb(252, 240, 240)'}}>Send sample messages to try Detect Conflict</button>
							</>
						}
					
					</>:
					<>Loading Information ...</>
				}
			</>
    )
}
export default LoadEx;