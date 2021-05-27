import Mock from "better-mock";

export const randomInt = (length = 10, min = 0) => {
    return Math.floor(Math.random() * length) + min;
};

export const randomActivity = () => {
    return Math.random() > 0.5 ? 1 : 0;
};

export const randomReg = reg => {
    return Mock.mock({ a: reg }).a;
};

export const randomDateString = () => {
    return `${randomInt(20, 2000)}-${randomInt(12, 1)}-${randomInt(30, 1)}`;
};

/**
 * 取lower-upper之间的随机数
 * @param {*} lower 随机数下限
 * @param {*} upper 随机数上限
 */
export const getRandomRange = (lower,upper) => {
    return Math.floor(Math.random() * (upper - lower+1)) + lower;
};