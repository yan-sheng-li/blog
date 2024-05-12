---
title: hexo操作技巧
author: 李延胜
abbrlink: 62565
date: 2024-05-11 01:47:49
hide: true
tags:
---
## 实现部分文章隐藏
> hexo-generator-indexed 插件


	
```
$ npm uninstall hexo-generator-index
$ npm install hexo-generator-indexed
```

隐藏文章 ，在文章的 Front-matter 中增加一个 hide 参数用来隐藏

```html
    ---
    title: Foo
    date: 2023-06-15 12:04:20
    hide: true
    tags:
    ---
    ```

设置完成后，讲道理在任何地方都不应该出现 Foo 的显示信息了，但是这个效果是因主题而异的。

landscape

    首页隐藏
    archives 没有隐藏

fluid

    首页隐藏
    其余页面隐藏

