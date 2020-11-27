import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login } from '@/api'
import store from '@/store'
import { setUid, setToken } from '@/utils/session'

export interface IAuthState {
  uid: string
  token: string
  access: string[]
}

@Module({
  dynamic: true, 
  store, 
  name: 'auth' 
})
class Auth extends VuexModule implements IAuthState {
  public uid: string = ''
  public token: string = ''
  public access: string[] = []

  @Mutation
  public resetUid(uid: string) {
    this.uid = uid
  }

  @Mutation
  public resetToken(token: string) {
    this.token = token
  }

  @Mutation
  public resetAccess(access: string[]) {
    this.access = access
  }

  @Action
  public async login(data: any) {
    try {
      const result = await login(data)
      const _data = result.data.data

      this.resetUid(_data.uid)
      setUid(_data.uid)

      this.resetToken(_data.token)
      setToken(_data.token)

      this.resetAccess(_data.access)
      return true
    } catch (e) {
      return false
    }
  }
}

export const AuthModule = getModule(Auth)
