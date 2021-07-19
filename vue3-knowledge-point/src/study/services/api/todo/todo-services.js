// 此处暂用demand-detail api
import { Service } from '../../service'

class service extends Service {
	constructor() {
		super()
	}

	// 根据需求ID获取需求详细信息
	getDemandDetail(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/demand/getDemandDetail',
				method: 'get',
			},
			params
		)
	}

	// 根据需求类型获取拥有权限人员 
	getProcessTypeUser(params) {   
		return this.serviceReturnJsonDate(
			{
				url: '/demand/getProcessTypeUser',
				method: 'get',
			},
			params
		)
	}

	// 附件绑定需求
	addDemandFile(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/demand/addDemandFile',
				method: 'post',
			},
			params
		)
	}

	// 删除附件
	delDemandFile(params) {
		return this.serviceReturnJsonDate(
			{
				url: `/demand/delDemandFile`,
				method: 'post',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			},
			params
		)
	}

	// 根据类型获取拥有权限人员集合
	getProcessTypeUserList(params) { //id：0， type: 1;  id:100000, type:1
		return this.serviceReturnJsonDate(
			{
				url: '/demand/getProcessTypeUserList',
				method: 'get',
			},
			params
		)
	}

	// 需求转发
	doDemandForward(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/demand/doDemandForward',
				method: 'post',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			},
			params
		)
	}

	// 需求详情保存
	saveDemandDetail(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/demand/saveDemandDetail',
				method: 'post',
			},
			params
		)
	}

	// 获取产品（type 0/1 系统/模块）
	getCatalogListByItems(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/basic/catalog/getCatalogListByItems',
				method: 'get',
			},
			params
		)
	}

	// 获取项目
	getProjectListByItems(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/basic/project/getProjectListByItems',
				method: 'get',
			},
			params
		)
	}

	// 获取人员
	getUserListByItems(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/sys/user/getUserListByItems',
				method: 'get',
			},
			params
		)
	}

	// 新增答复
	addDemandProcessReply(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/demand/addDemandProcessReply',
				method: 'post',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			},
			params
		)
	}

	// 获取当前人员权限数据
	getCurrentPowerOfType(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/demand/getCurrentPowerOfType',
				method: 'get',
			},
			params
		)
	}

	// 参与人员修改接口
	doDemandUserModify(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/demand/doDemandUserModify',
				method: 'post',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			},
			params
		)
	}

	// 需求邀请
	addDemandUser(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/demand/addDemandUser',
				method: 'post',
			},
			params
		)
	}
}

export default new service()
