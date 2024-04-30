{}
date: 2024-04-30 13:52:03
---

---
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DataTables CRUD Example with Bootstrap</title>
    <!-- Bootstrap CSS -->
    <!-- DataTables CSS -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/2.0.2/css/dataTables.bootstrap5.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
    <style>
        /* 自定义样式 */
        body {
            background-color: #f8f9fa;
            /* 浅灰色背景 */
        }

        .navbar-brand img {
            max-height: 40px;
            /* 设置 Logo 图片高度 */
        }

        .avatar {
            width: 30px;
            /* 头像大小 */
            height: 30px;
            border-radius: 50%;
            /* 圆形头像 */
            margin-right: 5px;
            /* 头像和用户名间距 */
        }

        .navbar-nav {
            margin: auto;
            /* 网站公告和岗位招聘菜单居中显示 */
        }
    </style>
</head>

<body>

    <!-- 导航栏 -->
    <div th:insert="user/index :: navbar"></div>
    
    <div class="container mt-5">
        <div class="row">
            <h2>我的公司-岗位管理</h2>
            <hr>
            <div class="card">
                <div class="card-body">
                    <div class="col">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#addModal">新增</button>
                        <table id="example" class="table table-bordered table-hover" style="width:100%">
                            <thead>
                                <tr>
                                    
                                    <th>ID</th>
                                    <th>岗位</th>
                                    <th>薪资</th>
                                    <th>地点</th>
                                    <th>发布日期</th>
                                    <th>截止日期</th>
                                    <th>描述</th>
                                    <th>学历</th>
                                    <th>经验</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Table rows will be dynamically added here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 新增 -->
    <div class="modal fade" id="addModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <!-- 模态框头部 -->
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalLabel">新增数据</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <!-- 模态框内容 -->
                <div class="modal-body">
                    <form id="addForm">
                        <div class="form-group">
                            <label for="jobName">岗位</label>
                            <input name="jobName" type="text" class="form-control" id="jobName"
                                placeholder="Enter job name">
                        </div>
                        <div class="form-group">
                            <label for="jobDescription">描述</label>
                            <textarea name="jobDescription" class="form-control" id="jobDescription" rows="3"
                                placeholder="Enter job description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="salaryRange">薪资</label>
                            <input name="salaryRange" type="text" class="form-control" id="salaryRange"
                                placeholder="Enter salary range">
                        </div>
                        <div class="form-group">
                            <label for="location">地点</label>
                            <input name="location" type="text" class="form-control" id="location"
                                placeholder="Enter location">
                        </div>
                        <div class="form-group">
                            <label for="deadline">截止日期</label>
                            <input name="deadTime" type="text" class="form-control" id="deadline"
                                placeholder="xxxx-xx-xx">
                        </div>
                        <div class="form-group">
                            <label for="educationRequirement">学历要求</label>
                            <input name="educationRequirement" type="text" class="form-control"
                                id="educationRequirement" placeholder="Enter education requirement">
                        </div>
                        <div class="form-group">
                            <label for="experienceRequirement">经验要求</label>
                            <input name="experienceRequirement" type="text" class="form-control"
                                id="experienceRequirement" placeholder="Enter experience requirement">
                        </div>
                    </form>
                </div>

                <!-- 模态框底部 -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" onclick="addData()">保存</button>
                </div>

            </div>
        </div>
    </div>


    <!-- Edit Modal -->
    <div class="modal fade" id="editModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <!-- 模态框头部 -->
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalLabel">编辑数据</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <!-- 模态框内容 -->
                <div class="modal-body">
                    <form id="editForm">
                        <div class="form-group">

                            <input name="jobId" type="hidden" class="form-control" id="jobId"
                                placeholder="Enter job name">
                        </div>
                        <div class="form-group">
                            <label for="jobName">岗位</label>
                            <input name="jobName" type="text" class="form-control" id="jobName"
                                placeholder="Enter job name">
                        </div>
                        <div class="form-group">
                            <label for="jobDescription">描述</label>
                            <textarea name="jobDescription" class="form-control" id="jobDescription" rows="3"
                                placeholder="Enter job description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="salaryRange">薪资</label>
                            <input name="salaryRange" type="text" class="form-control" id="salaryRange"
                                placeholder="Enter salary range">
                        </div>
                        <div class="form-group">
                            <label for="location">地点</label>
                            <input name="location" type="text" class="form-control" id="location"
                                placeholder="Enter location">
                        </div>
                        <div class="form-group">
                            <label for="deadline">截止日期</label>
                            <input name="deadTime" type="text" class="form-control" id="deadline"
                                placeholder="xxxx-xx-xx">
                        </div>
                        <div class="form-group">
                            <label for="educationRequirement">学历要求</label>
                            <input name="educationRequirement" type="text" class="form-control"
                                id="educationRequirement" placeholder="Enter education requirement">
                        </div>
                        <div class="form-group">
                            <label for="experienceRequirement">经验要求</label>
                            <input name="experienceRequirement" type="text" class="form-control"
                                id="experienceRequirement" placeholder="Enter experience requirement">
                        </div>
                    </form>
                </div>

                <!-- 模态框底部 -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" onclick="saveChanges()">保存</button>
                </div>

            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->>
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/2.0.2/js/dataTables.js"></script>
    <script src="https://cdn.datatables.net/2.0.2/js/dataTables.bootstrap5.js"></script>

    <script>
        var table;

        $(document).ready(function () {
            table = $('#example').DataTable({
                columnDefs: [
                    { width: '100px', targets: [9] } // 设置第1、2、3列的宽度为100px
                ],
                ajax: {
                    url: '/company/hr/1',
                    dataSrc: 'data'
                },
                // searching: false, // Disable default search box
                language: {
                    "search": "搜索:",
                    "lengthMenu": "显示 _MENU_ 项结果",
                    "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "infoFiltered": "(由 _MAX_ 项结果过滤)",
                    "paginate": {
                        "first": "首页",
                        "previous": "上一页",
                        "next": "下一页",
                        "last": "末页"
                    }
                },
                // "pagingType": "bootstrap",
                columns: [
                    {
                        data: "jobId",
                    },

                    {
                        data: "jobName",
                        sClass: "text-center",
                        // 自定义列样式
                        // "render": function (data, type, row) {
                        //   if (data === "") {
                        //     return '<span style="background-color: red;">' + data + '</span>';
                        //   } else {
                        //     return data;
                        //   }
                        // },
                    }, {
                        data: 'salaryRange'
                    }, {
                        data: 'location'
                    }, {
                        data: 'postDate'
                    }, {
                        data: 'deadline'
                    },
                    {
                        data: 'jobDescription'
                    }, {
                        data: 'educationRequirement'
                    }, {
                        data: 'experienceRequirement'
                    },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button onclick="editRow(' + row.jobId + ')" class="btn btn-info btn-sm">编辑</button>' +
                                '<button onclick="deleteRow(' + row.jobId + ')" class="btn btn-danger btn-sm ml-1">删除</button>'
                                ;
                        },
                        sClass: "text-center"
                    }
                ],

            });
        });

        function editRow(id) {
            var rowData = table.row(function (index, data, node) {
                return data.jobId === id;
            }).data();
            // Show edit modal
            // 遍历对象，并将每个字段的值赋给相应的表单字段
            $.each(rowData, function (key, value) {
                $('#editForm input[name="' + key + '"]').val(value);
                // 如果表单字段是<input>标签之外的其他类型，也可以使用类似的方式进行赋值
            });
            $('#editModal').modal('show');
        }

        function deleteRow(id) {
            // 弹出删除确认框
            Swal.fire({
                title: '确认删除？',
                text: "您确定要删除这条记录吗？",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '是的，删除它！'
            }).then((result) => {
                // 如果用户点击确认按钮，则执行删除操作
                if (result.isConfirmed) {
                    // 这里添加执行删除操作的代码
                    // ajax
                    console.log(id)
                    $.get("/job/del/" + id, function (data) {
                        if (data.code === 200) {
                            // Remove row from the table
                            table.row(function (index, data, node) {
                                return data.jobId === id;
                            }).remove().draw();
                            // Implement delete functionality here
                            tips("success", "删除成功！")
                        }
                    })
                    // 在这个示例中，我们只是简单地弹出一个提示框
                }
            })

        }

        function searchTable() {
            var searchText = $('#searchText').val();
            table.search(searchText).draw();
        }

        function addData() {
            // var newData = {
            //     categoryName: $('#name').val(),
            // };
            var newData = $("#addForm").serialize();
            $.post("/job/release", newData, function (data) {
                if (data.code === 200) {
                    // newData.categoryId = data.data;
                    // Add new data to the table
                    // table.row.add(newData).draw();
                    table.ajax.reload();
                    tips("success", "新增成功！")
                }
            })
            // Reset form fields
            $('#addForm')[0].reset();

            // Close the modal
            $('#addModal').modal('hide');
        }

        // 保存修改
        function saveChanges() {
            var editedData = $('#editForm').serialize();
            // ajax
            $.post("/job/edit", editedData, function (data) {
                if (data.code === 200) {
                    table.ajax.reload();
                    tips("success", "修改成功！")
                }
            })
            // Close the modal
            $('#editModal').modal('hide');
        }

        function tips(icon, msg) {
            Swal.fire({
                position: "top-end",
                icon: icon,
                title: msg,
                showConfirmButton: false,
                timer: 1500
            });
        }

    </script>

</body>

</html>
```

