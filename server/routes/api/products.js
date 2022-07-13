var express = require("express");
var router = express.Router();  
const morgan = require('morgan');
const db = require('../../db'); 

//middleware
/*
router.use(morgan("dev"));
router.use((req,res,next) =>{
  console.log("middleware ran");
  next();
});
*/
router.use(express.json());

//GET       testing the first api call
router.get("/",function(req,res){
    res.json("this is a json status code for the users api");
});



//GET ALL      just grabbing all data in table
router.get('/products', function (req, res)  {
        db.query('SELECT * FROM products',(err, result) => {
          if (err) { 
            console.log(err); 
            //return next(err)
          } 
          else {
          console.log("got data from db");
          res.status(200).json({
            status:"success",
            results: result.rows.length,
            data:{
              products: result.rows,
            }  
          
          }) 
        }
        })   
})


// GET ONE     selecting a specific id in a data table
router.get('/products/:id', function (req, res)  {
  db.query('SELECT * FROM products where id = $1',[req.params.id],(err, result) => {
    if  (err) {
      console.log(err.stack);
      return err
    }
    console.log("got data from db");
    res.status(200).json({
      status:"success",
      data:{
        name:"GET ONE",
        products: result.rows[0],
      } 
    })
  })   
})


//POST      creating a data field in the data table
router.post('/products', function (req, res)  {
  console.log(req.body);
  db.query("INSERT INTO products (id,description) VALUES ($1,$2) returning *",[req.body.id,req.body.description],(err,result) =>{
    if(err){
      console.log(err.stack)
    }else{
      //console.log(res);
      res.status(201).json({
       status:"success",
        data:{
          name:"POST",
          product:result.rows[0],
        }
      })
    }
  })
  
})


//PUT   
router.put('/products/:id',function(req,res){
  db.query('UPDATE products SET description = $2 WHERE id = $1 returning*' ,[req.params.id,req.body.description],(err,result) =>{
    if (err){
      console.log(err.stack);
    }else{
      console.log(req.params.id);
      console.log(req.body);
      res.status(200).json({
      status:"success",
        data:{
          name:"PUT",
          product: result.rows
        }
      })
    }
  })

})

//DELETE
router.delete('/products/:id',function(req,res){
  db.query('DELETE FROM products WHERE id = $1',[req.params.id],(err,result) =>{
    res.status(204).json({
      status:"sucess"
    })
  })
 
})
  module.exports = router;