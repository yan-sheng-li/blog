---
title: hexo添加live2d人物动画
author: 李延胜
index_img: >-
  https://imgconvert.csdnimg.cn/aHR0cHM6Ly9odWFqaTgudG9wL2ltZy9saXZlMmQvaGlqaWtpLmdpZg
tags:
  - hexo
categories:
  - 建站
abbrlink: 31779
date: 2023-03-18 06:22:00
---
1. 在 Hexo 博客的 根目录下新建 /live2d_models 文件夹

    ![image-20230318061123366](http://liyansheng.top/typora/image-20230318061123366.png)

2. 下载 live2d-widget.js 和对应模型库

    点击查看：[Live2D看板娘+模型预览](https://blog.csdn.net/wang_123_zy/article/details/87181892?spm=1001.2014.3001.5506)

    安装：打开根目录，命令窗口：

    ```shell
    npm install live2d-widget-model-hijiki
    ```

3. 将下载的 live2d-widget.js (在node_modules里面)和模型库文件放入 /live2d_models 文件夹中

    ![image-20230318061645524](http://liyansheng.top/typora/image-20230318061645524.png)

    ![image-20230318061711618](http://liyansheng.top/typora/image-20230318061711618.png)

    

4. 在 Hexo 主题的配置文件中添加 live2d 配置

    ```yml
    # Live2D
    ## https://github.com/EYHN/hexo-helper-live2d
    live2d:
      enable: true
      # enable: false
      scriptFrom: local # 默认
      pluginRootPath: live2dw/ # 插件在站点上的根目录(相对路径)
      pluginJsPath: lib/ # 脚本文件相对与插件根目录路径
      pluginModelPath: assets/ # 模型文件相对与插件根目录路径
      # scriptFrom: jsdelivr # jsdelivr CDN
      # scriptFrom: unpkg # unpkg CDN
      # scriptFrom: https://cdn.jsdelivr.net/npm/live2d-widget@3.x/lib/L2Dwidget.min.js # 你的自定义 url
      tagMode: false # 标签模式, 是否仅替换 live2d tag标签而非插入到所有页面中
      debug: false # 调试, 是否在控制台输出日志
      model:
        use: live2d-widget-model-hijiki
        scale: 1
        hHeadPos: 0.5
        vHeadPos: 0.618
        # use: live2d-widget-model-wanko # npm-module package name
        # use: wanko # 博客根目录/live2d_models/ 下的目录名
        # use: ./wives/wanko # 相对于博客根目录的路径
        # use: https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json # 你的自定义 url
      display:
        superSample: 1
        width: 200
        height: 300
        position: left
        hOffset: 0
        vOffset: -50
      mobile:
        show: true # 是否在移动设备上显示
        scale: 0.5 # 移动设备上的缩放       
      react:
        opacityDefault: 0.7
        opacityOnHover: 0.8
    ```

5. 执行 hexo g 和 hexo s 命令重新生成和启动博客，查看效果

![image-20230318062115087](http://liyansheng.top/typora/image-20230318062115087.png)