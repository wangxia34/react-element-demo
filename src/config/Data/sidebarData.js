export const sidebarData = [
    {
        key: 'group0',
        icon: 'icon-shouye',
        text: '首页',
        component: "Home",
        path: '/home'
    },
    {
        key: 'group1',
        icon: 'icon-gushi',
        text: '基础表格',
        component: "Table",
        path: '/table'
    },
    {
        key: 'group2',
        icon: 'icon-shezhi1-copy',
        text: '图表',
        children: [
            {
                key: '1',
                text: 'chart图表',
                path: '/charts',
                component: 'Charts'
            },
            {
                key: '2',
                text: '声兮列表',
                path: '/topics',
                component: 'Topics'
            }
        ]
    },
    {
        key: 'group3',
        icon: 'icon-toutiao',
        text: '活动中心',
        children: [
            {
                key: '3',
                text: '消息中心',
                path: '/tabs',
                component: 'Tabs'
            }
            // {
            //     key: '4',
            //     text: '新建活动',
            //     path: '/active/add'
            // }
        ]
    },
    // {
    //     key: 'group3',
    //     icon: 'icon-fensi',
    //     text: 'APP管理',
    //     children: [
    //         {
    //             key: '16',
    //             text: '移动交互',
    //             path: '/appmanage/interaction'
    //         },
    //         {
    //             key: '17',
    //             text: '回声列表',
    //             path: '/test'
    //         },
    //         {
    //             key: '18',
    //             text: '用户列表',
    //             path: '/user/list'
    //         }
    //     ]
    // },
    // {
    //     key: 'group4',
    //     icon: 'icon-xiaoxi',
    //     text: '安全中心',
    //     children: [
    //         {
    //             key: '21',
    //             text: '举报处理',
    //             path: '/safety/report'
    //         },
    //         {
    //             key: '22',
    //             text: '广播中心',
    //             path: '/safety/broadcast'
    //         }
    //     ]
    // },
    // {
    //     key: 'group5',
    //     icon: 'icon-ren',
    //     text: '系统设置',
    //     children: [
    //         {
    //             key: '26',
    //             text: '个人设置',
    //             path: '/user/setting'
    //         },
    //         {
    //             key: '27',
    //             text: '用户列表',
    //             path: '/user/list'
    //         }
    //     ]
    // },
    // {
    //     key: 'group6',
    //     icon: 'icon-xiaoxishezhi',
    //     text: '平台设置',
    //     children: [
    //         {
    //             key: '31',
    //             text: '用户协议',
    //             path: '/platform/license'
    //         },
    //         {
    //             key: '32',
    //             text: '帮助中心',
    //             path: '/platform/help'
    //         }
    //     ]
    // }

];

export const getOneMenuInKey = function (key) {
    for (let i = 0; i < sidebarData.length; i++) {
        let item = sidebarData[i];
        if (item.key === key) {
            return item;
        } else if (item.children.length) {
            for (let j = 0; j < item.children.length; j++) {
                let value = item.children[j];
                if (value.key === key) {
                    return value;
                }
            }
        }
    }
    
    return false;
};

export const getOneMenuInPath = function (path) {
    let pathname = path;
    if (path === "/") {
        pathname = "/home"
    }
    for (let i = 0; i < sidebarData.length; i++) {
        const item = sidebarData[i];
        if (item.children) {
            for (let j = 0; j < item.children.length; j++) {
                const menuItem = item.children[j];
                if (menuItem.path === pathname) {
                    return menuItem;
                }
            }
        } else if (item.path && item.path === pathname) {
            return item;
        }
    }
    return {key: '-1', text: '登录', path: '/login'}
};

