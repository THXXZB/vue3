import axios from 'axios'
// 根据员工工号名字获取数据
let api = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1"
export let getData = () => axios.get(api)
// 更新密码
// 更新角色
// 获取角色