---
title: GPG公钥生成问题-解决(Linux)
date: 2023-03-17 1:18:29
tags: 工具
index_img: http://liyansheng.top/typora/image-20230318181342082.png
---
> 今天要用到GPG公钥，在码云上，于是按照官方的步骤去操作，软件我下载安装好了，就是不好使，遇到的问题挺多。

## 问题

下载地址：[Gpg4win](https://gpg4win.org/)

![image-20230317005007100](http://liyansheng.top/typora/image-20230317005007100.png)这个工具安装，打开后提示报错

如下：

![image-20230317005100081](http://liyansheng.top/typora/image-20230317005100081.png)

点OK后

![image-20230317005129974](http://liyansheng.top/typora/image-20230317005129974.png)

于是我找了网上的一些解决方案，还是不行

我也尝试在不同的硬盘上重装了几次，还是不行

> 换种方式，既然在**win**上不好使，那就上**Linux**上试试

## 解决

1. 在 Linux 终端中安装 GnuPG 工具。可以运行以下命令：

    ```routeros
    yum install gnupg 
    ```

2. 打开终端并运行以下命令，生成密钥对：

    ```ada
    gpg --gen-key
    ```

3. 根据提示，选择要使用的加密算法和密钥长度。选择默认选项即可。

4. 输入你的用户名、电子邮件地址和密码。这些信息将与你的密钥关联，并最终生成公钥和私钥。

5. 在生成过程中，系统会提示你随机移动鼠标或者其他的随机操作，以增加生成密钥的随机性和安全性。

6. GPG 工具将生成公钥和私钥。可以使用以下命令查看你的公钥：

    ```ada
    gpg --list-keys
    ```

7. 导出公钥，以便在其他设备上使用：

    ```stylus
    gpg --armor --export your-email-address > publickey.asc
    ```

    将 `your-email-address` 替换为你在生成密钥时使用的电子邮件地址。

    这会将公钥导出为 ASCII 格式，并将其保存在名为 `publickey.asc` 的文件中。

8. 复制并粘贴 ASCII 格式的公钥到需要使用的地方，比如代码托管网站、电子邮件签名等。

## 测试

将上述的publickey.asc里面的全部内容粘贴到下方的公钥框，点确定即可成功添加！

![image-20230317010046157](http://liyansheng.top/typora/image-20230317010046157.png)



