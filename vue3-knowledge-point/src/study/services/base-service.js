/**
 * @Author: me.wangbin
 * @Date: 2020/8/4
 * @Description: 基础的服务调用类
 */

import ServiceHelper from 'axios'
import qs from 'querystring' // 对http请求所带的数据进行解析
import store from '../../store'
import router from '../../router'
import {
  ElMessage
} from 'element-plus'

class BaseService {
  constructor() {
    // 默认配置
    this.defaultOptions = {

      // window.service.service_url:http://172.16.140.151:8180
      baseURL: 'http://172.16.140.151:8180',
      // baseURL: window.service.service_url,
      // baseURL: window.VUE_APP_REMOTE_API ? 'http://127.0.0.1:8180' : window.service.service_url,
      withCredentials: true,
      timeout: 60000,
      headers: {
        common: {
          'Content-Type': 'application/json',
        },
      },
      //  自定义请求配置-transformRequest：在向服务器发送前，修改请求数据
      transformRequest: [
        (data, headers) => {
          if (headers['import-excel']) {
            this.defaultOptions.timeout = 120000
          } else {
            this.defaultOptions.timeout = 30000
          }

          if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded'
          }
          // post fix
          if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            // 序列化 key=value&key=value
            return qs.stringify(data)
          }
          if (headers['Content-Type'] === 'multipart/form-data') {
            //上传文件不做处理
            return data
          }
          return JSON.stringify(data)
        },
      ],
    }

    // axios.create(config) 对axios请求进行二次封装
    this.service = ServiceHelper.create({
      ...this.defaultOptions
    })

    // 添加请求拦截器
    this.service.interceptors.request.use(
      // config 请求配置
      // 作用：1.发送网络请求时，在界面显示一个请求的同步动画
      // 2.某些请求（比如登录（token））必须携带一些特殊的信息
      (config) => {
        // 请求成功拦截
        // 添加 token
        // console.log('-------------请求拦截token')
        let token = store.getters['user/token']
        // console.log('token1:', token)
        // 这句代码啥意思呀o((⊙﹏⊙))o
        token && (config.headers.kthectoken = token)
        // console.log('token2: ', token)
        // token && (config.url = `${config.url}?jwt_token=${token}`)

        if (config.headers['import-excel']) {
          config.timeout = 120000
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 添加响应拦截器
    this.service.interceptors.response.use(
      // response 响应结果
      (response) => {
        // 响应拦成功拦截
        const result = response.data
        // 下载文件的响应头信息
        if (
          response.headers['content-type'] &&
          response.headers['content-type'] === 'application/octet-stream'
        ) {
          const contentDisposition = response.headers['content-disposition']

          const bytes = window.atob(result) //解码使用 base-64 编码的字符串
          const ab = new ArrayBuffer(bytes.length)
          const ia = new Uint8Array(ab)
          for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i) //charCodeAt: 返回指定位置的字符的 Unicode 编码
          }

          //  Blob(binary large object)，二进制类文件大对象，是一个可以存储二进制文件的“容器”
          const blob = new Blob([ia])
          // 下载文件:https://www.cnblogs.com/liulangmao/p/4262565.html
          let fileName = '未命名'
          if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename=(.*)/)
            if (fileNameMatch.length === 2)
              fileName = decodeURI(escape(fileNameMatch[1]))
          }
          const url = window.URL.createObjectURL(blob)
          // const url = response.request.responseURL
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          link.remove()
          window.URL.revokeObjectURL(url)
          return Promise.resolve(response)
        }
        //  获取请求信息
        switch (response.status) {
          case 200:
            if (!response.data) {
              return null
            }

            if (response.data.code && response.data.code === '0') {
              const token = response.headers['kthectoken']
              if (token) {
                // 这里设置保存token
                store.commit('user/SET_TOKEN', token)
              }

              return response.data.data
            } else if (response.data.code && response.data.code === '10001') {
              if (router.currentRoute.path === '/login') {
                return
              }
              // 清空用户登录信息仓库
              store.dispatch('user/LOGOUT')
              router.replace({
                path: '/login',
              })
              ElMessage.error('token认证失败或token过期,请重新登录')
            } else {
              console.error(response)
              return Promise.reject(response.data)
            }
            break
          default:
            return Promise.reject(response)
        }
      },
      (error) => {
        if (error.message && error.message.indexOf('timeout') >= 0) {
          return Promise.reject(error)
        }
      }
    )
  }
}

export default BaseService