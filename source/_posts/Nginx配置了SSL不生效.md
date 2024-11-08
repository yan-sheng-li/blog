---
title: Nginx配置了SSL不生效?
author: 李延胜
abbrlink: 37544
date: 2024-11-08 12:56:02
index_img: http://cdn.qiniu.liyansheng.top/img/20241108130152.png
tags:
---
> 小细节~
1. 先检查服务器的安全组是否开发规则，将443端口打开。
2. 检查配置文件是否书写错误
3. 注意文件读写权限
4. 注意端口占用，用`netstat -tlnp`查看接口情况

![image-20241108020236512](http://cdn.qiniu.liyansheng.top/img/image-20241108020236512.png)