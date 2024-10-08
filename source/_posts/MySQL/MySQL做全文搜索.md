---
title: MySQL做全文搜索
author: 李延胜
abbrlink: 20208
date: 2024-04-30 15:14:40
tags:
index_img: http://cdn.qiniu.liyansheng.top/img/mysql_search.png
---


## 初始化

MySQL 提供了全文搜索功能，可以使用 `MATCH` ... `AGAINST` 来执行全文搜索操作。

在使用全文索引之前，需要先创建一个全文索引。你可以为表中的多个字段创建一个全文索引。下面是一个简单的示例：

假设你有一个表名为 `your_table`，包含两个字段 `column1` 和 `column2`，你想要对这两个字段进行全文搜索。首先，你需要为这两个字段创建一个全文索引。

```sql
CREATE FULLTEXT INDEX idx_fulltext_search ON your_table (column1, column2);
```

这将创建一个名为 `idx_fulltext_search` 的全文索引，用于 `column1` 和 `column2` 字段。

然后，你可以使用 `MATCH` ... `AGAINST` 语句执行全文搜索操作：

```sql

SELECT * FROM your_table WHERE MATCH(column1, column2) AGAINST ('your_keyword');
```

这将返回包含 'your_keyword' 的行，其中 'your_keyword' 可以是一个单词或者短语。

需要注意的是，全文索引只能用于特定的存储引擎（如 MyISAM 和 InnoDB），而且只支持特定的字符集（如 utf8）。此外，全文索引也不支持部分匹配，如通配符或 `LIKE` 操作符，它主要用于执行全文搜索。

## 在Mybatis-plus使用

在 MyBatis-Plus 中，你可以使用 QueryWrapper 或 LambdaQueryWrapper 来构建查询条件。虽然 MyBatis-Plus 不直接提供全文搜索的 API，但你仍然可以使用自定义的 SQL 语句来执行全文搜索。

以下是一个示例，演示了如何在 MyBatis-Plus 中使用自定义 SQL 执行全文搜索：

假设你有一个实体类 `YourEntity` 对应数据库表 `your_table`，你想要对其中的 `column1` 和 `column2` 字段执行全文搜索。

1. 首先，创建一个 Mapper 接口，定义一个自定义的查询方法：

```java
import org.apache.ibatis.annotations.Param;
import java.util.List;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface YourMapper extends BaseMapper<YourEntity> {
    List<YourEntity> searchByFullText(@Param("keyword") String keyword);
}
```

1. 然后，在 XML 映射文件中编写 SQL 语句：

```xml
<select id="searchByFullText" resultType="YourEntity">
    SELECT * FROM your_table
    WHERE MATCH(column1, column2) AGAINST (#{keyword});
</select>
```

1. 最后，在 Service 层中调用自定义的查询方法：

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class YourService {

    @Autowired
    private YourMapper yourMapper;

    public List<YourEntity> searchByFullText(String keyword) {
        return yourMapper.searchByFullText(keyword);
    }
}
```

这样就可以在 MyBatis-Plus 中执行全文搜索了。需要注意的是，确保你的数据库表引擎支持全文索引，并且正确配置了全文索引的字段。