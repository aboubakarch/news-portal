// Utility function to handle API responses
const handleApiResponse = (response, dataPath) => {
  if (!response.data || !dataPath(response.data)) {
    console.error('No data returned from the API.');
    return [];
  }
  return dataPath(response.data);
};

export default handleApiResponse;
