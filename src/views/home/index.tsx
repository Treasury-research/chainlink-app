import React, { useState, useEffect } from 'react';
import './index.scss';
import Logo from '../../static/img/logo.png';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { routerConfig } from './../../router';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export default function Home() {

  const [routers, setRouters] = useState(routerConfig);

  const history = useHistory();

  useEffect(() => {
    setRouters((prev: any) => {
      if (history.location.pathname == '/home') {
        prev[0]['active'] = true;
        prev[0]['children'][0]['active'] = true;
      } else {
        prev.map((t: any, i: number) => {
          t.children.map((h: any, r: number) => {
            if (h.path === history.location.pathname) {
              prev[i]['active'] = true;
              prev[i]['children'][r]['active'] = true;
            }
          })
        })
      }
      return [...prev]
    })
  }, [history.location.pathname]);

  const menuClick = (i: number) => {
    setRouters((prev: any) => {
      prev.map((t: any, index: number) => {
        if (i !== index) t.active = false;
      })
      prev[i]['active'] = !prev[i]['active'];
      return [...prev]
    })
  };

  const menuSecondClick = (index: number, i: number) => {
    setRouters((prev: any) => {
      prev.map((t: any, y: number) => {
        t.children.map((h: any, r: number) => {
          h.active = false;
        })
      })
      prev[index]['children'][i]['active'] = true;
      return [...prev]
    })
    history.push(routers[index]['children'][i]['path']);
  };

  return (
    <div className="page-home">
      <div className="page-left-content">
        <div className="page-left-content-info">
          <div className="page-left-content-info-head">
            <img src={Logo} alt=""></img>
          </div>
          <div>
            <div className="page-left-content-info-name">
              Admin
            </div>
            <div className="page-left-content-info-email">
              admin
            </div>
          </div>
        </div>
        <div className="menu">
          {
            routers.map((item: any, index: number) =>
              <div key={index} className="menu-first">
                <div onClick={() => menuClick(index)} className={item.active && 'menu-first-active'}>
                  <div><div className="bac"></div><span>{item.name}</span></div>
                  <div className="icon-out">
                    {
                      item.active &&
                      <UpOutlined />
                    }
                    {
                      !item.active &&
                      <DownOutlined />
                    }
                  </div>
                </div>
                {
                  item.active &&
                  <div className="menu-second">
                    {
                      item.children.map((t: any, i: number) =>
                        <div key={i} className={t.active && 'menu-second-active'} onClick={() => menuSecondClick(index, i)}>{t.name}</div>
                      )
                    }
                  </div>
                }

              </div>
            )
          }
          {/* <div></div>
          <div></div>
          <div></div> */}
        </div>
      </div>
      <div className="page-right-content" key={history.location.key}>
        <Router>
          <Switch>
            {
              routers.map((item: any, index: number) =>
                item.children.map((t: any, i: number) =>
                  <Route path={t.path} component={t.component} key={`${index}${i}`} />
                )
              )
            }
            <Redirect to="/home/dashboard/instanceUsage" />
            {/* <Route path="/home/claim" component={Claim} />
            <Route path="/home/template" component={Template} />
            <Redirect to="/home/template" /> */}
          </Switch>
        </Router>
      </div>
    </div>
  );
}
