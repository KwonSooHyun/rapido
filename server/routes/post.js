const express = require('express');
const mysql = require('mysql');
const DB = require('../DB');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const pool = mysql.createPool(DB);

fs.readdir('uploads', (e)=>{
    if(e){
        console.log('업로드 저장소 초기화');
        fs.mkdirSync('uploads');
    }
})

const storage = multer.diskStorage({
    destination : (req, file, cd) => {
        cd(null, 'uploads/');
    },
    filename : (req, file, cd) => {
        const ext = path.extname(file.originalname);
        cd(null,fileName = path.basename(file.originalname, ext) + Date.now() + ext );
    }
});

const upload = multer({storage});

router.post('/posting', upload.single('photo') ,(req,res)=>{
    try {
    
        const {id, name, text} = req.body;
        
        pool.getConnection((err, connection) => {
            if(err)
                throw err
            else{
                connection.query(`INSERT INTO post(member_id, name, text, photo, createDateTime) VALUE ('${id}', '${name}', '${text}', '${req.file.path.split('\\')[1]}', NOW())`,(err, results) => {
                    if(err)
                        throw err
                    else{
                        console.log(results);
                        res.send();
                    }
                    connection.release();
                })
            }
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/postList', (req, res) => {
    const {userId} = req.query;
    try {
        pool.getConnection((err, connection) => {
            if (err) { 
                throw err
            } else {
                connection.query(`SELECT post_id, member_id, name, text, photo, createDateTime From post WHERE member_id = '${userId}' OR member_id IN (SELECT following_id FROM follow WHERE follower_id = '${userId}' ORDER BY createDateTime DESC)`, (err, results) => {
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

router.get('/userPostList', (req, res) => {
    const {userId} = req.query;
    try {
        pool.getConnection((err, connection) => {
            if (err) { 
                throw err
            } else {
                connection.query(`SELECT post_id, member_id, name, text, photo, createDateTime From post WHERE member_id = '${userId}'`, (err, results) => {
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

module.exports = router;