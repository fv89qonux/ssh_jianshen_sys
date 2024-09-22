<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page isELIgnored="false" %> 
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
%>
<jsp:include flush="true" page="/qiantai/header.jsp"></jsp:include>

<table width="950"  border="0" align="center" cellpadding="4" cellspacing="1" >
 <tr><th height="29" align="center">公告列表</th></tr></table>
 
 <table width="950"  border="0" align="center" cellpadding="4" cellspacing="1" >

 <tr align="left" bgcolor="#F2FDFF"><td class="optiontitle">标题</td>
<td class="optiontitle">查看</td>
	</tr>
	<c:forEach items="${requestScope.noticeAll}" var="notice"  varStatus="ss">

<tr align="left" bgcolor="#FFFFFF" onmouseover='this.style.background="#F2FDFF"' onmouseout='this.style.background="#FFFFFF"'>


<td height="25"><a href="<%=path %>/noticeDetail.action?id=${notice.id}">${notice.title}</a></td>

<td height="25"><a href="<%=path %>/noticeDetail.action?id=${notice.id}">查看内容</a></td>


</tr>
</c:forEach></table>
<jsp:include flush="true" page="/qiantai/footer.jsp"></jsp:include>