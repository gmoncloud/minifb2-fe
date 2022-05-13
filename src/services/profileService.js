// import { HTTP } from '../http-common';

import axios from 'axios';
const baseUrl = 'http://fbmini.local'

    /* 
     *  Makes request based on the 'id' param
     *  returns response[].
    */
    export async function getProfile(id){
        let response
        response = await axios.get(`${baseUrl}/profile/${id}`)
        return response.data
    }
    