---
title: Springboot整合Kafka步骤
tags:
  - kafka
  - SpringBoot
categories:
  - 后端
  - 中间件
index_img: 'http://cdn.qiniu.liyansheng.top/typora/image-20230318180038770.png'
abbrlink: 3865
date: 2023-03-16 22:41:29
---
> 简单整理下Springboot整合Kafka的步骤，并实现简单的案例

1、创建Springboot项目

直接模板创建，或者先创建maven项目，然后改造成Springboot项目，这里不再演示这个

2、引入依赖包

```xml
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
```

3、填写配置信息

```yaml
spring:
  kafka:
    bootstrap-servers: 192.168.154.134:9092
    consumer:
      group-id: test
      enable-auto-commit: true
      auto-commit-interval: 3000
```

4、测试

```java
package org.lys;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = DiyApplication.class)
public class KafkaTests {

    @Autowired
    private KafkaProducer kafkaProducer;

    @Test
    public void testKafka(){
        // 参数1：主题，参数2：信息
        kafkaProducer.sendMessage("test","你好");
        kafkaProducer.sendMessage("test","在么");
        try {
            Thread.sleep(1000*10);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

}

@Component
class KafkaProducer{

    @Autowired
    private KafkaTemplate kafkaTemplate;

    public void sendMessage(String topic,String content){
        kafkaTemplate.send(topic,content);
    }

}

@Component
class KafkaConsumer{
    // 当收到信息，自动执行这个方法
    @KafkaListener(topics = {"test"})
    public void handleMessage(ConsumerRecord record){
        System.out.println(record.value());
    }
}
```

5、结果

![image-20230226184626286](http://cdn.qiniu.liyansheng.top/typora/image-20230226184626286.png)

可能出现的问题连上服务器：[Kafka client 客户端远程连接 一直报网络错误问题 - 浅笑19 - 博客园 (cnblogs.com)](https://www.cnblogs.com/qianxiaoPro/p/15788854.html)