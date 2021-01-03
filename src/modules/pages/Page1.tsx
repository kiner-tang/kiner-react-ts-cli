import React from "react";
import { BaseComponent, BaseComponentProps } from "@/components/BaseComponent";
import { inject, observer } from "mobx-react";
import "./Page1.scss";

export interface Page1Props extends BaseComponentProps{

}

interface Page1State {

}

@inject('stores')
@observer
export class Page1 extends BaseComponent<Page1Props, Page1State>{
    render(){
        return (
            <div className="page">
                页面1
            </div>
        )
    }
}
