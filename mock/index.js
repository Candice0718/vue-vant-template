import Mock from "better-mock";
import moduleList from "./handle/index.js";

const logMock = (path, opt, response) => {
    console.warn("<mock>");
    console.log(path, JSON.parse(opt.body), response);
    console.warn("</mock>");
};
moduleList.forEach(item => {
    Object.keys(item).forEach(key => {
        const keyDi = key.split(" ");
        Mock.mock(keyDi[1], keyDi[0], opt => {
            let response = null;

            if (typeof item[key] === "function") {
                response = item[key](opt);
            } else {
                response = Mock.mock(item[key]);
            }

            logMock(opt.url, opt, response);

            return response;
        });
    });
});

Mock.setup({
    timeout: "200-500"
});