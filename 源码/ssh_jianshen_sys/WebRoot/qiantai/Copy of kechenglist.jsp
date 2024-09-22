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
               window.location.href="<%=path %>/kechengMana.action?index="+index;
           }
</script>
</head>
<table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" >
 <tr><th height="29" align="center">课程列表</th></tr></table>
 
 <table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" >

 <tr align="center" bgcolor="#F2FDFF"><td class="optiontitle">序号</td>
<td class="optiontitle">课程名称</td>

<td class="optiontitle">教练名称</td>
<td class="optiontitle">联系电话</td>
<td class="optiontitle">操作</td></tr>
<c:forEach items="${requestScope.kechengAll}" var="kecheng"  varStatus="ss">

<tr align="center" bgcolor="#FFFFFF" onmouseover='this.style.background="#F2FDFF"' onmouseout='this.style.background="#FFFFFF"'>
<td bgcolor="#FFFFFF" align="center">${ss.index+1 }</td>

<td height="25">${kecheng.name}</td>


<td height="25">${kecheng.jiaolian}</td>

<td height="25">${kecheng.tel}</td>

<td height="25"><a href="<%=path %>/kechengDetail.action?id=${kecheng.id}">查看详情</a></td></tr>
</c:forEach></table> 
