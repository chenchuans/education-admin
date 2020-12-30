<template>
    <div class="dashboard-container">
        <div class="dashboard-text">欢迎来到后台管理系统</div>
    </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "Home"
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.dashboard-container {
    width: 100%;
    .dashboard-text {
        margin-top: 100px;
        font: 50px/2 '';
        text-align: center;
    }
}
</style>
