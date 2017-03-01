var mData = {};
var mRoot = "liuyang";
var mType = "addApi";
var mCallback = function(mDataChanged){

}
function ParamEditor(){

}
ParamEditor.prototype.setDom=function(data, type, elementId, callback){
  mData = data;
  mRoot = elementId;
  mType = type;
  mCallback = callback;

}