/**
 * 请求基础类
 */
 import Constant from './index';
 import * as ResponseCode from './response.code';
 
 export default class BaseRequest {
     constructor(body = {}, options = {}) {
         this.apiDelegate = Constant.getAdapter();
         this.body = body;
         const optionsHeader = {
             ...Constant.defaults.headers,
             ...options.headers
         };
         this.options = {
             ...Constant.defaults,
             ...options,
             // 添加token信息
             headers: optionsHeader
         };
         this.method = this.options.method;
     }
 
     /**
      * The url of your request.
      * This method must be override!
      */
     requestUrl() {
         throw new Error('This method must be override!');
     }
 
     /**
      * start a request...
      * @param successCallback
      * @param failCallBack
      * @returns {Promise.<void>}
      */
     async start(successCallback, failCallBack) {
         try {
             this.canceled = false;
             this.successCallback = successCallback;
             this.failCallBack = failCallBack;
             let url = this.getBaseUrl() + this.requestUrl(),
                 options1 = {
                     ...this.options,
                     url: url,
                     data: this.method !== 'GET' ? (this.body.uploadFile ? this.body.uploadFile : this.body) : null,
                     params: this.method === 'GET' ? this.body : {},
                 };
             let response = await this.apiDelegate.start(options1);
             !this.isCanceled() && this.handleResponse(response);
         } catch (erro) {
             !this.isCanceled() && this.handleErro(ResponseCode.CODE_ERRO_UNKOWN, '请求失败', erro);
         }
     }
 
     /**
      * handle response
      * @param response
      */
     handleResponse(response) {
         if (response && response.data
             && (ResponseCode.CODE_SUCCESS === response.data.code || ResponseCode.CODE_SUCCESS === parseInt(response.data.code))
             && this.successCallback && !this.isCanceled()) {
             this.onSuccess(response.data);
         } else {
             // 文件流格式后台没办法提供成功code码，通过data有数据，type为application/octet-stream判断为正确
             if (response && response.data && response.data.type === 'application/octet-stream') {
                 this.onSuccess(response.data);
             } else{
                 this.handleErro(response.data.code, '请求失败', response.data.message);
             }
         }
         this.log(response);
     }
 
     /**
      * handle erro
      * @param erro
      */
     handleErro(code, message, erro) {
         this.log(erro);
         if (this.failCallBack && !this.isCanceled()) {
             this.onErro(
                 code,
                 erro,
                 message
             );
         }
     }
 
     /**
      * onSuccess
      * @param data
      */
     onSuccess(data) {
         this.successCallback(data);
     }
 
     /**
      * onErro
      * @param code
      * @param message
      * @param erro
      */
     onErro(code, message, erro) {
         this.failCallBack({
             code,
             erro,
             message
         });
     }
 
     /**
      * get base url. certainly！you can override it.
      * @returns {string|string}
      */
     getBaseUrl() {
         return Constant.baseUrl;
     }
 
     /**
      * judge if current request is cancled.
      */
     isCanceled() {
         return this.canceled;
     }
 
     /**
      * cancle request
      * @returns {BaseRequest}
      */
     cancelRequest() {
         this.canceled = true;
         this.apiDelegate.cancleRequest();
         return this;
     }
 
     /**
      * log
      * @param message
      * @returns {BaseRequest}
      */
     log(message) {
         process.env.NODE_ENV !== 'production' && console.log(message);
         return this;
     }
 }
 