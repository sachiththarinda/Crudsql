import axios from 'axios';
import React, { Component } from 'react';

export default class EditPost extends Component {
  constructor(props){
    super(props);

    this.state={ 
     post:{}
  }
}
handleSubmit = (event) => {
  event.preventDefault();
  
  const id = this.props.match.params.id;
  
  const {topic, description, postCategory} =this.state.post;

  const data={
    topic:topic,
    description:description,
    postCategory:postCategory
  }
  
  
  console.log(data);

  axios.put(`http://localhost:8080/post/update/${id}`, data)
  .then((res)=>{
      if(res.data.success){            // after saved set the default values 
        alert("post updated")
          this.setState({
            data
          })
      }
  })
}
   
componentDidMount(){
    this.getPostDetails();
}
    


getPostDetails(){

const id = this.props.match.params.id;
//console.log(id)

axios.get(`http://localhost:8080/post/${id}`)
.then(res=>{
    if(res.data.success){
      this.setState({
        post:res.data.post[0]
      });
      //console.log(this.state.post)
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
value={this.state.post.topic}
onChange={(e)=>this.setState({topic:e.target.value})}
/>

</div>

<div class="mb-3">
<label for="exampleInputPassword1" class="form-label">Enter the description:</label>
<input type="text" class="form-control" id="exampleInputPassword1" 
value={this.state.post.description}
onChange={(e)=>this.setState({description:e.target.value})}
/>
</div>

<div class="mb-3">
<label for="exampleInputPassword1" class="form-label">Enter the Category:</label>
<input type="text" class="form-control" id="exampleInputPassword1" 
value={this.state.post.postCategory}
onChange={(e)=>this.setState({postCategory:e.target.value})}
/>
</div>

<button type="submit" class="btn btn-success">
  <i className='far fa-check-square'/>
  &nbsp;Update</button>
</form>
  </div>
    )
  }
}
