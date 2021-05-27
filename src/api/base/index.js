
/**
 *@author Candice
 *@description 网络请求基础配置
 */
import axiosAdapter from './axios-adapter.js';

const
    ENV = {
        /**
         * test环境链接地址
         * @type {{url: string}}
         */
        ENV_TEST: {
            url: "http://10.221.57.117:7001",
        },
        /**
         * uat环境链接地址
         * @type {{url: string}}
         */
        ENV_UAT: {
            url: "",
        },
        /**
         * online环境链接地址
         * @type {{url: string}}
         */
        ENV_ONLINE: {
            url: "",
        }
    },
    ApiEnv = ENV[process.env.VUE_PUBLISH_ENV || "ENV_TEST"], //后端环境切换
    API = {
        defaults: {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'source': 'WEB',
            },
            timeout: 60 * 1000,
            method: 'POST',
        },
        getAdapter: (options) => new axiosAdapter(options),
        baseUrl: ApiEnv.url,
    };
export default API;
export {
    ApiEnv
};