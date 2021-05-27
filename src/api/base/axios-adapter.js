/**
 *@author Candice
 *@description aioxs适配器
 */
 import axios from 'axios';
 export default class AxiosAdapter{
     /**
    * cancle request
    * @returns {BaseRequest}
    */
     cancleRequest () {
         this.source && this.source.cancel();
     }
 
     /**
    * start
    * @param options
    * @returns {AxiosPromise}
    */
     start (options) {
         const CancelToken = axios.CancelToken;
         this.source = CancelToken.source();
         return axios({...options, cancelToken: this.source.token});
     }
 }
 