---
title: npminstall很慢-解决方法
author: 李延胜
tags:
  - node
categories: []
abbrlink: 60362
date: 2024-11-08 13:16:00
index_img: http://cdn.qiniu.liyansheng.top/img/20241108131943.png
---
# npm install很慢-解决方法

### 更换镜像源

- **使用淘宝镜像（cnpm）**：在服务器上全局安装`cnpm`，执行`npm install -g cnpm --registry=https://registry.npm.taobao.org`。然后使用`cnpm install`替代`npm install`来安装项目依赖。
- **使用其他镜像源**：比如使用 Yarn 的镜像源（Yarn 和 npm 有类似的功能），先安装 Yarn（`npm install -g yarn`），然后配置 Yarn 镜像源（`yarn config set registry https://registry.npm.taobao.org`），再使用`yarn`安装依赖。也可以尝试使用企业内部的私有镜像源，如果有的话。

### 优化网络连接

- **检查服务器网络设置**：确保服务器网络连接稳定，没有限制或阻塞 NPM 下载的网络策略。如果服务器在防火墙后，检查防火墙规则是否允许 NPM 相关的网络访问。
- **增加网络带宽（如果可能）**：联系服务器提供商，看是否可以临时或长期增加网络带宽，特别是在安装大型依赖包或多个依赖时。

### 本地安装后上传

- 在本地开发环境（网络较好的地方）中，在项目目录下执行`npm install`，将安装好依赖的整个项目目录（除了`node_modules`目录下的二进制文件可能需要重新编译外）打包上传到服务器。这样可以避免在服务器上缓慢的下载过程，但要注意服务器环境和本地环境的一致性。







