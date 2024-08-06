/**
 * Fetches data from the specified API endpoint and updates state variables.
 * @param {function} setData - Function to set the fetched data into state
 * @param {function} setLoading - Function to toggle the loading state
 */
export const getData = async (setData, setLoading) => {
    try {
      const response = await fetch('https://sheetdb.io/api/v1/2d3702bpn44sv');
      const res = await response.json();
      setData(res); 
      setLoading(false); 
      console.log(res); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /**
    * @description Handles page change event
    * @param {number} newPage - The new page number
    */
  export const handlePageChange = (newPage , setCurrentPage) => {
    setCurrentPage(newPage);
  };

  /**
     * Handles search input change
     * @param {object} event - The input change event
     */
  export const handleSearchChange = (event, setSearchQuery, setCurrentPage) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1)
  };
  