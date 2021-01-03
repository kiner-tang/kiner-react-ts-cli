import React from 'react';
import loadable, { LoadableComponent } from '@loadable/component';
import { RouteChildrenProps, RouteComponentProps } from 'react-router';

export interface RouterItem {
  name: string;
  component?: LoadableComponent<any>;
  extra?: boolean;
  path?: string;
  location?: Location;
  render?: ((props: RouteComponentProps<any>) => React.ReactNode);
  children?:
  | ((props: RouteChildrenProps<any>) => React.ReactNode)
  | React.ReactNode;
  sensitive?: boolean;
  strict?: boolean;
  auth?: boolean;
}


export const routes: RouterItem[] = [
  {
    name: 'demo',
    path: '/demo',
    component: loadable(() => import('@/modules/demo/index')),
  },
];
