---
title: 启动Kafka步骤与常见问题
tags:
  - kafka
categories:
  - 中间件
index_img: 'http://cdn.qiniu.liyansheng.top/typora/image-20230318180359278.png'
abbrlink: 41053
date: 2022-10-16 22:41:29
---
> 每次用到kafka时都会出现各种奇怪的问题，综合实践，下面汇总下主要操作步骤：

## Docker镜像形式启动

### zookeeper启动

```shell
docker run -d --name zookeeper -p 2181:2181 -t wurstmeister/zookeeper
```

### kafka启动

```shell
docker run --name kafka01 -p 9092:9092 -e KAFKA_BROKER_ID=0 -e KAFKA_ZOOKEEPER_CONNECT=150.158.16.123:12348 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://150.158.16.123:9092 -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 -d  wurstmeister/kafka
```

### 进入kafka容器

```shell
docker exec -it [容器id] /bin/bash
```

创建topic

进入容器，在`/opt/kafka_2.13-2.8.1/bin` 目录下创建topic

```shell
./kafka-topics.sh --create --zookeeper 150.158.16.123:12348 --replication-factor 1 --partitions 1 --topic mykafka
./kafka-topics.sh --create --zookeeper 150.158.16.123:2181 --replication-factor 1 --partitions 1 --topic mykafka
```

运行生产者

![image-20220923112024973](http://cdn.qiniu.liyansheng.top/typora/image-20220923112024973.png)

运行消费者

![image-20220923112035890](http://cdn.qiniu.liyansheng.top/typora/image-20220923112035890.png)

------

## 单机形式启动

### 前提

1、Linux 机器

2、环境已准备好JDK，如果还没有装，推荐用yum一键安装

```shell
yum  install  -y  java-1.8.0-openjdk.x86_64
```

检验：

```shell
[root@localhost ~]# java -version
openjdk version "1.8.0_362"
OpenJDK Runtime Environment (build 1.8.0_362-b08)
OpenJDK 64-Bit Server VM (build 25.362-b08, mixed mode)
```

3、将kafka压缩包上传到你的Linux

配置文件关注`config`目录下的`zookeeper.properties`和`server.properties`，启动服务时要指定

### 配置-启动

有默认配置，可不做修改（有需要可以自定义启动端口和数据存放位置等参数）

1、先启动自带的 Zookeeper：

```shell
[root@localhost bin]# ./zookeeper-server-start.sh ../config/zookeeper.properties 
OpenJDK 64-Bit Server VM warning: If the number of processors is expected to increase from one, then you should configure the number of parallel GC threads appropriately using -XX:ParallelGCThreads=N
[2023-02-26 14:14:52,759] INFO Reading configuration from: ../config/zookeeper.properties (org.apache.zookeeper.server.quorum.QuorumPeerConfig)
[2023-02-26 14:14:52,766] INFO autopurge.snapRetainCount set to 3 (org.apache.zookeeper.server.DatadirCleanupManager)
[2023-02-26 14:14:52,767] INFO autopurge.purgeInterval set to 0 (org.apache.zookeeper.server.DatadirCleanupManager)
[2023-02-26 14:14:52,767] INFO Purge task is not scheduled. (org.apache.zookeeper.server.DatadirCleanupManager)
[2023-02-26 14:14:52,767] WARN Either no config or no quorum defined in config, running  in standalone mode (org.apache.zookeeper.server.quorum.QuorumPeerMain)
[2023-02-26 14:14:52,783] INFO Reading configuration from: ../config/zookeeper.properties (org.apache.zookeeper.server.quorum.QuorumPeerConfig)
[2023-02-26 14:14:52,784] INFO Starting server (org.apache.zookeeper.server.ZooKeeperServerMain)
[2023-02-26 14:14:52,796] INFO Server environment:zookeeper.version=3.4.14-4c25d480e66aadd371de8bd2fd8da255ac140bcf, built on 03/06/2019 16:18 GMT (org.apache.zookeeper.server.ZooKeeperServer)
[2023-02-26 14:14:52,796] INFO Server environment:host.name=localhost (org.apache.zookeeper.server.ZooKeeperServer)
[2023-02-26 14:14:52,796] INFO Server environment:java.version=1.8.0_362 (org.apache.zookeeper.server.ZooKeeperServer)
[2023-02-26 14:14:52,796] INFO Server environment:java.vendor=Red Hat, Inc. (org.apache.zookeeper.server.ZooKeeperServer)
[2023-02-26 14:14:52,796] INFO Server environment:java.home=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.362.b08-1.el7_9.x86_64/jre (org.apache.zookeeper.server.ZooKeeperServer)
(省略大部分)
```

2、启动 Kafka

```shell
[root@localhost kafka_2.12-2.3.0]# bin/kafka-server-start.sh config/server.properties 
OpenJDK 64-Bit Server VM warning: If the number of processors is expected to increase from one, then you should configure the number of parallel GC threads appropriately using -XX:ParallelGCThreads=N
[2023-02-26 14:16:00,261] INFO Registered kafka:type=kafka.Log4jController MBean (kafka.utils.Log4jControllerRegistration$)
[2023-02-26 14:16:01,004] INFO Registered signal handlers for TERM, INT, HUP (org.apache.kafka.common.utils.LoggingSignalHandler)
[2023-02-26 14:16:01,024] INFO starting (kafka.server.KafkaServer)
[2023-02-26 14:16:01,025] INFO Connecting to zookeeper on localhost:2181 (kafka.server.KafkaServer)
[2023-02-26 14:16:01,068] INFO [ZooKeeperClient Kafka server] Initializing a new session to localhost:2181. (kafka.zookeeper.ZooKeeperClient)
[2023-02-26 14:16:01,072] INFO Client environment:zookeeper.version=3.4.14-4c25d480e66aadd371de8bd2fd8da255ac140bcf, built on 03/06/2019 16:18 GMT (org.apache.zookeeper.ZooKeeper)
[2023-02-26 14:16:01,072] INFO Client environment:host.name=localhost (org.apache.zookeeper.ZooKeeper)
[2023-02-26 14:16:01,072] INFO Client environment:java.version=1.8.0_362 (org.apache.zookeeper.ZooKeeper)
[2023-02-26 14:16:01,072] INFO Client environment:java.vendor=Red Hat, Inc. (org.apache.zookeeper.ZooKeeper)
[2023-02-26 14:16:01,072] INFO Client environment:java.home=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.362.b08-1.el7_9.x86_64/jre (org.apache.zookeeper.ZooKeeper)
(省略大部分)
```

> 上述步骤只要启动过程没有报错信息，一般是没有问题的

### 测试

1、创建个topic

```shell
[root@localhost bin]# ./kafka-topics.sh --create --zookeeper 192.168.154.134:2181 --replication-factor 1 --partitions 1 --topic test
Created topic test.
```

2、查看topic列表

```shell
[root@localhost bin]# ./kafka-topics.sh --zookeeper 192.168.154.134:2181 --list
OpenJDK 64-Bit Server VM warning: If the number of processors is expected to increase from one, then you should configure the number of parallel GC threads appropriately using -XX:ParallelGCThreads=N
test
```

3、启动生产者

```shell
[root@localhost bin]# ./kafka-console-producer.sh --broker-list 192.168.154.134:9092 --topic test
>hi
>什么意思啊
```

4、启动消费者

```shell
[root@localhost bin]# ./kafka-console-consumer.sh --bootstrap-server 192.168.154.134:9092 --topic test
hi
什么意思啊
```

> 正常启动，OK！

## 可视化：kafka-manager

### 镜像下载

```shell
docker pull sheepkiller/kafka-manager
```

### 运行容器

```shell
docker run -d --name kafka-manager -p 12349:9000 --link zookeeper --link kafka01 --env ZK_HOSTS=zookeeper:2181 sheepkiller/kafka-manager  
```

然后访问对应的`IP：端口`即可进入管理页面

> 注意：`ZK_HOSTS` 后面在web页面上要用到！

### 管理界面

进入主页面后，点击 `Add Cluster` 添加集群信息

![image-20220818233716973](http://cdn.qiniu.liyansheng.top/typora/image-20220818233716973.png)

然后填写配置信息，主要填写集群名称，Zookeeper的Hosts，还有指定kafka版本（选个跟你所使用的kafka版本号最接近的就行），其他的一些配置按默认的就行。

当你正确连接上以后，就能看到你的集群啦，如：

![image-20220818235108897](http://cdn.qiniu.liyansheng.top/typora/image-20220818235108897.png)

![image-20220818235134261](http://cdn.qiniu.liyansheng.top/typora/image-20220818235134261.png)

**更多关于kafka可视化操作就由你慢慢探索吧！这里将你引进门！**

> 注意：
>
> 1. 如果你在启动`kafka manager`这个容器时指定了 `ZK_HOSTS` ，那么**Cluster Zookeeper Hosts**这项填的内容要和 `ZK_HOSTS` 一致，否则会出现连接不上，连接超时等情况。如下图：
>
>     ![image-20220818234605319](http://cdn.qiniu.liyansheng.top/typora/image-20220818234605319.png)
>
> 2. 另外有些配置默认值是1，但是你得将其改成1以上的整数，否则不能正确保存提交。如：
>
>    ![image-20220818234844587](http://cdn.qiniu.liyansheng.top/typora/image-20220818234844587.png)


------

## 注意

kafka版本不同，响应的api有区别

本版本是2.11

注意3.x是 --bootstrap-server localhost:9092方式新建，kafka2.x是以--zookeeper方式创建。下面查看新建的topic。

![image-20220925165659756](http://cdn.qiniu.liyansheng.top/typora/image-20220925165659756.png)

![image-20220925165713665](http://cdn.qiniu.liyansheng.top/typora/image-20220925165713665.png)



## 奇葩问题

### 1.重启docker失败？

```shell
[root@localhost ~]# systemctl restart docker
Job for docker.service failed because the control process exited with error code. See "systemctl status docker.service" and "journalctl -xe" for details.
```

```shell
[root@localhost ~]# journalctl -xe
-- The result is failed.
2月 22 02:01:53 localhost.localdomain systemd[1]: Unit docker.service entered failed state.
2月 22 02:01:53 localhost.localdomain systemd[1]: Unit docker.service entered failed state.
2月 22 02:01:53 localhost.localdomain systemd[1]: docker.service failed.
2月 22 02:01:55 localhost.localdomain systemd[1]: docker.service holdoff time over, scheduling restart.
2月 22 02:01:55 localhost.localdomain systemd[1]: Stopped Docker Application Container Engine.
-- Subject: Unit docker.service has finished shutting down
-- Defined-By: systemd
-- Support: http://lists.freedesktop.org/mailman/listinfo/systemd-devel
-- 
-- Unit docker.service has finished shutting down.
2月 22 02:01:55 localhost.localdomain systemd[1]: start request repeated too quickly for docker.service
2月 22 02:01:55 localhost.localdomain systemd[1]: Failed to start Docker Application Container Engine.
-- Subject: Unit docker.service has failed
-- Defined-By: systemd
-- Support: http://lists.freedesktop.org/mailman/listinfo/systemd-devel
-- 
-- Unit docker.service has failed.
-- 
-- The result is failed.
```

原因：修改文件`/etc/docker/daemon.json`时不规范，可能存在空格什么的 

解决：

```shell
[root@localhost ~]# cat <<EOF >/etc/docker/daemon.json
> {
> "registry-mirrors": ["https://registry.docker-cn.com"]
> }
> EOF
[root@localhost ~]# cat /etc/docker/daemon.json 
{
"registry-mirrors": ["https://registry.docker-cn.com"]
}
[root@localhost ~]# 
[root@localhost ~]# systemctl daemon-reload
[root@localhost ~]# systemctl restart docker
```

### 2.查询镜像无果？

```shell
[root@localhost ~]# docker search kafka
Error response from daemon: Get "https://index.docker.io/v1/search?q=kafka&n=25": x509: certificate has expired or is not yet valid: current time 2023-02-22T02:08:25+08:00 is before 2023-02-22T00:00:00Z
```

原因：虚拟机时间与外部时间不一致

解决：

```shell
[root@localhost ~]# date
2023年 02月 22日 星期三 02:09:50 CST
[root@localhost ~]# ntpdate cn.pool.ntp.org
26 Feb 13:31:38 ntpdate[44996]: step time server 119.28.206.193 offset 386475.634457 sec
[root@localhost ~]# date
2023年 02月 26日 星期日 13:31:48 CST
[root@localhost ~]# docker search kafka
NAME                                         DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
bitnami/kafka                                Apache Kafka is a distributed streaming plat…   615                  [OK]
ubuntu/kafka                                 Apache Kafka, a distributed event streaming …   25                   
bitnami/kafka-exporter                                                                       9                    
ibmcom/kafka                                 Docker Image for IBM Cloud Private-CE (Commu…   6                    
bitnami/kafka-trigger-controller             Source for this controller is in the kubeles…   5                    
ibmcom/kafka-python-console-sample           Docker image for the IBM Event Streams Pytho…   2                    
openwhisk/kafkaprovider                      Apache OpenWhisk event provider service for …   2                    [OK]
```

### 3.Docker容器内如何安装vim?

1. apt-get install vim  （可能提示你安装失败！继续往下）

2. agt-get update 同步 /etc/apt/sources.list 和 /etc/apt/sources.list.d 中列出的源的索引

   配置国内镜像源：

   ```shell
   echo "deb http://mirrors.163.com/debian/ jessie main non-free contrib" >/etc/apt/sources.list
       echo "deb http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list
       echo "deb-src http://mirrors.163.com/debian/ jessie main non-free contrib" >>/etc/apt/sources.list
       echo "deb-src http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list
   ```

3. 返回第一步

### 4.无法启动kafka?

```shell
kafka.common.KafkaException: Socket server failed to bind to 150.158.16.123:9092: 无法指定被请求的地址.
        at kafka.network.Acceptor.openServerSocket(SocketServer.scala:327)
        at kafka.network.Acceptor.<init>(SocketServer.scala:252)
        at kafka.network.SocketServer$$anonfun$startup$1.apply(SocketServer.scala:91)
        at kafka.network.SocketServer$$anonfun$startup$1.apply(SocketServer.scala:83)
        at scala.collection.mutable.ResizableArray$class.foreach(ResizableArray.scala:59)
        at scala.collection.mutable.ArrayBuffer.foreach(ArrayBuffer.scala:48)
        at kafka.network.SocketServer.startup(SocketServer.scala:83)
        at kafka.server.KafkaServer.startup(KafkaServer.scala:222)
        at kafka.server.KafkaServerStartable.startup(KafkaServerStartable.scala:38)
        at kafka.Kafka$.main(Kafka.scala:65)
        at kafka.Kafka.main(Kafka.scala)

```

注意，上面是配置里面有个地址写得不对，listeners=PLAINTEXT://10.20.30.153:9092后接的是内网地址，通过ip addr即可查看，如我的机器

![image-20221001140813960](http://cdn.qiniu.liyansheng.top/typora/image-20221001140813960.png)

一个写内网地址，一个写外网地址

![image-20221001140917719](http://cdn.qiniu.liyansheng.top/typora/image-20221001140917719.png)
