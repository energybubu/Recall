import React, { useState, useEffect } from 'react';
import { fetchData } from './httpsender';
import { URL } from './constant.jsx'
import '../css/LoadEx.css'
const LoadEx = ({messages, setMessages, newMessage, setNewMessage, example, setExample, lifelog, setLifelog, storyId, setLoading, whichExample, setWhichExample}) => {

    useEffect(() => {
			const fetchDataFromAPI = async () => {
				try {
					console.log(`${URL}/api/getExample`)
					const response = await fetchData(`${URL}/api/getExample`);

					setExample({stories:response.stories, summaries:response.summaries, recallExamples:response.recallExamples, conflictExamples:response.conflictExamples})
					setMessages([{sender:"bot", text:response.recallExamples[storyId]}]);
				} catch (error) {
					console.error('Error:', error);
				}
			};
			setLoading(true)
			fetchDataFromAPI();
			setLoading(false)
    }, []);
		
		const handleMultipleRecall = () => {
			setMessages([{sender:"bot", text:example.recallExamples[storyId]}]);

			setNewMessage('');
			setWhichExample("recall")
		}
		const handleMultipleConf = () => {
			setMessages([]);
			setNewMessage(example.conflictExamples[storyId]);
			setWhichExample("conflict")
		}

    return (
			<>
				{example? 
					<>
						{whichExample==="recall"?
							<>
								<button className='example-button' onClick={handleMultipleRecall} style={{backgroundColor:'rgb(192, 183, 183)', border:'3px solid black'}}>S2(Bot) First</button>
								<button className='example-button' onClick={handleMultipleConf} style={{backgroundColor:'rgb(252, 240, 240)'}}>S1(You) First</button>
							</>:
							<>
								<button className='example-button' onClick={handleMultipleRecall} style={{backgroundColor:'rgb(252, 240, 240)'}}>S2(Bot) First</button>
								<button className='example-button' onClick={handleMultipleConf} style={{backgroundColor:'rgb(192, 183, 183)', border:'3px solid black'}}>S1(You) First</button>
							</>
						}
					
					</>:
					<>Loading Information ...</>
				}
			</>
    )
}
export default LoadEx;