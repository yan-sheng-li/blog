---
title: 上机实验-servlet-注册-逻辑
author: 李延胜
abbrlink: 5860
hide: true
date: 2024-06-13 11:00:35
tags:
---
## 要求

![](http://cdn.qiniu.liyansheng.top/img/20240613103038.png)

## 实操

> 创建项目

![](http://cdn.qiniu.liyansheng.top/img/20240613103216.png)

> 项目结构

![](http://cdn.qiniu.liyansheng.top/img/20240613103341.png)

> 依赖包，在`pom.xml`里面声明

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.example</groupId>
  <artifactId>Jsp_register</artifactId>
  <packaging>war</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>Jsp_register Maven Webapp</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
    <!-- Servlet API -->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>4.0.1</version>
      <scope>provided</scope>
    </dependency>

    <!-- JSP API -->
    <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>javax.servlet.jsp-api</artifactId>
      <version>2.3.3</version>
      <scope>provided</scope>
    </dependency>

    <!-- JSTL -->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>

    <!-- Servlet Implementation (optional, usually provided by your server) -->
    <dependency>
      <groupId>org.apache.tomcat</groupId>
      <artifactId>tomcat-servlet-api</artifactId>
      <version>9.0.41</version>
      <scope>provided</scope>
    </dependency>

    <!-- JSP Implementation (optional, usually provided by your server) -->
    <dependency>
      <groupId>org.apache.tomcat</groupId>
      <artifactId>tomcat-jasper</artifactId>
      <version>9.0.41</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>
  <build>
    <finalName>Jsp_register</finalName>
  </build>
</project>
```

> model层

**User.java**

```java
package wangxinhong.model;

public class User {
    private String username;
    private String password;

    // 构造器
    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    // getter 和 setter 方法
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
```

**UserDao.java**

```java
package wangxinhong.model;

public class UserDao {

    public int save(User user) {
        System.out.println("save user");
        System.out.println(user);
        return 1;
    }
}
```

> Controller层

**RegisterServlet.java**

```java
package wangxinhong.controller;

import wangxinhong.model.User;
import wangxinhong.model.UserDao;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 从请求中获取表单参数
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // 创建用户对象
        User user = new User(username, password);

        UserDao userDao = new UserDao();
        int save = userDao.save(user);

        response.setContentType("text/html; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().println("<html><body>");
        response.getWriter().println("</body></html>");
        if (save > 0) {
            response.getWriter().println("注册成功~");
        } else {
            response.getWriter().println("注册失败~");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect("register.jsp");
    }
}
```

> 视图层

**register.jsp**

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>软工2206030306王馨弘</title> <!-- 将此处修改为你的学号和姓名 -->
</head>
<body>
    <h2>用户注册</h2>
    <form action="register" method="post">
        <label for="username">用户名:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="password">密码:</label>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit">注册</button>
    </form>
    <br>
</body>
</html>
```

## 效果
> 启动项目

![](http://cdn.qiniu.liyansheng.top/img/20240613104124.png)

> 访问http://localhost:8080/register

![](http://cdn.qiniu.liyansheng.top/img/20240613103958.png)

> 提交数据

![](http://cdn.qiniu.liyansheng.top/img/20240613104222.png)

## 参考源码

👉https://gitee.com/yan-sheng-li/demo_jsp_register