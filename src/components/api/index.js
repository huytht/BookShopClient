import axios from 'axios';
//mock API
let API_URL = 'https://6194c0da74c1bd00176c68f6.mockapi.io/api/';
   export default function callApi(endpoint, method = 'GET', body) {
       return axios({
           method,
           url: `${API_URL}/${endpoint}`,
           data: body
       }).catch(err => {
           console.log(err);
       });
}