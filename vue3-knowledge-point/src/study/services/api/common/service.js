import { Service } from '../../service'

class service extends Service {
	constructor() {
		super()
	}

	// 通过字典类型获取字典数据
	getDictionaryByType(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/common/getDictionaryByType',
				method: 'get',
			},
			params
		)
	}

	// 上传文件
	doFileUpload(params) {
		return this.serviceReturnJsonDate(
			{
				url: '/common/file/doFileUpload',
				method: 'post',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
			params
		)
	}

	// 下载文件
	downloadFile(fileId) {
		return this.service({
			url: `/common/file/${fileId}`,
			method: 'get',
		})
	}

	// 获取用户菜单
	getMenuInfoByUerId(params) {
		return this.serviceReturnJsonDate(
			{
				url: `/sys/menu/getMenuInfoByUerId`,
				method: 'get',
			},
			params
		)
	}

	// 获取系统参数
	getParameterOrAncestorParameter(params) {
		return this.serviceReturnJsonDate(
			{
				url: `/common/getParameterOrAncestorParameter`,
				method: 'get',
			},
			params
		)
	}
	//获取当前用户权限范围内可以操作的机构列表
	getCurUserPermissionScopeBranchIds() {
        return this.service({
            url: '/common/getCurUserPermissionScopeBranchIds',
            method: 'get',
        })
    }
		// 获取系统参数
		getParameter(params) {
			return this.serviceReturnJsonDate(
				{
					url: `/common/getParameter`,
					method: 'get',
				},
				params
			)
		}

	doMsgCheck() {
		return this.serviceReturnJsonDate({
				url: '/common/doMsgCheck',
				method: 'post'
			}
		)
	}
}

export default new service()
