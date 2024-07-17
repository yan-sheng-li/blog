---
title: 基于Spring Boot与MyBatis的租车行者网站开发实践
author: 李延胜
description: >-
  本文介绍了基于Spring 
  Boot与MyBatis的租车行者网站的开发实践。该网站旨在满足现代社会用户对便捷出行的需求，提供了诸多功能，包括登录注册、车辆列表与详情展示、评论区、收藏、下单约车、车辆出租等。通过采用Spring 
  Boot、MyBatis、MySQL和Sa-token等技术，实现了快速开发、数据库交互、权限管理等功能。开发过程中，作者深刻体会到了Spring
  Boot与MyBatis的强大之处，并总结了开发心得。本文旨在分享作者在开发租车行者网站过程中的经验与感悟，为同类项目的开发提供参考与借鉴。
tags:
  - 作品
categories: []
index_img: http://cdn.qiniu.liyansheng.top/img/car.png
abbrlink: 34106
date: 2024-04-10 00:22:00
---

> 随着城市交通的不断发展和人们对便捷出行的需求不断增加，租车行业逐渐成为了一种流行的出行方式。在这个背景下，为了满足用户的需求，我开发了一个租车行者网站，采用了Spring Boot与MyBatis作为主要的开发技术，通过MySQL作为数据存储，结合Sa-token进行权限管理，实现了一系列功能。

## 背景介绍

在现代社会，人们对出行的需求越来越多样化，传统的出行方式已经无法满足人们的需求。租车行业应运而生，为人们提供了一种便捷灵活的出行选择。为了更好地满足用户的需求，我决定开发一个租车行者网站，让用户可以方便地租车、查看车辆信息、进行评论等操作。

## 技术栈

- Spring Boot：作为一个快速开发框架，Spring Boot提供了诸多便利，可以快速搭建起一个健壮的后端服务。
- MyBatis：作为一个优秀的持久层框架，MyBatis可以帮助我们更方便地与数据库进行交互，提高开发效率。
- MySQL：作为关系型数据库，MySQL具有成熟稳定的特点，能够满足网站的数据存储需求。
- Sa-token：作为一个轻量级的权限框架，Sa-token提供了简单易用的权限管理功能，帮助我们保障网站的安全性。

## 已实现功能

1. **登录与注册**：用户可以通过注册账号并登录系统，享受更多个性化的服务。
2. **首页**：展示网站的基本信息，让用户快速了解网站的特色。
3. **使用引导**：提供用户使用网站的操作指南，帮助用户快速上手。
4. **车列表与车详情**：展示可租用车辆的列表，并提供详细的车辆信息，方便用户选择。
5. **评论区**：用户可以对租用过的车辆进行评价，分享使用体验。
6. **收藏**：用户可以收藏自己喜欢的车辆，方便以后查看。
7. **下单约车**：用户可以通过网站下单租车，方便快捷。
8. **车出租**：车主可以在网站上发布自己的车辆信息，提供给他人租用。
9. **处理单子**：管理员可以对订单进行管理，保障订单的顺利完成。

根据需要可以继续扩展其他功能

## 效果图 


| 功能     | 效果图                                                       |
| -------- | ------------------------------------------------------------ |
| 登录     | ![image-20240409174413193](http://cdn.qiniu.liyansheng.top/typora/image-20240409174413193.png) |
| 注册     | ![image-20240409174426370](http://cdn.qiniu.liyansheng.top/typora/image-20240409174426370.png) |
| 首页     | ![image-20240409174445320](http://cdn.qiniu.liyansheng.top/typora/image-20240409174445320.png) |
| 使用引导 | ![image-20240409174513463](http://cdn.qiniu.liyansheng.top/typora/image-20240409174513463.png)![](http://cdn.qiniu.liyansheng.top/typora/ad.jpg) |
| 车列表   | ![image-20240409174900509](http://cdn.qiniu.liyansheng.top/typora/image-20240409174900509.png) |
| 车详情   | ![image-20240409174914824](http://cdn.qiniu.liyansheng.top/typora/image-20240409174914824.png) |
| 评论区   | ![image-20240409174640727](http://cdn.qiniu.liyansheng.top/typora/image-20240409174640727.png) |
| 收藏     | ![image-20240409175003549](http://cdn.qiniu.liyansheng.top/typora/image-20240409175003549.png) |
| 下单约车 | ![image-20240409175045992](http://cdn.qiniu.liyansheng.top/typora/image-20240409175045992.png) |
| 车出租   | ![image-20240409175114963](http://cdn.qiniu.liyansheng.top/typora/image-20240409175114963.png) |
| 处理单子 | ![image-20240409175149871](http://cdn.qiniu.liyansheng.top/typora/image-20240409175149871.png) |
| 更多功能 | 敬请期待！！！                                               |



## 总结

Spring Boot提供了一种快速开发的方式，让我们可以更加关注业务逻辑的实现，而不用过多地关注配置和细节问题；MyBatis则让数据库操作变得异常简单，通过XML映射文件可以轻松实现数据的CRUD操作。此外，Sa-token提供了便捷的权限管理功能，为网站的安全运行提供了保障。

## 源码

![image-20240410000521238](http://cdn.qiniu.liyansheng.top/typora/image-20240410000521238.png)