import React from "react";
import {
    BaseComponent,
    BaseComponentProps,
    BaseComponentState, genBaseComponentState,
} from "@/components/BaseComponent";
import "./index.scss";
import { inject, observer } from "mobx-react";
import { Button } from "antd";
import { config } from "@/config";
import { Image } from "@/components/Image";
import { stores } from "@/App";
import { Modal } from "@/components/Modal";
import { Pages } from "@/components/Pages";
import { Page1 } from "@/modules/pages/Page1";
import { Page2 } from "@/modules/pages/Page2";
import { Page3 } from "@/modules/pages/Page3";
import { VideoPlayer } from "@/components/VideoPlayer";

export type DemoProps = BaseComponentProps;

export interface DemoState extends BaseComponentState {
    count: number,
    modalShow: boolean,
    curPage: number
}


@inject("stores")
@observer
class Demo extends BaseComponent<DemoProps, DemoState> {
    constructor(props: DemoProps) {
        super(props, props.stores || stores);

        console.log(props.stores);

        this.state = genBaseComponentState<DemoState>({
            count: 0,
            modalShow: false,
            curPage: 1
        });
    }

    componentDidMount(): void {
        const obj: any = {
            userInfo: {
                name: "kiner"
            }
        };

        console.log(config, window.imgPreloadArr);

        console.log(obj?.userInfo?.name);
    }

    handlePageChange(curPage: number) {
        this.setState({
            curPage
        })
    }

    render() {
        const {
            msg = "kiner",
        } = this.props;
        const {
            count,
            modalShow,
            curPage
        } = this.state;
        const {
            state: {
                loading,
            },
        } = this.stores.commonStore;

        const videoConfig = {
            source: '//www.runoob.com/try/demo_source/movie.mp4',
            cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2853553659,1775735885&fm=26&gp=0.jpg'
        };

        return (
            <div
                className="container"
            >
                <VideoPlayer config={videoConfig}/>
                <Button onClick={ () => {
                    this.stores.commonStore.setGlobalLoading(!loading);
                    this.setState({
                        count: count + 1,
                    });
                } }
                >点击切换
                </Button>
                <Button onClick={ () => {
                    this.setState({modalShow: true})
                } }
                >
                    显示弹框
                </Button>
                <Modal
                    visible={ modalShow }
                    clickMask2close={false}
                    showClose={true}
                    onClose={ () => this.setState({modalShow: false}) }
                    closeBtn={<div className="close-btn">×</div>}
                >
                  <div className="modal-box">
                    这个弹框内容
                  </div>
                </Modal>
                { msg } : { count } : { loading ? "是" : "否" }
                <Image
                    src={ require("@/assets/images/1.jpeg").default }
                    width={ `100%` }
                    height={ `100px` }
                />
                <Pages
                    isSwiper={false}
                    curPage={curPage}
                    onPageChange={curPage => this.handlePageChange(curPage)}
                    pages={[
                        <Page1/>,
                        <Page2/>,
                        <Page3/>
                    ]} />
            </div>
        );
    }
}

export default Demo;
