import BaseService from './base.service';
import api from '@api/index.js';

/**
 * 获取mock数据
 * @export
 * @param {*} params
 */
 export async function getMockData(params) {
    const baseService = new BaseService(params, { method: "POST" });
    baseService.setRequestUrl(api["item/get"]);
    let result = '';
    await baseService.start(
        (response) => {
            result = response.data;
        },
        (error) => {
            console.log("error", error);
        }
    );
    return result;
}