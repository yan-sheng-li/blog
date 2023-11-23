---
title: Python中控制台如何展示进度条——tqdm库使用
author: 李延胜
index_img: ../img/tqdm.png
tags:
  - Python
categories:
  - Python
date: 2023-11-23 15:32:00
---
>  在 Python 中可以使用特定的库来创建控制台进度条，其中 `tqdm` 是一个常用的选择，它能够方便地显示进度条并跟踪迭代的进度。你可以通过 `pip` 安装 `tqdm` 库：

```shell
pip install tqdm
```

### **包装迭代器：** 

使用 `tqdm` 来包装你的迭代器，比如 `range()` 函数或者列表。例如：

```python
from tqdm import tqdm
import time

# 假设有一个很长的迭代过程
for i in tqdm(range(100)):
    # 在这里执行迭代的任务
    # 这里使用 time.sleep 模拟任务执行的时间
    time.sleep(0.1)
```

![image-20231122152908666](http://liyansheng.top/typora/image-20231122152908666.png)

### **手动更新进度条：** 

在某些情况下，你可能想手动更新进度条而不是使用迭代器。你可以使用 `tqdm.update()` 方法来手动更新进度。示例：

```python
from tqdm import tqdm
import time

progress_bar = tqdm(total=1000)
for i in range(100):
    # 执行任务
    time.sleep(0.1)
    progress_bar.update(10)  # 手动更新进度条
progress_bar.close()
```

![image-20231122152732503](http://liyansheng.top/typora/image-20231122152732503.png)

### **自定义外观和信息：** 

`tqdm` 允许你自定义进度条的外观和显示信息，比如设置进度条的描述、单位、动画样式等。例如：

```python
from tqdm import tqdm
import time

for i in tqdm(range(100), desc='Processing', unit='iterations', ncols=100):
    # 执行任务
    time.sleep(0.1)
```

![image-20231122152650701](http://liyansheng.top/typora/image-20231122152650701.png)

### **嵌套进度条：** 

如果你有嵌套的循环或任务，你可以使用 `tqdm` 的嵌套方式来显示多个进度条。示例：

```python
from tqdm import tqdm
import time

outer = tqdm(range(3), desc='Outer')
for i in outer:
    inner = tqdm(range(5), desc='Inner', leave=False)  # 内部循环不会覆盖外部进度条
    for j in inner:
        # 执行任务
        time.sleep(0.1)
        inner.set_description(f'Inner: {j}', refresh=True)  # 更新内部进度条的描述信息
    inner.close()
    outer.update(1)
outer.close()
```

![image-20231122152607736](http://liyansheng.top/typora/image-20231122152607736.png)

### **暂停和恢复：** 

`tqdm` 也允许你暂停和恢复进度条的更新。你可以使用 `tqdm.pause()` 和 `tqdm.resume()` 方法来暂停和恢复更新。示例：

```python
from tqdm import tqdm
import time

progress_bar = tqdm(range(100))
for i in range(50):
    time.sleep(0.1)
    if i == 25:
        progress_bar.pause()  # 暂停更新
        time.sleep(2)  # 模拟一些耗时操作
        progress_bar.resume()  # 恢复更新
    progress_bar.update(1)
progress_bar.close()
```