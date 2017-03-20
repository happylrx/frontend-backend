import React from 'react';
import axios from 'axios';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            category: [],    //获取商品分类
            products:[],     //获取商品
            addCategory: '', //添加商品分类
            name:"",        //添加商品名称
            summary:'',     //这是简介
            price:'',       //商品价格
            poster:"",      //商品链接
            categoryID:""   //商品ID
            }
    }
    getCategory() {
        axios.get("http://api.duopingshidai.com/category").then((res) => this.setState({category: res.data.categories})).catch(err => console.log(err))
    }
    getProduct(limit){
        axios.get(`http://api.duopingshidai.com/products?limit=${limit}`)
        .then(res=>{
          this.setState({products:res.data.products});
          console.log("商品总数是"+res.data.totalCount);
      })
    }
    componentWillMount() {
        this.getCategory();
        this.getProduct(10);
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
    handleInput2 = (e) => {
        this.setState({name: e.target.value})
    }
    handleInput3 = (e) => {
        this.setState({summary: e.target.value})
    }
    handleInput4 = (e) => {
        this.setState({price: e.target.value})
    }
    handleInput5 = (e) => {
        this.setState({poster: e.target.value})
    }
    handleInput6 = (e) => {
        this.setState({categoryID: e.target.value})
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
    handleShowId(id){
      console.log(id);
    }
    handleCommodity = (e) => {
      e.preventDefault();
      let commodity={
        name:this.state.name,
        summary:this.state.summary,
        price:this.state.price,
        poster:this.state.poster,
        category:this.state.categoryID
      };
      axios.post("http://api.duopingshidai.com/product/new",commodity)
      .then((res)=>console.log(res))
      .catch((err)=>console.log(err))
    }
    render() {

        return (
            <div className="commodity">
              <div  className="category">
                <span>商品分类：</span>
                {this.state.category.map(item =>
                  <span key = {Math.random()} className="categoryItem">
                    <a href = "#" key = {Math.random()}> {item.name} </a>
                    <button onClick={this.handleDelete.bind(this,item._id)}>删除</button>
                    <button onClick={this.handleShowId.bind(this,item._id)}>显示ID</button>
                  </span>
                )}
              </div>
                <span>商品列表:</span>
                <div className="commodityList">
                {
                  this.state.products.map(item=>
                    <div className="commodityListItem">
                      <span>商品名称:</span>
                      <span>{item.name}</span><br/>
                      <span>商品描述:</span>
                      <span>{item.summary}</span><br/>
                      <span>商品价格:</span>
                      <span>{item.price}</span><br/>
                      <a href={item.poster}>商品链接</a><br/>
                      <span>商品ID:</span>
                      <span>{item._id}</span><br/>
                    </div>
                  )
                }
              </div>

                <form onSubmit={this.handleForm}>
                    <label>添加商品分类：</label>
                    <input type="text" onChange={this.handleInput}/>
                    <input type="submit"/>
                </form>
                <form onSubmit={this.handleCommodity}>
                    <div>添加商品：</div>
                    <label>商品名：</label>
                    <input type="text" onChange={this.handleInput2}/><br/>
                    <label>商品简介：</label>
                    <input type="text" onChange={this.handleInput3}/><br/>
                    <label>商品价格：</label>
                    <input type="text" onChange={this.handleInput4}/><br/>
                    <label>商品链接：</label>
                    <input type="text" onChange={this.handleInput5}/><br/>
                    <label>商品类ID：</label>
                    <input type="text" onChange={this.handleInput6}/><br/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default Home
