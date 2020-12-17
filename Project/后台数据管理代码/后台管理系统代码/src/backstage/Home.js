import React from 'react';
// import ReactDOM from 'react-dom';
import './Home.css';
import { NavLink , Route} from 'react-router-dom';
import { List } from 'antd-mobile';
import ListItem from 'antd-mobile/lib/list/ListItem';
import Users from './Users'
import Letter from './Letter'
import Envelope from './Envelope';
import Paper from './Paper';
import Stamp from './Stamp';
import FontFamily from './FontFamily';
import Purchased_Envelope from './Purchased_Envelope';
import Purchased_Paper from './Purchased_Paper';
import Purchased_Stamp from './Purchased_Stamp';
import Purchased_FontFamily from './Purchased_FontFamily';
function Store(props) {
    if (!props.warn) {
      return null;
    }
  
    return (
        <List>
            <ListItem onClick={() => {}} style={{marginLeft:'30px'}} platform="android"><NavLink to='/Envelope' style={{color:'black'}}>信封</NavLink></ListItem>
            <ListItem onClick={() => {}} style={{marginLeft:'30px'}} platform="android"><NavLink to='/Paper' style={{color:'black'}}>信纸</NavLink></ListItem>
            <ListItem onClick={() => {}} style={{marginLeft:'30px'}} platform="android"><NavLink to='/Stamp' style={{color:'black'}}>邮票</NavLink></ListItem>
            <ListItem onClick={() => {}} style={{marginLeft:'30px'}} platform="android"><NavLink to='/FontFamily' style={{color:'black'}}>字体</NavLink></ListItem>
        </List>
    );
}
function PurchasedStore(props) {
    if (!props.warn) {
      return null;
    }
  
    return (
        <List>
            <ListItem onClick={() => {}} style={{marginLeft:'30px'}} platform="android"><NavLink to='/Purchased_Envelope' style={{color:'black'}}>信封</NavLink></ListItem>
            <ListItem onClick={() => {}} style={{marginLeft:'30px'}} platform="android"><NavLink to='/Purchased_Paper' style={{color:'black'}}>信纸</NavLink></ListItem>
            <ListItem onClick={() => {}} style={{marginLeft:'30px'}} platform="android"><NavLink to='/Purchased_Stamp' style={{color:'black'}}>邮票</NavLink></ListItem>
            <ListItem onClick={() => {}} style={{marginLeft:'30px'}} platform="android"><NavLink to='/Purchased_FontFamily' style={{color:'black'}}>字体</NavLink></ListItem>
        </List>
    );
}
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: false,bought:false}
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleBought = this.handleBought.bind(this);
    }
  
    handleToggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }
    handleBought() {
        this.setState(prevState => ({
            bought: !prevState.bought
        }));
    }
    
    render() {
        return (
            <div>
                <header className='header'>
                    <p>信中日月长后台管理系统</p>
                </header>
                <div className='choose'>
                    <List>
                        <ListItem onClick={() => {}} platform="android"><NavLink to='/Users' style={{color:'black'}}>用户</NavLink></ListItem>
                        <ListItem onClick={() => {}} platform="android"><NavLink to='/Letter' style={{color:'black'}}>信件</NavLink></ListItem>
                        <ListItem  onClick={this.handleToggleClick} arrow={this.state.showWarning ? 'down': 'horizontal'} platform="android">商城</ListItem>
                        <Store warn={this.state.showWarning} />
                        {/* <ListItem  onClick={this.handleBought} arrow={this.state.bought ? 'down': 'horizontal'} platform="android">已购买</ListItem>
                        <PurchasedStore warn={this.state.bought} /> */}
                    </List>
                </div>
                <div className='content'>
                    <Route  path='/Users' component={Users}/>
                    <Route  path='/Letter' component={Letter}/>
                    <Route  path='/Envelope' component={Envelope}/>
                    <Route  path='/Paper' component={Paper}/>
                    <Route  path='/Stamp' component={Stamp}/>
                    <Route  path='/FontFamily' component={FontFamily}/>
                    <Route  path='/Purchased_Envelope' component={Purchased_Envelope}/>
                    <Route  path='/Purchased_Paper' component={Purchased_Paper}/>
                    <Route  path='/Purchased_Stamp' component={Purchased_Stamp}/>
                    <Route  path='/Purchased_FontFamily' component={Purchased_FontFamily}/>
                </div>
            </div>
        );
    }
}

export default Home;
