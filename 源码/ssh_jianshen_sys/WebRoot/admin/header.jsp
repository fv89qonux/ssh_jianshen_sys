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
<title>头部</title>
<link href="<%=path %>/admin/style/css.css" rel="stylesheet" type="text/css">
<script type="text/javascript">
	    function logout()
		{
		   if(confirm("确定要退出本系统吗??"))
		   {
			   window.parent.location="<%=path %>/login.jsp";
		   }
		}
	</script>
</head>
<body>
<div class="header">
<div><a href="#"  class="logo">后台管理</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;你好：<strong>管理员${sessionScope.admin.userName}</strong>,

欢迎登录！&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style="color: white;font-size: 16px;font-family: 微软雅黑" onclick="logout()">注销退出</a></div>

</div>
</body>
</html>