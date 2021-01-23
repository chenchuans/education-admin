<template>
    <div class="page">
        <header class="page-header">
            <el-select v-model="currentSelect" placeholder="请选择">
                <el-option
                v-for="item in selectList"
                :key="item.value"
                :label="item.label"
                @change="selectChange"
                :value="item.value"/>
            </el-select>
            <!-- <el-button type="primary" @click="handleSearch">查询</el-button> -->
        </header>
        <el-table v-loading="listLoading" :data="tableList" border style="width: 100%">
            <el-table-column label="微信昵称" prop="wxNiceName"/>
            <el-table-column label="真实姓名" prop="realName"/>
            <el-table-column label="手机号" prop="phone"/>
            <el-table-column label="是否添加老师微信" prop="isAddWeChat">
                <template slot-scope="{row}">{{ handleBoolean(row.isAddWeChat) }}</template>
            </el-table-column>
            <el-table-column label="是否填写资料" prop="isEditProfile">
                <template slot-scope="{row}">{{ handleBoolean(row.isEditProfile) }}</template>
            </el-table-column>
            <el-table-column label="是否加入微信群" prop=" isInWeChatGroup">
                <template slot-scope="{row}">{{ handleBoolean(row.isInWeChatGroup) }}</template>
            </el-table-column>
            <el-table-column label="是否参与开营仪式" prop="isParticipateInTheOpeningCeremony">
                <template slot-scope="{row}">{{ handleBoolean(row.isParticipateInTheOpeningCeremony) }}</template>
            </el-table-column>
            <el-table-column label="是否全价课程" prop="isFullPrice">
                <template slot-scope="{row}">{{ handleBoolean(row.isFullPrice) }}</template>
            </el-table-column>
            <el-table-column label="是否好评" prop="isGoodPraise">
                <template slot-scope="{row}">{{ handleBoolean(row.isGoodPraise) }}</template>
            </el-table-column>
            <el-table-column label="是否退出群聊" prop="isLeaveWeChatGroup">
                <template slot-scope="{row}">{{ handleBoolean(row.isLeaveWeChatGroup) }}</template>
            </el-table-column>
            <el-table-column label="是否体验课升级到全价课" prop="isTransformationToFullPrice">
                <template slot-scope="{row}">{{ handleBoolean(row.isTransformationToFullPrice) }}</template>
            </el-table-column>
            <el-table-column label="是否完课" prop="isFinishClass">
                <template slot-scope="{row}">{{ handleBoolean(row.isFinishClass) }}</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" prop="operation">
                <template slot-scope="{row}">
                        <el-button size="mini" class="operation-button"
                            @click="handleEdit(row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            v-show="pages.total > 0"
            :total="pages.total"
            :page.sync="pages.page"
            :size.sync="pages.size"
            @pagination="getList"
        />
    </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from "vue-property-decorator";
import { PageType, ResponseType } from "@/utils/type-list.ts";
import { getStudyTableList, getSelectSemesterList } from "@/api";
import Pagination from '@/components/Pagination/index.vue';
import PopDeleteButton from '@/components/PopDeleteButton/index.vue';
import ImageDetail from '@/components/ImageDetail/index.vue';

interface TableListType {
    id: number;
    isAddWeChat: boolean;
    isEditProfile: boolean;
    isFinishClass: boolean;
    isFullPrice: boolean;
    isGoodPraise: boolean;
    isInWeChatGroup: boolean;
    isLeaveWeChatGroup: boolean;
    isParticipateInTheOpeningCeremony: boolean;
    isTransformationToFullPrice: boolean;
    orderId: number;
    phone: string;
    realName: string;
    wxNiceName: string;
}
interface SelectListType {
    value: number;
    label: string;
}

@Component({
    name: "LearningSituation",
    components: { Pagination }
})
export default class extends Vue {
    private pages: PageType = {
        page: 1,
        size: 20,
        total: 0
    };
    private listLoading: boolean = true;
    private tableList: TableListType[] = [];
    private selectList: SelectListType[] = [];
    private currentSelect: string = '';


    created() {
        this.getSelectList();
    }

    private async getList() {
        const current: any = this.selectList.find(item => item.label === this.currentSelect) || {};
        this.tableList = [];
        const semesterId = current.value;
        const { page, size } = this.pages;
        this.listLoading = true;
        const { data } = await getStudyTableList({page, size, semesterId});
        this.tableList = (data as any).studentLearningStatusList;
        this.pages.total = (data as any).total;
        this.listLoading = false;
    }

    private async getSelectList() {
        this.selectList = [];
        getSelectSemesterList({}).then((res: any) => {
            if (res.code === 200) {
                this.selectList = res.data.semesterList.map(({id, semesterName}: any) => ({value: id, label: semesterName}));
                const { label } = this.selectList[0];
                this.currentSelect = label;
                this.getList();
            }
        });
    }

    private selectChange() {
        this.getList();
    }

    private handleBoolean(type: boolean | null) {
        return type ? '是' : '否';
    }

    private handleEdit(item: TableListType) {
        this.$router.push(`/operate/edit-learning-situation?form=${JSON.stringify(item)}`);
    }
}
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    &-header {
        margin: 10px 0;
        height: 50px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
    .operation-button {
        margin: 0 10px;
    }
}
</style>
