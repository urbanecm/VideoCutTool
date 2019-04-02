import React, { Component } from 'react';

import { Input, Typography, Layout, Upload, InputNumber, Icon, Col, Row, Button, Anchor } from 'antd';
import { Player } from 'video-react';

import './App.css';
import "antd/dist/antd.css";
import "../node_modules/video-react/dist/video-react.css"; // import css

const { Header, Content, Footer } = Layout;
const Search = Input.Search;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from_time: '',
      to_time: '',
      in_location: '',
      out_location: ''
    }
  }

  add(data){
    const existing = this.all;
    this.all = existing.concate(data);
  }
  addValues = (e) => {
    e.preventDefault();
    this.props.add({
      from_time: this.refs.from_time,
      to_time: this.refs.to_time,
      in_location: this.refs.in_location,
      out_location: this.refs.out_location,
    });

    this.refs.from_time.value=null;
    this.refs.to_time.value=null;
    this.refs.in_location.value=null;
    this.refs.out_location.value=null;
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submit = (e) => {
    e.preventDefault();
    console.log(from_time, to_time, in_location, out_location);
    // get form data out of state
    const { from_time, to_time, in_location, out_location } = this.state;

    fetch('http://localhost:4000/send' , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then((result) => result.json())
      .then((info) => { console.log(info);})
}

  render() {
    const { classes } = this.props;
    const { from_time, to_time, in_location, out_location } = this.state;
    return (
        <Layout className="layout">
          <Header>
            <Typography.Title level={2} style={{ color: 'white' }}> VideoCutTool</Typography.Title>
          </Header>
          <Content className='Content' style={{ padding: '50px 50px' }}>
            <Row gutter={16}>
              <Col span={16}>
                <div className="url">
                  <Input placeholder="Commons Video URL" addonAfter={<Icon type="import" />} />
                  <h2>Upload Commons Video link URL here</h2>
                  <br />
                  <Button type="primary">Submit</Button>
                </div>
                <br />
                <div className="video-palyer">
                <link rel="stylesheet" href="/css/video-react.css" />
                <Player playsInline poster="/assets/poster.png"
                  src="file:///home/gopavasanth/projects/video.mp4"
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
                <br />
                <Button type="primary">Trim</Button>
              </Col>
            </Row>
            <form>
              <br />
              <Typography.Text strong style={{paddingRight: '0.2rem'}}> Video file</Typography.Text>
              <input placeholder="00:00:00" ref="in_location" name="from_time" />
              <br />
              <Typography.Text strong style={{paddingRight: '0.2rem'}}>From</Typography.Text>
              <input placeholder="00:00:00" ref="from_time" name="to_time" />
              <br />
              <Typography.Text strong style={{paddingRight: '0.2rem'}}>To</Typography.Text>
              <input label="in_location" ref="to_time" />
              <br />
              <Typography.Text strong style={{paddingRight: '0.2rem'}}>OutLocation</Typography.Text>
              <input label="out_location" ref="out_location" />
              <br />
              <Button onClick={this.submit} onClick={this.addValues} color="primary">Register</Button>
            </form>
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
