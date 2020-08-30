import React, {useEffect, useState} from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'

import Container from './containers/Container'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './containers/Home'
import Profile from './containers/Profile'
import NewPost from './containers/NewPost'
import Admin from './Admin'
import Post from './containers/Post'
import Blog from './containers/Blog'


const Router = () => {

    const [current, setCurrent] = useState('home')
    
    useEffect(() => {
        window.addEventListener('hashchange', setRoute)
        return () => window.removeEventListener('hashchange', setRoute)
    })

    function setRoute() {
        const location = window.location.href.split('/')
        const pathname = location[location.length-1]
        setCurrent(pathname ?  pathname : 'home')
    }
    return (
        <HashRouter>
            <Nav current={current} />
            <Container>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/profile' component={Profile}/>
                    <Route exact path='/new_post' component={NewPost}/>
                    <Route exact path='/:postID/edit' component={NewPost}/>
                    <Route exact path='/admin' component={Admin}/>
                    <Route exact path='/:id' component={Post}/>
                    <Route exact path='/blog/:userID' component={Blog}/>

                </Switch>
            </Container>
            <Footer />
        </HashRouter>
    )
}

export default Router