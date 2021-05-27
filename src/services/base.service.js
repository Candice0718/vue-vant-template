import BaseRequest from '@api/base/request.js';

export default class BaseService extends BaseRequest {
    url = '';
    /**
     * 修改requestUrl
     */
    setRequestUrl(url) {
        this.url = url;
    }
    /**
     * 必须重写词方法返回接口url
     * @returns {string}
     */
    requestUrl() {
        return this.url;
    }

    /**
     *  当需要重写baseurl的时候重写此方法
     * @returns {string|((...args:string|url.URL|{origin: string}[])=>void)|number|url.URL}
     */
    getBaseUrl() {
        // 使用mock数据需要将BaseUrl注释
        // return super.getBaseUrl();
        return '/';
    }
    getFullUrl() {
        return super.getBaseUrl() + this.requestUrl();
    }
    /**
     * 当需要对后台返回的结果做处理的时候重写此方法
     * @param response
     */
    handleResponse(response) {
        return super.handleResponse(response);
    }
}