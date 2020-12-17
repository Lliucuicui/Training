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

app.post('/deleteenvelope', async c => {
    let data = c.body;
    let sql = "DELETE FROM envelope where e_id=$1";
    let result = await pdb.query(sql, [data], function (err, result) {
        if (err) {
            console.log('DELETE ERROR - ', err.message);
            return;
        } else {
            console.log("DELETE SUCCESS");
        }
    });
})
app.post('/postenvelope', async c => {
    let data = JSON.parse(c.body);
    console.log(c.body)
    let sql = "INSERT INTO envelope(e_name,e_id,e_price,e_date,e_img) values ($1,$2,$3,$4,$5)";
    let result = await pdb.query(sql, [data.e_name,
    data.e_id,
    data.e_price,
    data.e_date,
    data.e_img], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/updateenvelope', async c => {
    let data = JSON.parse(c.body);
    console.log(c.body)
    let sql = "update envelope set e_name=$1,e_price=$2,e_date=$3,e_img=$4 where e_id = $5";
    let result = await pdb.query(sql, [data.e_name,
    data.e_price,
    data.e_date,
    data.e_img,
    data.e_id], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})

app.post('/deletestamp', async c => {
    let data = c.body;
    let sql = "DELETE FROM stamp where s_id=$1";
    let result = await pdb.query(sql, [data], function (err, result) {
        if (err) {
            console.log('DELETE ERROR - ', err.message);
            return;
        } else {
            console.log("DELETE SUCCESS");
        }
    });
})  
app.post('/poststamp', async c => {
    let data = JSON.parse(c.body);
    console.log(c.body)
    let sql = "INSERT INTO stamp(s_name,s_id,s_price,s_date,s_img) values ($1,$2,$3,$4,$5)";
    let result = await pdb.query(sql, [data.s_name,
    data.s_id,
    data.s_price,
    data.s_date,
    data.s_img], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/updatestamp', async c => {
    let data = JSON.parse(c.body);
    console.log(c.body)
    let sql = "update stamp set s_name=$1,s_price=$2,s_date=$3,s_img=$4 where s_id = $5";
    let result = await pdb.query(sql, [data.s_name,
    data.s_price,
    data.s_date,
    data.s_img,
    data.s_id], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})

app.post('/deletepaper', async c => {
    let data = c.body;
    let sql = "DELETE FROM paper where p_id=$1";
    let result = await pdb.query(sql, [data], function (err, result) {
        if (err) {
            console.log('DELETE ERROR - ', err.message);
            return;
        } else {
            console.log("DELETE SUCCESS");
        }
    });
})
app.post('/postpaper', async c => {
    let data = JSON.parse(c.body);
    console.log(c.body)
    let sql = "INSERT INTO paper(p_name,p_id,p_price,p_date,p_img) values ($1,$2,$3,$4,$5)";
    let result = await pdb.query(sql, [data.p_name,
    data.p_id,
    data.p_price,
    data.p_date,
    data.p_img], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/updatepaper', async c => {
    let data = JSON.parse(c.body);
    console.log(c.body)
    let sql = "update paper set p_name=$1,p_price=$2,p_date=$3,p_img=$4 where p_id = $5";
    let result = await pdb.query(sql, [data.p_name,
    data.p_price,
    data.p_date,
    data.p_img,
    data.p_id], function (err, result) {
        if (err) {
            console.log('INSERT ERROR - ', err.message);
            return;
        } else {
            console.log("INSERT SUCCESS");
        }
    });
})
app.post('/deleteletter', async c => {
    let data = c.body;
    let sql = "DELETE FROM letter where l_id=$1";
    let result = await pdb.query(sql, [data], function (err, result) {
        if (err) {
            console.log('DELETE ERROR - ', err.message);
            return;
        } else {
            console.log("DELETE SUCCESS");
        }
    });
})  

app.get('/envelope', async e => {
    var sql = 'select * from envelope';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/stamp', async e => {
    var sql = 'select * from stamp';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/paper', async e => {
    var sql = 'select * from paper';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/fontfamily', async e => {
    var sql = 'select * from fontfamily';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/purchased_envelope', async e => {
    var sql = 'select * from purchased_envelope';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/purchased_paper', async e => {
    var sql = 'select * from purchased_paper';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/purchased_stamp', async e => {
    var sql = 'select * from purchased_stamp';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/purchased_fontfamily', async e => {
    var sql = 'select * from purchased_fontfamily';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/users', async e => {
    var sql = 'select * from users';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/collect', async e => {
    var sql = 'select * from collect';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/friend', async e => {
    var sql = 'select * from friend';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/guanzhu', async e => {
    var sql = 'select * from guanzhu';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/letter', async e => {
    var sql = 'select * from letter';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/receive_letter', async e => {
    var sql = 'select * from receive_letter';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/send_letter', async e => {
    var sql = 'select * from send_letter';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/trends', async e => {
    var sql = 'select * from trends';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/trends_img', async e => {
    var sql = 'select * from trends_img';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/universe', async e => {
    var sql = 'select * from universe';
    let result = await getResult(sql);
    e.res.body = result;
})
app.get('/universe_content', async e => {
    var sql = 'select * from universe_content';
    let result = JSON.parse(await getResult(sql)).rows;
    console.log(result);
    e.res.body = result;
})

function getResult(sql) {
    return new Promise((resolve, reject) => {
        pdb.query(sql, function (err, result) {
            if (err) {
                reject(err.message);
            } else {
                resolve(JSON.stringify(result));
            }
        })
    })
}


app.run(8080);
