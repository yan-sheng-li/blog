---
title: Python中数组中移除元素操作
author: 李延胜
index_img: ../img/zip.jpg
description: zip()函数是 Python 中一个非常有用的函数，可应用于列表打包，列表解压，转置矩阵，列表合并等，本文展开解析并附上实例演示。
tags:
  - Python
categories:
  - Python
abbrlink: 32018
date: 2023-11-25 20:28:00
---
### 打包

`zip()` 函数是 Python 中一个非常有用的函数，它用于将多个可迭代对象组合成一个元组序列，依次将来自每个可迭代对象的元素打包在一起。

基本的语法是 `zip(iterable1, iterable2, ...)`，其中 `iterable1, iterable2, ...` 是要合并的可迭代对象。

举例：

```python
list1 = [1, 2, 3, 4, 5]
list2 = ['a', 'b', 'c', 'd', 'e']

# 使用zip函数将两个列表合并
zipped = zip(list1, list2)

# 查看合并后的结果
print(list(zipped))
```

这段代码将会输出：

![image-20231125154212811](http://cdn.qiniu.liyansheng.top/typora/image-20231125154212811.png)

`zip()` 函数将两个列表中对应位置的元素依次打包成元组，并将这些元组组合成一个迭代器。需要注意的是，`zip()` 会以最短的可迭代对象为准，如果有一个可迭代对象比其他的要短，那么 `zip()` 函数会在最短的可迭代对象耗尽时停止。

<font color='red'>**注意**</font>：如果你需要以较长的对象为基准进行配对，可以使用`itertools.zip_longest()`函数。

### 解压

你还可以用 `zip()` 函数进行解压，将打包的元组序列重新拆分成原始的多个序列：

```python
pairs = [(1, 'a'), (2, 'b'), (3, 'c'), (4, 'd'), (5, 'e')]

# 使用zip函数进行解压
unzipped = zip(*pairs)

# 获取解压后的序列
unzipped_list1, unzipped_list2 = list(unzipped)

print(unzipped_list1) 
print(unzipped_list2)  
```

![image-20231125154323071](http://cdn.qiniu.liyansheng.top/typora/image-20231125154323071.png)

这样就能够将原先合并的元组序列重新分解为原始的列表。

### 转置矩阵

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# 使用zip函数转置矩阵
transposed = list(zip(*matrix))
print(transposed)
```

这个例子中，`zip(*matrix)`会将原始矩阵转置，将原本行向量的列表转换为列向量的列表。如下：

![image-20231125154918330](http://cdn.qiniu.liyansheng.top/typora/image-20231125154918330.png)



### 字典合并

```python
keys = ['a', 'b', 'c']
values = [1, 2, 3]

# 合并字典
my_dict = dict(zip(keys, values))
print(my_dict)
```

![image-20231125155114172](http://cdn.qiniu.liyansheng.top/typora/image-20231125155114172.png)

> 以上是一些关于zip函数的常用技巧，熟练掌握，有助于我们更巧妙解决开发中的问题和提高效率。