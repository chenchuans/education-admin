import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { login } from '@/api';
import store from '@/store';
import { setUid, setToken, setUsername } from '@/utils/session';

export interface IAuthState {
    uid: string
    token: string
    userName: string
}

@Module({
    dynamic: true,
    store,
    name: 'auth'
})
class Auth extends VuexModule implements IAuthState {
    public uid: string = '';
    public token: string = '';
    public userName: string = '';

    @Mutation
    public resetUid(id: string) {
        this.uid = id;
    }

    @Mutation
    public resetToken(token: string) {
        this.token = token;
    }

    @Mutation
    public resetUsername(userName: string) {
        this.userName = userName;
    }

    @Action
    public async login(data: any) {
        try {
            const result = await login(data);
            const { id, token, userName } = result.data.data;

            this.resetUid(id);
            setUid(id);

            this.resetToken(token);
            setToken(token);

            this.resetUsername(userName);
            setUsername(userName);

            return true;
        } catch (e) {
            return false;
        }
    }
}

export const AuthModule = getModule(Auth);
