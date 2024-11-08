---
title: Nginx代理静态资源
author: 李延胜
tags:
  - nginx
categories: []
abbrlink: 29122
index_img: http://cdn.qiniu.liyansheng.top/img/20241108231749.png
date: 2024-11-08 23:13:00
---

以下是一个静态文件代理的示例配置，启用了SSL：

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    # SSL证书配置
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # 设置根目录，静态文件将从这个目录提供
    root /path/to/your/static/files;

    # 代理静态文件
    location /static/ {
        alias /path/to/your/static/files/;
        expires 30d;
        access_log /var/log/nginx/static_access.log;
    }

    # 针对特定静态资源类型设置缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        root /path/to/your/static/files;
        expires 7d;
        access_log off;
    }
}

# 配置HTTP自动跳转到HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

### 配置解析

- `listen 443 ssl`：开启443端口的SSL监听，启用HTTPS。
- `ssl_certificate` 和 `ssl_certificate_key`：指定SSL证书文件和私钥文件的路径。
- `ssl_protocols` 和 `ssl_ciphers`：设置SSL协议版本和加密套件，以确保安全性。
- `return 301 https://$server_name$request_uri;`：将HTTP请求自动重定向到HTTPS，保证所有访问都通过加密连接。

这样配置后，访问静态资源时会通过HTTPS加密传输，提升了数据的安全性。