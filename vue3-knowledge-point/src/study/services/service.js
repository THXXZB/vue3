import BaseService from './base-service'

class service extends BaseService {
	constructor() {
		super()
	}

	serviceReturnJsonDate(opt, params) {
		if (opt.method == 'post' && !opt.headers) {
			opt.data = params
			opt.headers = {
				'Content-Type': 'application/json;charset=UTF-8',
			}
		} else if (opt.method == 'get' && !opt.headers) {
			opt.params = params
			opt.headers = {
				'Content-Type': 'application/json',
			}
		} else {
			opt.data = params
		}

		return new Promise((resolve, reject) => {
			this.service(opt)
				.then(function(data) {
					resolve(data)
				})
				.catch(function(e) {
					if (e.message && e.message.indexOf('timeout') >= 0) {
						reject('请求超时')
						return
					}
					reject(e.msg)
				})
		})
	}
}

export const Service = service

export const awaitWrap = function(promise) {
	return promise.then((data) => [data, null]).catch((err) => [null, err])
}
