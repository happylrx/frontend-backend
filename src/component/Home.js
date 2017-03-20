import React from 'react';
import axios from 'axios';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            category: [],
            addCategory: ''
        }
    }
    getCategory() {
        axios.get("http://api.duopingshidai.com/category").then((res) => this.setState({category: res.data.categories})).catch(err => console.log(err))
    }
    componentWillMount() {
        this.getCategory();
    }
    handleForm = (e) => {
        e.preventDefault();
        axios.post("http://api.duopingshidai.com/category", {name: this.state.addCategory}).then(res => {
            this.getCategory();
            alert(res.data.msg)});
    }
    handleInput = (e) => {
        this.setState({addCategory: e.target.value})
    }
    render() {

        return (
            <div className="category">
                <span>商品分类：</span>
                {this.state.category.map(item =>< a href = "#" key = {
                    Math.random()
                } > {
                    item.name
                } < /a>)}
                <form onSubmit={this.handleForm}>
                    <input type="text" onChange={this.handleInput}/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default Home
