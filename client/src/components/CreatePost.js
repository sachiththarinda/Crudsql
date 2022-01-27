import axios from 'axios';
import React, { Component } from 'react';

export default class CreatePost extends Component {
    constructor(props){
        super(props);

        this.state={
            topic:"",
            description:"",
            postCategory:""
          }
        
    }
    handleSubmit=(e)=>{
        e.preventDefault();
         
        const {topic, description ,postCategory}=this.state;

        const data={
            topic:topic,
            description:description,
            postCategory:postCategory
        }

        axios.post(`http://localhost:8080/post/save`, data)
        .then(res=>{
            if(res.data.success){
                alert("post created sucessfully!!")
                this.setState({
                topic:"",
                description:"",
                postCategory:""
                }
                )
            }
        })
    }
     

  render() {
    return (
        <div className='container' style={{marginTop:"20px"}}>
        <form onSubmit={this.handleSubmit}>
  <div class="mb-3">
  <label for="exampleInputEmail1" class="form-label">Enter the topic:</label>
  
  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
  value={this.state.topic}
  onChange={(e)=>this.setState({topic:e.target.value})}
  />
  
  </div>
  
  <div class="mb-3">
  <label for="exampleInputPassword1" class="form-label">Enter the description:</label>
  <input type="text" class="form-control" id="exampleInputPassword1" 
  value={this.state.description}
  onChange={(e)=>this.setState({description:e.target.value})}
  />
  </div>
  
  <div class="mb-3">
  <label for="exampleInputPassword1" class="form-label">Enter the Category:</label>
  <input type="text" class="form-control" id="exampleInputPassword1" 
  value={this.state.postCategory}
  onChange={(e)=>this.setState({postCategory:e.target.value})}
  />
  </div>
  
  <button type="submit" class="btn btn-success">
    <i className='far fa-check-square'/>
    &nbsp;Save</button>
  </form>
    </div>
    )
  }
}
