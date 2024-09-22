<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page isELIgnored="false" %> 
<%
String path = request.getContextPath();
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>标题</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link href="<%=path %>/admin/style/css.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="<%=path %>/admin/js/jquery.js"></script>
<script type="text/javascript">
$(function(){
  $('p').each(function(i){
    $(this).click(function(){
      $('p:not(:eq('+i+'))').next().hide();
      $('p:not(:eq('+i+'))').find('span').text("+");  
      $(this).next().show();  
      $(this).find('span').text("-"); 
    })
  })
})
function logout(){
  if (confirm("您确定要退出管理后台吗？"))
  top.location = "logout.php";
  return false;
}
</script>
</head>

<body class="admin_left">
  <div class="admin_nav"> 
<p><span>+</span> 新闻模块管理</p>
    <div> 
   
<a href="<%=path %>/leibieMana.action" target="manFrame" style="text-decoration:none">新闻类别管理</a>
<a href="<%=path %>/admin/leibie/leibieAdd.jsp" target="manFrame" style="text-decoration:none">添加新闻类别</a>
<a href="<%=path %>/admin/wenzhang/wenzhangAdd.jsp" target="manFrame" style="text-decoration:none">新闻信息添加</a>
<a href="<%=path %>/wenzhangMana.action" target="manFrame" style="text-decoration:none">新闻信息管理</a>
    </div>


<p><span>+</span> 课程模块管理</p>
    <div> 
   
      <a target="manFrame" href="<%=path %>/kechengMana.action">课程管理</a> 
      <a target="manFrame" href="<%=path %>/admin/kecheng/kechengAdd.jsp">课程添加</a> 
      <a target="manFrame" href="<%=path %>/yuyueMana.action">预约管理</a> 

    </div>





<p><span>+</span> 公告管理</p>
    <div> 
   
      <a target="manFrame" href="<%=path %>/noticeMana.action">公告管理</a> 
      <a target="manFrame" href="<%=path %>/admin/notice/noticeAdd.jsp">公告添加</a> 

    </div>

<p><span>+</span> 商城模块管理</p>
    <div> 
   
   
  <a target="manFrame" href="<%=path %>/catelogMana.action">商品分类管理</a> 
      <a target="manFrame" href="<%=path %>/goodsManaNoTejia.action">商品管理</a> 
	        <a target="manFrame" href="<%=path %>/admin/goods/goodsNoTejiaAdd.jsp">添加商品</a> 
	        	        <a target="manFrame" href="<%=path %>/orderMana.action">订单管理</a> 
	        
    </div>

    <p><span>+</span> 论坛交流管理</p>
    <div> 
   
				        <a target="manFrame" href="<%=path %>/liuyanMana.action">论坛交流管理</a> 


    </div>
  

    <p><span>+</span> 用户模块管理</p>
    <div> 
          <a target="manFrame" href="<%=path %>/userMana.action">注册用户管理</a> 
    
	  	  <a target="manFrame" href="<%=path %>/adminManage.action">管理员管理</a> 
	  	  <a target="manFrame" href="<%=path %>/admin/admin/userPw.jsp">密码修改</a> 

    </div>
  
   
   
  </div>
</body>
</html>