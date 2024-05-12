---
title: node升级版本到18步骤
author: 李延胜
index_img: 'http://cdn.qiniu.liyansheng.top/typora/image-20230320231314257.png'
tags:
  - node
categories:
  - 前端
abbrlink: 30537
date: 2023-03-20 23:43:00
---
### Linux

#### 方式1：apt-get

要将 Node.js 升级到最新版本（目前是版本 18），可以按照以下步骤操作：

1.首先，在命令行中使用以下命令卸载旧版本的 Node.js：

```
 sudo apt-get remove nodejs
```

2.安装 Node.js 的 PPA 存储库。在命令行中使用以下命令：

```
 curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```

3.接下来，使用以下命令安装 Node.js 18 版本：

```
sudo apt-get install -y nodejs
```

4.最后，您可以在命令行中运行以下命令来检查 Node.js 版本：

```
 node -v
```

这应该会显示您已安装的 Node.js 版本号（例如 v18.0.0）。

请注意，如果您在生产环境中使用 Node.js，则应该谨慎地升级版本，并在升级之前备份数据和配置文件。



#### 方式2：用yum安装

如果您使用的是基于Red Hat、CentOS或Fedora的Linux发行版，可以使用yum包管理器来安装Node.js。以下是在CentOS 7上安装Node.js 18版本的示例：

1. 安装EPEL存储库

由于Node.js不在默认软件仓库中，因此需要添加EPEL存储库。运行以下命令：

```
sudo yum install epel-release
```

1. 添加Node.js存储库

现在，您需要添加Node.js存储库配置文件。可以通过以下命令创建一个名为nodesource.el7.repo的文件：

```
sudo vi /etc/yum.repos.d/nodesource.el7.repo
```

然后将以下内容添加到文件中：

```
[nodesource]
name=Node.js Packages for Enterprise Linux 7 - $basearch
baseurl=https://rpm.nodesource.com/pub_18.x/el/7/$basearch
failovermethod=priority
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/NODESOURCE-GPG-SIGNING-KEY-EL

[nodesource-debuginfo]
name=Node.js Packages for Enterprise Linux 7 - $basearch - Debug
baseurl=https://rpm.nodesource.com/pub_18.x/el/7/debug-$basearch/
failovermethod=priority
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/NODESOURCE-GPG-SIGNING-KEY-EL
gpgcheck=1

[nodesource-source]
name=Node.js for Enterprise Linux 7 - $basearch - Source
baseurl=https://rpm.nodesource.com/pub_18.x/el/7/SRPMS
failovermethod=priority
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/NODESOURCE-GPG-SIGNING-KEY-EL
gpgcheck=1
```

1. 安装Node.js 18

现在，您可以使用以下命令安装Node.js 18：

```
sudo yum install nodejs
```

这将安装Node.js 18及其依赖项。完成后，您可以通过以下命令检查已安装的Node.js版本：

```
node -v
```

注意：如果您使用的是其他Linux发行版，请首先检查官方文档以获得适当的指导。

### Window

要将 Windows 上的 Node.js 升级到最新版本（目前是版本 18），可以按照以下步骤操作：

1.首先，在浏览器中打开 Node.js 的官方网站（https://nodejs.org/en/download/）。

2.在下载页面中，找到并下载适合您的 Windows 系统版本的 .msi 安装程序。请注意，对于 64 位 Windows 系统，请选择“Windows Installer (.msi)”选项。

3.打开命令提示符或 PowerShell。

4.运行以下命令卸载旧版本的 Node.js：（也可以打开卸载程序来操作）

```
npm uninstall -g node
```

`注意`:完成后，您可以检查是否已成功卸载 Node.js。打开命令行终端，并输入以下命令：node -v。如果提示“'node' 不是内部或外部命令，也不是可运行的程序 或批处理文件”，说明已经卸载成功。

5.双击下载的 .msi 文件，然后按照提示完成安装。

6.安装完成后，您可以在命令行中运行以下命令来检查 Node.js 版本：

```
node -v
```

这应该会显示您已安装的 Node.js 版本号（例如 v18.0.0）。

请注意，如果您在生产环境中使用 Node.js，则应该谨慎地升级版本，并在升级之前备份数据和配置文件。

### 补充：npm 和node是什么关系

npm 和 Node.js 之间有很紧密的关系。Node.js 是一种运行时环境，它允许 JavaScript 在服务器端运行，并且提供了许多有用的功能，如文件操作、网络通信等。而 npm 则是 Node.js 的包管理器，允许用户方便地安装、分享和管理 Node.js 模块。

在 Node.js 中，模块是可以被重复利用的代码单元，npm 上存在着大量的 Node.js 模块，开发者可以通过 npm 安装这些模块来实现自己的项目需求。同时，npm 还允许开发者发布自己的模块，供其他开发者使用。因此，npm 已经成为 Node.js 生态系统中非常重要的一部分。