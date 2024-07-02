---
title: 实用技巧-2：使用Mybatis-Plus
author: 李延胜
tags:
  - 实用
categories: []
index_img: ../img/skills.jpg
description: '基于 MyBatis 的增强工具库，它简化了 MyBatis 的开发，并提供了更多的便利功能：简化CRUD操作，通用mapper,分页插件，代码生成器等'
abbrlink: 29573
date: 2024-03-21 00:56:00
---
## 依赖：

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.3</version>
</dependency>
```

## 配置：

```yml
spring:
  datasource:
    username: root
    password: xxxx
    url: jdbc:mysql://127.0.0.1:3306/xxx?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=false
    driver-class-name: com.mysql.cj.jdbc.Driver

mybatis-plus:
# 扫描实体类
  typeAliasesPackage: com.xxx.xxx.entity
  configuration:
    map-underscore-to-camel-case: true
    auto-mapping-behavior: FULL
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  # 指定mapper文件的位置
  mapper-locations:
    classpath*:mapper/*.xml
```

## 开启分页：

```java
package com.xxx.readverse.config;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyBatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 向MyBatis-Plus的过滤器链中添加分页拦截器，需要设置数据库类型（主要用于分页方言）
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
```

## 案例：

```java
@GetMapping("/page/list")
@ApiOperation("分类-分页列表")
@ResponseBody
public SaResult getNovelCategoriesByPage(@RequestParam("page") Integer page, @RequestParam("keyword") String keyword) {
    Page<Category> pages = new Page<>(page, 5); // 每页显示5条记录
    QueryWrapper<Category> queryWrapper = new QueryWrapper<>();
    // 可以根据需要添加其他查询条件，例如关键字搜索
    queryWrapper.like("category_name", keyword);
    IPage<Category> categoryPage = novelCategoryService.page(pages, queryWrapper);
    return SaResult.data(categoryPage);
}
```