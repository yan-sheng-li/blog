---
title: driver.js 产品导览、亮点、上下文帮助
author: 李延胜
index_img: ../img/driver.png
abbrlink: 54624
date: 2024-04-03 21:01:53
tags:
---


## 官网

https://driverjs.com/

## 依赖

```html
<script src="https://cdn.jsdelivr.net/npm/driver.js@1.0.1/dist/driver.js.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@1.0.1/dist/driver.css"/>
```

## 配置

> 注意：获取实例是：``window.driver.js.driver`

```html
    <script>
        const driver = window.driver.js.driver;
        function helpMe() {
            const driverObj = driver({
                // 开启动画
                animate: true,
                // 开启进度
                showProgress: true,
                showButtons: ['next', 'previous', 'close'],
                prevBtnText: '上一步',
                nextBtnText: '下一步',
                doneBtnText: '结束引导',
                popoverClass: 'driverjs-theme',
                allowClose: true,
                // 是否自动滚动以使高亮元素可见
                scrollIntoViewOptions: {
                    behavior: 'smooth',
                    block: 'center'
                },
                steps: [
                    {
                        element: '#index',
                        popover: {
                            title: '这是首页',
                        }
                    },
                    {
                        element: '#torental',
                        popover: {
                            title: '租车点这里',
                            description: '你可以xxxxxxxxxxx'
                        }
                    }
                    ,
                    {
                        element: '#steps',
                        popover: {
                            title: '租车流程看这里',
                            description: '你可以xxxxxxxxxxx'
                        }
                    }
                ]
            });
            driverObj.drive();
        }
    </script>
```

## 效果

![GIF 2024-4-3 18-49-24](http://cdn.qiniu.liyansheng.top/typora/GIF%202024-4-3%2018-49-24.gif)

## 其他用法

也可以使用它来显示一个简单的模态，而不突出显示任何元素。

```html
const driverObj = driver();

driverObj.highlight({
  popover: {
    description: "<img src='https://i.imgur.com/EAQhHu5.gif' style='height: 202.5px; width: 270px;' /><span style='font-size: 15px; display: block; margin-top: 10px; text-align: center;'>Yet another highlight example.</span>",
  }
})
```

![GIF 2024-4-3 18-45-51](http://cdn.qiniu.liyansheng.top/typora/GIF%202024-4-3%2018-45-51.gif)

## 附录

> 案例完整code

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.w3.org/1999/xhtml" xmlns:sa="http://www.thymeleaf.org/extras/sa-token">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>汽车租赁系统</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/my.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/driver.js@1.0.1/dist/driver.js.iife.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@1.0.1/dist/driver.css" />
    <style>
        /* Custom Styles */
        body {
            padding-top: 70px;
            padding-bottom: 50px;
            background-color: #f8f9fa;
            /* 设置页面背景色 */
            color: #343a40;
            /* 设置文本颜色 */
        }

        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
        }

        .hero {
            background-color: #007bff;
            /* 设置hero区域背景色 */
            color: #fff;
            /* 设置hero区域文本颜色 */
        }

        .about {
            background-color: #f8f9fa;
            /* 设置about区域背景色 */
        }

        .renting-process {
            background-color: #fff;
            /* 设置租车流程区域背景色 */
        }

        .renting-process .card {
            border: none;
            /* 移除卡片边框 */
            background-color: #f8f9fa;
            /* 设置卡片背景色 */
        }

        .renting-process .card-title {
            color: #007bff;
            /* 设置卡片标题颜色 */
        }
    </style>
</head>

<body>

    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top" th:fragment="navbar">
        <div class="container">
            <a class="navbar-brand" href="/">租车行者</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="/" id="index">首页</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/car/list" id="torental">车辆租赁</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/like/carList">我的收藏</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-outline-primary" href="/login" sa:notLogin>注册/登录</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-outline-success"  onclick="helpMe()">帮助引导</a>
                    </li>
                    <li class="nav-item" sa:login>
                        <a class="nav-link" href="#">
                            <img th:src="${stp.getSession().get('avatar')}" alt="User Avatar" width="32" height="32"
                                class="rounded-circle me-2" style="border: 2px solid #ccc;">
                            <span id="username" th:text="${stp.getSession().get('username')}">用户名</span>
                        </a>
                    </li>
                    <li class="nav-item" sa:login>
                        <a class="btn btn-outline-danger" href="/logout">退出</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container text-center">
            <h1 class="display-4">欢迎来到租车行者</h1>
            <p class="lead">为您提供方便、快捷的汽车租赁服务</p>
            <a href="/car/list" class="btn btn-outline-light btn-lg mb-2">立即租车</a>
        </div>
    </section>

    <!-- About Section -->
    <section class="about mt-5">
        <div class="container text-center">
            <h2 class="mb-4">关于我们</h2>
            <p class="lead">我们是一家致力于为客户提供高品质汽车租赁服务的公司。无论您是在旅途中还是需要暂时用车，我们都能满足您的需求。</p>
            <a href="#" class="btn btn-outline-primary">了解更多</a>
        </div>
    </section>

    <!-- Renting Process Section -->
    <section class="renting-process" style="margin-top:10%">
        <div class="container" id="steps">
            <h2 class="text-center mb-4">如何租车？</h2>
            <div class="row justify-content-center">
                <!-- Renting Process Cards -->
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">1.选择车辆</h5>
                            <p class="card-text">在车辆库中选择您喜欢的车辆。</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">2.提交租车申请</h5>
                            <p class="card-text">填写租车申请表格并提交。</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">3.确认订单</h5>
                            <p class="card-text">等待我们确认订单并进行付款。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer bg-light text-center">
        <div class="container">
            <span class="text-muted">&copy; 2024 汽车租赁系统</span>
        </div>
    </footer>

    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>

    <script>
        const driver = window.driver.js.driver;
        function helpMe() {
            const driverObj = driver({
                animate: true,
                showProgress: true,
                showButtons: ['next', 'previous', 'close'],
                prevBtnText: '上一步',
                nextBtnText: '下一步',
                doneBtnText: '结束引导',
                popoverClass: 'driverjs-theme',
                allowClose: true,
                // 是否自动滚动以使高亮元素可见
                scrollIntoViewOptions: {
                    behavior: 'smooth',
                    block: 'center'
                },
                steps: [
                    {
                        element: '#index',
                        popover: {
                            title: '这是首页',
                        }
                    },
                    {
                        element: '#torental',
                        popover: {
                            title: '租车点这里',
                            description: '你可以xxxxxxxxxxx'
                        }
                    }
                    ,
                    {
                        element: '#steps',
                        popover: {
                            title: '租车流程看这里',
                            description: '你可以xxxxxxxxxxx'
                        }
                    }
                ]
            });
            driverObj.drive();
        }
    </script>
</body>

</html>
```

