---
title: SpringBoot配置文件明文加密
author: 李延胜
tags:
  - SpringBoot
categories: []
abbrlink: 50514
date: 2023-04-20 22:29:00
---
Spring Boot 里面的配置文件可以使用 `jasypt` 来实现加密和解密。
### 步骤如下

1. 添加依赖

在 `pom.xml` 文件中添加以下依赖：

```xml
<dependency>
    <groupId>com.github.ulisesbocchio</groupId>
    <artifactId>jasypt-spring-boot-starter</artifactId>
    <version>3.0.2</version>
</dependency>
```

2. 配置加密参数

在 `application.properties` 或 `application.yml` 中添加以下配置：

```properties
# 加密算法，默认为 PBEWithMD5AndDES
jasypt.encryptor.algorithm=PBEWithMD5AndDES
# 加密密钥，这个密码需要保密
jasypt.encryptor.password=your_secret_password
```

3. 使用加密参数进行加密

使用以上配置后，在配置文件中，需要加密的字符串可以使用以下格式进行加密：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost/testdb
    username: dbuser
    password: ENC(encrypted_password)
```

其中，`encrypted_password` 是要被加密的原始密码。使用 jasypt 的默认方式会将其加密成一个 Base64 字符串。

4. 使用解密

在代码中可以直接使用 `@Value` 注解获取解密后的值：

```java
@Component
public class MyComponent {

    @Value("${spring.datasource.password}")
    private String dbPassword;

    // ...
}
```

这样，`dbPassword` 就是解密后的密码了。

注意：加密后的字符串要使用 `ENC()` 包含起来，否则 Spring Boot 无法识别它是一个加密的字符串。

### 加密与解密
好的，下面是一个简单的测试方法，用于说明加密和解密的操作：

```java
@SpringBootTest
public class JasyptTest {

    @Autowired
    private Environment environment;

    @Autowired
    private StringEncryptor encryptor;

    @Test
    public void testEncryptionAndDecryption() {
        String originalText = "mypassword";
        String encryptedText = encryptor.encrypt(originalText);
        String decryptedText = encryptor.decrypt(encryptedText);

        System.out.printf("Original text: %s%n", originalText);
        System.out.printf("Encrypted text: %s%n", encryptedText);
        System.out.printf("Decrypted text: %s%n", decryptedText);

        String encryptedValue = environment.getProperty("my.encrypted.property");
        String decryptedValue = environment.getProperty("my.decrypted.property");

        System.out.printf("Encrypted value: %s%n", encryptedValue);
        System.out.printf("Decrypted value: %s%n", decryptedValue);
    }
}
```

这个测试方法使用了 `StringEncryptor` 接口来进行加密和解密操作，具体步骤如下：

1. 使用 `encryptor.encrypt()` 方法将原始文本加密成密文。
2. 使用 `encryptor.decrypt()` 方法将密文解密成原始文本。
3. 使用 `environment.getProperty()` 方法获取配置文件中的加密和解密后的值。

在上述测试方法中，`my.encrypted.property` 对应的是一个加密过的值，`my.decrypted.property` 则对应的是一个未加密的值。使用 `getProperty()` 方法获取这两个属性的值时，Spring Boot 会自动为我们完成解密操作，因此可以直接使用获取到的值进行后续的操作。

