import { Service } from '../../service'

class TodoService extends Service {
  // 获取个人代办事务列表
  getTodoData(params) {
    return this.serviceReturnJsonDate(
			{
				url: '/common/login/doLogOut',
				method: 'get',
			},
			params
		)
  }
}
export default new TodoService()