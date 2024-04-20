---
title: Python：字符串转列表
author: 李延胜
index_img: ../img/arraylist.jpg
tags:
  - Python
categories:
  - Python
abbrlink: 287
date: 2023-11-28 22:05:00
---
要将一个字符串转换为列表，可以使用字符串的 `split()` 方法。`split()` 方法根据指定的分隔符将字符串分割成子串，并将这些子串组成列表。

假设有一个用空格分隔的字符串，我们想要将其转换为一个单词列表：

```python
my_string = "Hello world this is a string"

# 使用空格分割字符串，并转换为列表
my_list = my_string.split()
print(my_list)
```

在这个例子中，`split()` 方法默认使用空格作为分隔符，将字符串分割成单词，并将单词组成一个列表。结果会是：

```
['Hello', 'world', 'this', 'is', 'a', 'string']
```

你也可以使用其他分隔符来将字符串分割为列表，只需在 `split()` 方法中传入相应的分隔符作为参数：

```python
my_string = "apple,orange,banana,grape"

# 使用逗号分隔字符串，并转换为列表
my_list = my_string.split(',')
print(my_list)
```

这段代码将会输出一个以逗号分隔的字符串转换为列表：

```
['apple', 'orange', 'banana', 'grape']
```

通过 `split()` 方法，你可以根据需要使用不同的分隔符将字符串分割成列表。

------

