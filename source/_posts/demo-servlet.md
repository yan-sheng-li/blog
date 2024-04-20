---
title: Webapp：Servlet计算正实数平方根并返回
author: 李延胜
tags:
  - java
categories: []
index_img: ../img/servlet.png
description: 编写一个servlet，html页面通过表单向Servlet提交个正实数，Servlet负责计算这个数的平方根返回给客户。
abbrlink: 22005
date: 2024-03-29 00:05:00
---
## 🎈主线
> 编写一个servlet，html页面通过表单向Servlet提交个正实数，Servlet负责计算这个数的平方根返回给客户。

## 📌步骤

1️⃣使用IDEA创建Maven项目，勾选webapp（首先，确保你的 IntelliJ IDEA 中已经配置好了 Maven，并且创建了一个 Maven 项目。然后，在 Maven 项目的 src/main 目录下创建 Java 和 webapp 目录，分别用于放置 Java 源代码和 web 资源文件）

2️⃣在 src/main/java 目录下创建一个包，比如 `com.wangxinhong`。

3️⃣在 `com.wangxinhong` 包下创建一个名为 `SquareRootServlet` 的 Java 类，该类将承担 Servlet 的功能。代码如下：

```java
package com.wangxinhong;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SquareRootServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 从请求参数中获取正实数
        String input = request.getParameter("number");
        double number = Double.parseDouble(input);

        // 计算平方根
        double squareRoot = Math.sqrt(number);

        // 返回结果给客户端
        response.setContentType("text/html");
        response.getWriter().println("<html><body>");
        response.getWriter().println("The square root of " + number + " is: " + squareRoot);
        response.getWriter().println("</body></html>");
    }
}
```

4️⃣在 src/main/webapp 目录下创建一个名为 `index.html` 的 HTML 文件，用于输入正实数并提交给 Servlet。代码如下：

```html
<!DOCTYPE html>
<html>
<head>
    <title>Calculate Square Root</title>
</head>
<body>
    <form action="squareRoot" method="post">
        Enter a positive real number: <input type="text" name="number">
        <input type="submit" value="Calculate">
    </form>
</body>
</html>
```

5️⃣配置 web.xml 文件（在WEB-INF下），以将 Servlet 映射到 URL。在 webapp 目录下创建一个名为 `web.xml` 的文件，内容如下：

```xml
<!DOCTYPE web-app PUBLIC
 "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
 "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
  <display-name>Archetype Created Web Application</display-name>
  <servlet>
    <servlet-name>SquareRootServlet</servlet-name>
    <servlet-class>com.wangxinhong.SquareRootServlet</servlet-class>
  </servlet>

  <servlet-mapping>
    <servlet-name>SquareRootServlet</servlet-name>
    <url-pattern>/squareRoot</url-pattern>
  </servlet-mapping>

  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
  </welcome-file-list>
</web-app>

```

6️⃣确保项目的 `pom.xml` 中包含了 servlet-api 的依赖（⚠  或者手动导也行)。在 `<dependencies>` 标签内添加以下依赖：

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.1</version>
    <scope>provided</scope>
</dependency>
```

7️⃣构建并运行项目。你可以使用 Maven 命令 `mvn clean install` 来构建项目，然后在容器中部署运行。在浏览器中访问 `http://localhost:8080/你的项目名/` 即可看到表单页面，输入一个正实数并提交，将会计算出其平方根并显示在页面上。

## 🙌项目结构

![image-20240329005240916](http://liyansheng.top/typora/image-20240329005240916.png)

## 🎨效果图

初始：

![image-20240329004919515](http://liyansheng.top/typora/image-20240329004919515.png)

计算结果：

![image-20240329004941975](http://liyansheng.top/typora/image-20240329004941975.png)

------

## 📢tips
![](http://liyansheng.top/typora/ad.jpg)
