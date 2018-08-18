import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import { Layout, Main, Content } from 'cozy-ui/react/Layout'

import FWB from './FWB/FWB'

const App = () => (
  <HashRouter>
    <Layout>
      <Main>
        <div data-cozy-token="{{.Token}}" data-cozy-domain="{{.Domain}}" />
        <Content className="app-content">
          <Switch>
            <Route path="/main" component={FWB} />
            <Redirect from="/" to="/main" />
            <Redirect from="*" to="/main" />
          </Switch>
        </Content>
      </Main>
    </Layout>
  </HashRouter>
)

export default App
