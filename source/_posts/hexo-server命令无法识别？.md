---
title: hexo server命令无法识别？
author: 李延胜
abbrlink: 36980
date: 2024-11-04 12:30:24
index_img: http://cdn.qiniu.liyansheng.top/img/20241105151515.png
tags:
---
![](http://cdn.qiniu.liyansheng.top/img/image-20241104123045155.png)

## 原因
 PowerShell 的执行策略限制了脚本的运行
 


## 方法一：以管理员身份更改执行策略（推荐）


1. 以管理员身份打开 PowerShell。在开始菜单中搜索 “PowerShell”，右键点击 “Windows PowerShell”，选择 “以管理员身份运行”。
2. 在打开的 PowerShell 窗口中，输入以下命令：
   - `Set-ExecutionPolicy RemoteSigned`
   - 这个命令会将执行策略更改为 “RemoteSigned”。这意味着本地创建的脚本可以运行，而从网络下载的脚本需要有数字签名才能运行。
3. 按照提示操作，输入`Y`或者`A`（`Y`表示对当前作用域更改策略，`A`表示对所有作用域更改策略），然后回车。

## 方法二：仅对当前会话更改执行策略



1. 在你运行`hexo server`
的同一个 PowerShell 窗口中（不需要以管理员身份运行），输入以下命令：
   - `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
   - 这个命令只在当前的 PowerShell 进程中绕过执行策略的限制。这样不会对整个系统的执行策略设置产生永久性影响。不过每次重新打开 PowerShell 窗口都需要重新执行此命令。
2. 修改执行策略后，再尝试运行`hexo server`命令就应该可以正常执行了。