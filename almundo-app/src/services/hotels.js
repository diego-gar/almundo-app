import axios from 'axios';
const baseUrl = 'http://localhost:3001';

export const getAllHotels = () => {
    let url = `${baseUrl}/hotel/all`;
  
    return axios.get(url);
}

export const getFilteredHotels = (params) => {
    let url = `${baseUrl}/hotels/search`;
  
    return axios.get(url, {
        params: params
      });
}