import React, { useState, useEffect } from 'react';
import { fetchData } from './httpsender';
import { URL } from './constant.jsx'
import '../css/LoadEx.css'
const LoadEx = ({messages, setMessages, newMessage, setNewMessage, example, setExample, lifelog, setLifelog}) => {
    useEffect(() => {
			const fetchDataFromAPI = async () => {
				try {
					const response = await fetchData(URL+'/api/getExample');
					setExample({multipleRecall:response.multiple_recall, multipleConf:response.multiple_conflict})
				} catch (error) {
					console.error('Error:', error);
				}
			};
	
			fetchDataFromAPI();
    }, []);
		
		const handleMultipleRecall = () => {
			setMessages(example.multipleRecall.messages);
			setLifelog(example.multipleRecall.logSummary)
			console.log(example.multipleRecall.logSummary)
			setNewMessage('');
		}
		const handleMultipleConf = () => {
			setMessages(example.multipleConf.messages);
			setLifelog(example.multipleConf.logSummary)
			setNewMessage('');
		}

    return (
			<>
				{example? 
					<>
						<button className='example-button' onClick={handleMultipleRecall}>Recall Example</button>
						<button className='example-button' onClick={handleMultipleConf}>Conflict Example</button>
					</>:
					<p>backend crashed</p>
				}
			</>
    )
}
export default LoadEx;