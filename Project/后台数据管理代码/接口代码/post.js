'use strict'

const titbit = require('titbit')
const pg = require('pg')
const app = new titbit()
let pdb = new pg.Pool({
    database: 'message',
    user: 'mail',
    password: '123456',
    // host: '127.0.0.1',
    host: '140.143.168.77',
    max: 10
})
app.post('/addletter', async c => {
    let data = c.body;
    let sql = "INSERT INTO letter(l_id,userid,e_img,p_img,s_img,f_img,l_content) values($1,$2,$3,$4,$5,$6,$7)";
    let result = await pdb.query(sql, [data.l_id,
    data.userid,
    data.e_img,
    data.p_img,
    data.s_img,
    data.f_img,
    data.l_content], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            console.log(data)
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/sendletter', async c => {
    let data = c.body;
    let sql = "INSERT INTO send_letter(l_id,usersid) values ($1,$2)";
    let result = await pdb.query(sql, [data.l_id,
    data.userid], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/receiveletter', async c => {
    let data = c.body;
    let sql = "INSERT INTO receive_letter(l_id,usersid) values ($1,$2)";
    let result = await pdb.query(sql, [data.l_id,
    data.userid], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/adduniverse', async c => {
    let data = c.body;
    // console.log(data.u_img);
    // console.log(data)
    // let f = c.getFile(data.u_img);
    // let fname = c.helper.makeName(f.filename);
    // try {
    //     c.res.body = await c.moveFile(fname, image)
    // } catch (err) {
    //     c.res.body = err.message
    // }

    let sql = "INSERT INTO universe(u_id,u_img,u_name,u_introduction,userid) values($1,$2,$3,$4,$5)";
    let result = pdb.query(sql, [data.u_id,
    data.u_img,
    data.u_name,
    data.u_introduction,
    data.userid], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message)
            return
        } else {
            console.log("INSERT SUCCESS")
        }
    });
})

// c.getFile('c_img')

app.post('/adduniversecontent', async c => {
    let data = c.body;
    // console.log(data.c_img);
    // console.log(data)
    // let f = c.getFile(data.c_img);
    // let fname = c.helper.makeName(f.filename);
    // try {
    //     c.res.body = await c.moveFile(fname, image)
    // } catch (err) {
    //     c.res.body = err.message
    // }

    let sql = "INSERT INTO universe_content(u_id,userid,c_id,content) values($1,$2,$3,$4)";
    let result = pdb.query(sql, [data.u_id,
    data.userid,
    data.c_id,
    data.content], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message)
            console.log(data)
            return
        } else {
            console.log("INSERT SUCCESS")
            console.log(data)
        }
    });
})
app.post('/addusers', async c => {
    let data = c.body;
    let sql = "INSERT INTO users(username,openid,img,usersex,birth,userid) values ($1,$2,$3,$4,$5,$6)";
    let result = await pdb.query(sql, [data.username,
    data.openid,
    data.img,
    data.usersex,
    data.userbirth,
    data.userid], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/update_users', async c => {
    let data = c.body;
    let sql = "update users set username=$1,birth=$2,img=$3,usersex=$4,signal=$5 where userid = $6";
    let result = await pdb.query(sql, [data.username,
    data.birth,
    data.img,
    data.usersex,
    data.signal,
    data.userid], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/purchasedstamp', async c => {
    let data = c.body;
    let sql = "INSERT INTO purchased_stamp(userid,s_id) values ($1,$2)";
    let result = await pdb.query(sql, [data.userid,
    data.s_id], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/purchasedenvelope', async c => {
    let data = c.body;
    let sql = "INSERT INTO purchased_envelope(userid,e_id) values ($1,$2)";
    let result = await pdb.query(sql, [data.userid,
    data.e_id], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/purchasedpaper', async c => {
    let data = c.body;
    let sql = "INSERT INTO purchased_paper(userid,p_id) values ($1,$2)";
    let result = await pdb.query(sql, [data.userid,
    data.p_id], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/purchasedfontfamily', async c => {
    let data = c.body;
    let sql = "INSERT INTO purchased_fontfamily(userid,f_id) values ($1,$2)";
    let result = await pdb.query(sql, [data.userid,
    data.f_id], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/addguanzhu', async c => {
    let data = c.body;
    let sql = "INSERT INTO guanzhu(userid,u_id,value) values ($1,$2,$3)";
    let result = await pdb.query(sql, [data.userid,
    data.u_id,
    data.value], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/postcollect', async c => {
    let data = c.body;
    let sql = "INSERT INTO collect(userid,l_id) values ($1,$2)";
    let result = await pdb.query(sql, [data.userid,
    data.l_id], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            console.log(data)
            return;
        } else {
            console.log("INSERT SUCCESS");
            console.log(data)
        }
    });
})
app.post('/posttrends', async c => {
    let data = c.body;
    let sql = "INSERT INTO trends(userid,t_id,t_content,t_date,value) values ($1,$2,$3,$4,$5)";
    let result = await pdb.query(sql, [data.userid,
    data.t_id,
    data.t_content,
    data.t_date,
    data.value], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/postcomment', async c => {
    let data = c.body;
    let sql = "INSERT INTO comment(t_id,userid,content) values ($1,$2,$3)";
    let result = await pdb.query(sql, [data.t_id,
    data.userid,
    data.content], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/postfriend', async c => {
    let data = c.body;
    let sql = "INSERT INTO friend(userid,friend_id) values ($1,$2)";
    let result = await pdb.query(sql, [data.userid,
    data.friend_id], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.run(2022);