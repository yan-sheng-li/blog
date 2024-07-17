---
title: 实用技法-1：快速起Springboot项目
author: 李延胜
tags:
  - 实用
categories: []
index_img: http://cdn.qiniu.liyansheng.top/img/skills.jpg
abbrlink: 13170
date: 2024-03-21 00:32:00
---
## 1.创建maven项目，修改pom，继承springboot依赖

```xml
<parent>
    <artifactId>spring-boot-parent</artifactId>
    <groupId>org.springframework.boot</groupId>
    <version>2.3.0.RELEASE</version>
</parent>
```

## 2.指定远程资源库

```xml
<repositories>
    <repository>
        <id>public</id>
        <name>aliyun nexus</name>
        <url>https://maven.aliyun.com/repository/public</url>
        <releases>
            <enabled>true</enabled>
        </releases>
    </repository>
</repositories>

<pluginRepositories>
    <pluginRepository>
        <id>public</id>
        <name>aliyun nexus</name>
        <url>https://maven.aliyun.com/repository/public</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </pluginRepository>
</pluginRepositories>
```

## 3.集成打jar插件
```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.3.0.RELEASE</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```
## 4.常用套件
### lombk
```xml
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
```
使用：
```java
@Getter
@Setter
@TableName("category")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "category_id", type = IdType.AUTO)
    private Integer categoryId;

    private String categoryName;


}
```

### test测试
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
```
使用：
```java
@SpringBootTest(classes = xxxApplication.class)
@RunWith(SpringRunner.class)
public class DemoTest {

    @Test
    public void test(){
   		xxx
    }
}
```
### web
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
```

### 热部署
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <optional>true</optional>
        </dependency>
```
开启：

![upload successful](../images/pasted-0.png)