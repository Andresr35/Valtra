/**
 * Configuration for database communication API
 * 
 * query Object allows for running pgSQL scripts
 */

const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({   
  ssl: process.env.PGSSL,
}) 


module.exports = {
    query: (text, params, callback) => {
        const start = Date.now();
        return pool.query(text, params, (err,res) => {
            const duration = Date.now()-start;
            console.log('executed query',{text,duration});
            callback(err,res);
         })
    },
}
 