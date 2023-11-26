---
title: Python整合Django框架
tags:
  - Python
categories:
  - Python
author: 李延胜
date: 2023-04-10 23:50:00
---
---
## 1.安装

以下是安装Django的步骤：

1. 确认Python已经安装：在终端（Mac/Linux）或命令提示符（Windows）中输入python -V，如果出现Python版本号，则已经安装Python；如果未安装，则需要先安装Python。

2. 安装pip：pip是Python的包管理工具，可以用来安装和管理Python包。在终端或命令提示符中输入以下命令安装pip：

   ```
   $ sudo apt-get install python-pip    # Ubuntu/Debian
   $ sudo yum install python-pip        # CentOS/RHEL
   $ sudo brew install python-pip       # Mac
   ```

3. 安装Django：在终端或命令提示符中输入以下命令安装Django：

   ```
   $ pip install Django
   ```

4. 验证安装：在终端或命令提示符中输入以下命令验证Django是否安装成功：

   ```
   $ python -m django --version
   ```

   如果出现Django版本号，则安装成功。

安装完成后，可以使用Django创建项目和应用程序。

## 2.配置环境变量

1. 打开控制面板，选择“系统和安全”。
2. 点击“系统”。
3. 点击“高级系统设置”。
4. 点击“环境变量”按钮。
5. 在“系统变量”中，找到“Path”变量，并点击“编辑”按钮。
6. 在“编辑环境变量”窗口中，点击“新建”按钮。
7. 输入django-admin.exe所在的路径，例如“C:\Python34\Scripts”。
8. 点击“确定”按钮，关闭所有窗口。
9. 打开命令行窗口，输入“django-admin”，如果出现帮助信息，则表示环境变量已经添加成功。

```shell
C:\Users\胜胜>django-admin

Type 'django-admin help <subcommand>' for help on a specific subcommand.

Available subcommands:

[django]
    check
    compilemessages
    createcachetable
    dbshell
    diffsettings
    dumpdata
    flush
    inspectdb
    loaddata
    makemessages
    makemigrations
    migrate
    optimizemigration
    runserver
    sendtestemail
    shell
    showmigrations
    sqlflush
    sqlmigrate
    sqlsequencereset
    squashmigrations
    startapp
    startproject
    test
    testserver
```

## 3.创建项目



```shell
G:\Python>django-admin startproject dj_web
```



## 4.启动项目

默认启动端口是8000

```shell
G:\Python\dj_web>python manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
April 02, 2023 - 16:50:44
Django version 4.1.7, using settings 'dj_web.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
[02/Apr/2023 16:51:05] "GET / HTTP/1.1" 200 10681
[02/Apr/2023 16:51:05] "GET /static/admin/css/fonts.css HTTP/1.1" 200 423
[02/Apr/2023 16:51:05] "GET /static/admin/fonts/Roboto-Bold-webfont.woff HTTP/1.1" 200 86184
[02/Apr/2023 16:51:05] "GET /static/admin/fonts/Roboto-Regular-webfont.woff HTTP/1.1" 200 85876
[02/Apr/2023 16:51:05] "GET /static/admin/fonts/Roboto-Light-webfont.woff HTTP/1.1" 200 85692
```

![image-20230402165656591](http://liyansheng.top/typora/image-20230402165656591.png)

自定义启动端口：

```
G:\Python\dj_web>python manage.py runserver localhost:8001
```

### django模板渲染

在 Django 中，可以使用模板系统来渲染 HTML 页面。下面是一个简单的示例：

1. 创建模板文件

在 Django 项目中的 templates 目录下创建一个新的 HTML 文件（例如 index.html）。

2. 定义视图函数

在 views.py 文件中定义一个视图函数，例如：

```python
from django.shortcuts import render
from myapp.models import Article

def index(request):
    # 获取所有文章
    articles = Article.objects.all()
    # 渲染模板并传递文章列表数据
    return render(request, 'index.html', {'articles': articles})
```

这个视图函数将获取 Article 模型中的所有文章并传递到模板中。

3. 编写模板

在 index.html 文件中，您可以使用 Django 提供的模板语言编写 HTML：

```html
{% for article in articles %}
<div>
    <h2>{{ article.title }}</h2>
    <div>{{ article.content }}</div>
</div>
{% endfor %}
```

这个模板将会循环遍历传递进来的文章列表，并渲染每篇文章的标题和内容。

4. 运行应用程序

最后，在浏览器中访问应用程序的 URL，Django 将会执行 index 视图函数并渲染模板，将文章数据呈现在页面上。

以上是一个简单的 Django 模板渲染示例，您可以将其扩展为符合自己需求的模板。



### django模板语言

Django 的模板语言是基于标记的语言，它提供了一系列标记和过滤器，用于在模板中显示数据、控制逻辑和执行其他操作。

下面是一些 Django 模板语言中经常使用的标记和过滤器：

标记

- `{% block %}`：定义一个块，可以在子模板中被覆盖；
- `{% if %}`：条件语句，根据条件显示不同的内容；
- `{% for %}`：循环语句，遍历一个序列并输出其中的每个值；
- `{% url %}`：生成 URL 地址，根据给定的视图名称和参数生成相应的 URL；
- `{% include %}`：包含其他模板文件中的内容。

过滤器

- `{{ var | default:"默认值" }}`：如果变量未定义，则使用默认值；
- `{{ var | upper }}`：将字符串变为大写；
- `{{ var | lower }}`：将字符串变为小写；
- `{{ var | date:"D, d M Y" }}`：格式化日期和时间；
- `{{ var | safe }}`：关闭 HTML 转义，使 HTML 代码可以直接在页面上显示。

除了上述标记和过滤器之外，Django 模板语言还包括变量、注释、模板继承等特性，以帮助您更好地构建复杂的模板。