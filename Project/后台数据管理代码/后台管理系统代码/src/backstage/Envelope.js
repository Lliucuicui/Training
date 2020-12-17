import React, { useContext, useState, useEffect, useRef }  from 'react'
import {Table,Space,Form,Input,InputNumber,Button,Popconfirm} from 'antd';
import 'antd/dist/antd.css';
const table_css = {
    border:"0.5px solid grey",
    margin:'20px auto',
    width:'90%',
    align:'center'
}
const EditableContext = React.createContext();
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
  
    const save = async (e) => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };
var pa;  
class Envelope extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.columns = [
            {
                title:'信封名称',
                dataIndex:'e_name',
                key:'e_name',
                editable: true,
            },
            {
                title:'信封编号',
                dataIndex:'e_id',
                key:'e_id',
                sorter:(a,b)=>a.e_id-b.e_id
            },
            {
                title:'信封价格',
                dataIndex:'e_price',
                key:'e_price',
                editable: true,
            },
            {
                title:'信封日期',
                dataIndex:'e_date',
                key:'e_date',
                editable: true,
            },
            {
                title:'信封图片',
                dataIndex:'e_img',
                key:'e_img',
                editable: true,
            },
            {
                title:'Action',
                key:'action',
                render:(v)=>(
                    <Space>
                        <a onClick={()=>this.del(v)}>Delete</a>
                        <a onClick={()=>this.update(v)}>Update</a>
                    </Space>
                )
            }
        ];
    }
    componentDidMount() {
        fetch("/envelope", {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json,text/plain,*/*'
            }
        }).then(res => res.json())
        .then(data => {
            this.setState({
                data: data.rows,
                count:data.rows.length+1
            })
        })
    }
    update = (v) =>{
        const data = this.state.data;
        console.log(v);
        var j;
        for(var i = 0;i<data.length;i++){
            if(data[i].e_id===v.e_id){
                j=data[i];
                console.log(j);
                delete data[i];
            }
        };
        fetch('/updateenvelope',{
            method:'POST',
            mode:'cors',
            body: JSON.stringify(j)
        }).then(res=>{
            if(res.ok){
                console.log(j)
                return res;
            } else {
                throw new Error(`status:${res.status}`)
            }
        },err=>{

        }).then(d => {
            if(d === undefined || d=== '') {
                return
            }else{
                console.log(j)
                console.log(d)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    del = (v) =>{
        const data = this.state.data;
        console.log(v);
        var j;
        for(var i = 0;i<data.length;i++){
            if(data[i].e_id===v.e_id){
                j=data[i];
                console.log(j);
                delete data[i];
            }
        };
        fetch('/deleteenvelope',{
            method:'POST',
            mode:'cors',
            body:j.e_id
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
    handleAdd = () => {
        const { count, data } = this.state;
        const newData = {
            e_name: '小王子_06',
            e_id: count,
            e_price: '0.5',
            e_date: 30,
            e_img:'https://s3.ax1x.com/2020/11/30/DgOb9I.jpg'
        };
        fetch('/postenvelope',{
            method:'POST',
            mode:'cors',
            body: JSON.stringify(newData)
        }).then(res=>{
            if(res.ok){
                console.log(newData)
                return res;
            } else {
                throw new Error(`status:${res.status}`)
            }
        },err=>{

        }).then(d => {
            if(d === undefined || d=== '') {
                return
            }else{
                console.log(newData)
                console.log(d)
            }
        }).catch(err=>{
            console.log(err)
        })
        this.setState({
            data: [...data, newData],
            count: count + 1,
        });
    };
    handleSave = (row) => {
        const newData = [...this.state.data];
        const index = newData.findIndex((item) => row === item);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            data: newData,
        });
    };
    render() {
        const {data}=this.state;
        const components = {
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          };
          const columns = this.columns.map((col) => {
            if (!col.editable) {
              return col;
            }
      
            return {
              ...col,
              onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: this.handleSave,
              }),
            };
          });
        return (
            <div>
            <Button
                onClick={this.handleAdd}
                type="primary"
                style={{
                    float:'left',
                    marginBottom: 16,
                    marginTop:20,
                    marginLeft:54,

                }}
                >
                Add a row
            </Button>
            <Table 
             components={components}
             rowClassName={() => 'editable-row'}
            style={table_css} 
            dataSource={data} 
            columns={columns} 
            pagination={false} 
            bordered={true} /></div>
        )
    }
}

export default Envelope