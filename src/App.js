import React ,{Component}from 'react';
import { ConfigProvider ,Radio, 
  Calendar,} from 'antd';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn'
moment.locale('en');

// class Page extends React.Component {
//   render() {
//     return (
//       <div>
//         <p >我喜欢你</p>
//         <Calendar/>
//       </div>
//     );
//   }
// // }
// // function Page(props) {
// //   return (
// //     <div className="App" >
// //      {props.children}
    
// //     </div>
// //   );
// // }
 

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       locale: enUS,
//     };
//   }
//   changeLocale = e => {
//     const localeValue = e.target.value;
//     this.setState({ locale: localeValue });
//     if (!localeValue) {
//       moment.locale('en');
//     } else {
//       moment.locale('zh-cn');
//     }
//   }
//     render(){
//     const { locale } = this.state;
//     return (
//       <div>
//         <div className="change-locale">
//           <span style={{ marginRight: 16 }}>Change locale of components: </span>
//           <Radio.Group value={locale} onChange={this.changeLocale}>
//             <Radio.Button key="en" value={enUS}>
//               English
//             </Radio.Button>
//             <Radio.Button key="cn" value={zhCN}>
//               中文
//             </Radio.Button>
//           </Radio.Group>
//         </div>
//         <ConfigProvider locale={locale}>
//           <Page  key={locale ? locale.locale : 'en'}></Page>
//           {/* <Page className="App" key={locale ? locale.locale : 'en'}> 
//           {this.props.children}
//           </Page> */}
//         </ConfigProvider>
//       </div>
//   )
// }
// }
function App (props){
    return (
    <div className="App"> 
     {props.children}
    
    </div>
  );
}
export default App
