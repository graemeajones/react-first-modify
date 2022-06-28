import { useState, useEffect } from 'react';


export default function useFetch(endpoint,method) {
  // Properties ----------------------------------
  const API_URL = 'https://my.api.mockaroo.com/';
  const API_KEY = '?key=bb6adbc0';

  // Fetch State ---------------------------------
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
  const [data, setData] = useState(undefined);
  
  // Methods -------------------------------------
  useEffect(() => {

    const fetchObjects = async () => {
      const outcome = await apiRequest(API_URL, endpoint, API_KEY, method);
      if (outcome.success) setData(outcome.response);
      else setLoadingMessage(`Error ${outcome.response.status}: Data could not be found.`);
    };

    fetchObjects();
    
  }, [endpoint, method]);
  
  // Return --------------------------------------
  return [data, setData, loadingMessage ];
}


const apiRequest = async (apiURL, endpoint, key, method = "GET", body = null) => {

  // Build fetch parameters
  let requestObj = { method: method }; // *GET, POST, PUT, DELETE, etc.
  if (body) requestObj = { ...requestObj, body: body };

  // Call API and return response object
  const endpointAddress = apiURL + endpoint + key;
  const response = await fetch(endpointAddress, requestObj);
  if ((response.status >= 200) && (response.status <= 299)) 
       return { success: true, response: await response.json() };
  else return { success: false, response: response };
}
