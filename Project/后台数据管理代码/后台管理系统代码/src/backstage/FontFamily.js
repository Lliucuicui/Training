import React from 'react'
import {Table} from 'antd';
import 'antd/dist/antd.css';
const table_css = {
    border:"0.5px solid grey",
    margin:'20px auto',
    width:'90%',
    align:'center'
}

class FontFamily extends React.Component {
    constructor() {
        super();
        this.state = {
            data1: [],
        }
    }
    componentDidMount() {
        fetch("/fontfamily", {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json,text/plain,*/*'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data1: data.rows
                })
            })
    }
    render() {
        const columns = [
            {
                title:'字体名称',
                dataIndex:'f_name',
                key:'f_name'
            },
            {
                title:'字体编号',
                dataIndex:'f_id',
                key:'f_id',
                sorter:(a,b)=>a.f_id-b.f_id
            },
            {
                title:'字体价格',
                dataIndex:'f_price',
                key:'f_price'
            },
            {
                title:'字体日期',
                dataIndex:'f_date',
                key:'f_date'
            },
            {
                title:'字体图片',
                dataIndex:'f_img',
                key:'f_img'
            },
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
export default FontFamily 