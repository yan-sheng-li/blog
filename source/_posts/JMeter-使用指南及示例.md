---
title: JMeter 使用指南及示例
author: 李延胜
abbrlink: 62815
date: 2025-05-20 14:07:35
index_img: http://cdn.qiniu.liyansheng.top/img/20250520141456.png
tags:
---


> JMeter 是一款功能强大的开源性能测试工具，下面我将详细介绍如何使用 JMeter 进行性能测试，并提供一个完整的示例。

## 一、JMeter 基本使用步骤

### 1. 下载与安装

- 从 Apache JMeter 官网 下载最新版本。[👉点我前往](https://jmeter.apache.org/download_jmeter.cgi)
- 解压后运行 `bin/jmeter.bat` (Windows) 或 `bin/jmeter.sh` (Linux/Mac)

### 2. 创建测试计划

1. 启动 JMeter 后会自动创建一个空的测试计划
2. 右键点击"测试计划" → 添加 → 线程(用户) → 线程组

### 3. 配置线程组

- 线程数：模拟的用户数量
- Ramp-Up时间(秒)：在多长时间内启动所有线程
- 循环次数：每个线程执行测试的次数

### 4. 添加取样器

右键线程组 → 添加 → 取样器 → 选择协议类型(如 HTTP 请求)

### 5. 添加监听器

右键线程组 → 添加 → 监听器 → 选择结果展示方式(如查看结果树、聚合报告等)

## 二、JMeter 测试示例：测试 REST API

### 示例场景

测试一个 SpringBoot 提供的用户列表接口：`GET http://localhost:8086/api/user/list?pageNum=1&pageSize=10&username=&role=

### 详细步骤

1. **创建测试计划**

   - 打开 JMeter → 文件 → 新建

2. **添加线程组**

   - 右键测试计划 → 添加 → 线程(用户) → 线程组
   - 配置：
     - 线程数：50 (模拟50个并发用户)
     - Ramp-Up时间：10 (10秒内启动所有线程)
     - 循环次数：10 (每个线程执行10次请求)

3. **添加 HTTP 请求**

   - 右键线程组 → 添加 → 取样器 → HTTP 请求
   - 配置：
     - 协议：http
     - 服务器名称或IP：localhost
     - 端口号：8080
     - 方法：GET

   ![image-20250520140150083](http://cdn.qiniu.liyansheng.top/img/image-20250520140150083.png)

4. **添加 CSV 数据集配置** (参数化测试，本次演示暂不需要)

   - 右键线程组 → 添加 → 配置元件 → CSV Data Set Config
   - 配置：
     - 文件名：users.csv (包含id列表的文件)
     - 变量名称：userId
     - 其他保持默认

5. **添加 HTTP 信息头管理器** (如果需要)

   - 右键 HTTP 请求 → 添加 → 配置元件 → HTTP 信息头管理器
   - 添加需要的请求头，如：
     - Content-Type: application/json
     - Authorization: Bearer xxxx

6. **添加监听器**

   - 右键线程组 → 添加 → 监听器 → 查看结果树

   ![image-20250520140249804](http://cdn.qiniu.liyansheng.top/img/image-20250520140249804.png)

   - 右键线程组 → 添加 → 监听器 → 聚合报告

   ![image-20250520140307453](http://cdn.qiniu.liyansheng.top/img/image-20250520140307453.png)

   - 右键线程组 → 添加 → 监听器 → 图形结果

   ![image-20250520140322543](http://cdn.qiniu.liyansheng.top/img/image-20250520140322543.png)

7. **运行测试**

   - 点击工具栏上的绿色开始按钮
   - 或使用 Ctrl + R 快捷键

8. **分析结果**

   - 查看各监听器的输出：
     - 聚合报告：平均响应时间、吞吐量、错误率等
     - 图形结果：响应时间趋势图
     - 查看结果树：详细的请求/响应数据

## 三、高级功能示例

### 1. 使用正则表达式提取器

测试需要先登录获取token的场景：

1. 添加第一个 HTTP 请求(登录)
   - 方法：POST
   - 路径：/api/login
   - 请求体：{"username":"test","password":"123456"}
2. 右键登录请求 → 添加 → 后置处理器 → 正则表达式提取器
   - 引用名称：token
   - 正则表达式："token":"(.+?)"
   - 模板：1
3. 在后续请求的 HTTP 信息头管理器中添加：
   - Authorization: Bearer ${token}

### 2. 使用断言验证响应

右键 HTTP 请求 → 添加 → 断言 → 响应断言

- 选择"响应文本"
- 模式匹配规则：包含
- 模式：添加期望的响应内容

### 3. 分布式测试

1. 在多台机器上启动 JMeter-server

   - 运行 `bin/jmeter-server` (Linux/Mac) 或 `bin/jmeter-server.bat` (Windows)

2. 在控制机修改 `bin/jmeter.properties`：

   ```
   remote_hosts=192.168.1.101:1099,192.168.1.102:1099
   ```

3. 运行测试时选择"远程启动所有"

## 四、JMeter 测试结果解读

在聚合报告中，重点关注以下指标：

1. 样本(Samples)：完成的请求数量
2. 平均响应时间(Average)：所有请求的平均响应时间(ms)
3. 中位数(Median)：50%的请求响应时间低于此值
4. 90%百分位(90% Line)：90%的请求响应时间低于此值
5. 最小/最大响应时间(Min/Max)：最快和最慢的响应时间
6. 错误率(Error %)：失败请求的百分比
7. 吞吐量(Throughput)：单位时间(秒)内处理的请求数
8. 接收/发送KB/sec：网络吞吐量



> 通过以上步骤和示例，您可以开始使用 JMeter 对 SpringBoot + Vue 项目的后端 API 进行全面的性能测试。👏👏👏