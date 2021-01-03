import React, { CSSProperties } from "react";
import { BaseComponent, BaseComponentProps } from "@/components/BaseComponent";
import { Stores } from "@/App";
import "./PreloadImage.scss"

export interface PreloadImageProps extends BaseComponentProps{
    imgs: string[],
    onComplete: () => void,
    bgColor?: string,
    bgImage?: string,
    isProgress?: boolean,
    isShowTips?: boolean,
    loadingTips?: string
}

interface PreloadImageState {
    progress: number,
    curIndex: number,
}

export class PreloadImage extends BaseComponent<PreloadImageProps, PreloadImageState> {

    constructor(props: PreloadImageProps) {
        super(props, props.stores);

        this.state = {
            progress: 0,
            curIndex: 0
        };
    }

    componentDidMount(): void {
        this.doLoadImage(window.imgPreloadArr);
    }

    doLoadImage = (imgs: string[] = []) => {
        if(imgs.length === 0){
            this.setState({
                progress: 100
            });
            this.props.onComplete && this.props.onComplete();
            return;
        }

        imgs.forEach(url => {
            const handleSuccess = () => {
                const newIdx = this.state.curIndex + 1;
                this.setState({
                    curIndex: newIdx,
                    progress: Math.ceil((newIdx / imgs.length) * 100)
                });
                if(newIdx === imgs.length - 1){
                    this.props.onComplete && this.props.onComplete();
                }
            };
            const img = new Image();
            img.src = url;
            img.onload = handleSuccess;
            img.onerror = handleSuccess;
        });
    }

    render(){
        const {
            bgColor,
            bgImage,
            isShowTips=true,
            loadingTips='${progress}%'
        } = this.props;

        const {
            progress
        } = this.state;

        const style: CSSProperties = {
            backgroundColor: bgColor
        };

        if(bgImage){
            style.backgroundImage = `url(${bgImage})`;
        }

        return (
            <div className="preload-image-container" style={style}>
                <div className="progress-box">
                    <div className="progress-bar">
                        <div className="progress-bg" />
                        <div className="progress-front" style={{width: `${this.state.progress}%`}}/>
                    </div>
                    { isShowTips && <div className="tips" style={{left: `${this.state.progress}%`}}>{loadingTips.replace(/\$\{([^\}]*)\}/g, String(progress))}</div> }
                </div>
            </div>
        );
    }
}
