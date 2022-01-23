import React, { Component } from 'react';
import axios from 'axios'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state={
          posts:[]
        };
        
      }
    
      componentDidMount(){
        this.retriewPosts();
      }
    
      retriewPosts(){
        axios.get('http://localhost:8080/post')
        .then(res=>{
          if(res.data.success){
          this.setState({
            posts:res.data.existingPost
          })}
          console.log(this.state.posts)
        })
      }
      
      
      render() {
        return (
          <div>
            {this.state.posts.map(posts =>(
              <div>
                <p>{posts.topic}</p>
                <p>{posts.description}</p>
                <p>{posts.postCategory}</p>
              </div>
              
            ))}
            
          </div>
        )
      }
    }
    