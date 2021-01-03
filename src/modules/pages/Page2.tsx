import React from "react";
import { BaseComponent, BaseComponentProps } from "@/components/BaseComponent";
import { inject, observer } from "mobx-react";
import "./Page2.scss";

export interface Page2Props extends BaseComponentProps{

}

interface Page2State {

}

@inject('stores')
@observer
export class Page2 extends BaseComponent<Page2Props, Page2State>{
    render(){
        return (
            <div className="page">
                页面2
            </div>
        )
    }
}
