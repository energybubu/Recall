import React, { useState, useEffect } from 'react';
import { fetchData } from './httpsender';
import { URL } from './constant.jsx'
import '../css/LoadEx.css'
const LoadEx = ({messages, setMessages, newMessage, setNewMessage, example, setExample, lifelog, setLifelog, storyId, setLoading}) => {
    useEffect(() => {
			const fetchDataFromAPI = async () => {
				try {
					console.log(`${URL}/api/getExample`)
					const response = await fetchData(`${URL}/api/getExample`);
					console.log(response);
					setExample({stories:response.stories, summaries:response.summaries, recallExamples:response.recallExamples, conflictExamples:response.conflictExamples})
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
			console.log(example.recallExamples[storyId])
			setNewMessage('');
		}
		const handleMultipleConf = () => {
			setMessages([{sender:"user", text:example.conflictExamples[storyId]}]);
			setNewMessage('');
		}

    return (
			<>
				{example? 
					<>
						<button className='example-button' onClick={handleMultipleRecall}>Recall Example</button>
						<button className='example-button' onClick={handleMultipleConf}>Conflict Example</button>
					</>:
					<></>
				}
			</>
    )
}
export default LoadEx;