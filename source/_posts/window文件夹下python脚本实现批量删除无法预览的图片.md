---
title: window文件夹下python脚本实现批量删除无法预览的图片
author: 李延胜
index_img: ../img/bits-del.png
tags:
  - Python
categories:
  - Python
date: 2023-11-23 15:35:00
---
>有几种原因可能导致一些图片在预览时无法正常显示：

1. **损坏的图片文件：** 图片文件可能损坏或者部分损坏，导致无法被正常解析和预览。这种情况可能是因为文件在传输过程中损坏、存储介质出现问题或者文件本身存在错误。
2. **不受支持的图片格式：** 部分图片格式可能不受预览软件或系统所支持，因此无法在普通的图片预览软件中打开或显示。有些特殊的或者较为罕见的图片格式可能会遇到这个问题。
3. **文件扩展名与实际格式不符：** 有时文件扩展名可能与实际的文件格式不匹配，这可能导致操作系统或预览软件错误地尝试解析该文件。
4. **图片文件损坏或缺失元数据：** 图片文件损坏或缺少必要的元数据信息，可能导致预览软件无法正确识别或解析图片。

> 如何实现批量删除无法预览的图片呢？

```python
import os
from PIL import Image

def is_image_valid(file_path):
    try:
        # 尝试打开给定路径的图像文件
        Image.open(file_path)
        # 如果能够正常打开，表示文件是有效的图片文件，返回 True
        return True
    except (IOError, SyntaxError):
        # 如果打开文件时出现 IOError 或 SyntaxError，表示文件不是有效的图片文件，返回 False
        return False


def delete_invalid_images(folder_path):
    # 遍历指定文件夹中的文件
    for filename in os.listdir(folder_path):
        # 拼接文件路径
        file_path = os.path.join(folder_path, filename)
        # 检查路径是否是文件并且不是有效的图片文件
        if os.path.isfile(file_path) and not is_image_valid(file_path):
            # 删除无效的图片文件
            os.remove(file_path)
            # 输出被删除的文件路径
            print(f"Deleted: {file_path}")

if __name__ == "__main__":
    folder_path = r'G:\pythonProject\图\img'  # 替换成你的图片文件夹路径
    delete_invalid_images(folder_path)
```

效果如下：

![image-20231122150654175](http://liyansheng.top/typora/image-20231122150654175.png)