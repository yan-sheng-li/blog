---
title: hexo集成admin插件
author: 李延胜
index_img: 'http://cdn.qiniu.liyansheng.top/typora/image-20230318175521229.png'
tags:
  - hexo
categories:
  - 建站
abbrlink: 37787
date: 2023-03-18 05:57:00
---
> **Hexo Admin** 插件使你可以在浏览器中管理 Hexo 博客，包括新建、编辑和删除文章、页面和草稿。管理员可以在后台轻松地完成这些任务，而不需要进入命令行。

### 步骤

- 安装 Hexo Admin 插件

在 Hexo 博客的根目录中，使用以下命令安装 Hexo Admin 插件：

```ada
npm install --save hexo-admin
```
![image-20230318060055736](http://cdn.qiniu.liyansheng.top/typora/image-20230318060055736.png)

- 修改 _config.yml 文件

打开 Hexo 博客的 _config.yml 文件，找到 `# Extensions` 部分，然后添加以下内容：

```yaml
admin:
  username: admin
  password_hash: 098f6bcd4621d373cade4e832627b4f6
  # 更改上面的密码时，请使用以下命令来生成新密码的 hash 值
  # printf "你的密码" | openssl sha1
  # 根据提示输入密码
```

密码哈希值可由下面的命令生成：

```1c
printf "your password" | openssl sha1
```

其中 `your password` 为你的密码。

将输出的密码哈希值复制到 `password_hash` 中。

另外也可以使用python生成密码哈希值：

```python
import hashlib

password = "your password"
hash_object = hashlib.sha256(password.encode('utf-8'))
hex_dig = hash_object.hexdigest()
print(hex_dig)
```

Hexo Admin 插件默认用户名为 `admin`，如果需要修改用户名，请将 `username` 修改为你所需的用户名。

- 启动 Hexo Server

使用以下命令启动 Hexo Server：

```axapta
hexo server
```

### 测试

打开管理员页面

在浏览器中访问 `http://localhost:4000/admin`，输入用户名和密码即可登录管理员页面。

在管理员页面中，你可以轻松地管理博客，包括创建、编辑和删除文章、页面和草稿。

需要注意的是，Hexo Admin 插件并不适用于所有的 Hexo 主题。如果主题无法与 Hexo Admin 插件兼容，请查看主题文档以获取管理博客的其他方法。

![image-20230318055623988](http://cdn.qiniu.liyansheng.top/typora/image-20230318055623988.png)

