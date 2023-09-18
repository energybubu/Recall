import React, { useState, useEffect } from 'react';
import { fetchData } from './httpsender';
import { URL } from './constant.jsx'
import '../css/LoadEx.css'
const LoadEx = ({messages, setMessages, newMessage, setNewMessage, example, setExample, lifelog, setLifelog, storyId, setLoading}) => {
	const [whichExample, setWhichExample] = useState("recall")
    useEffect(() => {
			const fetchDataFromAPI = async () => {
				try {
					console.log(`${URL}/api/getExample`)
					const response = await fetchData(`${URL}/api/getExample`);
					console.log(response);
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
			console.log(example.recallExamples[storyId])
			setNewMessage('');
			setWhichExample("recall")
		}
		const handleMultipleConf = () => {
			setMessages([{sender:"user", text:example.conflictExamples[storyId]}]);
			setNewMessage('');
			setWhichExample("conflict")
		}

    return (
			<>
				{example? 
					<>
						{whichExample==="recall"?
							<>
								<button className='example-button' onClick={handleMultipleRecall} style={{backgroundColor:'rgb(192, 183, 183)', border:'3px solid black'}}>Recall Example</button>
								<button className='example-button' onClick={handleMultipleConf} style={{backgroundColor:'rgb(252, 240, 240)'}}>Conflict Example</button>
							</>:
							<>
								<button className='example-button' onClick={handleMultipleRecall} style={{backgroundColor:'rgb(252, 240, 240)'}}>Recall Example</button>
								<button className='example-button' onClick={handleMultipleConf} style={{backgroundColor:'rgb(192, 183, 183)', border:'3px solid black'}}>Conflict Example</button>
							</>
						}
					
					</>:
					<></>
				}
			</>
    )
}
export default LoadEx;