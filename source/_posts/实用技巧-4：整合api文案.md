title: 实用技巧-4：整合Api文档
author: 李延胜
tags:
  - 实用
categories: []
date: 2024-03-21 01:16:00
index_img: '../img/skills.jpg'
description: '快速生成项目的api文档，在线调试，利索又好使'
---

## 加强版swagger

## 效果
![](http://liyansheng.top/typora/20240326144539.png)
## 依赖


```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.2</version> <!-- 替换为最新版本 -->
</dependency>
```

## 配置：

```java
package com.lys.sims.config;

import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig2 {
    // 创建Docket存入容器，Docket代表一个接口文档
    @Bean
    public Docket webApiConfig(){
        return new Docket(DocumentationType.SWAGGER_2)
                // 创建接口文档的具体信息
                .apiInfo(webApiInfo())
                // 创建选择器，控制哪些接口被加入文档
                .select()
                // 指定@ApiOperation标注的接口被加入文档
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                .build();
    }

    // 创建接口文档的具体信息，会显示在接口文档页面中
    private ApiInfo webApiInfo(){
        return new ApiInfoBuilder()
                // 文档标题
                .title("xxxx系统接口文档")
                // 文档描述
                .description("本文档描述了xxxx信息管理系统的接口定义")
                // 版本
                .version("1.0")
                // 联系人信息
                .contact(new Contact("程序员小李", "http://xxxxx.gitee.io", "xxxx@163.com"))
                // 版权
                .license("")
                // 版权地址
                .build();
    }
}
```

## 注意：
需要放行路径：
```java
        registry.addInterceptor(new SaInterceptor()).
                addPathPatterns("/**").excludePathPatterns("/swagger-resources/**", "/webjars/**", "/v3/api-docs/**", "/swagger-ui.html/**"
                        ,"/doc.html/**","/error","/favicon.ico","doc.html", "/static/**"
                );
                ```
访问：
http://ip:端口/doc.html

## 案例
```java
@Controller
@RequestMapping("/novel-category")
@Api(tags = "小说分类")
@CrossOrigin
public class CategoryController {

    @GetMapping("/list")
    @ApiOperation("分类列表")
    @ResponseBody
    public SaResult getNovelCategories() {
        List<Category> categoryList = novelCategoryService.list(new QueryWrapper<Category>().last("limit 12"));
        return SaResult.data(categoryList);
    }
    
    ```