---
title: Python-csv库进行数据保存和读写
author: 李延胜
index_img: http://cdn.qiniu.liyansheng.top/img/csv.jpg
tags:
  - Python
categories:
  - Python
abbrlink: 20789
date: 2023-11-23 15:36:00
---
>在 Python 中使用 CSV 文件非常简单，Python 提供了内置的 `csv` 模块来处理 CSV 文件。你可以使用 `csv` 模块来读取、写入和操作 CSV 文件中的数据。

### 基础使用

### 读取 

```
python
import csv

# 打开 CSV 文件进行读取
with open('file.csv', mode='r') as file:
    reader = csv.reader(file)  # 创建 CSV 读取器对象
    for row in reader:
        print(row)  # 逐行打印 CSV 文件中的数据
```

### 写入 

```
python
import csv

# 写入数据到 CSV 文件
data = [
    ['Name', 'Age', 'Gender'],
    ['Alice', 25, 'Female'],
    ['Bob', 28, 'Male'],
    ['Cathy', 22, 'Female']
]

with open('output.csv', mode='w', newline='') as file:
    writer = csv.writer(file)  # 创建 CSV 写入器对象
    writer.writerows(data)  # 将数据写入到 CSV 文件
```

在这两个示例中，首先需要导入 `csv` 模块。使用 `with open()` 打开 CSV 文件并指定文件模式（`'r'` 表示读取，`'w'` 表示写入）。然后使用 `csv.reader()` 或 `csv.writer()` 创建读取器或写入器对象。读取器可以逐行读取 CSV 文件的内容，写入器可以将数据写入到 CSV 文件中。

### 其他使用技巧

### 1. 处理不同格式的分隔符

有时 CSV 文件中的字段可能不是用逗号分隔的，可能会使用其他字符作为分隔符，比如制表符 `\t`。你可以在读取和写入时指定不同的分隔符。

读取不同分隔符的 CSV 文件：

```python
# 使用制表符作为分隔符读取 CSV 文件
with open('file.tsv', mode='r') as file:
    reader = csv.reader(file, delimiter='\t')  # 指定分隔符为制表符
    for row in reader:
        print(row)
```

写入不同分隔符的 CSV 文件：

```python
# 使用分号作为分隔符写入 CSV 文件
data = [
    ['Name', 'Age', 'Gender'],
    ['Alice', 25, 'Female'],
    ['Bob', 28, 'Male'],
    ['Cathy', 22, 'Female']
]

with open('output.csv', mode='w', newline='') as file:
    writer = csv.writer(file, delimiter=';')  # 指定分隔符为分号
    writer.writerows(data)
```

### 2. 处理包含引号的数据

有些 CSV 文件中的字段可能包含引号，这时在处理时可能会出现问题。你可以指定引号的处理方式，以便正确读取包含引号的字段。

```python
# 处理包含引号的数据
with open('file.csv', mode='r') as file:
    reader = csv.reader(file, quoting=csv.QUOTE_MINIMAL)  # 指定引号处理方式
    for row in reader:
        print(row)
```

### 3. 处理文件编码

在处理 CSV 文件时，特别是处理非英文字符时，确保指定文件的正确编码方式，以免出现乱码问题。

```python
# 指定文件编码方式
with open('file.csv', mode='r', encoding='utf-8') as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

### 4. 考虑使用 `DictReader` 和 `DictWriter`

除了 `csv.reader()` 和 `csv.writer()` 外，`csv` 模块还提供了 `csv.DictReader()` 和 `csv.DictWriter()`，它们可以将每一行数据作为字典进行处理，使用列标题作为字典的键。

```python
# 使用 DictReader 读取 CSV 文件
with open('file.csv', mode='r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row['Name'], row['Age'], row['Gender'])
python
# 使用 DictWriter 写入 CSV 文件
fieldnames = ['Name', 'Age', 'Gender']
data = [
    {'Name': 'Alice', 'Age': 25, 'Gender': 'Female'},
    {'Name': 'Bob', 'Age': 28, 'Gender': 'Male'},
    {'Name': 'Cathy', 'Age': 22, 'Gender': 'Female'}
]

with open('output.csv', mode='w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data)
```

这些技巧可以帮助你更好地使用 `csv` 模块处理不同格式的 CSV 文件，同时避免一些常见的问题，如分隔符问题、引号处理和文件编码等。