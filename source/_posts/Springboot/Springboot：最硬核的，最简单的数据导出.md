---
title: "\U0001F4AASpringboot：最硬核的，最丝滑的数据导入导出"
author: 李延胜
tags:
  - 工具
categories: []
index_img: http://cdn.qiniu.liyansheng.top/img/dataExport.jpg
abbrlink: 14172
date: 2024-04-11 13:29:00
---
> 🎉 数据导出,数据导入比较常见，这次碰壁比较久，在此总结下，这个操作方式是最精简丝滑的。

![image-20240411132740576](http://cdn.qiniu.liyansheng.top/typora/image-20240411132740576.png)

## 🛠依赖

```xml
<!--		hutool-->
		<dependency>
			<groupId>cn.hutool</groupId>
			<artifactId>hutool-all</artifactId>
			<version>5.7.20</version>
		</dependency>
		<dependency>
			<groupId>org.apache.poi</groupId>
			<artifactId>poi-ooxml</artifactId>
			<version>4.1.2</version>
		</dependency>
```

## ✒写接口

### 导出

> 先查出数据放到List，然后自定义表名，一次全部导出

```java
@GetMapping("/export")
    public void export(HttpServletResponse response) throws Exception {
        // 从数据库查询出所有的数据
        List<User> list = userService.list();
 
        // 左内存操作，写出到浏览器
        ExcelWriter writer = ExcelUtil.getWriter(true);
        // 自定义标题别名
        writer.addHeaderAlias("username", "用户名");
        writer.addHeaderAlias("password", "密码");
        writer.addHeaderAlias("nickname", "昵称");
        writer.addHeaderAlias("email", "邮箱");
        writer.addHeaderAlias("phone", "电话");
        writer.addHeaderAlias("address", "地址");
        writer.addHeaderAlias("createTime", "创建时间");
        // 一次性写出list内的对象到Excel，使用默认样式，强制输出标题
        writer.write(list, true);
 
        // 设置浏览器响应的格式
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
        String fileName = URLEncoder.encode("用户信息", "UTF-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xlsx");
 
        ServletOutputStream out = response.getOutputStream();
        writer.flush(out, true);
        out.close();
        writer.close();
    }
```

### 🖼效果：

![image-20240411132621639](http://cdn.qiniu.liyansheng.top/typora/image-20240411132621639.png)

### 导入

> 导入也好理解，也是先设置对应列的映射。

```java
//    export 导入
    @PostMapping("/import")
    public Result imp(MultipartFile file) throws Exception {
        InputStream inputStream = file.getInputStream();
        ExcelReader reader = ExcelUtil.getReader(inputStream);
        reader.addHeaderAlias("用户名", "username");
        reader.addHeaderAlias("密码", "password");
        reader.addHeaderAlias("昵称", "nickname");
        reader.addHeaderAlias("邮箱", "email");
        reader.addHeaderAlias("电话", "phone");
        reader.addHeaderAlias("地址", "address");
        List<User> list = reader.readAll(User.class);
        return Result.success(userService.saveBatch(list), "'返回成功'");
    }
```

