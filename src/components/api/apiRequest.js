// -----------------------------------------------------------------------
// apiURL: e.g. "https://my.api.mockaroo.com"
// key: e.g. "?key=bb6adbc0" (Only seen this used for the mockaroo site.)
// endpoint: e.g. "Modules" or "/User/123"
// method: defaults to "GET" if not specified. (Use this later when trying to add or, modify or delete records.)
// body: defaults to null if not specified. (Use this later when you want to update records.)
// -----------------------------------------------------------------------

export async function apiRequest(apiURL, endpoint, key, method = "GET", body = null) {

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
