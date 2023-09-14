import React, { useState, useEffect } from 'react';
import { URL } from './constant.jsx'
const DialogueHistory = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
    fetch(URL+'/api/getDialogueHistory')
			.then(response => {
				if (!response.status === 200) {
					console.log(response.status);
				}
				return response.json();
			})
			.then(jsonData => {
				// Now you can work with the JSON data
				setData(jsonData['res']);

			})
			.catch(error => {
				console.log('Error fetching the file:', error);
			});
	}, []);
  return (
    // <div className="messenger-chatbox">
		// 	{data? data.map((obj, index) => (<div key={index}>{obj.id} <br/>{obj.dialogue}</div>)):<></>}
    // </div>
		<></>
  );
};

export default DialogueHistory;
