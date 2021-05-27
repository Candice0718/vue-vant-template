<template>
    <div>
        <van-button @click="getMockData">获取mock数据</van-button>
        <van-button @click="$router.push('/info')">进入详情页面</van-button>
        <h1>{{ mock }}</h1>

    </div>
</template>
<script>
    import { getMockData } from '@services';
    export default {
        name: 'home',
        data() {
            return {
                mock: ""
            }
        },
        methods: {
            async getMockData() {
                const res = await getMockData();
                console.log(res);
                this.mock = res.title;
            }
        },
    };
</script>