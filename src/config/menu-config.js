module.exports = [{
    name: '商城管理',
    icon:'el-icon-s-shop',
    id: 'basic',
    sub: [{
      name: '增加分类',
      componentName: '/categories/Edit'
    }, {
      name: '分类列表',
      componentName: '/categores/List'
    },
    {
        name: '上架商品',
        componentName: '/commodities/Add'
    },{
        name:'商品列表',
        componentName:'/commoditites/List'
    },{
        name:'已下架的商品',
        componentName:'/commoditites/downList'
    }]
  }, {
    name: '佣金管理',
    id: 'money',
    icon:'el-icon-money',
    sub: [{
      name: '修改佣金比例',
      componentName: 'BasicRadio'
    }]
  }, {
    name: '团长管理',
    id: 'headers',
    icon:'el-icon-user',
    sub: [{
      name: '团长审核',
      componentName: '/header/list'
    },{
        name: '团长列表',
        componentName: '/header/isheaderList'
      },
      {
        name: '团长订单',
        componentName: '/header/headerOrder'
      }
    ]
  },
  {
    name: '系统管理',
    icon:'el-icon-setting',
    id: 'system',
    sub: [{
      name: '资金管理',
      componentName: '/header/list'
    },{
        name: '账单流水',
        componentName: '/header/isheaderList'
      },
      {
        name: '系统管理员管理',
        componentName: '/header/isheaderOrder'
      }
    ]
  },
  {
    name: '订单检索',
    icon:'el-icon-setting',
    id: 'orderSearch',
    sub: [{
      name: '订单查询',
      componentName: '/orderSearch/list'
    }
    ]
  }
]
  