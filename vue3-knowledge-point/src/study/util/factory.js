import { defineAsyncComponent } from 'vue'

export default (path, delay = 2000, timeout = 5000) => {
	console.log(`../${path}`)
	return defineAsyncComponent({
		// 需要加载的组件 (应该是一个 `Promise` 对象)
		loader: () => import(`../${path}`),
		// 异步组件加载时使用的组件
		loading: {
			template:
				'<div style="height: 100%; width: 100%; display: table;"><div style="display: table-cell; vertical-align: middle; text-align: center;"><div>加载中</div></div></div>',
		},
		// 加载失败时使用的组件
		error: {
			template:
				'<div style="height: 100%; width: 100%; display: table;"><div style="display: table-cell; vertical-align: middle; text-align: center;"><div>加载错误</div></div></div>',
		},
		// 展示加载时组件的延时时间。默认值是 200 (毫秒)
		delay,
		// 如果提供了超时时间且组件加载也超时了，
		// 则使用加载失败时使用的组件。默认值是：`Infinity`
		timeout,
	})
}
