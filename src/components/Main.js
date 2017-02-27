/**
 * @author LiuYang
 * @description 主界面
 */
import React from 'react';
import testjson from '../test.json';
import config from '../config.json';
import Item from './Item.js';
import { Menu, Dropdown, Icon } from 'antd';
import Util from '../util/util.js';

class Main extends React.Component {
    constructor(props) {
        super(props);
        //外部传入：1，json数据；2，编辑器类型（a新增接口a1新增查询类型b查看接口c新增数据d查看数据e查看返回值）
        this.state = {
            testjson:Util.objToArray(Util.getTestjson()),
            type:"addApi"
        };
    }
   
    componentDidMount() {
       
    }

    componentWillUnmount() {
    }
    onClick({key}){
        this.setState({type:key});
    }
    render() {

        const menu = <Menu onClick={this.onClick.bind(this)}>{config.type.map((item)=><Menu.Item key={item}>{item}</Menu.Item>)}</Menu>
        return (
            <div style={{width:480, height:320, overflowY:"auto", borderWidth:1, borderColor:"#F4A460", borderStyle:"solid", fontFamily:"droid sans mono, consolas, monospace, courier new, courier, sans-serif", fontWeight: "bold"}}>
                <div style={{width:478, height:20, backgroundColor:"#F4A460", position:"absolute", zIndex:9, marginTop:0, marginLeft:0}}></div>
                <div style={{marginTop:20, marginLeft:10}}>
                <Dropdown overlay={menu} >
                    <a className="ant-dropdown-link" href="#">
                      {this.state.type}<Icon type="down" />
                    </a>
                </Dropdown>
                {Util.getItem(this.state.testjson, 0, this, this.state)}
                </div>
            </div>
        );
    }
}

export default Main;
