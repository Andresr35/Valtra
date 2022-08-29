/**
 * Holds all the routes for database communication
 *
 */

var express = require("express");
var router = express.Router();
const db = require('../../db'); 


//GET
router.get("/",function(req,res){
    res.json("Welcom to Valtra's Automation Backend!");
});

/**
 * GETs the entire products table 
 *
 * @param   {route}  /products  [/products description]
 * @param   {JSON}  res        JSON with all the rows in the table
 */
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

/**
 * Just grab one product from the database
 *
 * @param   {route}  /products/:id  [/products/:id
 * @param   {[type]}  function       [function description]
 * @param   {header}  req            Requires id in the header
 * @param   {JSON}  res            JSON with row object 
 *
 */
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

module.exports = router;