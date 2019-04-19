const express = require('express');
const mysql = require('mysql');
const DB = require('../DB');

const router = express.Router();

const pool = mysql.createPool(DB);

router.get('/session', (req, res) => {
    const {session} = req
    try {
        res.send(session);
    } catch (e) {
        console.log(e);
    }
})

router.get('/logout', (req, res) => {
    const {session} = req
    try {
        session.destroy()
        res.clearCookie({path:'/sign'})
        res.send(session);
    } catch (e) {
        console.log(e);
    }
})

router.post('/join', async (req, res) => {
    const { email, name, password } = req.body
    try {
        await pool.getConnection((err, connection) => {
            if (err) {
                throw err
            } else {
                connection.query(`INSERT INTO member(email, name, password) VALUE ('${email}', '${name}', '${password}')`, (err, results) => {
                    if (err)
                        throw err;
                    else{
                        res.send()
                    }
                });
                connection.release();
            }
        })

    } catch (e) {
        console.log(e);
    }

})

router.get('/sign', (req, res) => {
    const { email, password } = req.query
    const {session} = req
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                throw err
            } else {
                connection.query(`SELECT member_id, name FROM member WHERE email ='${email}' AND password = '${password}'`, (err, results) => {
                    if (err)
                        throw err;
                    else {
                        if(results[0]!==undefined){
                            session.member_id = results[0].member_id;
                            session.name = results[0].name;
                        }
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

router.get('/getUser', (req, res) => {
    const { userId } = req.query; 
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                throw err
            } else {
                connection.query(`SELECT member_id, email, name From member WHERE member_id = '${userId}'`, (err, results) => {
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

router.get('/userfollow', (req, res) => {
    const { userId } = req.query
    try {
        pool.getConnection((err, connection) => {
            if (err)
                throw err
            else {
                connection.query(`select count(case when follower_id = ${userId} then 1 end) as following, count(case when following_id = ${userId} then 1 end ) as follower from follow;`
                    , (err, results) => {
                        if (err)
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

router.get('/search', (req, res) => {
    const { searchText } = req.query;
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                throw err
            } else {
                connection.query(`SELECT member_id, name, detail From member WHERE name LIKE '%${searchText}%'`, (err, results) => {
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

router.get('/isfollow', (req, res) => {
    const { ownerId, id } = req.query;
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                throw err
            } else {
                console.log('aaaaa')
                connection.query(`SELECT COUNT(*) as follow_num FROM follow WHERE  follower_id = '${ownerId}' AND following_id = '${id}';`, (err, results) => {
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

router.post('/unfollow', async (req, res) => {
    const { ownerId, id } = req.body
    try {
        await pool.getConnection((err, connection) => {
            if (err) {
                throw err
            } else {
                connection.query(`DELETE FROM follow WHERE follower_id = '${ownerId}' AND following_id = '${id}'`, (err, results) => {
                    if (err)
                        throw err;
                    else{
                        res.send()
                    }
                });
                connection.release();
            }
        })

    } catch (e) {
        console.log(e);
    }

})

router.post('/follow', async (req, res) => {
    const { ownerId, id } = req.body
    try {
        await pool.getConnection((err, connection) => {
            if (err) {
                throw err
            } else {
                connection.query(`INSERT INTO follow(follower_id, following_id) VALUE ('${ownerId}', '${id}')`, (err, results) => {
                    if (err)
                        throw err;
                    else{
                        res.send()
                    }
                });
                connection.release();
            }
        })

    } catch (e) {
        console.log(e);
    }

})
module.exports = router;