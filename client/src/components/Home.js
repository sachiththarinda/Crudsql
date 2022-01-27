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
          <div className='container' >
              <table className="table">
            <thead>
                <tr className='table-dark'>
                <th scope="col">#</th>
                <th scope="col">Topic</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {this.state.posts.map((posts, index) =>(
                <tr>
                    <th scope='row'>{index+1}</th>
                    <td>
                        <a href={`/post/${posts.postId}`}>{posts.topic}</a>
                    </td>
                    <td>{posts.description}</td>
                    <td>{posts.postCategory}</td>
                    <td>
                    <a className='btn btn-warning' href={`/edit/${posts._id}`}>
                        <i className="fas fa-pen"></i>&nbsp;&nbsp; Edit
                    </a>&nbsp;&nbsp;
                    <a className='btn btn-danger' href='#'>
                        <i className="fas fa-trash"></i>&nbsp;&nbsp; Delete
              </a>
                    </td>
                </tr>
              
              
            ))}
            </tbody>
            </table>
            <button className='btn btn-success'>
                <a href="/add" style={{textDecoration:'none',color:'white' }}>
                <i className="fas fa-plus"></i>&nbsp;&nbsp; Create New</a>
            </button>
          </div>
        )
      }
    }
    