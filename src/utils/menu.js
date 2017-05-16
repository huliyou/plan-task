module.exports = [
  {
	key:'homepage',
    name:'主页',
    icon:'search',
  }, 
  {
    key: 'dashboard',
    name: '工作台',
    icon: 'laptop',
    child:[
           {
            key:'maintain',
            name:'工作台维护',
            icon:'user',
           },
          ]
  },
  {
    key: 'probmgr',
    name: '问题管理首页',
    icon: 'user',
  },
  // {
  //   key: 'prob_detail',
  //   name: '问题详情',
  //   icon: 'user',
  //   child:[
  //      {
  //       key:'to_commit',
  //       name:'待提交',
  //       icon:'user',
  //      },
  //      {
  //       key:'to_process',
  //       name:'待处理',
  //       icon:'user',
  //      },
  //      {
  //       key:'in_process',
  //       name:'处理中',
  //       icon:'user',
  //      }, 
  //      {
  //       key:'to_close',
  //       name:'待关闭',
  //       icon:'user',
  //      },
  //      {
  //       key:'already',
  //       name:'已编制',
  //       icon:'user',
  //      }, 
  //   ]
  // },
  {
    key: 'person',
    name: '人员队伍',
    icon: 'user',
    child:[
       {
        key:'person1',
        name:'项目队伍组建',
        icon:'search',
       }, 
       {
        key:'person2',
        name:'考勤管理',
        icon:'search',
       },
    ]
  },  
  {
    key: 'probs',
    name: '问题沟通',
    icon: 'camera-o',
    clickable: false,
    child: [
      {
        key: 'communicate',
        name: '我创建的',
        icon: 'heart-o',
      },
      {
        key: 'responsible',
        name: '我负责的',
        icon: 'database',
      },
      {
        key: '',  
        name: '沟通互动',
        icon: 'bars',
      },
      {
        key: 'probs7',
        name: '问题统计',
        icon: 'search',
      },
    ],
  },
   /**
   * wxj，任务计划，菜单配置
   */
  {
    key: 'procs',
    name: '任务计划',
    icon: 'camera-o',
    child: [
      {
        key: 'proc',
        name: '任务计划',
        icon: 'heart-o',
      },
      {
        key: 'planView',
        name: '计划全景',
        icon: 'heart-o',
      },
      {
        key: 'myDuty',
        name: '我负责的',
        icon: 'database',
      },
      {
        key: 'myCheck',
        name: '我审核的',
        icon: 'bars',
      },
      {
        key: 'taskWeeky',
        name: '任务周报',
        icon: 'search',
      },
    ],
  },
  {
    key: 'knowledge',
    name: '知识共享',
    icon: 'code-o',
    child: [
      {
        key: 'knowledge1',
        name: '知识首页',
        icon: 'line-chart',
      },
      {
        key: 'knowledge2',
        name: '我的知识库',
        icon: 'bar-chart',
      },
    ],
  },
  
  {
      key: 'systemconf',
      name: '系统配置',
      icon: 'setting',
      child: [
        {
          key: 'templetconf',
          name: '计划模板',
          icon: 'calendar',
        },
        {
	        key: 'problemtype',
	        name: '问题分类配置',
	        icon: 'calendar',
        },
      ],
    },
 ]
