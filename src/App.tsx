import React, { useState } from "react";
import "./App.scss";
import AppRoute from "./routes/Route";
import { Provider } from "mobx-react";
import { CommonStore } from "@/store/common";
import { PreloadImage } from "@/components/PreloadImage";
import { createUpdateState } from "@/core/util";
import { BgMusic } from "@/components/BgMusic";

export interface Stores {
    commonStore: CommonStore,
}

export const stores: Readonly<Stores> = {
    commonStore: new CommonStore(),
};

function App() {
    const [state, setState] = useState({
        isPreloadComplete: false
    });

    const updateState = createUpdateState(setState);

    const handleComplete = () => {
        updateState({
            isPreloadComplete: true
        });
    };
    return (
        <Provider stores={ stores }>
            <div className="App">
                <BgMusic src={'https://www.w3school.com.cn/i/horse.ogg'} />
                {
                    !state.isPreloadComplete ?
                        <PreloadImage
                            loadingTips='当前加载进度为${progress}%'
                            bgColor={'#40a9ff'}
                            imgs={ window.imgPreloadArr }
                            onComplete={ () => handleComplete() }
                        /> :
                        <AppRoute/>
                }
            </div>
        </Provider>
    );
}

export default App;
