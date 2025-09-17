---
title: Windows 下安装与使用 aria2 简记
author: 李延胜
abbrlink: 4966
date: 2025-09-17 22:42:14
index_img: http://cdn.qiniu.liyansheng.top/img/ff819eb3-088e-4ef0-a7b4-10b859964622
tags:
---
# Windows 下安装与使用 aria2 简记

最近在 Windows 上需要一个轻量级的多线程下载工具，于是重新装了一下 **aria2**。这里做个简单记录，方便以后查阅。

------

## 安装步骤（官方 zip 包方式）

1. 打开 [aria2 GitHub Release 页面](https://github.com/aria2/aria2/releases)

2. 找到最新的 Windows 版本（比如 **aria2-1.37.0-win-64bit-build1.zip**）并下载

3. 解压到一个目录，例如：

   ```
   C:\aria2\
   ```

4. 配置环境变量：

   - 右键 “此电脑” → 属性 → 高级系统设置 → 环境变量
   - 在 **系统变量** 的 `Path` 中新增 `C:\aria2\`

5. 打开新的命令提示符，输入：

   ```bash
   aria2c -v
   ```

   能看到版本号说明安装成功 

------

## 基础使用方法

### 1. 多线程下载

```bash
aria2c -s 16 -x 16 -k 1M "https://example.com/file.zip"
```

- `-s 16`：分成 16 个分片下载
- `-x 16`：每个服务器最多开 16 个连接
- `-k 1M`：每个分片大小 1MB

### 2. 断点续传

```bash
aria2c -c "https://example.com/file.zip"
```

参数 `-c` 表示继续上次的下载。

### 3. 批量下载

先把链接写在 `urls.txt` 文件中（每行一个）：

```
https://example.com/file1.zip
https://example.com/file2.zip
```

然后执行：

```bash
aria2c -i urls.txt -s 16 -x 16
```

------

## 小结

- aria2 是一个非常轻量、强大的命令行下载器
- 支持 HTTP、FTP、BT、Metalink 等多种协议
- Windows 下推荐直接用官方 zip 包，配置一次 PATH 即可全局使用

轻便好用，完全可以作为 wget/curl 的补充