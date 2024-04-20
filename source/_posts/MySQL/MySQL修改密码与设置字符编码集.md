---
title: MySQL修改密码与设置字符编码集
author: 李延胜
tags:
  - MySQL
categories:
  - 数据库
abbrlink: 28882
date: 2023-05-03 13:26:00
---
### 如何重置密码
在 MySQL 8 中，如果您是第一次安装 MySQL，那么默认的 root 用户无密码，您可以直接以 root 用户身份登录，并设置新密码。如果您已经设置了 root 用户的默认密码并忘记了它，则可以按照以下步骤修改它：

1. 停止 MySQL 服务

   如果您在本地运行 MySQL，则可以使用以下命令停止 MySQL 服务：

   ```
   sudo systemctl stop mysql
   ```
   (注意：如果是window系统上操作，打开任务管理器，将MySQL的进程结束任务即可)

2. 使用以下命令以跳过身份验证启动 MySQL 实例：

   ```
   sudo mysqld_safe --skip-grant-tables &
   ```

   这将以跳过身份验证的方式启动 MySQL 实例。

3. 连接到 MySQL。

   ```
   mysql -u root
   ```

4. 设置新密码：

   ```
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
   ```

   将 "new_password" 替换为您要设置的新密码。

5. 刷新权限：

   ```
   FLUSH PRIVILEGES;
   ```

6. 退出 MySQL 并重新启动 MySQL 服务

   ```
   exit;
   sudo systemctl start mysql
   ```

现在，您可以使用新密码以 root 用户身份登录 MySQL。

### 如何设置字符编码集
在 MySQL 中，您可以通过以下步骤设置字符编码：

1. 查看当前的字符编码

   可以通过以下命令查看当前 MySQL 的字符集及排序规则：

   ```
   SHOW VARIABLES LIKE '%character_set%';
   ```

   如果您发现当前的字符编码不是您想要的编码，那么您可以按照以下步骤更改它。

2. 修改 MySQL 配置文件

   在 MySQL 配置文件中增加以下配置项：

   ```
   [mysqld]
   character-set-server=utf8mb4
   collation-server=utf8mb4_unicode_ci
   ```

   这将设置 MySQL 服务器使用 utf8mb4 字符编码和 utf8mb4_unicode_ci 排序规则。如果您需要使用其他编码，请相应地设置 character-set-server 和 collation-server 配置项。

3. 重启 MySQL 服务

   保存更改后，需要重启 MySQL 服务使更改生效。可以使用以下命令重启 MySQL 服务：

   ```
   sudo systemctl restart mysql
   ```

4. 确认新的字符编码已生效

   可以再次运行以下命令确认新的字符编码和排序规则已经生效：

   ```
   SHOW VARIABLES LIKE '%character_set%';
   ```

   现在，MySQL 将使用新的字符编码和排序规则。

请注意，在修改 MySQL 的字符编码时，需要确保数据库表和数据都与新的字符编码兼容。因此，在更改字符编码之前，建议先备份数据，以避免数据损坏。
