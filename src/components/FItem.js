/**
 * @author LiuYang
 * @description 主界面
 */
import React from 'react';
import Item from './Item.js';
import Util from '../util/util.js';
import { Button, Checkbox } from 'antd';

class FItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {display:"block"};
    }

    componentDidMount() {
       
    }

    componentWillUnmount() {
    }
    
    //json显示隐藏
    onItemDisplay(index){
        if(this.state[index]==undefined){
            this.state[index]=false;
        }else{
            this.state[index]=!this.state[index];
        }
        this.setState(this.state);
    }
    //添加json
    onAdd(item, index){
        this.props.obj[this.props.index][1].child.splice(index+1,0,item);
        this.props.that.setState(this.props.that.state);
    }
    //json层全选
    checkAll(item, e){
        Util.checkAll(item, e.target.checked);
        this.props.that.setState(this.props.that.state);
    }
    render() {
        return (
            <div>
                <Item level = {this.props.level} index={this.props.index} obj={this.props.obj} onDisplay={()=>{this.setState({display:this.state.display=="block"?"none":"block"})}} display={this.state.display} that={this.props.that}/>
                <div style={{display:this.state.display}}>
                    {this.props.obj[this.props.index][1].child.map((item, index)=>
                        <div key={index} >
                            <Button onClick={this.onItemDisplay.bind(this,index)} shape="circle" size="small"  style={{marginLeft:120+this.props.level*10}}>{"{}"}</Button>
                            {this.props.that.state.type=="addType"?<Checkbox checked={Util.isAllChecked(item)} indeterminate={Util.isChecked(item)} onChange={this.checkAll.bind(this, item)}/>:null}
                            {this.props.that.state.type=="addData"?<Button onClick={this.onAdd.bind(this, item, index)} icon="plus" type="primary" shape="circle" size="small" />:null}
                            <div style={{display:this.state[index]==undefined?"block":this.state[index]?"block":"none"}}>{Util.getItem(item, this.props.level, this.props.that, this.props.obj[this.props.index])}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default FItem;
