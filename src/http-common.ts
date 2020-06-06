import Axios from 'axios';
import CONFIG from './config';

export default Axios.create({
    baseURL: CONFIG.server,
    headers: {
        'Content-type': 'application/json'
    }
});