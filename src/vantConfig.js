import Vue from 'vue';
import { Button } from 'vant';

const components = [
    Button
];

components.forEach(component => {
    Vue.use(component);
})