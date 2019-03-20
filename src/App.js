import React, { Component } from 'react';

import { Input, Typography, Layout, Upload, InputNumber, Icon, Col, Row, Button, Anchor } from 'antd';
import { Player } from 'video-react';

import './App.css';
import "antd/dist/antd.css";
import "../node_modules/video-react/dist/video-react.css"; // import css

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
        <Layout className="layout">
          <Header>
            <Typography.Title level={2} style={{ color: 'white' }}> VideoCutTool</Typography.Title>
          </Header>
          <Content className='Content' style={{ padding: '50px 50px' }}>
            <Row gutter={16}>
              <Col span={16}>
                <div className="upolad">
                <link rel="stylesheet" href="/css/video-react.css" />
                <Player playsInline poster="/assets/poster.png"
                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
                </div>
              </Col>
              <Col span={8}>
                <h2>Video Trim Settings</h2>
                <Row gutter={10}>
                  <Col span={6}>
                    <Typography.Text strong style={{paddingRight: '0.2rem'}}>From</Typography.Text>
                    <Input placeholder="00:00:00" />
                  </Col>
                  <Col span={6}>
                    <Typography.Text strong style={{paddingRight: '0.2rem'}}>To</Typography.Text>
                    <Input placeholder="00:00:00" />
                  </Col>
                </Row>
                <h2></h2>
                <Button type="primary">Trim</Button>
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
             © 2018 <a href="https://www.mediawiki.org/wiki/User:Gopavasanth"><span> Gopa Vasanth </span></a> |
            <a href="https://github.com/gopavasanth/VideoCutTool"><span> Github </span></a>
          </Footer>
        </Layout>
    );
  }
}

export default App;
