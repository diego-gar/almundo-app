import axios from 'axios';
import { baseUrl } from './config';

export const getAllHotels = () => {
    let url = `${baseUrl}/hotels/all`;
  
    return axios.get(url);
}

export const getFilteredHotels = (params) => {
    let url = `${baseUrl}/hotels/search`;
  
    return axios.get(url, {
        params: params
      });
}