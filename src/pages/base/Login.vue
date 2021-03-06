<template>
    <div class="login-container">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
        >
            <div class="title-container">
                <h3 class="title">管理员登录</h3>
            </div>

            <el-form-item prop="userName">
                <span class="svg-container">
                    <svg-icon name="user" />
                </span>
                <el-input
                    ref="userName"
                    v-model="loginForm.userName"
                    name="userName"
                    type="text"
                    autocomplete="on"
                    placeholder="userName"
                />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon name="password" />
                </span>
                <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="password"
                    name="password"
                    autocomplete="on"
                    @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
                </span>
            </el-form-item>

            <el-button
                :loading="loading"
                type="primary"
                style="width:100%; margin-bottom:30px;"
                @click.native.prevent="handleLogin"
            >登录</el-button>
        </el-form>
    </div>
</template>

<script lang="ts" scoped>
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { Form as ElForm, Input } from "element-ui";
import { isValidUsername } from "@/utils/validate";
import { login } from '@/api';
import { setUid, setToken, setUsername, setRole } from '@/utils/session';

@Component({
    name: "Login"
})
export default class extends Vue {
    private validateUsername = (
        rule: any,
        value: string,
        callback: Function
    ) => {
        // if (!isValidUsername(value)) {
        //     callback(new Error('请输入用户名'));
        // } else {
        //     callback();
        // }
        callback();
    };

    private validatePassword = (
        rule: any,
        value: string,
        callback: Function
    ) => {
        if (value.length < 3) {
            callback(new Error('密码至少六位'));
        } else {
            callback();
        }
        callback();
    };
    private loginForm = {
        userName: "",
        password: ""
    };
    private loginRules = {
        userName: [{ validator: this.validateUsername, trigger: "blur" }],
        password: [{ validator: this.validatePassword, trigger: "blur" }]
    };
    private passwordType = "password";
    private loading = false;
    private showDialog = false;
    private redirect?: string;
    private otherQuery: any = {};

    mounted() {
        if (this.loginForm.userName === "") {
            (this.$refs.userName as Input).focus();
        } else if (this.loginForm.password === "") {
            (this.$refs.password as Input).focus();
        }
    }

    private showPwd() {
        this.passwordType === 'password' ? '' : 'password';
        this.$nextTick(() => {
            (this.$refs.password as Input).focus();
        });
    }

    private async handleLogin() {
        (this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
            const { userName:  user, password } = this.loginForm;
            //  userName: 'gjf', passWord: '123'
            const result: any = await login({userName: user, passWord: password});
            if (result.code === 200) {
                this.$message({
                    type: 'success',
                    message: '登录成功!'
                });
                const { id, token, userName, userRole } = result.data;
                setRole(userRole);
                setUid(id);
                setToken(token);
                setUsername(userName);
                this.$router.push({
                    path: "/home"
                });
            } else if (result.code === 210) {
                this.$message({
                    type: 'error',
                    message: result.data
                });
            }
        });
    }
}
</script>

<style lang="scss">
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
    .login-container .el-input {
        input {
            color: $loginCursorColor;
        }
        input::first-line {
            color: $lightGray;
        }
    }
}

.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            height: 47px;
            background: transparent;
            border: 0px;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $lightGray;
            caret-color: $loginCursorColor;
            -webkit-appearance: none;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $loginBg inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
.login-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: $loginBg;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $darkGray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $lightGray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $darkGray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
