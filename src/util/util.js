'use strict';
/**
 * Get the type of an object
 * @param {*} object
 * @return {String} type
 */
exports.type = function type (object) {
  if (object === null) {
    return 'null';
  }
  if (object === undefined) {
    return 'undefined';
  }
  if ((object instanceof Number) || (typeof object === 'number')) {
    return 'number';
  }
  if ((object instanceof String) || (typeof object === 'string')) {
    return 'string';
  }
  if ((object instanceof Boolean) || (typeof object === 'boolean')) {
    return 'boolean';
  }
  if ((object instanceof RegExp) || (typeof object === 'regexp')) {
    return 'regexp';
  }
  if (exports.isArray(object)) {
    return 'array';
  }

  return 'object';
};
exports.getTestjson = function () {
    const testjson = require('../test.json');
    return testjson;
};
exports.getItemjson = function () {
    const itemjson = require('../item.json');
    return {
      "desc":"",
      "type":"string",
      "required":true,
      "value":"",
      "highlight":false
    };
};
/**
 * [isChecked 是否有选中元素]
 * @return {[boolean]} [description]
 */
exports.isChecked = function (item) {
    let checked = false;
        for(let key of item.keys()){
            if(item[key][1].need)
                checked = true;
        }
        return checked;
};
/**
 * [isAllChecked 是否全选中元素]
 * @return {[boolean]} [description]
 */
exports.isAllChecked = function (item) {
    let checked = false;
        for(let key of item.keys()){
            if(!item[key][1].need){
                return false;
            }else{
                checked = true;
            }
        }
        return checked;
};
/**
 * [checkAll 全选中元素]
 */
exports.checkAll = function (item, checked) {
    for(let key of item.keys()){
            item[key][1]["need"]=checked;
        }
};

/**
 * [objToArray 对象转为数组]
 * @param  {[type]} obj [对象]
 * @return {[type]}     [数组]
 */
exports.objToArray = function objToArray(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    if(obj[k].child!=undefined){
      for(let index of obj[k].child.keys()){
        obj[k].child[index]=this.objToArray(obj[k].child[index]);
      }
    }
      strMap.set(k, obj[k]);
    
  }
  return [...strMap];
}
/**
 * [arrayToObj 数组转为对象]
 * @param  {[type]} obj [数组]
 * @return {[type]}     [对象]
 */
exports.arrayToObj = function arrayToObj(array) {
  let strMap = new Map(array);
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}
/**
 * Tes whether given object is an Array
 * @param {*} obj
 * @returns {boolean} returns true when obj is an array
 */
exports.isArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};
/**
 *按类型获取Item, FItem
 */
import Item from '../components/Item.js';
import FItem from '../components/FItem.js';
import React from 'react';
import { Button, Row } from 'antd';

exports.getItem = function getItem (objArray, level, _this, fobj) {
  level++;
  return  <div >
            
      {objArray.map((item, index)=>{
        if(item[1].child!=undefined){
            return <FItem key={index} level = {level} index={index} obj={objArray} that={_this}/>;
        }else{
            return <Item  key={index} level = {level} index={index} obj={objArray} that={_this}/>;
        }
      })}</div>;
  /*const keys = Object.keys(obj);
  let i = 0;
  level++;
  return keys.map((item)=>{
      const itemkeys = Object.keys(obj[item]);
      i++;
      //数据为obj[item]
      if(itemkeys.indexOf('child')!=-1){
          //折叠
          return <FItem key={item} level = {level} _key={item} obj={obj} fobj={fobj} that={_this}/>;
      }else{
          //Item 
          return <Item  key={item} level = {level} _key={item} obj={obj} fobj={fobj} that={_this}/>;
      }
    })*/
};