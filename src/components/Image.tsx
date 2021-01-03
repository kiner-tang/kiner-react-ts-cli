import React, { useState } from "react";
import { createUpdateState } from "@/core/util";
import './Image.scss';

export interface ImageProps {
    src: string,
    width: string,
    height: string,
    alt?: string,
    loadingTip?: string
}

interface ImageState {
    loading: boolean,
    imgWidth: string,
    imgHeight: string,
    isError: boolean
}

export const Image: React.FC<ImageProps> = (props: ImageProps) => {

    const [state, setState] = useState<ImageState>({
        loading: true,
        imgWidth: props.width,
        imgHeight: props.height,
        isError: false
    });

    const updateState = createUpdateState<ImageState>(setState);

    const handleImageLoaded = () => {
        console.log('图片加载完成...');
        updateState({
            loading: false
        })
    };
    const handleImageLoadError = () => {
        updateState({
            isError: true,
            loading: false
        })
    };

    return (
        <div className="image-container">
            { state.loading && <div className="loading-tip">{props.loadingTip || '图片加载中，请稍后...'}</div> }
            { state.isError && <div className="error-tip">图片加载失败</div> }
            { (!state.isError) && <img src={props.src} alt={props.alt} onLoad={handleImageLoaded} onError={handleImageLoadError}/> }
        </div>
    )
};
