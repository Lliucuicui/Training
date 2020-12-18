import React from 'react'
import {Table} from 'antd';
import 'antd/dist/antd.css';
const table_css = {
    border:"0.5px solid grey",
    margin:'20px auto',
    width:'90%',
    align:'center'
}

class Users extends React.Component {
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
                if(arr[x].userid<arr[y].userid){
                    temp = arr[x];
                    arr[x]=arr[y];
                    arr[y]=temp; 
                }
            }
        }
        return arr;
    }
    componentDidMount() {
        fetch("/users", {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json,text/plain,*/*'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data1: this.sort(data.rows)
                })
            })
    }
    render() {
        const columns = [
            {
                title:'昵称',
                dataIndex:'username',
                key:'username'
            },
            {
                title:'ID',
                dataIndex:'userid',
                key:'userid',
                sorter:(a,b)=>a.userid-b.userid
            },
            {
                title:'OPENID',
                dataIndex:'openid',
                key:'openid'
            },
            {
                title:'个签',
                dataIndex:'signal',
                key:'signal'
            },
            {
                title:'生日',
                dataIndex:'birth',
                key:'生日'
            },
            {
                title:'性别',
                dataIndex:'usersex',
                key:'性别'
            }
        ];
        console.log(this.state.data1);
        const data = this.state.data1;
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
export default Users