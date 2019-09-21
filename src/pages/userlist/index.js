import React,{Component} from 'react'
import { Table ,Pagination,Button ,Card, message,Popconfirm,Input,Select } from 'antd';
import UserUpdate from '../userUpdate/index'
import './index.less'
import { Spin, Icon } from 'antd';

// import {Card,Table,Pagination,Spin,Popconfirm,message} from 'antd'
const { Option } = Select;
class UserList extends Component {
  constructor(){
    super()
    this.state={
      dataSource:[],
      page:1,
      pageSize:8,
      total:0,
      selectedRowKeys: [],
      updateShow:false, //修改模态框额显示
      record:{},  //要修改的数据
      status:"",
      type:"",
      name:"",
      num:"",
      tel:"",
      station:"",
      kword:'',
      loading:true
    }
  }
  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '电话',
      dataIndex: 'tel',
      key: 'tel',
    },
    
    {
      title: '工号',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: '岗位',
      dataIndex: 'station',
      key: 'station',
    },
    {
      title: '角色',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render:(txt,record)=>{
        // console.log("a",record)
        return(
          <div>
            
            <Button className="button" type="primary" size='small' onClick={this.update.bind(this,record)}>修改</Button>
            <Popconfirm
              placement="top"
              title={'您确认删除吗'}
              onConfirm={this.del.bind(this,record)}
              okText="Yes"
              cancelText="No"
            >
                <Button className="button" type="danger" size='small'>删除</Button>
            </Popconfirm>
            <Button size='small' type="primary" className="button">重置密码</Button>
          </div>
        )
      }
    },
  ];
  toadd=()=>{
    this.props.history.push('/admin/owner/useradd')
  }
  todel=()=>{
    let {selectedRowKeys}=this.state
    console.log(selectedRowKeys)
    // this.$axios.get(`/hehe/admin/owner/del?_id=${selectedRowKeys}`)
    // .then((data)=>{
    //     if(data.err===0){
    //       message.success("删除成功")
    //       this.initData(this.state.page,this.state.pageSize)
    //     }else{
    //       message.error('删除失败请重试')
    //     }
    //   })
  }
  update(record){
      this.setState({updateShow:!this.state.updateShow,record:record})
  }
  del=(record)=>{
    console.log(record)
    this.$axios.get(`/hehe/admin/owner/del?_id=${record._id}`)
    .then((data)=>{
        if(data.err===0){
          message.success("删除成功")
          this.initData(this.state.page,this.state.pageSize)
        }else{
          message.error('删除失败请重试')
        }
      })
      // this.setState({page,pageSize})
  }
  refresh=()=>{
    //列表的刷新方法 1.关掉模态框 2.刷新页面
   this.setState({updateShow:false})
  //  请求新的数据刷新页面
   this.initData(this.state.page,this.state.pageSize)
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
    
  };
  onChangeInput = e => {
    // this.setState({status:status,type:type,name:name,num:num,tel:tel,station:station})
    console.log("wert");
  };
  find=(page)=>{
    console.log(page)
    let {kword,pageSize} = this.state;
    this.$axios.get(`/hehe/admin/owner/findBykw?kw=${kword}&page=${page}&pageSize=${pageSize}`)
    .then((data)=>{
      if(data.err===0){
        console.log(data)
        this.setState({dataSource:data.list,total:data.total})
      }
    })
  }
  onChange = page=> {
    this.setState({
      page: page,
    });
    this.initData(page,this.state.pageSize)
  }
  initData=(page,pageSize)=>{
    this.$axios.get(`/hehe/admin/owner/findByTypePage?page=${page}&pageSize=${pageSize}`)
    .then((data)=>{
      if(data.err===0){
        this.setState({dataSource:data.list,total:data.total,loading:false})
      }
    })
  }
  componentDidMount(){
    let {page,pageSize}=this.state
    this.initData(page,pageSize)
  }
  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 ,color:'#ccc'}} spin />;
    const { selectedRowKeys,kword,_id,loading} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: 'all-data',
          text: 'Select All Data',
          onSelect: () => {
            this.setState({
              selectedRowKeys: [...Array(46).keys()], // 0...45
            });
          },
        },
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return(     
      
      <Card>
        <div className="top">
          <Input className="input" placeholder="查询关键字" size="default" style={{ width: 200 }} allowClear value={kword} onChange={this.onChangeInput=(e)=>{
            this.setState({kword:e.target.value})
          }} />
          <Button className="input" onClick={this.find.bind(this,1)}>查询</Button>
          <Button onClick={this.toadd} className="add">新增</Button>
        </div>
        {!this.state.updateShow||<UserUpdate record={this.state.record} refreshfun={this.refresh}></UserUpdate>}
        <Spin indicator={antIcon} spinning={loading}>
        <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.state.dataSource} pagination={false}/>
        </Spin>
        <Button onClick={this.todel} className="add">全部删除</Button>
        <Pagination page={this.state.page} onChange={this.onChange} total={this.state.total} pageSize={this.state.pageSize}/>
      </Card>);
  }
}


export  default UserList