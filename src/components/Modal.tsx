import React, { ReactNode } from "react";
import { BaseComponent, BaseComponentProps } from "@/components/BaseComponent";
import { stores as globalStores } from "../App";


import "./Modal.scss";

export interface ModalProps extends BaseComponentProps {
    visible: boolean,
    showClose?: boolean,
    clickMask2close?: boolean,
    closeBtn?: ReactNode,
    onClose: () => void
}

export interface ModalState {
    isShowing: boolean,
}

const maskRef = React.createRef<HTMLDivElement>();
const contentRef = React.createRef<HTMLDivElement>();

export class Modal extends BaseComponent<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props, props.stores || globalStores);
        this.state = {
            isShowing: false
        };
    }

    private handleClose(): void {
        this.props.onClose && this.props.onClose();
    }

    componentWillReceiveProps(nextProps: Readonly<ModalProps>, nextContext: any): void {
        if (nextProps.visible) {
            document.body.classList.add('hidden')
        }else {
            if(nextProps.visible!==this.props.visible){
                maskRef.current?.classList.add('out');
                contentRef.current?.classList.add('out');
                this.setState({
                    isShowing: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            isShowing: false
                        })
                    }, 500);
                    document.body.classList.remove('hidden');
                });
            }

        }
    }

    render() {
        const {
            showClose = true,
            clickMask2close = false,
            closeBtn,
            visible
        } = this.props;
        if (!visible&&!this.state.isShowing) {
            return null;
        }
        return (
            <div
                className="modal-container"
            >
                <div
                    ref={maskRef}
                    className="mask"
                    onClick={ () => {
                        if (clickMask2close) {
                            this.handleClose();
                        }
                    } }
                />
                <div
                    ref={contentRef}
                    className="content-box"
                >
                    { this.props.children }
                    { showClose && (
                        <div className="close"
                             onClick={ () => this.handleClose() }>
                            { closeBtn }
                        </div>
                    ) }
                </div>
            </div>
        );
    }
}
