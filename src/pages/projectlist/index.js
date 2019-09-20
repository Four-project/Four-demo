import React,{Component}from 'react'
import {Card,Table,Button ,Pagination,Spin,Popconfirm,message} from 'antd'
import './index.less'
import ProjectUpdate from '../projectupdate'
class Projectlist extends Component{
  constructor(){
    super()
    this.state={
      dataSource:[
        // {title:'li',intro:'热菜',img:'xxx',price:'12',discount_price:10,type:'配饰'},
    ],
    page:1,
    pageSize:9,
    type:null,
    total:0,
    putaway:null,
    loadding:true,
    updateShow:false,//修改模态框的显示和隐藏
    record:{}//要修改的数据
    }
  }
  columns=[
    {title:'商品名称',
     dataIndex:'title',
     key:'title',
     width:200,
     fixed:'left'
    },
    {title:'描述',
     dataIndex:'intro',
     key:'intro',
     width:230,
     fixed:'left'
    },
    {title:'图片',
     dataIndex:'img',
     key:'img',
     width:100,
     render(data){
      // console.log(data)
      return(<img width='80' height='120' src={`http://localhost:8080${data}`}/>)
     }
    },
    {title:'分类',
     dataIndex:'type',
     key:'type',
     width:100,
     filters:[{ text: '男装', value: '男装' },
               { text: '女装', value: '女装' },
               { text: '鞋子', value: '鞋子' },
               { text: '箱包', value: '箱包' },
               { text: '配饰', value: '配饰' }
              ],
     filterMultiple: false,
    },
    {title:'原价',
     dataIndex:'price',
     key:'price',
     width:100
    },
    {title:'现价',
     dataIndex:'discount_price',
     key:'discount_price',
     width:100
    },
    {title:'是否下架',
     dataIndex:'putaway',
     key:'putaway',
     width:100,
     filters:[{ text: '是', value: '是' },
               { text: '否', value: '否' }
              ],
     filterMultiple: false,
    },
    {title:'操作',
     dataIndex:'action',
     key:'action',
     width:150,
     fixed:'right', 
     render:(text,record)=>{
      //  console.log('删除数据',text,record._id)
      return(
        <div height='130'>
          <Button type='primary' size='small' onClick={this.update.bind(this,record)}>修改</Button>
          <Popconfirm
            title="你确定要删除么?"
            onConfirm={this.confirmDel.bind(this,record._id)}
          >
            <Button type='danger' size='small'>删除</Button>
          </Popconfirm>
          
        </div>
      )
     }
    }
  ]
  update(record){
    // console.log('弹出模态框',record)
    this.setState({updateShow:!this.state.updateShow,record:record})
  }
  confirmDel=(id)=>{//删除弹出的气泡确认框
    // console.log(id)
    let {page,pageSize,type,putaway}=this.state
    this.$axios.get('/hehe/admin/project/del?_id='+id)
    .then((data)=>{
      if(data.err===0){
        message.success('删除成功')
        this.initData(page,pageSize,type,putaway)
      }else{
        message.error('删除失败请重试')
      }
    })
  }
  pageChange=(page,pageSize)=>{//页面改变触发的事件
    this.setState({page:page})
    this.initData(page,this.state.pageSize,this.state.type,this.state.putaway)   
  }
  typeChange=(pagination, filters, sorter)=>{
    //参数是有顺序的，filters参数是第二项
    console.log("filter打印",pagination, filters, sorter)
    let {pageSize,type,putaway}=this.state
    let type1
    if(filters.type){
      console.log('类型',filters)
      if(filters.type.length!=0){
        type1=filters.type[0] 
      }else{
        type1=type
      }
    }else{
      console.log('未选中')
      type1=type
    }
    console.log({pageSize,type1,putaway})
    this.initData(1,pageSize,type1,putaway)
  }
  initData=(page,pageSize,type,putaway)=>{//axios请求数据
    this.setState({loadding:true})
    let url=''
    if(type && putaway){
      url=`/hehe/admin/project/findByTypePage?page=${page}&pageSize=${pageSize}&type=${type}&putaway=${putaway}`
    }else if(type){
      url=`/hehe/admin/project/findByTypePage?page=${page}&pageSize=${pageSize}&type=${type}`
    }else if(putaway){
      url=`/hehe/admin/project/findByTypePage?page=${page}&pageSize=${pageSize}&putaway=${putaway}`
    }else{
      url=`/hehe/admin/project/findByTypePage?page=${page}&pageSize=${pageSize}`
    }
    this.$axios.get(url)
    .then((data)=>{
      console.log(data)
      if(data.err===0){
        this.setState({dataSource:data.list,total:data.total,loadding:false})
      }
    })
  }
  refresh=()=>{
    //列表的刷新方法1、关掉模态框2、刷新页面
    this.setState({updateShow:false})//关闭模态框
    console.log(this.state.page,this.state.pageSize,this.state.type,this.state.putaway)
    this.initData(this.state.page,this.state.pageSize,this.state.type,this.state.putaway)//请求新的数据刷新页面
  }
  componentDidMount(){
    let {page,pageSize,type,putaway}=this.state
    console.log({page,pageSize,type,putaway})
    this.initData(page,pageSize,type,putaway)
  }
  render(){
    let {pageSize,total,loadding,updateShow,record}=this.state
    return(
      <div>
        <Card className='food-container'>
          <Spin tip="数据加载中"
                spinning={loadding}
          >
            {!updateShow||<ProjectUpdate record={record} refreshfun={this.refresh}></ProjectUpdate>}
            <Table onChange={this.typeChange} pagination={false} className='test' dataSource={this.state.dataSource} columns={this.columns} scroll={{x:1300,y:440}}/>
          </Spin>
          <span>数量统计 : </span>  <span>{total}</span>
          <Pagination simple defaultCurrent={1} total={total} pageSize={pageSize} onChange={this.pageChange}/>
        </Card>
      </div>
    )
  }
}
export default Projectlist