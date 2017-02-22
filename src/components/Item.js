import React from 'react';
import { Button, Icon, Switch, Input, Select, Checkbox } from 'antd';
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
			props.obj[props.index][1]["child"]=[[["", Util.getItemjson()]]]
		}
		_this.setState(_this.state);
	}
	//addApi的页面元素
	const isAddApi= _this.state.type=="addApi";
	const isAddType= _this.state.type=="addType";
	const isCheckApi= _this.state.type=="checkApi";
	const isAddData= _this.state.type=="addData";
	const isCheckData= _this.state.type=="checkData";
	const isCompareData= _this.state.type=="compareData";
	const addApiDom = (
			<div style={{float:"right"}}>
				{haschild?<Button  onClick={props.onDisplay} style={{marginLeft:10}} shape="circle" icon={props.display=="block"?"up":"down"} size="small"/>:null}
				<Input onChange={(e)=>{props.obj[props.index][0]=e.target.value; _this.setState(_this.state)}}  style={{width:60}} size="small" placeholder="字段名" value={_key} style={{width: 80, marginLeft:10}}/>
				<Select onChange={changeType} size="small" value={_value.type==undefined?datatype[0]:_value.type} style={{ width: 80, marginLeft:10, marginRight:10 }} >
					{datatype.map((item)=><Option key={item} value={item}>{item}</Option>)}
				</Select>
				 : 
				<Input onChange={(e)=>{props.obj[props.index][1]["desc"]=e.target.value;_this.setState(_this.state)}} style={{width:120}} size="small" placeholder="字段描述" value={_value.desc} style={{width: 80, marginLeft:10}}/> 
			</div>
	);
	//其他的页面元素
	const otherDom = (
			<div style={{float:"right"}}>
				{haschild?<Button  onClick={props.onDisplay} style={{marginLeft:10, float:"left"}} shape="circle" icon={props.display=="block"?"up":"down"} size="small"/>:null}
				<div style={{float:"left",width:220}}>
					<span style={{width: 80, marginLeft:10}}>{_key}</span>
					[{_value.type}]
					 : 
					{isAddData&&!haschild?<Input onChange={(e)=>{props.obj[props.index][1]["value"]=e.target.value;_this.setState(_this.state)}} style={{width:120}} size="small" placeholder="值" value={_value.value} style={{width: 80, marginLeft:10}}/> :isCheckData||isCompareData?<span style={{color:_value.required?"#dd4a68":""}}>{_value.value}</span>:_value.desc}
				</div>
			</div>
	);
  return (
    

    <div style={{backgroundColor:isCompareData&&_value.highlight?"#f9bdbb":"", marginTop:10}}>
		<div style={{float:"left"}}>
			<div style={{display:_this.state.type=="addApi"?"block":"none"}}>
				<Button onClick={add} shape="circle" icon="plus" type="primary" size="small" style={{marginLeft:10}}/>
				<Button onClick={remove} shape="circle" icon="delete" type="danger" size="small" style={{marginLeft:10}}/>
				<Switch onChange={(value)=>{props.obj[props.index][1]["required"]=value;_this.setState(_this.state)}} checkedChildren={'必'} unCheckedChildren={'非'} checked={_value.required} style={{marginLeft:10}}/>
			</div>
		</div>

		<div style={{float:"left", marginLeft:20*(props.level-1), width:320}}>
			{isAddApi?addApiDom:otherDom}
			

		</div>
		<br/>
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
    </div>
  );
};

Item.propTypes = {
};

export default Item;
