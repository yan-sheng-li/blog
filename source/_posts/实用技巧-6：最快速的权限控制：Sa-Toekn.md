title: 实用技巧-6：最快速的权限控制：Sa-Toekn
author: 李延胜
tags:
  - 实用
categories: []
date: 2024-03-21 01:37:00
index_img: '../img/skills.jpg'
description: '轻量化权限认证，极易上手'
---
> 参考文档：https://sa-token.cc/doc.html

### 依赖

```xml
<!-- Sa-Token 权限认证，在线文档：https://sa-token.cc -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-spring-boot-starter</artifactId>
    <version>1.37.0</version>
</dependency>

<!-- 在 thymeleaf 标签中使用 Sa-Token -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-dialect-thymeleaf</artifactId>
    <version>1.37.0</version>
</dependency>
```

一般用户-角色-权限

## 配置
> 核心：

```java
package com.xxx.readverse.config;

import cn.dev33.satoken.interceptor.SaInterceptor;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.thymeleaf.dialect.SaTokenDialect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;

@Configuration
public class SaTokenConfig  implements WebMvcConfigurer {


    // 注册 Sa-Token 拦截器，打开注解式鉴权功能 
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册 Sa-Token 拦截器，打开注解式鉴权功能 
        registry.addInterceptor(new SaInterceptor()).
                addPathPatterns("/**").excludePathPatterns("/swagger-resources/**", "/webjars/**", "/v3/api-docs/**", "/swagger-ui.html/**"
                        ,"/doc.html/**","/error","/favicon.ico","doc.html", "/static/**"
                );
    }

    @Bean
    public SaTokenDialect saTokenDialect() {
        return new SaTokenDialect();
    }

    // 为 Thymeleaf 注入全局变量，以便在页面中调用 Sa-Token 的方法
    @Autowired
    private void configureThymeleafStaticVars(ThymeleafViewResolver viewResolver) {
        viewResolver.addStaticVariable("stp", StpUtil.stpLogic);
    }
}

```

> 认证与授权：把用户对应的角色和权限放到列表就行

```java
package com.xxx.readverse.config;

import cn.dev33.satoken.stp.StpInterface;
import cn.dev33.satoken.stp.StpUtil;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StpInterfaceImpl implements StpInterface {


    @Override
    public List<String> getPermissionList(Object o, String s) {
        return null;
    }

    @Override
    public List<String> getRoleList(Object o, String s) {

        ArrayList<String> arrayList = new ArrayList<>();
        String role = String.valueOf(StpUtil.getSession().get("role"));
        arrayList.add(role);
        return arrayList;
    }
}

```

> 更多内容可以参考官方文档