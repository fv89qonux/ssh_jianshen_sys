<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page isELIgnored="false" %> 
<%
String path = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3" />
		<meta http-equiv="description" content="This is my page" />
		<title>This is my page</title>
<link rel="stylesheet" type="text/css" href="<%=path %>/css/base.css" />
<script language="JavaScript" src="<%=path %>/js/public.js" type="text/javascript"></script>
		<script type="text/javascript" src="<%=path %>/js/popup.js"></script>

		<script type="text/javascript">
	       function go(index)
           {
               window.location.href="<%=path %>/userMana.action?index="+index;
           }
</script>
</head>
<table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" >
 <tr><th height="29" align="center">用户列表</th></tr></table>
 
 <table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" >

 <tr align="center" bgcolor="#F2FDFF"><td class="optiontitle">序号</td>
<td class="optiontitle">登陆账号</td>
<td class="optiontitle">登录密码</td>
<td class="optiontitle">姓名</td>
<td class="optiontitle">性别</td>
<td class="optiontitle">年龄</td>
<td class="optiontitle">地址</td>
<td class="optiontitle">联系电话</td>
<td class="optiontitle">操作</td></tr>
<c:forEach items="${requestScope.page.data}" var="user"  varStatus="ss">

<tr align="center" bgcolor="#FFFFFF" onmouseover='this.style.background="#F2FDFF"' onmouseout='this.style.background="#FFFFFF"'>
<td bgcolor="#FFFFFF" align="center">${ss.index+1 + (requestScope.page.index*4-4)}</td>

<td height="25">${user.username}</td>

<td height="25">${user.pwd}</td>

<td height="25">${user.name}</td>

<td height="25">${user.sex}</td>

<td height="25">${user.age}</td>

<td height="25">${user.addr}</td>

<td height="25">${user.tel}</td>

<td height="25"><a href="<%=path %>/userEditPre.action?id=${user.id}">修改</a>| <a href="userDel.action?id=${user.id}" onClick="return confirm('您确定要删除吗?')">删除</a></td>
</tr>
</c:forEach></table> <table border="0" cellpadding="0" cellspacing="0" align="center">
						        <tr>
							        <td width="98%" align="right">
							                  共<span style="color:#FF0000">${requestScope.page.totle}</span>条记录&nbsp;&nbsp;&nbsp;&nbsp;
							                  每页<span style="color:#FF0000">${requestScope.page.pageSize}</span>条&nbsp;&nbsp;&nbsp;&nbsp;
							                  第<span style="color:#FF0000">${requestScope.page.index}</span>页/共${requestScope.page.totlePage}页&nbsp;&nbsp;&nbsp;&nbsp;
							                <c:if test="${requestScope.page.index==1}">
							                       首&nbsp;&nbsp;&nbsp;页&nbsp;&nbsp;&nbsp;&nbsp;上一页&nbsp;&nbsp;&nbsp;&nbsp;
							                </c:if>
							                <c:if test="${requestScope.page.index!=1}">
							                       <a style="color: red" href="#" onclick="go(1)">首&nbsp;&nbsp;页</a>
							                       &nbsp;&nbsp;&nbsp;&nbsp;
							                       <a style="color: red" href="#" onclick="go(${requestScope.page.index-1})">上一页</a>
							                       &nbsp;&nbsp;&nbsp;&nbsp;
							                </c:if>
							                <c:if test="${requestScope.page.index >= requestScope.page.totlePage}">
							                          下一页&nbsp;&nbsp;&nbsp;&nbsp;末&nbsp;&nbsp;页&nbsp;&nbsp;&nbsp;&nbsp;
							                </c:if>
							                <c:if test="${requestScope.page.index < requestScope.page.totlePage}">
							                       <a style="color: red" href="#" onclick="go(${requestScope.page.index+1})">下一页</a>
							                       &nbsp;&nbsp;&nbsp;&nbsp;
							                       <a style="color: red" href="#" onclick="go(${requestScope.page.totlePage})">末&nbsp;&nbsp;页</a>
							                </c:if>
							        </td>
						       </tr>
						    </table>
