import React from 'react';
import { Button, Icon, Switch, Input, Select, Checkbox, Popover, Row, Col } from 'antd';
import config from '../config.json';
import Util from '../util/util.js';
const datatype = config.datatype;
const Option = Select.Option;
const Item = (props) => {
	const item = props.obj[props.index];
	const _key = item[0];
	const _value = item[1];
	const haschild = _value.child!=undefined;
	const _this = props.that;
	//添加元素
	const add = ()=>{
		props.obj.splice(props.index+1, 0, ["", Util.getItemjson()]);
		_this.setState(_this.state);
	}
	//去掉元素
	const remove = ()=>{
		props.obj.splice(props.index, 1);
		//如果去掉最后一个元素则添加一条默认元素
		console.log(props.obj.length);
		if(props.obj.length==0){
			props.obj.splice(0, 0, ["", Util.getItemjson()]);
		}
		_this.setState(_this.state);
	}
	//修改元素类型
	const changeType = (value)=>{
		props.obj[props.index][1]["type"]=value;
		//修改为jsonArray json时自动添加child
		if(value=="jsonArray"||value=="json"){
			_value["child"]=[[["", Util.getItemjson()]]];
		}
		_this.setState(_this.state);
	}
	//addType选择字段
	const changeChecked = (e)=>{
		const checked = e.target.checked;
		_value["need"] = checked;
		//全选
		if(haschild){
			const child = _value.child;
			for(let index of child.keys()){
				Util.checkAll(child[index], e.target.checked);
			}
		}
		_this.setState(_this.state);
	}
	const isChecked = ()=>{
		let checked = false;
		if(haschild){
			const child = _value.child;
			for(let index of child.keys()){
				if(Util.isChecked(child[index])){
					checked=true;
				}
			}
		}else{
			checked = _value.need;
		}
		return checked;
	}
	let backgroundColor = isCompareData&&_value.highlight?"#f9bdbb":"";
	//鼠标移入
	const mouseOver = ()=>{
		backgroundColor = "#f9bdbb";
	}
	//鼠标移出
	const mouseOut = ()=>{
		backgroundColor = isCompareData&&_value.highlight?"#f69988":"";;
	}

	//addApi的页面元素
	const isAddApi= _this.state.type=="addApi";
	const isAddType= _this.state.type=="addType";
	const isCheckApi= _this.state.type=="checkApi";
	const isAddData= _this.state.type=="addData";
	const isCheckData= _this.state.type=="checkData";
	const isCompareData= _this.state.type=="compareData";
	const content = (
		  <div>
		    <Input disabled={!isAddApi} type="textarea" placeholder="字段描述" autosize onChange={(e)=>{props.obj[props.index][1]["desc"]=e.target.value;_this.setState(_this.state)}} value={_value.desc}/>
		  </div>
		);
	const descInput = (
		<Popover content={content} trigger="hover">
			<Input disabled={!isAddApi} onChange={(e)=>{props.obj[props.index][1]["desc"]=e.target.value;_this.setState(_this.state)}} size="small" placeholder="字段描述" value={_value.desc} style={{width: 65, marginLeft:10}}/>
			{/*<Tag style={{width:60}}>{_value.desc}</Tag>*/}
		</Popover>
		);
	const addApiDom = (
			<Row type="flex" justify="start" style={{marginLeft:(props.level-1)*10}}>
				<Col span={2}>{haschild?<Button  onClick={props.onDisplay} shape="circle" icon={props.display=="block"?"up":"down"} size="small"/>:null}</Col>
				<Input onChange={(e)=>{props.obj[props.index][0]=e.target.value; _this.setState(_this.state)}}  style={{width:60}} size="small" placeholder="字段名" value={_key} style={{width: 80}}/>
				<Select onChange={changeType} size="small" value={_value.type==undefined?datatype[0]:_value.type} style={{ width: 80, marginLeft:10, marginRight:10 }} >
					{datatype.map((item)=><Option key={item} value={item}>{item}</Option>)}
				</Select>
				 :
				{descInput}
			</Row>
	);
	//其他的页面元素
	const otherDom = (
			<Row type="flex" justify="start" style={{marginLeft:(props.level-1)*10}} >
				<Col span={2}>{haschild?<Button  onClick={props.onDisplay} shape="circle" icon={props.display=="block"?"up":"down"} size="small"/>:null}</Col>
				<Col span={1}>{haschild? "[]":""}</Col>
				<div style={{float:"left"}}>
					{isAddType?<Checkbox checked={isChecked()} indeterminate={isChecked()} onChange={changeChecked}/>:null}
					<span>{_key}</span>
					[{_value.type}]
					 :
					{isAddData&&!haschild?<Input onChange={(e)=>{props.obj[props.index][1]["value"]=e.target.value;_this.setState(_this.state)}} style={{width:120}} size="small" placeholder="值" value={_value.value} style={{width: 80, marginLeft:10}}/> :isCheckData||isCompareData?<span style={{color:_value.required?"#dd4a68":""}}>{_value.value}</span>:descInput}
				</div>
			</Row>
	);
  return (


    <Row style={{backgroundColor:backgroundColor}} onMouseOver={mouseOver} onMouseOut={mouseOut}>
			<Col span={5} style={{float:"left"}}>
				<div style={{display:_this.state.type=="addApi"?"block":"none"}}>
					<Button onClick={add} shape="circle" icon="plus" type="primary" size="small" />
					<Button onClick={remove} shape="circle" icon="delete" type="danger" size="small" />
					<Switch onChange={(value)=>{props.obj[props.index][1]["required"]=value;_this.setState(_this.state)}} checkedChildren={'必'} unCheckedChildren={'非'} checked={_value.required}/>
				</div>
			</Col>

			<Col span={19} >
				{isAddApi?addApiDom:otherDom}


			</Col>
    </Row>
  );
};

Item.propTypes = {
};

export default Item;
