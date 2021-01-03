import { action, observable } from 'mobx';

export interface CommonStoreState {
  loading: boolean
}

export function genCommonStoreState(): CommonStoreState {
  return {
    loading: false,
  };
}

export class CommonStore {
  @observable public state: CommonStoreState = genCommonStoreState();

  @action
  public setGlobalLoading(loading: boolean) {
    console.log(loading);
    this.state = {
      ...this.state,
      loading,
    };
  }
}
