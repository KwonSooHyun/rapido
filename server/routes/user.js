const express = require('express');
const mysql = require('mysql');
const DB = require('../DB');

const router = express.Router();

const pool = mysql.createPool(DB);


router.post('/join', async (req, res)=>{
    const {email, name, password} = req.body
    try {
            await pool.getConnection((err, connection) => {
                if (err) {
                    throw err
                } else {
                     connection.query(`INSERT INTO member(email, name, password) VALUE ('${email}', '${name}', '${password}')`,  (err, results) => {
                        if (err)
                            throw err;
                        else
                            console.log(results);
                            res.send()
                    });
                    connection.release();
                }
            })
        
    } catch (e) {
        console.log(e);
    }
    
})

router.get('/sign', (req, res)=>{
    const {email, password} = req.query
    try {
        pool.getConnection((err, connection) => {
            if (err) { 
                throw err
            } else {
                connection.query(`SELECT member_id, name FROM member WHERE email ='${email}' AND password = '${password}'`, (err, results) => {
                    if (err)
                        throw err;
                    else {
                        res.send(results);
                    }
                });
                connection.release();
            }   
        });
    } catch (e) {
        console.log(e);
    }
})

router.get('/follow',(req,res)=>{
    const {userId} = req.query
    try {
        pool.getConnection((err, connection) => {
            if(err)
                throw err
                else{
                connection.query(`select count(case when follower_id = ${userId} then 1 end) as following, count(case when following_id = ${userId} then 1 end ) as follower from follow;`
                ,(err,results) => {
                    if(err)
                        throw err
                    else {
                        res.send(results);
                    }
                });
                connection.release();
            }
        });
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;