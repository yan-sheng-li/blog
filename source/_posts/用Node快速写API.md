---
title: 用Node快速写API
author: 李延胜
tags:
  - node
categories: []
abbrlink: 52388
date: 2024-11-08 13:14:00
index_img: http://cdn.qiniu.liyansheng.top/img/20241108131733.png
---
# 快速写API

> 以 Express 框架为例

首先，确保已经安装了 Node.js，然后新建一个文件夹，在命令行中进入该文件夹后执行`npm init -y`初始化项目，接着安装 Express：`npm install express`。

创建一个名为`app.js`的文件，内容如下：

```javascript
const express = require('express');
const app = express();
const port = 8081;
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// 假设你的HTML文件在项目目录下的public文件夹中的index.html
app.get('/index', (req, res) => {
    const htmlPath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(htmlPath);
});

// 创建一个简单的GET请求API
app.get('/api/greet', (req, res) => {
    res.send('Hello, huangjinyan!');
});

// 创建一个返回JSON数据的API
app.get('/api/user', (req, res) => {
    const user = {
        name: "李明~",
        age: 30
    };
    res.json(user);
});

// 下载文件
app.get('/api/download', (req, res) => {
    const filePath = path.join(__dirname, 'files', 'example.txt');
    const fileName = 'example.txt';
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});



// 启动服务器并监听端口
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

```

在上述代码中：

1. 引入`express`模块并创建一个`app`实例。
2. 定义了一个端口号`3000`。
3. 通过`app.get`方法创建了一个`GET`请求类型的 API。当访问`/api/greet`路径时，服务器会返回`Hello, World!`的响应。
4. 当访问`/api/user`路径时，服务器会返回一个包含用户信息的 JSON 对象。
5. 亦可打开指定网页
6. 下载文件
7. 最后，使用`app.listen`启动服务器并监听指定端口，在控制台打印服务器运行的地址。

![image-20241107132444122](http://cdn.qiniu.liyansheng.top/img/image-20241107132444122.png)