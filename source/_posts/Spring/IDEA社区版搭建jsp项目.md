---
title: IDEA社区版搭建jsp项目
author: 李延胜
tags:
  - web
categories:
  - 搭建
index_img: 'http://cdn.qiniu.liyansheng.top/typora/jsp_note.jpg'
permalink: idea_build_jsp/
abbrlink: 54051
date: 2023-06-12 00:20:00
---
> 近期调试jsp类的web项目较多，本期带大家回顾一下该类项目的搭建与启动，完成一个简单的demo案例！

## 1、搭建步骤

注：本次的工具是IDEA的社区版

### 1.1、模板选择

创建maven项目，选择webapp模板

![](http://cdn.qiniu.liyansheng.top/typora/image-20230611232658492.png)

以下是一个简单的示例，用于在 JSP 页面上实现增删改查操作。

### 1.2、数据库创建

```sql
CREATE TABLE person (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT NOT NULL
);
```

### 1.3、创建 Java 类

创建一个 Java 类，用于处理与数据库的交互

```java
package com.lys.dao;

import com.lys.model.Person;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PersonDao {
    private Connection connection;
    
    public PersonDao() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(
              "jdbc:mysql://localhost:3306/demo", "root", "root");
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
    
    public List<Person> getAllPersons() throws SQLException {
        List<Person> persons = new ArrayList<>();
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("SELECT * FROM person");
        while (resultSet.next()) {
            Person person = new Person();
            person.setId(resultSet.getInt("id"));
            person.setName(resultSet.getString("name"));
            person.setAge(resultSet.getInt("age"));
            persons.add(person);
        }
        return persons;
    }
    
    public Person getPersonById(int id) throws SQLException {
        PreparedStatement statement =
                connection.prepareStatement("SELECT * FROM person WHERE id = ?");
        statement.setInt(1, id);
        ResultSet resultSet = statement.executeQuery();
        if (resultSet.next()) {
            Person person = new Person();
            person.setId(resultSet.getInt("id"));
            person.setName(resultSet.getString("name"));
            person.setAge(resultSet.getInt("age"));
            return person;
        }
        return null;
    }
    
    public void addPerson(Person person) throws SQLException {
        PreparedStatement statement =
                connection.prepareStatement("INSERT INTO person (name, age) VALUES (?, ?)");
        statement.setString(1, person.getName());
        statement.setInt(2, person.getAge());
        statement.executeUpdate();
    }
    
    public void updatePerson(Person person) throws SQLException {
        PreparedStatement statement =
                connection.prepareStatement("UPDATE person SET name = ?, age = ? WHERE id = ?");
        statement.setString(1, person.getName());
        statement.setInt(2, person.getAge());
        statement.setInt(3, person.getId());
        statement.executeUpdate();
    }
    
    public void deletePersonById(int id) throws SQLException {
        PreparedStatement statement =
                connection.prepareStatement("DELETE FROM person WHERE id = ?");
        statement.setInt(1, id);
        statement.executeUpdate();
    }
    
    public void close() throws SQLException {
        connection.close();
    }
}
```

person类，表示一个人的信息

```java
public class Person {
    private int id;
    private String name;
    private int age;
    
    // 构造方法和 get/set 方法省略
    
    // 获取人的信息
    public String getInfo() {
        return "姓名：" + name + "，年龄：" + age;
    }
}
```

### 1.4、编写 JSP 页面

#### 列表

```jsp
<%@ page import="com.lys.dao.PersonDao" %>
<%@ page import="com.lys.model.Person" %>
<html>
<head>
    <title>Person Management</title>
</head>
<body>
    <h1>Person Management</h1>

    <%-- 显示所有人的信息 --%>
    <h2>All Persons:</h2>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
        </tr>
        <%
            PersonDao dao = new PersonDao();
            for (Person person : dao.getAllPersons()) {
        %>
        <tr>
            <td><%=person.getId()%></td>
            <td><%=person.getName()%></td>
            <td><%=person.getAge()%></td>
            <td>
                <a href="edit.jsp?id=<%=person.getId()%>">Edit</a>
                <a href="delete.jsp?id=<%=person.getId()%>">Delete</a>
            </td>
        </tr>
        <% } %>
    </table>

    <%-- 添加新的人员信息 --%>
    <h2>Add New Person:</h2>
    <form method="post" action="add.jsp">
        Name: <input type="text" name="name"><br>
        Age: <input type="text" name="age"><br>
        <input type="submit" value="Add">
    </form>
</body>
</html>
```

#### 增

```jsp
<%@ page import="com.lys.dao.PersonDao" %>
<%@ page import="com.lys.model.Person" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
    <title>Add Person</title>
</head>
<body>
    <h1>Add Person</h1>

    <%-- 从表单中获取新的人员信息，并写入数据库 --%>
    <%
        String name = request.getParameter("name");
        int age = Integer.parseInt(request.getParameter("age"));
        Person person = new Person();
        person.setName(name);
        person.setAge(age);
        PersonDao dao = new PersonDao();
        dao.addPerson(person);
    %>

    <%-- 显示添加成功消息，并返回所有人员信息页面 --%>
    <hr>
    <p>添加成功！</p>
    <a href="index.jsp">Back</a>
</body>
</html>
```

#### 删

```jsp
<%@ page import="com.lys.dao.PersonDao" %>
<%@ page import="com.lys.model.Person" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
    <title>Delete Person</title>
</head>
<body>
    <h1>Delete Person</h1>

    <%-- 从请求参数中获取要删除的人员 ID，并从数据库中删除该人员信息 --%>
    <%
        int id = Integer.parseInt(request.getParameter("id"));
        PersonDao dao = new PersonDao();
        dao.deletePersonById(id);
    %>

    <%-- 显示删除成功消息，并返回所有人员信息页面 --%>
    <hr>
    <p>删除成功！</p>
    <a href="index.jsp">Back</a>
</body>
</html>
```

#### 改

```jsp
<%@ page import="com.lys.dao.PersonDao" %>
<%@ page import="com.lys.model.Person" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
    <title>Update Person</title>
</head>
<body>
    <h1>Update Person</h1>

    <%-- 从表单中获取要更新的人员信息，并写入数据库 --%>
    <%
        int id = Integer.parseInt(request.getParameter("id"));
        String name = request.getParameter("name");
        int age = Integer.parseInt(request.getParameter("age"));
        Person person = new Person();
        person.setId(id);
        person.setName(name);
        person.setAge(age);
        PersonDao dao = new PersonDao();
        dao.updatePerson(person);
    %>

    <%-- 显示更新成功消息，并返回所有人员信息页面 --%>
    <hr>
    <p>更新成功！</p>
    <a href="index.jsp">Back</a>
</body>
</html>
```

## 2、部署启动



![](http://cdn.qiniu.liyansheng.top/typora/image-20230611234016428.png)

成功启动后，访问该路径即可看到页面

![](http://cdn.qiniu.liyansheng.top/typora/image-20230611234115413.png)



![](http://cdn.qiniu.liyansheng.top/typora/image-20230611233519139.png)

![](http://cdn.qiniu.liyansheng.top/typora/image-20230611233548736.png)

![](http://cdn.qiniu.liyansheng.top/typora/image-20230611233457095.png)

![](http://cdn.qiniu.liyansheng.top/typora/image-20230611233438814.png)

## 3、存在问题

页面乱码

![](http://cdn.qiniu.liyansheng.top/typora/image-20230611231657661.png)

> 在 JSP 页面中设置字符集编码为 UTF-8，这样浏览器就能正确识别和显示该编码下的汉字了。在 JSP 的头部添加以下代码即可：

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
```