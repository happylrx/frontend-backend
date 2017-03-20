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
    handleDelete(id){
      axios.delete(`http://api.duopingshidai.com/category?id=${id}`)
        .then(res=>
          {
            let index = this.state.category.findIndex(item=>item._id===id);
            this.state.category.splice(index,1);
            this.setState({data:this.state.category});
          }
        )
    }
    render() {

        return (
            <div className="category">
                <span>商品分类：</span>
                {this.state.category.map(item =>
                  <div key = {Math.random()}>
                    <a href = "#" key = {Math.random()}> {item.name} </a>
                    <button onClick={this.handleDelete.bind(this,item._id)}>删除</button>
                  </div>
              )}
                <form onSubmit={this.handleForm}>
                    <input type="text" onChange={this.handleInput}/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default Home
