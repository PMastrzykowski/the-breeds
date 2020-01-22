import React from 'react';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }
    toggleSelect = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }
    chooseOption = (index) => {
        this.setState({
            isOpen: false
        }, () => {
            this.props.onChange(index + 1)
        });
    }
    render = () => {
        return (<>
            <div className='custom-select'>
                <div
                    className='custom-select-button'
                    onClick={this.toggleSelect}
                >{this.props.selected}
                <div className='custom-select-button-icon'/>
                </div>
                {this.state.isOpen && <>
                <div className='expandable-close'
                    onClick={this.toggleSelect}/>
                <div className='expandable'>{Array.from(Array(10), (x, index) => <div key={index} className='option' onClick={() => this.chooseOption(index)}>{index + 1}</div>)}</div></>}
            </div>
        </>
        )
    }
}
export default Select;