import React from "react";
import { BaseComponent, BaseComponentProps } from "@/components/BaseComponent";
import { stores } from "@/App";
import Player from "aliplayer-react";

export interface VideoCustomComponentItemStruct {
    name: string,
    type: any
}

export interface VideoPlayerProps extends BaseComponentProps{
    config: Record<string, any>,
    components?: VideoCustomComponentItemStruct[]
}

export class VideoPlayer extends BaseComponent<VideoPlayerProps, any>{

    private defaultConfig: Record<string, any> = {}

    constructor(props: VideoPlayerProps) {
        super(props, props.stores || stores);

        this.defaultConfig = {
            source: "//player.alicdn.com/video/aliyunmedia.mp4",
            width: "100%",
            height: "200px",
            autoplay: true,
            isLive: false,
            rePlay: false,
            playsinline: true,
            preload: true,
            controlBarVisibility: "hover",
            useH5Prism: true,
            "skinLayout": [
                {
                    "name": "bigPlayButton",
                    "align": "cc",
                    "x": 0,
                    "y": 0
                },
                {
                    "name": "H5Loading",
                    "align": "cc"
                },
                {
                    "name": "errorDisplay",
                    "align": "tlabs",
                    "x": 0,
                    "y": 0
                },
                {
                    "name": "infoDisplay"
                },
                {
                    "name": "tooltip",
                    "align": "blabs",
                    "x": 0,
                    "y": 56
                },
                {
                    "name": "thumbnail"
                },
                {
                    "name": "controlBar",
                    "align": "blabs",
                    "x": 0,
                    "y": 0,
                    "children": [
                        {
                            "name": "progress",
                            "align": "blabs",
                            "x": 0,
                            "y": 44
                        },
                        {
                            "name": "playButton",
                            "align": "tl",
                            "x": 15,
                            "y": 12
                        },
                        {
                            "name": "timeDisplay",
                            "align": "tl",
                            "x": 10,
                            "y": 7
                        },
                        {
                            "name": "fullScreenButton",
                            "align": "tr",
                            "x": 10,
                            "y": 12
                        },
                        {
                            "name": "volume",
                            "align": "tr",
                            "x": 5,
                            "y": 10
                        }
                    ]
                }
            ]
        };
    }

    render() {
        const config = {
            ...this.defaultConfig,
            ...this.props.config,
            components: this.props.components
        };
        return (
            <Player config={config} />
        );
    }
}
