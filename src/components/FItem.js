/**
 * @author LiuYang
 * @description 主界面
 */
import React from 'react';
import Item from './Item.js';
import Util from '../util/util.js';

class FItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {display:"block"};
    }

    componentDidMount() {
       
    }

    componentWillUnmount() {
    }
    
    
    render() {
        return (
            <div>
                <Item level = {this.props.level} index={this.props.index} obj={this.props.obj} onDisplay={()=>{this.setState({display:this.state.display=="block"?"none":"block"})}} display={this.state.display} that={this.props.that}/>
                <div style={{display:this.state.display}}>
                    {this.props.obj[this.props.index][1].child.map((item)=>Util.getItem(item, this.props.level, this.props.that, this.props.obj[this.props.index]))}
                </div>
            </div>
        );
    }
}

export default FItem;
