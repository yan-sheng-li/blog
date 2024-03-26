title: 实用技巧-9：Springboot加持Jsp
author: 李延胜
tags:
  - 实用
categories: []
date: 2024-03-26 14:51:00
index_img: '../img/skills.jpg'
description: 'springboot支持jsp页面'
---
## 依赖

```xml
<!-- 使用JSP引擎，SpringBoot内置Tomcat没有此依赖 -->
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-jasper</artifactId>
    <scope>provided</scope>
</dependency>
        <!-- 添加JSTL标签库依赖模块 -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
 </dependency>
```
## 配置文件
```yaml
spring:
  mvc:
    view:
      prefix: /WEB-INF/page/
      suffix: .jsp
    index:
      view-name: login
```
