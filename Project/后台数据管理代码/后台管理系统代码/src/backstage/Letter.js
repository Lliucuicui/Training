import React from 'react'
import {Table,Space} from 'antd';
import 'antd/dist/antd.css';
const table_css = {
    border:"0.5px solid grey",
    margin:'20px auto',
    width:'90%',
    align:'center'
}

class Letter extends React.Component {
    constructor() {
        super();
        this.state = {
            data1: [],
        }
    }
    sort = (arr) =>{
        var temp;
        for(var x = 0;x<arr.length;x++){
            for(var y = 0;y<arr.length;y++){
                if(arr[x].l_id<arr[y].l_id){
                    temp = arr[x];
                    arr[x]=arr[y];
                    arr[y]=temp; 
                }
            }
        }
        return arr;
    }
    componentDidMount() {
        fetch("/letter", {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json,text/plain,*/*'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: this.sort(data.rows)
                })
            })
    }
    del = (v) =>{
        const data = this.state.data;
        console.log(v);
        var j;
        for(var i = 0;i<data.length;i++){
            if(data[i].l_id===v.l_id){
                j=data[i];
                console.log(j);
                delete data[i];
            }
        };
        fetch('/deleteletter',{
            method:'POST',
            mode:'cors',
            body:j.l_id
        }).then(res=>{
            if(res.ok){
                return res.text();
            } else {
                throw new Error(`status:${res.status}`)
            }
        },err=>{

        }).then(d => {
            if(d === undefined || d=== '') {
                return
            }else{
                console.log(d)
            }
        }).catch(err=>{
            console.log(err)
        })
        this.setState({
            data: data.filter((item) => item.v !== v),
        });
    }
    render() {
        const {data}=this.state;
        const columns = [
            {
                title:'信件编号',
                dataIndex:'l_id',
                key:'l_id',
                sorter:(a,b)=>a.l_id-b.l_id
            },
            {
                title:'信件撰写人',
                dataIndex:'userid',
                key:'userid'
            },
            {
                title:'信件内容',
                dataIndex:'l_content',
                key:'l_content'
            },
            {
                title:'Action',
                key:'action',
                render:(v)=>(
                    <Space>
                        <a onClick={()=>this.del(v)}>Delete</a>
                    </Space>
                )
            }
        ];
        return (
            <Table 
            style={table_css} 
            dataSource={data} 
            columns={columns} 
            pagination={false} 
            bordered={true} />
        )
    }
}

export default Letter