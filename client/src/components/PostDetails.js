import axios from 'axios';
import React, { Component } from 'react';


export default class PostDetails extends Component{
    constructor(props){
        super(props);

        this.state={
            post:{}
        }
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

        //const {topic, description, postCategory}=this.state.post;

        return (
           <div className='container'  style={{margintop:'40px' }}>
               <h4 className='display-6'>{this.state.post.topic}</h4>
               <hr />

               <dl className='row'>
                   <dt className='col-sm-3'>Description</dt>
                   <dd className='col-sm-9'>{this.state.post.description}</dd>

                   <dt className='col-sm-3'>Post Category</dt>
                   <dd className='col-sm-9'>{this.state.post.postCategory}</dd>

               </dl>

           </div>
        )
    }
}