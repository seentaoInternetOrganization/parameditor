import React from 'react';
import { Button, Icon, Switch, Input, Select, Checkbox, Popover, Tag, Row, Col } from 'antd';
import config from '../config.json';
import Util from '../util/util.js';
const datatype = config.datatype;
const Option = Select.Option;

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.item = props.obj[props.index];
		this._key = this.item[0];
		this._value = this.item[1];
		this.haschild = this._value.child!=undefined;
		this._this = props.that;
        this.state = {backgroundColor:""};
        
    }
	
	// const _this = props.that;
	// const data = props.obj[props._key];
	// const itemkeys = Object.keys(data);
	// const haschild = itemkeys.indexOf("child")!=-1;
	// let keyName = "";//本地保存字段名
	// //修改key
	// const renameKey= ()=>{
	// 	props.obj[keyName]= props.obj[props._key];
	// 	delete props.obj[props._key];
	// 	_this.setState(_this.state);
	// }
	// //添加
	// const add = ()=>{
	// 	//TODO 重复元素校验
	// 	//转为数组
	// 	const array = Util.objToArray(props.obj);
	// 	//添加元素到指定位置
	// 	const index = Object.keys(props.obj).indexOf(props._key);
	// 	array.splice(index+1, 0, ["",{
 //                    "desc":"用户类型",
 //                    "type":"string",
 //                    "required":true,
 //                    "value":"教师",
 //                    "highlight":false
 //                }]);
	// 	//变为对象
	// 	console.log(Util.arrayToObj(array));
	// 	//填到key上
	// 	if(Object.keys(props.fobj).indexOf("testjson")==-1){
	// 		props.fobj["child"] = [Util.arrayToObj(array)];
	// 		_this.setState(_this.state);
	// 	}
	// }
	//添加元素
	add(){
		this.props.obj.splice(this.props.index+1, 0, ["", Util.getItemjson()]);
		console.log(this.props.index, this.props.obj);
		
		this._this.setState(this._this.state);
	}
	//去掉元素
	remove(){
		this.props.obj.splice(this.props.index, 1);
		//如果去掉最后一个元素则添加一条默认元素
		if(this.props.obj.length==0){
			this.props.obj.splice(0, 0, ["", Util.getItemjson()]);
		}
		this._this.setState(this._this.state);
	}
	//修改元素类型
	changeType(value){
		this.props.obj[this.props.index][1]["type"]=value;
		//修改为jsonArray json时自动添加child
		if(value=="jsonArray"||value=="json"){
			_value["child"]=[[["", Util.getItemjson()]]];
		}
		_this.setState(_this.state);
	}
	//addType选择字段
	changeChecked(e){
		const checked = e.target.checked;
		this._value["need"] = checked;
		//全选
		if(this.haschild){
			const child = this._value.child;
			for(let index of child.keys()){
				Util.checkAll(child[index], e.target.checked);
			}
		}
		this._this.setState(this._this.state);
	}
	isChecked(){
		let checked = false;
		if(this.haschild){
			const child = this._value.child;
			for(let index of child.keys()){
				if(Util.isChecked(child[index])){
					checked=true;
				}
			}
		}else{
			checked = this._value.need;
		}
		return checked;
	}
	//鼠标移入
	mouseOver(){
		// this.setState({backgroundColor:"#f9bdbb"});		
	}
	//鼠标移出
	mouseOut(){
		const backgroundColor = this._this.state.type=="compareData"&&this._value.highlight?"#f69988":"";
		// this.setState({backgroundColor: backgroundColor});
	}
	render() {
		// console.log(item);
		//addApi的页面元素
		const isAddApi= this._this.state.type=="addApi";
		const isAddType= this._this.state.type=="addType";
		const isCheckApi= this._this.state.type=="checkApi";
		const isAddData= this._this.state.type=="addData";
		const isCheckData= this._this.state.type=="checkData";
		const isCompareData= this._this.state.type=="compareData";
		const content = (
		  <div>
		    <Input disabled={!isAddApi} type="textarea" placeholder="字段描述" autosize onChange={(e)=>{this.props.obj[this.props.index][1]["desc"]=e.target.value;this._this.setState(this._this.state)}} value={this._value.desc}/>
		  </div>
		);
		const descInput = (
			<Popover content={content} trigger="hover">
				<Input disabled={!isAddApi} onChange={(e)=>{this.props.obj[this.props.index][1]["desc"]=e.target.value;this._this.setState(this._this.state)}} size="small" placeholder="字段描述" value={this._value.desc} style={{width: 65, marginLeft:10}}/> 
				{/*<Tag style={{width:60}}>{_value.desc}</Tag>*/}
			</Popover>
			);
		const addApiDom = (
				<Row type="flex" justify="start" style={{marginLeft:(this.props.level-1)*10}}>
					<Col span={2}>{this.haschild?<Button  onClick={this.props.onDisplay} shape="circle" icon={this.props.display=="block"?"up":"down"} size="small"/>:null}</Col>
					<Input onChange={(e)=>{this.props.obj[props.index][0]=e.target.value; this._this.setState(this._this.state)}}  style={{width:60}} size="small" placeholder="字段名" value={this._key} style={{width: 80}}/>
					<Select onChange={this.changeType.bind(this)} size="small" value={this._value.type==undefined?datatype[0]:this._value.type} style={{ width: 80, marginLeft:10, marginRight:10 }} >
						{datatype.map((item)=><Option key={item} value={item}>{item}</Option>)}
					</Select>
					 : 
					{descInput}
				</Row>
		);
		//其他的页面元素
		const otherDom = (
				<Row type="flex" justify="start" style={{marginLeft:(this.props.level-1)*10}} >
					<Col span={2}>{this.haschild?<Button  onClick={this.props.onDisplay} shape="circle" icon={this.props.display=="block"?"up":"down"} size="small"/>:null}</Col>
					<Col span={1}>{this.haschild? "[]":""}</Col>
					<div >
						{isAddType?<Checkbox checked={this.isChecked()} indeterminate={this.isChecked()} onChange={this.changeChecked.bind(this)}/>:null}
						<span>{this._key}</span>
						[{this._value.type}]
						 : 
						{isAddData&&!this.haschild?<Input onChange={(e)=>{this.props.obj[this.props.index][1]["value"]=e.target.value;this._this.setState(this._this.state)}} style={{width:120}} size="small" placeholder="值" value={this._value.value} style={{width: 80, marginLeft:10}}/> :isCheckData||isCompareData?<span style={{color:this._value.required?"#dd4a68":""}}>{this._value.value}</span>:descInput}
					</div>
				</Row>
		);
	  return (
	    
	  	<div style={{backgroundColor:this._this.state.type=="compareData"&&this._value.highlight?"#f69988":""}}>
	    <Row style={{backgroundColor:this.state.backgroundColor}} onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>
			<Col span={5} style={{float:"left"}}>
				<div style={{display:this._this.state.type=="addApi"?"block":"none"}}>
					<Button onClick={this.add.bind(this)} shape="circle" icon="plus" type="primary" size="small" />
					<Button onClick={this.remove.bind(this)} shape="circle" icon="delete" type="danger" size="small" />
					<Switch onChange={(value)=>{this.props.obj[this.props.index][1]["required"]=value;this._this.setState(this._this.state)}} checkedChildren={'必'} unCheckedChildren={'非'} checked={this._value.required}/>
				</div>
			</Col>

			<Col span={19} >
				{isAddApi?addApiDom:otherDom}
				

			</Col>
			{/*<div style={{backgroundColor:data.highlight?"#653627":"", marginTop:10}}>
			<div style={{float:"left", width:180}}>
				<Button onClick={()=>{add()}} shape="circle" icon="plus" type="primary" size="small" style={{marginLeft:10}}/>
				<Button onClick={()=>{delete props.obj[props._key];_this.setState(_this.state)}} shape="circle" icon="delete" type="danger" size="small" style={{marginLeft:10}}/>
				<Switch onChange={(value)=>{data["required"]=value;_this.setState(_this.state)}} checkedChildren={'必'} unCheckedChildren={'非'} checked={data.required} style={{marginLeft:10}}/>
				{haschild?<Button  onClick={props.onDisplay} style={{marginLeft:10}} shape="circle" icon={props.display=="block"?"up":"down"} size="small"/>:null}
			</div>
			<div style={{float:"left", marginLeft:30*props.level, width:500}}>
				<Input onChange={(e)=>{keyName = e.target.value}} onBlur={renameKey} style={{width:60}} size="small" placeholder="字段名" defaultValue={props._key} style={{width: 80, marginLeft:10}}/>
				<Select onChange={(value)=>{data["type"]=value;_this.setState(_this.state)}} size="small" value={data.type==undefined?datatype[0]:data.type} style={{ width: 80, marginLeft:10, marginRight:10 }} >
					{datatype.map((item)=><Option key={item} value={item}>{item}</Option>)}
				</Select>
				 : 
				<Input onChange={(e)=>{data["desc"]=e.target.value;_this.setState(_this.state)}} style={{width:120}} size="small" placeholder="字段描述" value={data.desc} style={{width: 80, marginLeft:10}}/> 
			</div>
			<br/>
	    </div>*/}
	    </Row>
	    </div>
	  );
	}
};

Item.propTypes = {
};

export default Item;
