import React from 'react';
import { TimelineLite } from 'greensock';
import { connect } from 'react-redux';
import {
    closeModal,
    leavingAnimationStart,
    leavingAnimationFinish
} from '../actions/modal';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.enter = new TimelineLite();
        this.leave = new TimelineLite();
        this.onEnter = this.onEnter.bind(this);
        this.onLeave = this.onLeave.bind(this);
    }
    onEnter = () => {
        document.body.style.overflow = 'hidden';
        this.enter
            .set(this.modalBackground, { display: 'block', opacity: 0 })
            .to(this.modalBackground, 0.3, { opacity: 1 })
    }
    onLeave = () => {
        if (!this.props.modal.isLeaving) {
            this.props.leavingAnimationStart();
            this.leave
                .to(this.modalBackground, 0.3, { opacity: 0 })
                .set(this.modalBackground, { display: 'none' })
                .call(() => {
                    this.props.leavingAnimationFinish();
                    document.body.style.overflow = 'unset';
                })
        }
    }
    shouldComponentUpdate = (nextProps) => {
        if (nextProps.modal.isOpen !== this.props.modal.isOpen || nextProps.children !== this.props.children) {
            return true;
        }
        return false;
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.modal.isOpen !== this.props.modal.isOpen) {
            if (this.props.modal.isOpen) {
                this.onEnter();
            } else {
                this.onLeave();
            }
        }
    }
    render = () => {
        return (<div className='modal-background' ref={div => this.modalBackground = div}>
                {this.props.children}
                <button className='close' onClick={this.props.closeModal}><div className='arrow-left'/></button>
        </div>
        )
    }
}
const mapStateToProps = (state) => ({
    modal: state.modal
})
const mapDispatchToProps = {
    closeModal,
    leavingAnimationStart,
    leavingAnimationFinish
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);