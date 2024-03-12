export const fetchTitlesFromAPI = async (): Promise<string[]> => {
    try {
      const response = await fetch('https://mt-lite-api.vercel.app/api/articles');
      if (!response.ok) {
        console.error('Error fetching titles:', response.statusText);
        return [];
      }
      const data = await response.json();
      console.log("::::: DATA", data);
      return data.titles;
    } catch (error) {
      console.error('An error occurred while fetching titles:', error);
      return [];
    }
};