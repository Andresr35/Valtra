/**
 * Holds all the routes for database communication
 *
 */

var express = require("express");
var router = express.Router();
const db = require("../../db");

//GET
router.get("/", function (req, res) {
  res.json("Welcom to Valtra's Automation Backend!");
});

/**
 * GETs the entire products table
 *
 * @param   {route}  /products  [/products description]
 * @param   {JSON}  res        JSON with all the rows in the table
 */
router.get("/products", function (req, res) {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
      //return next(err)
    } else {
      console.log("got data from db");
      res.status(200).json({
        status: "success",
        results: result.rows.length,
        data: {
          products: result.rows,
        },
      });
    }
  });
});

/**
 * Just grab one product from the database
 *
 * @param   {route}  /products/:id  [/products/:id
 * @param   {[type]}  function       [function description]
 * @param   {header}  req            Requires id in the header
 * @param   {JSON}  res            JSON with row object
 *
 */
router.get("/products/:id", function (req, res) {
  db.query(
    "SELECT * FROM products where id = $1",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err.stack);
        return err;
      }
      console.log("got data from db");
      res.status(200).json({
        status: "success",
        data: {
          name: "GET ONE",
          products: result.rows[0],
        },
      });
    }
  );
});

/**
 * Just grabs all the inserts in the db
 *
 * @param   {[type]}  /insertsTable  route
 * @param   {[type]}  function       [function description]
 * @param   {[type]}  req            from /inserts page
 * @param   {obj or dict whatever}  res            send back the data
 *
 */
router.get("/insertsTable", function (req, res) {
  db.query('SELECT * from "insertsTable"', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let body = {}
      for (row in result.rows){
        Object.assign(body,{
          [result.rows[row].id]:{
            insertName:result.rows[row].insertName,
            quantity:result.rows[row].quantity,
            price:result.rows[row].price,
            link:result.rows[row].link
          }
        })
      }
      res.status(200).json({
        body: body,
      });
    }
  });
});

/**
 * restructures the array into an object of endmill objects to make it easier to read
 *
 * @param   {get}  /endmillsTable  route
 * @param   {[type]}  function        [function description]
 * @param   {[type]}  req             [req description]
 * @param   {[type]}  res             [res description]
 *
 * @return  {[type]}                  [return description]
 */
router.get("/endmillsTable", function (req, res) {
  db.query('SELECT * from "endmillsTable"', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let body = {};
      for (row in result.rows) {
        Object.assign(body, {
          [result.rows[row].id]:{
            endmillsName:result.rows[row].endmillsName,
            quantity:result.rows[row].quantity,
            price:result.rows[row].price,
          } 
        });
      }
      res.status(200).json({
        body: body,
      });
    }
  });
});

router.put("/endmills/:id/endmillsName", (req, res) => {
  db.query(
    'UPDATE "endmillsTable" SET "endmillsName" = $2 WHERE id = $1;',
    [req.params.id, req.body.change],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.put("/endmills/:id/quantity", (req, res) => {
  db.query(
    'UPDATE "endmillsTable" SET quantity = $2 WHERE id = $1;',
    [req.params.id, req.body.change],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.put("/endmills/:id/price", (req, res) => {
  db.query(
    'UPDATE "endmillsTable" SET price = $2 WHERE id = $1;',
    [req.params.id, req.body.change],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

/**
 * puts a new quantity to a specific insert
 *
 * @param   {route}  /inserts/:id/quantity  route
 * @param   {type}  req                    needs the id parameter and quantity in body
 * @param   {idk}  res                    send back "hooray"
 *
 */
router.put("/inserts/:id/quantity", (req, res) => {
  db.query(
    'UPDATE "insertsTable" SET quantity = $2 WHERE id = $1;',
    [req.params.id, req.body.change],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.put("/inserts/:id/insertName", (req, res) => {
  db.query(
    'UPDATE "insertsTable" SET "insertName" = $2 WHERE id = $1;',
    [req.params.id, req.body.change],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.put("/inserts/:id/link", (req, res) => {
  db.query(
    'UPDATE "insertsTable" SET "link" = $2 WHERE id = $1;',
    [req.params.id, req.body.change],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.put("/inserts/:id/price", (req, res) => {
  db.query(
    'UPDATE "insertsTable" SET "price" = $2 WHERE id = $1;',
    [req.params.id, req.body.change],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = router;
