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
 <tr><th height="29" align="center">我的预约列表</th></tr></table>
 
 <table width="950"  border="0" align="center" cellpadding="4" cellspacing="1" >

 <tr align="center" bgcolor="#F2FDFF">
 <td class="optiontitle">序号</td><td class="optiontitle">课程</td>
	<td class="optiontitle">预约时间</td>
	<td class="optiontitle">预约状态</td>

	<td class="optiontitle">操作</td></tr>
	<c:forEach items="${requestScope.mydata}" var="yuyue"  varStatus="ss">
	<tr align="center" bgcolor="#FFFFFF" onmouseover='this.style.background="#F2FDFF"' onmouseout='this.style.background="#FFFFFF"'>
	<td bgcolor="#FFFFFF" align="center">${ss.index+1}</td>
	<td height="25"><a href="kechengDetail.action?id=${yuyue.pid}" target="_blank">查看</a></td><td height="25">${yuyue.sdate}</td><td height="25">${yuyue.zt}</td>

	<td height="25"> <a href="myyuyueDel.action?id=${yuyue.id}" onClick="return confirm('您确定要取消吗?')">取消预约</a></td></tr>
</c:forEach></table> 
<jsp:include flush="true" page="/qiantai/footer.jsp"></jsp:include>