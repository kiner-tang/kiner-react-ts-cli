import { Dispatch, SetStateAction } from 'react';
import exp from "constants";


export type UpdateState<T> = (partialState: Partial<T>) => void;

export function createUpdateState<T>(setState: Dispatch<SetStateAction<T>>): UpdateState<T> {
  return (partialState: Partial<T>) => setState(oldState => {
    return ({
      ...oldState,
      ...partialState,
    });
  });
}

// 获取当前链接中的参数name的值
export function getQueryString(name: string) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === name) {
      return pair[1];
    }
  }
  return '';
}

export function fitZero(str: string, targetLen = 4): string {
  const len = str.length;
  const num = targetLen - len;
  if (num < 0) {
    return str;
  } else {
    return `${'0'.repeat(num)}${str}`;
  }
}

export const browser = {
  /**
   * 判断是否安卓手机
   * @returns {boolean}
   */
  isAndroid: function() {
    let ua = typeof window === "object" ? window.navigator.userAgent : "";
    return /Android/i.test(ua);
  },
  /**
   * 判断是否ios
   * @returns {boolean}
   */
  isIOS: function() {
    let ua = typeof window === "object" ? window.navigator.userAgent : "";
    return /iPhone|iPod|iPad/i.test(ua);
  },
  /**
   * 判断是否为微信浏览器
   */
  isWeiXin: function() {
    let ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    return ua.match(/MicroMessenger/i);
  }
};
