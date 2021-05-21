# MES 基础与应用说明：

1. 说明
   - 本系统的大概页面都是在LayUI的基础上搭建起来的，具体参考[LayUI](https://www.layui.com/)
   - 系统采用了前后端分离架构进行开发，由于是作业复杂程度不需要太高，说以后端的数据，我全部放在data文件夹下了，并通过url.js 文件提供数据接口，如果最后需要接连后端程序，即参考json文件的格式，并修改url.js 接口即可完成数据更换
   - 整个系统采用动态页面加载技术，实现了单页面系统，即整个项目的所有操作都在index.html 中进行；

   - 其中实现切换页面的代码为，主要通过自定义属性 page来动态定义页面，然后通过JQuery的load方法对各独立的html文件进行载入

   ```JavaScript
   $(".lvc-nav li").click(function () {
       thisPage = $(this).attr("page") + "";
       parentPage = $(this).parent().parent().attr("page") + "";
       $(this).siblings().find('ol').hide();
       $(this).addClass("active").siblings().removeClass("active");
       $("#main").load("page/" + $(this).attr("page"));
       $(this).parent().parent().attr("page", thisPage);
   
   })
   
   ```

2. 整个项目目录结构说明

```
 目录结构：

   css-------样式表
  data------存放数据,是整个项目的运行数据的核心
  file------存放，项目中需要下载的文件
  font------存放字体图标等文件
  images----整个项目中需要用到的各种图片
  js--------一些公用的js文件
  page-------全部页面文件
  index.html-首页
  layui.js---核心开发技术
```



3. 主要实现功能及页面截图

   1. 人员列表

      ![](https://github.com/liuxingzhumeng/MES/blob/master/show/1.png)

   2.  添加人员

      ![](https://github.com/liuxingzhumeng/MES/blob/master/show/2.png)

   3.  设备类型

      ![](https://github.com/liuxingzhumeng/MES/blob/master/show/3.png)

   4. 设备列表

      ![](https://github.com/liuxingzhumeng/MES/blob/master/show/4.png)

   5. 工位管理

      ![](https://github.com/liuxingzhumeng/MES/blob/master/show/5.png)

   6. PAD管理

      ![](https://github.com/liuxingzhumeng/MES/blob/master/show/6.png)

   7. 物料管理

      ![](https://github.com/liuxingzhumeng/MES/blob/master/show/8.png)

   8. 生成能力管理

      ![](https://github.com/liuxingzhumeng/MES/blob/master/show/9.png)

   9. 添加工序

      ![](https://github.com/liuxingzhumeng/MES/blob/master/show/10.png)

   10. 生产线体

       ![](https://github.com/liuxingzhumeng/MES/blob/master/show/11.png)

   11. 工艺路线图编辑器

       ![](https://github.com/liuxingzhumeng/MES/blob/master/show/12.png)



4. MES 数据库ER分布图

   ![](https://github.com/liuxingzhumeng/MES/blob/master/show/er.png)
