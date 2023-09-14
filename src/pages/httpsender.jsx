
export const fetchData = async (URL, method = 'GET', body = null) => {
    try {
      const response = await fetch(URL, {
        method,
        headers: {
          'Content-Type': 'application/json', // Adjust headers as needed
        },
        body: body ? JSON.stringify(body) : null,
      });
  
      if (!response.ok) {
        console.log('Network response was not ok');
      }
  
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };


export const postData = async (url, data) => {
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};