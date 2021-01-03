import { Component } from 'react';
import { Stores, stores as globalStores } from '@/App';
import { observer } from 'mobx-react';

export interface BaseComponentProps extends Record<string, any> {
  stores?: Stores;
}

export interface BaseComponentState extends Record<string, any> {
  globalLoading?: boolean,
}

export function genBaseComponentState<T extends BaseComponentState>(state: T): T {
  return {
    ...state,
    globalLoading: false,
  };
}

@observer
export class BaseComponent<
    T extends BaseComponentProps = any,
    S extends BaseComponentState = any
    > extends Component<T, S> {
  protected stores: Stores;

  constructor(props: T, stores: Stores) {
    super(props);

    this.stores = stores || globalStores;
  }
}

