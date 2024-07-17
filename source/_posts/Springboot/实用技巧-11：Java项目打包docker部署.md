---
title: 实用技巧-11：Java项目打包docker部署
author: 李延胜
tags:
  - 实用
categories: []
index_img: http://cdn.qiniu.liyansheng.top/img/skills.jpg
description: 一键打包镜像，容器启动
abbrlink: 1939
date: 2024-03-26 15:19:00
---
> 项目导包要领如下：

pom依赖：
```
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

### dockerfile


```dockerfile
# 使用官方的 OpenJDK 作为基础镜像
FROM openjdk:latest

# 设置工作目录
WORKDIR /app

# 将本地的 JAR 文件复制到容器内
COPY your-application.jar /app/your-application.jar

# 指定容器启动时要执行的命令
CMD ["java", "-jar", "your-application.jar"]

```

### 一键启动部署



```shell
#!/bin/bash

# 定义容器名称和镜像名称【都小写】
container_name="your-container-name"
image_name="your-image-name"

# 检查容器是否已经在运行
if docker ps -a --format '{{.Names}}' | grep -q "^${container_name}$"; then
    echo "Container $container_name already exists. Removing..."
    # 停止并删除现有的容器
    docker stop $container_name && docker rm $container_name
fi

# 检查镜像是否存在
if docker images --format '{{.Repository}}' | grep -q "^${image_name}$"; then
    echo "Image $image_name already exists. Removing..."
    # 删除现有的镜像
    docker rmi $image_name
fi

# 构建镜像
echo "Building image $image_name..."
docker build -t $image_name .

# 启动容器,可自定义其他参数，如端口，数据卷，环境变量等
echo "Starting container $container_name..."
docker run -d --name $container_name $image_name

echo "Container $container_name started successfully."

```