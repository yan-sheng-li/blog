---
title: Python中数组中移除元素操作
author: 李延胜
index_img: ../img/array.jpg
tags:
  - Python
categories:
  - Python
date: 2023-11-21 15:28:00
---
## 在 Python 中，有多种方式可以去除数组（列表）中的第一个元素。以下是其中几种方法：

>  使用切片。你可以使用切片来获取从第二个元素开始到末尾的所有元素。例如：

```python
my_list = [1, 2, 3, 4, 5]
my_list = my_list[1:]  # 去除第一个元素
print(my_list)        # 输出 [2, 3, 4, 5]
```

>  使用 `del` 语句。你可以使用 `del` 语句来删除指定索引位置上的元素。例如：

```python
my_list = [1, 2, 3, 4, 5]
del my_list[0]  # 删除第一个元素
print(my_list)  # 输出 [2, 3, 4, 5]
```

> 使用 `pop()` 方法。你可以使用 `pop()` 方法来删除指定索引位置上的元素，并返回被删除的元素。例如：

```python
my_list = [1, 2, 3, 4, 5]
my_list.pop(0)  # 删除第一个元素
print(my_list)  # 输出 [2, 3, 4, 5]
```

> 需要注意的是，以上方法都会改变原始数组（列表），如果你需要保留原始数组，可以先将其复制一份再进行操作。例如：

```python
my_list = [1, 2, 3, 4, 5]
new_list = my_list[1:]  # 复制一份并去除第一个元素
print(new_list)         # 输出 [2, 3, 4, 5]
print(my_list)          # 原始数组 [1, 2, 3, 4, 5] 未改变
```