import './App.css'

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar';

export class App extends Component {
  pageSize = 9;
  apiKey = process.env.REACT_APP_NEWS_API;

  state = {
    progress : 0
  }

  setProgress = (progress)=>{
      this.setState({progress : progress})
  }

  render() {
    return (
      <div>
        <Router>
      <Navbar/>
 
      <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
       
      />
      <Routes>
        <Route exact  path='/' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="general" pageSize = {this.pageSize} country = {'in'} category= {"general"}/>}> </Route>
       
        <Route exact  path='/Business' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="business" pageSize = {this.pageSize} country = {'in'} category= {"business"}/>}> </Route>
        <Route exact  path='/Sports' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="sports" pageSize = {this.pageSize} country = {'in'} category= {"sports"}/>}> </Route>
        <Route exact  path='/Technology' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="technology" pageSize = {this.pageSize} country = {'in'} category= {"technology"}/>}> </Route>
        <Route exact path='/Science' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="science" pageSize = {this.pageSize} country = {'in'} category= {"science"}/>}> </Route>
        <Route exact path='/Entertainment' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="entertainment" pageSize = {this.pageSize} country = {'in'} category= {"entertainment"}/>}> </Route>
        <Route exact path='/Health' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="health" pageSize = {this.pageSize} country = {'in'} category= {"health"}/>}> </Route>
      </Routes>
      
      </Router>
      </div>
    )
  }
}

export default App
