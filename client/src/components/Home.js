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
      
      onDelete = (id) => {
        if(window.confirm("Do you really want to delete this record ??") == true){
        axios.delete(`http://localhost:8080/post/delete/${id}`)
        .then((res)=>{
          alert('post deleted sucessfully')
            this.retriewPost();
          
        })
        }else{
          this.retriewPost();     
        }
        
      }

      filterData(posts, searchKey ){
        const result = posts.filter((post)=>
        //get data searching topic or description or category
        post.topic.toLowerCase().includes(searchKey) || post.description.toLowerCase().includes(searchKey) ||
        post.postCategory.toLowerCase().includes(searchKey)  
        )
        this.setState({posts:result})
      }
    
      handleSearchArea =(e)=>{
        const searchKey = e.currentTarget.value;
         
        //console.log( e.currentTarget.value)
        
        axios.get('http://localhost:8080/post')
       .then(res=>{
         if(res.data.success){
    
           this.filterData(res.data.existingPost, searchKey)
         }
       })
      }

      render() {
        return (
          <div className='container' >
            <div className='col-lg-3 mt-2 mb-2' style={{float: 'right'}}> 
        <input className='form-control' type="search" placeholder='Serach' name='searchQuery'
        onChange={this.handleSearchArea}/>
     </div>
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
                <tr >
                    <th scope='row'>{index+1}</th>
                    <td>
                        <a href={`/post/${posts.postId}`}>{posts.topic}</a>
                    </td>
                    <td style={{width:'450px'}}>{posts.description}</td>
                    <td>{posts.postCategory}</td>
                    <td>
                    <a className='btn btn-warning' href={`/edit/${posts.postId}`}>
                        <i className="fas fa-pen"></i>&nbsp;&nbsp; Edit
                    </a>&nbsp;&nbsp;
                    <a className='btn btn-danger' href='#'  onClick={()=> this.onDelete(posts.postId)}>
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
    