/**
 * title: Github Trending using umi ssr
 */
import { Avatar, Button, Icon, List, Tag } from 'antd';
import React from 'react';
import styled from "styled-components";
import fetch from 'umi-request';
import styles from './index.less';



let Test = styled.div`
font-weight:bold;
`
function Page(props) {
  const { data } = props;

  return (
    <div className={styles.normal}>
      <Button href="/" type="primary">
        全部
      </Button>
      <Test>Bold text</Test>
      <h1>Github Trending Koa.js</h1>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <p className={styles.title}>
                  <a target="_blank" rel="noopener noreferrer" href={item.url}>
                    {item.name}
                  </a>
                  <Tag style={{ marginRight: 8 }} color={item.languageColor}>
                    <a href={`/?language=${item.language}`}>{item.language}</a>
                  </Tag>
                  <span className={styles.star}>
                    <Icon theme="filled" type="star" />
                    {item.stars}
                  </span>
                </p>
              }
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

Page.getInitialProps = async ({ store, route, isServer, req, location }) => {
  const res = await fetch(`https://github-trending-api.now.sh/repositories${req.url || ''}`);
  return {
    data: res,
  };
};

export default Page;
