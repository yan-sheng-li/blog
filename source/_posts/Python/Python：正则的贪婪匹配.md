---
title: Python：正则的贪婪匹配
author: 李延胜
index_img: http://cdn.qiniu.liyansheng.top/img/re.jpg
tags:
  - Python
categories:
  - Python
abbrlink: 42245
date: 2023-11-28 22:04:00
---
贪婪匹配是正则表达式中的一种匹配模式，它尽可能多地匹配输入文本。在贪婪模式下，匹配的字符会尽量多地匹配满足模式要求的部分。

举个例子来说明：

假设有一个字符串 `text = "abcdefg"`，我们想要用正则表达式匹配出 `"abc"` 和 `"def"` 之间的内容。

使用贪婪匹配的方式：

```python
import re

text = "abcdefg"
pattern = "abc.*def"

result = re.search(pattern, text)
print(result.group(0))
```

这个正则表达式 `abc.*def` 中的 `.*` 表示匹配任意字符任意次数（包括零次），直到碰到字符 `def`。在贪婪模式下，它会尽可能多地匹配字符。因此，整个字符串 `"abcdefg"` 都满足这个模式，最终的匹配结果是整个字符串 `"abcdefg"`。

现在，如果我们想要非贪婪地匹配尽可能少的字符，只匹配到第一个 `"def"` 前的内容，可以这样改写正则表达式：

```python
pattern = "abc.*?def"
```

这个正则表达式 `abc.*?def` 中的 `.*?` 表示非贪婪模式下的任意字符匹配。它会在尽可能少地匹配字符的情况下满足模式要求。在这个例子中，结果会是 `"abcdef"`，因为它匹配了尽可能少的字符来满足模式要求，直到第一个 `"def"`。