const express = require('express');
const bodyParser = require('body-parser')
var mysql = require('mysql');
const cors = require('cors');

const app = express();

//add middleware
app.use(bodyParser.json());

app.use(cors());

const PORT = 8080;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "posts"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS posts", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });

    con.query("CREATE TABLE IF NOT EXISTS posts.posts (postId int not null auto_increment primary key, topic VARCHAR(100), description VARCHAR(10000), postCategory varchar(100))",
     function (err, result) {
        if (err) throw err;
        console.log("posts table created");
      });     

  });

  //get all posts 
  app.get('/post',(req,res)=>{
    con.query("SELECT * FROM posts.posts",(err, posts)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        return res.status(200).json({success:true, existingPost:posts})
    })
})

//get specific post
app.get('/post/:id',(req,res)=>{
    let postId = req.params.id;

    con.query("SELECT * FROM posts.posts WHERE postId=?",[postId],(err, post)=>{
        if(err){
            return res.status(400).json({sucess:false, err})
        }
        return res.status(200).json({sucess:true, post})
    })
})


  //create posts
  app.post('/post/save',(req,res)=>{
      var topic=req.body.topic;
      var description=req.body.description;
      var postCategory=req.body.postCategory;
     

      con.query("INSERT INTO  posts.posts (topic, description, postCategory) VALUES (?,?,?)", [topic, description, postCategory],
      (err, result)=>{
        if(err){
            res.status(400).json({error:err})
        }
        return res.status(200).json({success:'Post saved sucessfully!!',result})
      } )

  })
  
  //update a post

  app.put('/post/update/:id',(req,res)=>{
    var topic=req.body.topic;
    var description=req.body.description;
    var postCategory=req.body.postCategory;
    var postId = req.params.id;

    con.query("UPDATE posts.posts SET topic=?, description=?, postCategory=? WHERE postId=?",[topic, description, postCategory,postId],
    (err, updatedPost)=>{
        if(err){
        return res.status(400).json({error:err});
                } 
    return res.status(200).json({success:'updated sucessfully',updatedPost})
    })

  })

   //delete a post

   app.delete('/post/delete/:id',(req,res)=>{
    var postId = req.params.id;
    con.query("DELETE FROM posts.posts WHERE postId=?",[postId],(err, deletedPost)=>{
        if(err)
        return res.status(400).json({
         message:'delete unsucessfull ',err});
    
    return res.json({
        message:'deleted sucessfully',deletedPost});
      });
   
   })

app.listen(PORT, ()=>{
    console.log(`app is running on ${PORT}`)
})
