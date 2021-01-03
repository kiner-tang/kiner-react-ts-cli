import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { hot } from 'react-hot-loader';
import { getQueryString } from "@/core/util";
import VConsole from 'vconsole';

declare global {
    interface Window {
        imgPreloadArr: string[],
        wx: any
    }
}

if(getQueryString('debug') === 'true') {
    new VConsole();
}

const rootEl = document.getElementById('root');

const WrapperAPP = process.env.BUILD_ENV === 'development' ? hot(module)(App) : App;

ReactDOM.render(
  <WrapperAPP />,
  rootEl,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
