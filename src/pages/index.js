/* eslint-disable */
/**
 * @desc 页面自动化注册
 * @important 此文件禁止手动修改！
 */
// 路由配置
const pages = {
    home: () => import( /* webpackChunkName: "pages/home" */ "./home/home.vue"),
    info: () => import( /* webpackChunkName: "pages/info" */ "./info/info.vue"),
};
export default pages;