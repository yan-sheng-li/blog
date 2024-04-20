---
title: Dropzone.js实现文件长传
author: 李延胜
index_img: ../img/dropzone.png
abbrlink: 13815
date: 2024-04-03 21:03:48
tags:
---
### Dropzone.js实现文件长传

## 🏠官网

https://docs.dropzone.dev/

## 🥓依赖

```html
<script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" />
```

### 可选：

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

## 🎈案例

> 实现手动上传，已选待上传图片可删除，图片可预览

容器：

```html
<h1>文件上传：</h1>
<div>
    <form action="/upload" class="dropzone" id="myDropzone">
        <div class="fallback">
            <input name="file" type="file" multiple />
        </div>
    </form>
    <button id="uploadButton">上传文件</button>
</div>
```

配置：

```html
<script>
    // 配置Dropzone
    Dropzone.options.myDropzone = {
        url: "/upload",
        method: "post",
        autoProcessQueue: false, // 设置为false，表示手动触发上传
        maxFilesize: 10, // 最大文件大小，单位为MB
        maxFiles: 3, // 最大上传文件数量
        acceptedFiles: ".jpg", // 允许上传的文件类型
        addRemoveLinks: true, // 显示移除文件的链接
        dictDefaultMessage: "拖放文件到这里或点击上传", // Dropzone区域的默认消息
        dictRemoveFile: "移除文件", // 移除文件链接的文本
        init: function() {
            this.on("removedfile", function(file) {
                // 移除文件时的操作
                console.log("文件 " + file.name + " 已被移除");
            });
        }
    };
    Dropzone.autoDiscover = false;

    // 初始化Dropzone
    var myDropzone = new Dropzone("#myDropzone", {
        url: "/upload",
        autoProcessQueue: false // 设置为false，表示手动触发上传
    });

    // 手动触发上传
    document.getElementById("uploadButton").addEventListener("click", function() {
        myDropzone.processQueue();
    });
</script>
```

可选样式：

```html
<style>
    .dropzone {
        border: 2px dashed #ccc;
        border-radius: 5px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
    }

    .dropzone:hover {
        background-color: #f0f0f0;
    }

    .fallback input[type="file"] {
        display: none;
    }
</style>
```

## 🧨后端接口

```java
package com.xxx.rentcarease.controller;

import cn.dev33.satoken.util.SaResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
public class FileUploadController {

    @PostMapping("/upload")
    public SaResult uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return SaResult.error("请选择要上传的文件");
        }
        try {
            // 上传文件到 src/main/resources/static/img 目录下
            String fileName = uploadFileToDirectory(file, "src/main/resources/static/img/");

            // 上传文件到 target/classes/static/img 目录下
            uploadFileToDirectory(file, "target/classes/static/img/");
            return SaResult.ok("文件上传成功，保存路径为：" + fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return SaResult.error("文件上传失败：" + e.getMessage());
        }
    }

    private String uploadFileToDirectory(MultipartFile file, String directory) throws IOException {
        // 获取静态资源目录的绝对路径
        Path uploadPath = Paths.get(directory);

        // 生成UUID并截取其中的一部分
        UUID uuid = UUID.randomUUID();
        String uuidPart = uuid.toString().substring(0, 8); // 只取UUID的前8个字符

        // 保存文件
        byte[] bytes = file.getBytes();
        String fileName = uuidPart + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, bytes);
        return filePath.toString();
    }
}
```

## 🎨效果

![image-20240403180555042](http://liyansheng.top/typora/image-20240403180555042.png)

附：

页面完整代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文件上传测试页面</title>
    <!-- 引入 Dropzone.js 样式 -->
    <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/min/dropzone.min.css"/>
    <!-- 引入 Dropzone.js 脚本 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/min/dropzone.min.js"></script>
    <!-- 引入 jQuery 库 -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        .dropzone {
            border: 2px dashed #ccc;
            border-radius: 5px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
        }

        .dropzone:hover {
            background-color: #f0f0f0;
        }

        .fallback input[type="file"] {
            display: none;
        }
    </style>
</head>
<body>
<hr>
<!-- 文件上传区域 -->
<h1>文件上传：</h1>
<div>
    <form action="/upload" class="dropzone" id="myDropzone">
        <div class="fallback">
            <input name="file" type="file" multiple />
        </div>
    </form>
    <button id="uploadButton">上传文件</button>
</div>

<script>
    // 配置Dropzone
    Dropzone.options.myDropzone = {
        url: "/upload",
        method: "post",
        autoProcessQueue: false, // 设置为false，表示手动触发上传
        maxFilesize: 10, // 最大文件大小，单位为MB
        maxFiles: 3, // 最大上传文件数量
        acceptedFiles: ".jpg", // 允许上传的文件类型
        addRemoveLinks: true, // 显示移除文件的链接
        dictDefaultMessage: "拖放文件到这里或点击上传", // Dropzone区域的默认消息
        dictRemoveFile: "移除文件", // 移除文件链接的文本
        init: function() {
            this.on("removedfile", function(file) {
                // 移除文件时的操作
                console.log("文件 " + file.name + " 已被移除");
            });
        }
    };
    Dropzone.autoDiscover = false;

    // 初始化Dropzone
    var myDropzone = new Dropzone("#myDropzone", {
        url: "/upload",
        autoProcessQueue: false // 设置为false，表示手动触发上传
    });

    // 手动触发上传
    document.getElementById("uploadButton").addEventListener("click", function() {
        myDropzone.processQueue();
    });
</script>

</body>
</html>
```