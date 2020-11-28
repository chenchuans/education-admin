<template>
    <div class="dashboard-container">
        <div class="dashboard-text">欢迎来到自营电商后台管理系统</div>
    </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "Dashboard"
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
