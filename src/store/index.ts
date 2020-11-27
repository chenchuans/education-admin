import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'
import { IAuthState } from './modules/auth'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  auth: IAuthState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
