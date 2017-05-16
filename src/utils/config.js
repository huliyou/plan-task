import React, { PropTypes } from 'react'
import {Select } from 'antd'
const Option = Select.Option;
module.exports = {
  name: '信息化建设现场管理系统',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin 版权所有 © 2016 由 zuiidea 支持',
//  logoSrc: '../src/img/cion/logo.jpg',//wangpeng   废除绝对路径访问方式+文件图片集中统一管理，删除多余位置的图片
  logoText: '信息化建设现场管理系统',
  needLogin: true,
  iconFontUrl: '//at.alicdn.com/t/font_c4y7asse3q1cq5mi.js',
  imgURL: '/TRDP/csm_page',
  baseURL: 'http://127.0.0.1:9000/TRDP',
//  baseURL: 'http://192.168.65.159:8180/TRDP',
  crossDomains: [
    'http://www.zuimeitianqi.com',
  ],

   buildDict(name,dictItems){
    const children = [];
    dictItems.map((item,index)=>{
      if(item.name==name){
        for (let i = 0; i < item.values.length; i++) {
          let _item =  item.values[i];
          children.push(<Option key={_item.value} value={_item.value} searchValue={_item.text} >{_item.text}</Option>);
        }
      }
    })
    return children;
  }
}
