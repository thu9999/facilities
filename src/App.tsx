import React, { useState, Suspense, lazy } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, useHistory, withRouter, Redirect  } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AppstoreOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

import avatar from './images/avatar.png';
import { AppMenu, AppRoute } from './interfaces';

const { Header, Sider, Content } = Layout;

const routes: AppRoute[] = [
    {
        id: 1,
        path: '/facility',
        title: 'Facility',
        component: lazy(() => import('./facility/Facility'))
    },
    {
        id: 2,
        path: '/schedule',
        title: 'Schedule',
        component: lazy(() => import('./schedule/Schedule'))
    },
];

const menus: AppMenu[] = [
    {
        id: 1,
        title: 'FACILITY',
        route: 'facility',
        icon: <AppstoreOutlined />
    },
    {
        id: 2,
        title: 'SCHEDULE',
        route: 'schedule',
        icon: <CalendarOutlined />
    }
];



function App() {

    // Toggle menu status
    const [collapsed, setCollapsed] = useState(true);

    let history = useHistory();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} className='' style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
                
                <div className='avatar'>
                    <img src={avatar} alt='avatar'/>
                </div>

                <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
                    {menus ? menus.map(menu => <Menu.Item key={menu.id} icon={menu.icon} onClick={() => {
                        history.push(menu.route)
                    }}>{menu.title}</Menu.Item>) : false}
                </Menu>

            </Sider>

            <Layout className='site-layout' style={collapsed ? {marginLeft: 80} : {marginLeft: 200}}>

                <Header className='site-layout-background' style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(current => !current)
                    })}
                </Header>

                <Content className='site-layout-background main-content'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            {routes ? routes.map(route =><Route key={route.id} path={route.path} component={route.component} />) : false}
                        </Switch>

                        <Redirect exact from='/' to='/facility' />
                    </Suspense>
                </Content>

            </Layout>
        </Layout>
    );
}

const AppWithRouter = withRouter(App);

export const AppContainer = () => {
    return (
        <Router>
            <AppWithRouter />
        </Router>
    )
};

export default AppContainer;
