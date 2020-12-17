'use strict'

const envelopeList = require('./envelope_data.js');
const stampList = require('./stamp_data.js');
const paperList=require('./paper_data.js');
const  fontList =require('./font_data.js');
const pg = require('pg')
let pdb = new pg.Pool({
    database: 'message',
    user: 'mail',
    password: '123456',
    // host: '127.0.0.1',
    host: '140.143.168.77',
    max: 10
})

async function enve() {
    let sql = 'INSERT INTO envelope(e_name,e_id,e_price,e_date,e_img) VALUES($1,$2,$3,$4,$5)';
    for (var i = 0; i < envelopeList.length; i++) {
        let result = await pdb.query(sql, [envelopeList[i].e_name,
        envelopeList[i].e_id,
        envelopeList[i].e_price,
        envelopeList[i].e_data,
        envelopeList[i].e_img], function (err, result) {
            if (err) {
                console.log('INSERT ERROR - ', err.message);
                return;
            } else {
                console.log("INSERT SUCCESS");
            }
        })
    }
}
// enve().then(() => {
//     console.log(111);
// })
async function sta() {
    let sql = 'INSERT INTO stamp(s_name,s_id,s_price,s_date,s_img) VALUES($1,$2,$3,$4,$5)';
    for (var i = 0; i < stampList.length; i++) {
        let result = await pdb.query(sql, [stampList[i].s_name,
        stampList[i].s_id,
        stampList[i].s_price,
        stampList[i].s_data,
        stampList[i].s_img], function (err, result) {
            if (err) {
                console.log('INSERT ERROR - ', err.message);
                return; 
            } else {
                console.log("INSERT SUCCESS");
            }
        })
    }
}
// sta().then(() => {
//     console.log(111);
// })

async function pap() {
    let sql = 'INSERT INTO paper(p_name,p_id,p_price,p_date,p_img) VALUES($1,$2,$3,$4,$5)';
    for (var i = 0; i < paperList.length; i++) {
        let result = await pdb.query(sql, [paperList[i].p_name,
        paperList[i].p_id,
        paperList[i].p_price,
        paperList[i].p_data,
        paperList[i].p_img], function (err, result) {
            if (err) {
                console.log('INSERT ERROR - ', err.message);
                return; 
            } else {
                console.log("INSERT SUCCESS");
            }
        })
    }
}
// pap().then(() => {
//     console.log(111);
// })

async function font() {
    let sql = 'INSERT INTO fontfamily(f_name,f_id,f_price,f_date,f_img,f_css) VALUES($1,$2,$3,$4,$5,$6)';
    for (var i = 0; i < fontList.length; i++) {
        let result = await pdb.query(sql, [fontList[i].f_name,
        fontList[i].f_id,
        fontList[i].f_price,
        fontList[i].f_data,
        fontList[i].f_img,
        fontList[i].f_css],
        function (err, result) {
            if (err) {
                console.log('INSERT ERROR - ', err.message);
                return; 
            } else {
                console.log("INSERT SUCCESS");
            }
        })
    }
}
font().then(() => {
    console.log(111);
})
