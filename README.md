## 本项目实现的最终作用是基于SSH在线运动健身管理系统
## 分为2个角色
### 第1个角色为管理员角色，实现了如下功能：
 - 商品分类管理
 - 商品管理
 - 新闻信息管理
 - 新闻类别管理
 - 用户管理
 - 留言板管理
 - 管理员登录
 - 管理员管理
 - 系统公告管理
 - 订单管理
 - 课程管理
 - 预约管理
### 第2个角色为用户角色，实现了如下功能：
 - 健身知识
 - 查看公告
 - 查看在线商城
 - 查看我的预约
 - 查看订单和购物车
 - 查看课程列表
 - 用户角色首页
 - 留言
 - 购买商品
 - 预约课程
## 数据库设计如下：
# 数据库设计文档

**数据库名：** ssh_jianshen_sys

**文档版本：** 


| 表名                  | 说明       |
| :---: | :---: |
| [t_admin](#t_admin) | 管理员表 |
| [t_catelog](#t_catelog) |  |
| [t_goods](#t_goods) |  |
| [t_kecheng](#t_kecheng) |  |
| [t_leibie](#t_leibie) |  |
| [t_liuyan](#t_liuyan) | 留言 |
| [t_notice](#t_notice) | 公告 |
| [t_order](#t_order) |  |
| [t_orderitem](#t_orderitem) |  |
| [t_user](#t_user) | 用户表 |
| [t_wenzhang](#t_wenzhang) |  |
| [t_yuyue](#t_yuyue) | 预约 |

**表名：** <a id="t_admin">t_admin</a>

**说明：** 管理员表

**数据列：**

| 序号 | 名称 | 数据类型 |  长度  | 小数位 | 允许空值 | 主键 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  1   | UserId |   int   | 10 |   0    |    N     |  Y   |       | 用户ID  |
|  2   | username |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 用户名  |
|  3   | userPw |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 密码  |

**表名：** <a id="t_catelog">t_catelog</a>

**说明：** 

**数据列：**

| 序号 | 名称 | 数据类型 |  长度  | 小数位 | 允许空值 | 主键 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  1   | catelog_id |   int   | 10 |   0    |    N     |  Y   |       |   |
|  2   | catelog_name |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |
|  3   | catelog_miaoshu |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |
|  4   | catelog_del |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |

**表名：** <a id="t_goods">t_goods</a>

**说明：** 

**数据列：**

| 序号 | 名称 | 数据类型 |  长度  | 小数位 | 允许空值 | 主键 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  1   | goods_id |   int   | 10 |   0    |    N     |  Y   |       | 商品ID  |
|  2   | goods_name |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |
|  3   | goods_miaoshu |   text   | 65535 |   0    |    Y     |  N   |   NULL    |   |
|  4   | goods_pic |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 商品图片  |
|  5   | goods_yanse |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 颜色  |
|  6   | goods_shichangjia |   int   | 10 |   0    |    Y     |  N   |   NULL    | 市场价  |
|  7   | goods_tejia |   int   | 10 |   0    |    Y     |  N   |   NULL    | 特价  |
|  8   | goods_isnottejia |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 正常价  |
|  9   | goods_isnottuijian |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 是否推荐  |
|  10   | goods_catelog_id |   int   | 10 |   0    |    Y     |  N   |   NULL    |   |
|  11   | goods_kucun |   int   | 10 |   0    |    Y     |  N   |   NULL    |   |
|  12   | goods_Del |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 是否删除  |

**表名：** <a id="t_kecheng">t_kecheng</a>

**说明：** 

**数据列：**

| 序号 | 名称 | 数据类型 |  长度  | 小数位 | 允许空值 | 主键 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  1   | id |   int   | 10 |   0    |    N     |  Y   |       | 自增主键  |
|  2   | name |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 课程名称  |
|  3   | jieshao |   varchar   | 1000 |   0    |    Y     |  N   |   NULL    | 课程介绍  |
|  4   | jiaolian |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 教练名称  |
|  5   | tel |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 联系电话  |

**表名：** <a id="t_leibie">t_leibie</a>

**说明：** 

**数据列：**

| 序号 | 名称 | 数据类型 |  长度  | 小数位 | 允许空值 | 主键 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  1   | id |   int   | 10 |   0    |    N     |  Y   |   0    |   |
|  2   | mingcheng |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 名称  |
|  3   | del |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 是否删除  |

**表名：** <a id="t_liuyan">t_liuyan</a>

**说明：** 留言

**数据列：**

| 序号 | 名称 | 数据类型 |  长度  | 小数位 | 允许空值 | 主键 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  1   | liuyan_id |   int   | 10 |   0    |    N     |  Y   |       |   |
|  2   | liuyan_title |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |
|  3   | liuyan_content |   text   | 65535 |   0    |    Y     |  N   |   NULL    |   |
|  4   | liuyan_date |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |
|  5   | liuyan_user |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |
|  6   | huifu |   varchar   | 5000 |   0    |    Y     |  N   |   NULL    |   |
|  7   | huifushi |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |

**表名：** <a id="t_notice">t_notice</a>

**说明：** 公告

**数据列：**

| 序号 | 名称 | 数据类型 |  长度  | 小数位 | 允许空值 | 主键 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  1   | id |   int   | 10 |   0    |    N     |  Y   |       | 11  |
|  2   | title |   varchar   | 80 |   0    |    Y     |  N   |   NULL    | 标题  |
|  3   | neirong |   varchar   | 3000 |   0    |    Y     |  N   |   NULL    | 内容  |
|  4   | addtime |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 时间  |

**表名：** <a id="t_order">t_order</a>

**说明：** 

**数据列：**

| 序号 | 名称 | 数据类型 |  长度  | 小数位 | 允许空值 | 主键 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  1   | order_id |   int   | 10 |   0    |    N     |  Y   |       | 订单ID  |
|  2   | order_bianhao |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |
|  3   | order_date |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |
|  4   | order_zhuangtai |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |
|  5   | order_songhuodizhi |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |
|  6   | order_fukuangfangshi |   varchar   | 255 |   0    |    Y     |  N   |   NULL    |   |
|  7   | order_jine |   int   | 10 |   0    |    Y     |  N   |   NULL    |   |
|  8   | order_user_id |   int   | 10 |   0    |    Y     |  N   |   NULL    |   |

**表名：** <a id="t_orderitem">t_orderitem</a>

**说明：** 

**数据列：**

| 序号 | 名称 | 数据类型 |  长度  | 小数位 | 允许空值 | 主键 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  1   | orderItem_id |   int   | 10 |   0    |    N     |  Y   |       |   |
|  2   | order_id |   int   | 10 |   0    |    Y     |  N   |   NULL    | 订单ID  |
|  3   | goods_id |   int   | 10 |   0    |    Y     |  N   |   NULL    | 商品ID  |
|  4   | goods_quantity |   int   | 10 |   0    |    Y     |  N   |   NULL    |   |

**表名：** <a id="t_user">t_user</a>

**说明：** 用户表

**数据列：**

| 序号 | 名称 | 数据类型 |  长度  | 小数位 | 允许空值 | 主键 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  1   | id |   int   | 10 |   0    |    N     |  Y   |       | 自增主键  |
|  2   | username |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 登陆账号  |
|  3   | pwd |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 登录密码  |
|  4   | name |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 姓名  |
|  5   | sex |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 性别  |
|  6   | age |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 年龄  |
|  7   | addr |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 地址  |
|  8   | tel |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 联系电话  |

**表名：** <a id="t_wenzhang">t_wenzhang</a>

**说明：** 

**数据列：**

| 序号 | 名称 | 数据类型 |  长度  | 小数位 | 允许空值 | 主键 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  1   | id |   int   | 10 |   0    |    N     |  Y   |       | ID  |
|  2   | leibieId |   int   | 10 |   0    |    Y     |  N   |   NULL    |   |
|  3   | mingcheng |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 名称  |
|  4   | jieshao |   varchar   | 5000 |   0    |    Y     |  N   |   NULL    | 介绍  |
|  5   | fujian |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 附件  |
|  6   | hits |   int   | 10 |   0    |    N     |  N   |   0    | 用户ID  |
|  7   | shijian |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 时间  |
|  8   | del |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 是否删除  |

**表名：** <a id="t_yuyue">t_yuyue</a>

**说明：** 预约

**数据列：**

| 序号 | 名称 | 数据类型 |  长度  | 小数位 | 允许空值 | 主键 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  1   | id |   int   | 10 |   0    |    N     |  Y   |       | 自增主键  |
|  2   | pid |   int   | 10 |   0    |    Y     |  N   |   NULL    | 课程id  |
|  3   | sdate |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 预约时间  |
|  4   | zt |   varchar   | 255 |   0    |    Y     |  N   |   '未审核'    | 预约状态  |
|  5   | beizhu |   varchar   | 150 |   0    |    Y     |  N   |   NULL    | 备注  |
|  6   | uname |   varchar   | 255 |   0    |    Y     |  N   |   NULL    | 预约用户  |

