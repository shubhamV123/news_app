
import URL from './classUrl';
import axios from 'axios';

export default class ApiRequest{
    constructor(page){
        this.page = page;
    }

    fetchAllPost(){
        let url = new URL(this.page).fetchAllPostURL();
        return new Promise((resolve,reject) => {
            axios.get(url)
            .then(res => {
                resolve(res.data.response)
            })
            .catch(err => {
                reject(err);
            })
        })
        
            
    }

}