<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
		<title>运动健身系统</title>
		<link href="<%=path %>/css/layout.css" type="text/css"
			rel="stylesheet" />
		<script language="JavaScript" src="<%=path %>/js/public.js"
			type="text/javascript"></script>
		<script type="text/javascript">
      
        function liuyanAll()
	        {
              <c:if test="${sessionScope.user==null}">
	                  alert("请先登录");
	            </c:if>
	            
              <c:if test="${sessionScope.user!=null}">

	                 var url="<%=path %>/liuyanAll.action";
				 location.href=url;
	            </c:if>
	        }
        function myXinxi()
        {
                         <c:if test="${sessionScope.user==null}">

                  alert("请先登录");
            </c:if>
            
                      <c:if test="${sessionScope.user!=null}">

                var url="<%=path %>/qiantai/userlogin/userxinxi.jsp";
                var n="";
                var w="480px";
                var h="500px";
                var s="resizable:no;help:no;status:no;scroll:yes";
			    openWin(url,n,w,h,s);
            </c:if>
        }
        
    </script>
	</head>

	<body>
		<center>
			<img src="<%=path %>/images/logo.png" width="950">
		</center>
		<table width="950" border="0" align="center" cellpadding="0"
			cellspacing="0">
			<tr>
				<td width="950" height="48" background="<%=path %>/images/navbg.gif">
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="<%=path %>/qiantai/default.jsp"
						style="color: #fff; font-size: 14px; font-weight: bold">本站首页</a>
					&nbsp;&nbsp; | &nbsp;&nbsp;
					<a href="<%=path %>/noticeAll.action"
						style="color: #fff; font-size: 14px; font-weight: bold">网站公告</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<a href="<%=path %>/wenzhangNew.action"
						style="color: #fff; font-size: 14px; font-weight: bold">健身知识</a>

					&nbsp;&nbsp;|&nbsp;&nbsp;
					<a href="<%=path %>/kechengAll.action"
						style="color: #fff; font-size: 14px; font-weight: bold">课程列表</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;

					<a href="<%=path %>/goodsAllNoTejia.action"
						style="color: #fff; font-size: 14px; font-weight: bold">在线商城</a>

					&nbsp;&nbsp;|&nbsp;&nbsp;
					<a href="#" onclick="liuyanAll()"
						style="color: #fff; font-size: 14px; font-weight: bold">留言本</a>
					&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;
				</td>
				</td>
			</tr>
		</table>