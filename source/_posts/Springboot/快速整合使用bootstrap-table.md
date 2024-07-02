---
title: 实用技巧-7：快速整合使用bootstrap-table
author: 李延胜
tags:
  - 实用
categories: []
index_img: ../img/skills.jpg
description: 后台数据增删改查快速实现，模板换换接口即可
abbrlink: 43379
date: 2024-03-25 19:35:00
---
# 快速整合bootstrap-table



## 效果图

![image-20240325192345466](http://cdn.qiniu.liyansheng.top/typora/image-20240325192345466.png)

## 接口案例

数据列表：

```json
{
  "code": 200,
  "msg": "ok",
  "data": [
    {
      "categoryId": 52,
      "categoryName": "哈哈哈"
    },
    {
      "categoryId": 53,
      "categoryName": "哈哈哈地方"
    },
    {
      "categoryId": 7,
      "categoryName": "悬疑灵异"
    },
    {
      "categoryId": 4,
      "categoryName": "武侠仙侠"
    },
    {
      "categoryId": 3,
      "categoryName": "玄幻奇幻"
    }
  ]
}
```

增：/novel-category/add

删：/novel-category/delete/{id}

改：/novel-category/update

查：/novel-category/list

批量删：/novel-category/deleteBatch

## 对应后端实现

```java
package com.xxx.readverse.controller;


import cn.dev33.satoken.util.SaResult;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xxx.readverse.entity.Category;
import com.xxx.readverse.service.CategoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("/novel-category")
@Api(tags = "小说分类")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService novelCategoryService;


    @GetMapping("/list")
    @ApiOperation("分类列表")
    @ResponseBody
    public SaResult getNovelCategories() {
        List<Category> categoryList = novelCategoryService.list(new QueryWrapper<Category>().last("limit 12"));
        return SaResult.data(categoryList);
    }

    @PostMapping("/add")
    @ApiOperation("新增分类")
    @ResponseBody
    public SaResult add(Category novelCategory) {
        try {
            novelCategoryService.save(novelCategory);
        } catch (DuplicateKeyException e) {
            return SaResult.error("操作未成功，可能是因为数据重复导致的");
        }
        return SaResult.data(novelCategory.getCategoryId());
    }

    @GetMapping("/deleteBatch")
    @ApiOperation("批量删除")
    @ResponseBody
    public SaResult deleteBatch(@RequestParam("ids") Integer[] ids) {
        novelCategoryService.removeByIds(Arrays.asList(ids));
        return SaResult.ok();
    }

    @GetMapping("/delete/{id}")
    @ApiOperation("删除分类")
    @ResponseBody
    public SaResult delete(@PathVariable Integer id) {
        novelCategoryService.removeById(id);
        return SaResult.ok();
    }

    @PostMapping("/update")
    @ApiOperation("修改分类")
    @ResponseBody
    public SaResult update(Category novelCategory) {
        novelCategoryService.updateById(novelCategory);
        return SaResult.ok();
    }

    @GetMapping("/{id}")
    @ApiOperation("获取某个分类信息")
    @ResponseBody
    public SaResult getById(@PathVariable Integer id) {
        Category category = novelCategoryService.getById(id);
        return  SaResult.data(category);
    }
    
}

```

## 页面完整代码

需要注意的问题

1. 注意依赖引进

2. 方法异步操作，特别是弹窗组件

3. 数据项的ID，并不是每个都是id，根据实体数据来确认。

4. 新增，编辑使用弹窗，控制弹窗的显示和关闭，$('xxx').modal('show'),        $('xxx').modal('hide')

5. 基本通用，直接换接口名称就行。

    

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>表格演示</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-table@1.22.3/dist/bootstrap-table.min.css" rel="stylesheet">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap-table@1.22.3/dist/bootstrap-table.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap-table@1.22.3/dist/locale/bootstrap-table-zh-CN.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/tableexport.jquery.plugin@1.28.0/tableExport.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <style>
    .select,
    #locale {
      width: 100%;
    }

    .edit {
      margin-right: 10px;
    }
  </style>
</head>

<body>
  <!-- 新增弹窗 -->
  <!-- Modal Body -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div class="modal fade" id="addModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
    aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
      <form id="addForm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">
              新增
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" name="categoryName" id="categoryName" placeholder="" />
              <label for="categoryName">Name</label>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              关闭
            </button>
            <button type="reset" class="btn btn-outline-danger">清空</button>
            <button type="submit" class="btn btn-primary">保存</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- 编辑弹窗 -->
  <!-- Modal Body -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div class="modal fade" id="editModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
    aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
      <form id="editForm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">
              编辑
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" name="categoryId">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" name="categoryName" id="categoryName" placeholder="" />
              <label for="categoryName">Name</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              关闭
            </button>
            <button type="reset" class="btn btn-outline-danger">清空</button>
            <button type="submit" class="btn btn-primary">保存</button>
          </div>
        </div>
      </form>
    </div>
  </div>



  <div class="container">
    <!-- 自定义工具栏 -->
    <div id="toolbar">
      <button id="add" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
        <i class="bi bi-plus-square"></i> 新增
      </button>
      <button id="export" class="btn btn-success">
        <i class="bi bi-file-earmark-spreadsheet"></i> 导出
      </button>
      <button id="remove" class="btn btn-danger" disabled>
        <i class="bi bi-trash"></i> 批量删除
      </button>
    </div>
    <!-- 表格初始化 -->
    <table id="table" data-toolbar="#toolbar" data-search="true" data-show-refresh="true" data-show-toggle="true"
      data-show-fullscreen="true" data-show-columns="true" data-show-columns-toggle-all="true" data-detail-view="true"
      data-show-export="true" data-click-to-select="true" data-detail-formatter="detailFormatter"
      data-minimum-count-columns="2" data-show-pagination-switch="true" data-pagination="true" data-id-field="id"
      data-page-list="[5,10, 25, 50, 100, all]" data-show-footer="true" data-side-pagination="client"
      data-url="/novel-category/list" data-response-handler="responseHandler">
    </table>
  </div>


</body>
<script>
  // 获取组件
  var $table = $('#table')
  var $remove = $('#remove')
  var selections = []

  // 获取被选中行的ID
  function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.categoryId
    })
  }

  // 处理远程响应的数据，可以指定要在表格显示的数据
  function responseHandler(res) {
    return res.data;
  }

  // 自定义显示样式
  function detailFormatter(index, row) {
    var html = []
    $.each(row, function (key, value) {
      html.push('<p><b>' + key + ':</b> ' + value + '</p>')
    })
    return html.join('')
  }

  function operateFormatter(value, row, index) {
    return [
      '<button type="button" class="btn btn-outline-primary edit btn-sm" title="编辑">',
      '<i class="bi bi-pencil"></i> 编辑',
      '</button> ',
      '<button type="button" class="btn btn-outline-danger remove btn-sm" title="删除">',
      '<i class="bi bi-trash"></i> 删除',
      '</button>'
    ].join('');
  }

  // 按钮点击事件
  window.operateEvents = {

    'click .edit': function (e, value, row, index) {
      // 弹窗编辑回显
      $.each(row, function (key, value) {
        $('#editForm input[name="' + key + '"]').val(value);
        // 如果表单字段是<input>标签之外的其他类型，也可以使用类似的方式进行赋值
      });
      $editModal.modal('show');
      // alert('You click edit action, row: ' + JSON.stringify(row))
    },

    // 移除
    'click .remove': async function (e, value, row, index) {
      if (await askDelete()) {
        // 从表格中移除选中的行
        remove(row.categoryId);
      }
    }
  }

  // 表格初始化
  function initTable() {

    $table.bootstrapTable('destroy').bootstrapTable({
      exportDataType: 'all',
      height: 550,
      locale: $('#locale').val(),
      columns: [
        [
          {
            field: 'state',
            checkbox: true,
            align: 'center',
            valign: 'middle'
          },
          {
            title: 'ID编号',
            field: 'categoryId',
            align: 'center',
            valign: 'middle',
            sortable: true,

          },
          {
            title: '分类名',
            field: 'categoryName',
            sortable: true,
            align: 'center'
          },
          {
            field: 'operate',
            title: '操作',
            align: 'center',
            clickToSelect: false,
            events: window.operateEvents,
            formatter: operateFormatter
          }
        ]
      ]
    })
    // 监听表格的选择事件，当表格中的行被选中或取消选中时触发
    $table.on('check.bs.table uncheck.bs.table ' +
      'check-all.bs.table uncheck-all.bs.table',
      function () {
        // 根据当前选中的行的数量来启用或禁用删除按钮
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)

        // 保存你的数据，这里只保存当前页的数据
        selections = getIdSelections()
        console.log("当前选中:" + selections)
        // 如果你想要保存所有选中的数据，可以在这里使用 push 或 splice 方法
      })

    // 监听表格的所有事件，用于调试目的
    $table.on('all.bs.table', function (e, name, args) {
      // console.log(name, args)
    })

    // 点击删除按钮时执行的操作
    $remove.click(async function () {
      // 获取所有选中行的 ID
      var ids = getIdSelections()

      if (await askDelete()) {
        // 从表格中移除选中的行
        console.log("要删除的ids：" + ids)
        removeBatch(ids);
        // 禁用删除按钮
        $remove.prop('disabled', true)
      }
    })

  }

  // 绑定导出按钮点击事件
  $('#export').click(function () {
    $table.tableExport({
      type: 'excel', // 导出文件类型，可选 'csv', 'txt', 'sql', 'json', 'xml', 'excel', 'doc', 'png', 'pdf'
      escape: 'false' // 是否使用转义，默认为 true
    });
  });

  $(function () {
    initTable();
    $('#locale').change(initTable)
  })

  // 删除确认弹窗
  async function askDelete() {
    const result = await Swal.fire({
      title: "确定要删除它吗?",
      text: "删除后无法恢复!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "确定!"
    });

    return result.isConfirmed;
  }

  // 操作提示
  function mess() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "操作OK",
      showConfirmButton: false,
      timer: 1500
    });
  }

  var $addModal = $('#addModal');
  var $editModal = $('#editModal');

  // 新增
  $('#addForm').submit(function (event) {
    event.preventDefault();
    var data = $('#addForm').serialize();
    console.log(data);
    save(data)
    $addModal.modal('hide');
  })




  // 保存编辑
  $('#editForm').submit(function (event) {
    event.preventDefault();
    var data = $('#editForm').serialize();
    console.log(data);
    update(data);
    $editModal.modal('hide');
  })


  function save(data) {
    $.post("/novel-category/add", data, function (data) {
      if (data.code === 200) {
        mess();
        refresh();
      }
    })
  }

  function update(data) {
    $.post("/novel-category/update", data, function (data) {
      if (data.code === 200) {
        mess();
        refresh();
      }
    })
  }

  function remove(id) {
    $.get("/novel-category/delete/" + id, function (data) {
      if (data.code === 200) {
        refresh();
        mess();
      }
    })
  }

  function removeBatch(data) {
    $.get("/novel-category/deleteBatch?ids=" + data.join(','), function (data) {
      if (data.code === 200) {
        mess();
        refresh();
      }
    })
  }


  function refresh() {
    $table.bootstrapTable('refresh');
  }


</script>

</html>
```

