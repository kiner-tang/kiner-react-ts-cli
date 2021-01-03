import {config as development} from './env.development';
import {config as testing} from './env.testing';
import {config as production} from './env.production';

export interface ConfigStruct {
    env: 'development' | 'testing' | 'production'
    baseApi: string,
    timeout: number,
    globalErrorTips: string,
    [key :string]: any
}

export const config: ConfigStruct = ({
    development,
    testing,
    production,
// @ts-ignore
})[process.env.BUILD_ENV];
