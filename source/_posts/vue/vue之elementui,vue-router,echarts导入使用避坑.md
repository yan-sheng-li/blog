---
title: 'vue引入三方库ElementUi,Echarts等避坑'
author: 李延胜
index_img: 'http://cdn.qiniu.liyansheng.top/typora/image-20230318200712521.png'
tags:
  - vue
categories:
  - 前端
abbrlink: 498
date: 2022-04-18 17:43:00
---
#### 引入`vue-router`

1. 在`package.json`中添加依赖版本

    ```json
    "dependencies": {
        "vue-router": "^3.0.1",
      },
    ```

2. 然后打开终端，键入`npm install`，回车，这时会自动下载`vue-router`相关的包

3. 打开项目下的`node_modules`如果发现有`vue-router`说明相关的依赖下载好了

4. 在项目的`src`目录下新建`router`文件夹，此文件放置路由相关的核心文件，然后新建`index.js`，输入以下内容

    ```js
    import Vue from "vue";
    import Router from "vue-router";
    
    Vue.use(Router)
    
    const router=new Router({
        mode:'history',//默认是Hash 模式,地址后有一个“#”符号,这里可以根据实际需要定义使用不同的模式
        routes:[
            {
                //这里写路由配置
            },
            
        ]
    })
    
    export default router
    ```

5. 在`main.js`里面引入路由信息

    ```js
    import Vue from 'vue'
    import App from './App.vue'
    
    import router from './router/index'
    
    Vue.config.productionTip = false
    
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
    
    ```

6. 完成以上，就简单配置好了，路由出口记得用`<router-view>`，否则你会以为引入的路由没有生效(曾经踩坑.....)

#### 引入`ECharts`

方式1：直接使用命令`npm install echarts -S `

方式2：

1. 在`package.json`中添加依赖的版本

    ```js
      "dependencies": {
        "echarts": "^4.8.0",
      },
    ```

2. 打开终端，输入`npm install`，回车，这时会自动下载相关的依赖，下载完成后，在项目目录下`node_module`里看到有`echarts`说明下载好了

【使用】在vue中全局引用，在`main.js`中添加：

```js
import echarts from "echarts"
Vue.prototype.$echarts = echarts
```

后面引用就可以`this.$echarts.init()`图表，页面中使用`mounted`

#### 引入`Element-UI`

1. 在`package.json`中添加依赖的版本

    ```js
      "dependencies": {
        "element-ui": "^2.0.10"
      },
    ```

2. 打开终端，输入`npm install`，回车，这时会自动下载相关的依赖，下载完成后，在项目目录下`node_module`里看到有`element-ui`说明下载好了

3. 在`main.js`中引入使用

    ```js
    import Vue from 'vue'
    import App from './App.vue'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css' //这行别忘了，否则不生效
    
    Vue.use(ElementUI)
    
    import router from './router/index'
    
    Vue.config.productionTip = false
    
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
    
    ```

4. 这样就可以使用了

   
