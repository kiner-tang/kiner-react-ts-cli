import React from "react";
import { BaseComponent, BaseComponentProps } from "@/components/BaseComponent";
import { inject, observer } from "mobx-react";
import "./Page3.scss";

export interface Page3Props extends BaseComponentProps{

}

interface Page3State {

}

@inject('stores')
@observer
export class Page3 extends BaseComponent<Page3Props, Page3State>{
    render(){
        return (
            <div className="page">
                页面3
            </div>
        )
    }
}
