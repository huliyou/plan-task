import React, { PropTypes } from 'react'
import { Icon, Switch, Col } from 'antd'
import styles from './Layout.less'
import {config} from '../../utils'
import Menus from './Menu'

function Sider ({ siderFold, darkTheme, location, changeTheme, navOpenKeys, changeOpenKeys }) {
  const menusProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div>
      <div className={styles.logo} style={{margin:'0px',background:'#000000'}}>
        <img alt={'logo'} src={config.imgURL+"/assets/cion/logo.png"} />
        {siderFold ? '' : <span>{config.logoText}</span>}
      </div>
      <div style={{height:'55px'}}>
      	<Col span={2}><div className={styles.imageBox}>
        <img className="avatar" src={config.imgURL+"/assets/u781.png"} alt="" />
        </div></Col>
      </div>
      <Menus {...menusProps} />
    </div>
  )
}

Sider.propTypes = {
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Sider
