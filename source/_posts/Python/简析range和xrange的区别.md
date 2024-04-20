---
title: 简析range和xrange的区别
author: 李延胜
description: >-
  在 Python 2 中，存在 range()和 xrange() 两个函数，但在 Python 3 中，xrange() 已经被移除，只剩下了
  range()函数。
index_img: ../img/xrange.jpg
tags:
  - Python
categories:
  - Python
abbrlink: 25288
date: 2023-11-27 00:09:00
---
> 在 Python 2 中，存在 `range()` 和 `xrange()` 两个函数，但在 Python 3 中，`xrange()` 已经被移除，只剩下了 `range()` 函数。

主要区别在于它们返回的对象类型不同：

`range()` 返回的是一个<font color='red'>列表对象</font>，<font color='red'>它直接生成一个包含指定范围内所有元素的列表</font>。在 Python 2 中，`range()` 会一次性生成整个列表，并将其存储在内存中。

```python
my_range = range(5)
print(list(my_range))  # 在 Python 2 中直接打印 my_range 也会显示列表,[0, 1, 2, 3, 4, 5]
```

`xrange()` 返回的是一个<font color='red'>生成器对象</font>，<font color='red'>它以一种惰性的方式逐个生成范围内的元素</font>。在 Python 2 中，`xrange()` 是一个在迭代中逐步产生值的对象。

```python
my_xrange = xrange(5)  # 在 Python 2 中使用 xrange
for i in my_xrange:
    print(i)  
#0
#1
#2
#3
#4
#5
```

在 Python 3 中，`range()` 函数类似于 Python 2 中的 `xrange()`，它返回的也是一个惰性对象。这种改变的目的在于节省内存，特别是当范围非常大的时候，直接生成一个列表可能会占用大量内存，而<font color='limegreen'>惰性对象只在需要时逐个生成值，节省了内存空间</font>。

因此，**在 Python 3 中，你只需要使用 `range()`** 即可，它返回的是一个惰性对象，可以在循环中逐步生成值，而不需要担心内存占用过大的问题。