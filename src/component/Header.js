import React from 'react';
import AppBar from 'material-ui/AppBar';
import ActionHome from 'material-ui/svg-icons/action/home';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false, //登录注册表单的开关
            action: "signin", //登录注册表单选项切换
            username: '', //表单用户名的value
            password: '', //表单密码
            isLogin: false, //是否登录
            user: '', //登陆后后台返回的用户名
            userId: '', //登陆后后台返回的userID
            openMenu: false, //登陆后右上角的弹出菜单的开关
            snackBar: false //登出时弹出的提示框

        }
    }
    componentWillMount() {
        if (localStorage.user && localStorage.userId) {
            this.setState({isLogin: true, user: localStorage.user, userId: localStorage.userId});
        }
    }
    handleUsername(e, username) {
        this.setState({username: username.trim()});
    }
    handlePassword(e, password) {
        this.setState({password: password.trim()});
    }
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    handleSubmit = () => {
        let data = {
            username: this.state.username,
            password: this.state.password
        };
        axios.post(`http://api.duopingshidai.com/user/${this.state.action}`, data).then(res => {
            this.setState({open: false, isLogin: true, user: res.data.user, userId: res.data.userId});
            localStorage.setItem('user', res.data.user);
            localStorage.setItem('userId', res.data.userId);
        }).catch(err => {
            if (err.response) {
                alert(err.response.data.msg);
            } else {
                console.log('Error', err);
            }
        })
    };
    handleOnRequestChange = (value) => {
        this.setState({openMenu: value});
    }
    handleOpenMenu = () => {
        this.setState({openMenu: true});
    }
    handleMenuItem(e, child) {
        if (child.props.value === '3') {
            this.logout();
        }
    }
    logout() {
        axios.get('http://api.duopingshidai.com/user/logout').then(() => {
            this.setState({isLogin: false, user: '', userId: '',snackBar:true});
            localStorage.removeItem('user');
            localStorage.removeItem('userId');
        })
    }
    render() {
        const actions = [ < FlatButton label = "Cancel" primary = {
                true
            }
            onTouchTap = {
                this.handleClose
            } />, < FlatButton label = "Submit" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onTouchTap = {
                this.handleSubmit
            } />
        ];
        return (
            <div>
                <AppBar title="LOGO" iconElementLeft={< IconButton > <ActionHome/> < /IconButton>} iconElementRight={this.state.isLogin
                    ? <IconMenu iconButtonElement={< IconButton > <AccountCircle onTouchTap={this.handleOpenMenu}/> < /IconButton>} open={this.state.openMenu} onRequestChange={this.handleOnRequestChange} anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom'
                        }} targetOrigin={{
                            horizontal: 'right',
                            vertical: 'top'
                        }} onItemTouchTap={this.handleMenuItem.bind(this)}>
                            <MenuItem value="1" primaryText={this.state.user}/>
                            <MenuItem value="2" primaryText="个人中心"/>
                            <MenuItem value="3" primaryText="退出"/>
                        </IconMenu>
                    : < FlatButton label = "登录/注册" primary = {
                        true
                    }
                    onTouchTap = {
                        this.handleOpen
                    } />}/>
                <Dialog title="注册和登录界面" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
                    <FlatButton label="登录" primary={this.state.action == "signin"
                        ? true
                        : false} onTouchTap={() => this.setState({action: "signin"})}/>
                    <FlatButton label="注册" primary={this.state.action == "signup"
                        ? true
                        : false} onTouchTap={() => this.setState({action: "signup"})}/><br/>
                    <TextField hintText="username" onChange={this.handleUsername.bind(this)}/><br/>
                    <TextField hintText="password" type="password" onChange={this.handlePassword.bind(this)}/><br/>
                </Dialog>
                <Snackbar open={this.state.snackBar} message="登出成功" autoHideDuration={4000} onRequestClose={() => this.setState({snackBar: false})} bodyStyle={{textAlign:'center',backgroundColor:'green'}} />
            </div>
        )
    }
}
export default Header;
