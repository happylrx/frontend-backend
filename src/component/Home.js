import React from 'react';
import axios from 'axios';

class Home extends React.Component {
    constructor(){
      super();
      this.state = {
        category:[]
      }
    }
    componentWillMount(){
      axios.get("http://api.duopingshidai.com/category")
        .then((res)=>this.setState({category:res.data.categories}))
        .catch(err=>console.log(err))
    }
    render() {

        return (
            <div className="category">
              <span>商品分类：</span>
              {
                this.state.category.map(item=><a href="#" key={Math.random()}>{item.name}</a>)
              }
              <form onSubmit={this.handleForm}>

              </form>
            </div>
        )
    }
}
export default Home
