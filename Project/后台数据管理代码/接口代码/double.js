'use strict'

const titbit = require('titbit')
const pg = require('pg')
const gohttp = require('gohttp')
const app = new titbit()

app.use( async (c, next) => {

    if (c.isUpload) {
        await next()
        return
    }

    if (c.headers['content-type'] === 'application/json' || c.headers['content-type'] === 'text/json') {
        try {
            c.body = JSON.parse(c.rawBody.toString('utf8'))
        } catch (err) {
            c.send('bad data', 400)
            return
        }
    }


    await next()

} , {method: ['POST', 'PUT']})

let pdb = new pg.Pool({
    database: 'message',
    user: 'mail',
    password: '123456',
    // host: '127.0.0.1',
    host: '140.143.168.77',
    max: 10
})
var id,l_id,u_id,num,t_id;

app.post('/purchased_stamp', async c => {
    let data = c.body;
    id = data.user;
    console.log(id);
})
app.post('/letterid', async c => {
    let data = c.body;
    l_id = data.l_id;
    console.log(l_id);
})

app.post('/universeid', async c => {
    let data = c.body;
    console.log(c.body)
    u_id = data.u_id;
    console.log(u_id);
})
app.post('/collectid', async c => {
    let data = c.body;
    num = data.cid;
})
app.post('/trendsid', async c => {
    let data = c.body;
    t_id = data.t_id;
    console.log(t_id);
})
app.get('/getfriend', async e => {
    var sql = 'select * from friend where userid=4';
    let result = await getResult(sql);
    var arr = [];
    let arr1 = JSON.parse(result).rows;
    for (var i = 0; i < arr1.length; i++) {
        arr.push(arr1[i].friend_id);
    }
    var arr2=[];
    for (var i = 0; i < arr.length; i++) {
        var sql = 'select * from users where userid=$1';
        let result1 = JSON.parse(await getResult(sql, arr[i])).rows;
        console.log(result1)
        arr2.push(result1);
        console.log(arr2);
    }
    e.res.body = arr2;
})
app.get('/trendscomment', async e => {
    var sql = 'select * from comment where t_id=$1';
    let result=JSON.parse(await getResult1(sql,t_id)).rows;
    e.res.body = result;
})
app.get('/collectletter1', async e => {
    var sql = 'select * from letter where l_id=$1';
    let result=JSON.parse(await getResult1(sql,num)).rows;
    e.res.body = result;
})
app.get('/addpurchased_stamp', async e => {
    var sql = 'select * from purchased_stamp where userid=$1';
    let result = await getResult1(sql,id);
    var arr = [];
    let arr1 = JSON.parse(result).rows;
    for (var i = 0; i < arr1.length; i++) {
        arr.push(arr1[i].s_id);
    }
    var arr2=[];
    for (var i = 0; i < arr.length; i++) {
        var sql = 'select * from stamp where s_id=$1';
        let result1 = JSON.parse(await getResult(sql, arr[i])).rows;
        console.log(result1)
        arr2.push(result1);
        console.log(arr2);
    }
    e.res.body = arr2;
})
app.get('/addpurchased_fontfamily', async e => {
    var sql = 'select * from purchased_fontfamily where userid=$1';
    let result = await getResult1(sql,id);
    var arr = [];
    let arr1 = JSON.parse(result).rows;
    for (var i = 0; i < arr1.length; i++) {
        arr.push(arr1[i].f_id);
    }
    var arr2=[];
    for (var i = 0; i < arr.length; i++) {
        var sql = 'select * from fontfamily where f_id=$1';
        let result1 = JSON.parse(await getResult(sql, arr[i])).rows;
        console.log(result1)
        arr2.push(result1);
        console.log(arr2);
    }
    e.res.body = arr2;
})
app.get('/addpurchased_paper', async e => {
    var sql = 'select * from purchased_paper where userid=$1';
    let result = await getResult1(sql,id);
    var arr = [];
    let arr1 = JSON.parse(result).rows;
    for (var i = 0; i < arr1.length; i++) {
        arr.push(arr1[i].p_id);
    }
    var arr2=[];
    for (var i = 0; i < arr.length; i++) {
        var sql = 'select * from paper where p_id=$1';
        let result1 = JSON.parse(await getResult(sql, arr[i])).rows;
        console.log(result1)
        arr2.push(result1);
        console.log(arr2);
    }
    e.res.body = arr2;
})
app.get('/addpurchased_envelope', async e => {
    var sql = 'select * from purchased_envelope where userid=$1';
    let result = await getResult1(sql,id);
    var arr = [];
    let arr1 = JSON.parse(result).rows;
    for (var i = 0; i < arr1.length; i++) {
        arr.push(arr1[i].e_id);
    }
    var arr2=[];
    for (var i = 0; i < arr.length; i++) {
        var sql = 'select * from envelope where e_id=$1';
        let result1 = JSON.parse(await getResult(sql, arr[i])).rows;
        console.log(result1)
        arr2.push(result1);
        console.log(arr2);
    }
    e.res.body = arr2;
})
app.get('/getguanzhu', async e => {
    var sql = 'select * from guanzhu where userid=$1';
    let result = await getResult1(sql,id);
    var arr = [];
    let arr1 = JSON.parse(result).rows;
    for (var i = 0; i < arr1.length; i++) {
        arr.push(arr1[i].u_id);
    }
    var arr2=[];
    for (var i = 0; i < arr.length; i++) {
        var sql = 'select * from universe where u_id=$1';
        let result1 = JSON.parse(await getResult(sql, arr[i])).rows;
        console.log(result1)
        arr2.push(result1);
        console.log(arr2);
    }
    e.res.body = arr2;
})
app.get('/guanzhustatus', async e => {
    var sql = 'select value from guanzhu where u_id=$1';
    let result=JSON.parse(await getResult1(sql,u_id)).rows;
    e.res.body = result;
})
app.get('/addsendletter', async e => {
    var sql = 'select * from letter where userid=$1';
    let result=await getResult1(sql,id);
    e.res.body = result;
})
app.get('/lettercontent', async e => {
    var sql = 'select * from letter where l_id=$1';
    let result=JSON.parse(await getResult1(sql,l_id)).rows;
    e.res.body = result;
})
app.get('/universecontent', async e => {
    var sql = 'select * from universe_content where u_id=$1';
    let result=JSON.parse(await getResult1(sql,u_id)).rows;
    e.res.body = result;
})
app.get('/createuniverse', async e => {
    var sql = 'select * from universe where userid=$1';
    let result=JSON.parse(await getResult1(sql,id)).rows;
    e.res.body = result;
})
app.post('/deleteuniverse0', async c => {
    let data=c.body;
    let sql = "DELETE FROM universe_content where u_id=$1";
    let result = await pdb.query(sql, [data.u_id], function (err, result) {
            if (err) {
                console.log('INSERT ERROR - ', err.message);
                return;
            } else {
                console.log("INSERT SUCCESS");
            }
        });
})
app.post('/deleteuniverse', async c => {
    let data=c.body;
    let sql = "DELETE FROM universe where u_id=$1 and userid=$2";
    let result = await pdb.query(sql, [data.u_id,
        data.userid], function (err, result) {
            if (err) {
                console.log('INSERT ERROR - ', err.message);
                return;
            } else {
                console.log("INSERT SUCCESS");
            }
        });
})
app.post('/deleteguanzhu', async c => {
    let data=c.body;
    let sql = "DELETE FROM guanzhu where u_id=$1 and userid=$2";
    let result = await pdb.query(sql, [data.u_id,
        data.userid], function (err, result) {
            if (err) {
                console.log('INSERT ERROR - ', err.message);
                return;
            } else {
                console.log("INSERT SUCCESS");
            }
        });
})
app.get('/getcollect', async e => {
    var sql = 'select * from collect where userid=$1';
    let result = await getResult1(sql,id);
    var arr = [];
    let arr1 = JSON.parse(result).rows;
    for (var i = 0; i < arr1.length; i++) {
        arr.push(arr1[i].l_id);
    }
    var arr2=[];
    for (var i = 0; i < arr.length; i++) {
        var sql = 'select * from letter where l_id=$1';
        let result1 = JSON.parse(await getResult(sql, arr[i])).rows;
        console.log(result1)
        arr2.push(result1);
        console.log(arr2);
    }
    e.res.body = arr2;
})

function getResult(sql) {
    var arr = [];
    for (var i = 1; i < arguments.length; i++) {
        arr.push(arguments[i]);
    }
    return new Promise((resolve, reject) => {
        pdb.query(sql, arr, function (err, result) {
            if (err) {
                reject(err.message);
            } else {
                resolve(JSON.stringify(result));
            }
        })
    })
}
function getResult1(sql) {
    var m= arguments[1];
    return new Promise((resolve, reject) => {
        pdb.query(sql,[m], function (err, result) {
            if (err) {
                reject(err.message);
            } else {
                resolve(JSON.stringify(result));
            }
        })
    })
}

let wxkey = {
    appid : 'wxf32cbe4223847907',
    secret : '3f93cf284e40b2286ae5b9940ac9456f'
}

app.get('/wx-openid', async c => {

    let oauth_url = `https://api.weixin.qq.com/sns/jscode2session`
        + `?appid=${wxkey.appid}&secret=${wxkey.secret}`
        + `&js_code=${c.query.code}&grant_type=authorization_code`
    console.log("hello");
    let tk = await gohttp.get(oauth_url)
    let wxinfo = tk.json()
    c.send(wxinfo.openid)

})

app.run(8000)