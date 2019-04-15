import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import styled from 'styled-components'
import { Provider } from 'mobx-react'
import stores from './stores'

import Header from './components/Header'
import Footer from './components/Footer'
import Join from './components/routers/Join'
import Main from './components/routers/Main'

export default class App extends React.Component {

    render() {
        return (
            <Provider {...stores}>
                <Router>
                    <Layout>
                        <Header />
                        <div id="body">
                            <Route exact path='/' component={Join}/>
                            <Route path='/main' component={Main}/>
                            
                        </div>
                        <Footer />
                    </Layout>
                </Router>
            </Provider>
        );
    }
}

const Layout = styled.div`

`
