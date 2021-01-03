import React, { ReactNodeArray } from "react";
import { BaseComponent, BaseComponentProps } from "@/components/BaseComponent";
import { inject, observer } from "mobx-react";
import { stores } from "@/App";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "./Pages.scss";


export interface PagesProps extends BaseComponentProps {
    isSwiper: boolean,
    curPage: number,
    pages: ReactNodeArray,
    onPageChange: (curPage: number) => void,
    allPageShow?: boolean
}

export interface PagesState {

}

@inject("stores")
@observer
export class Pages extends BaseComponent<PagesProps, PagesState> {
    constructor(props: PagesProps) {
        super(props, props.stores || stores);
    }

    render() {
        const {
            isSwiper,
            pages,
            curPage,
            onPageChange,
            allPageShow
        } = this.props;
        return (
            <div className="pages-container">
                {
                    isSwiper ? (
                        <Swiper
                            initialSlide={ curPage }
                            direction="vertical"
                            onSlideChange={ (swiper) => onPageChange(swiper.activeIndex) }
                        >
                            {
                                pages.map((page, index) => (
                                    <SwiperSlide key={ index }>
                                        { page }
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    ) : (
                        pages.filter((page, index) => allPageShow === true ? true : index === curPage).map((page, index) => (
                            <div className="page-container"
                                 key={ index }>{ page }</div>
                        ))
                    )
                }
            </div>
        );
    }
}
