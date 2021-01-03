import React, { CSSProperties } from "react";
import { BaseComponent, BaseComponentProps } from "@/components/BaseComponent";
import "./BgMusic.scss"
import { browser } from "@/core/util";

export interface BgMusicProps extends BaseComponentProps{
    src: string,
    autoPlay?: boolean,
    showMusicBtn?: boolean,
    loop?: boolean
}

interface BgMusicState {
    isPlaying: boolean
}

export const bgMRef = React.createRef<HTMLAudioElement>();

export class BgMusic extends BaseComponent<BgMusicProps, BgMusicState>{
    constructor(props: BgMusicProps) {
        super(props, props.stores);

        this.state = {
            isPlaying: false
        };
    }

    componentDidMount(): void {
        const {
            autoPlay=true
        } = this.props;

        const audio = bgMRef?.current;
        if (autoPlay) {
            if (browser.isWeiXin()) {
                console.log("微信浏览器");
                window.wx.ready(() => {
                    this.play();
                    console.log("微信jssdk准备完毕，播放音乐");
                });
                this.play();
            } else {
                this.play();
            }
        }
        audio?.addEventListener(
            "play",
            () => {
                this.setState({
                    isPlaying: true
                });
            },
            false
        );
        audio?.addEventListener(
            "pause",
            () => {
                this.setState({
                    isPlaying: false
                });
            },
            false
        );
    }

    private play(){
        try{
            bgMRef?.current?.play();
            this.setState({
                isPlaying: true
            });
        }catch (e) {

        }
    }

    private stop() {
        bgMRef?.current?.pause();
        this.setState({
            isPlaying: false
        });
    }

    render(){
        const {
            src,
            autoPlay=true,
            showMusicBtn=true,
            loop=true
        } = this.props;
        const {
            isPlaying
        } = this.state;

        const style: CSSProperties = {};

        if(!showMusicBtn){
            style.opacity = 0;
            style.zIndex = -1;
        }

        return (
            <div className={`bgMusic ${isPlaying?'':'stopped'}`} style={style} onClick={() => {
                if(isPlaying){
                    this.stop();
                }else{
                    this.play();
                }
            }}>
                <audio ref={bgMRef} src={src} loop={loop} autoPlay={autoPlay} />
            </div>
        );
    }
}
