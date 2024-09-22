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
 <tr>
    <td height="19" colspan="4" class="tdtitle">
	<div align="center" class="title"> 详情</div></td>
  </tr>
<tr align="center" bgcolor="#F2FDFF">
<td align="right"> 标题：</td>
<td align="left">${requestScope.data.title }</td>
</tr>
<tr align="center" bgcolor="#F2FDFF">
<td align="right"> 内容：</td>
<td align="left">${requestScope.data.neirong }</td>
</tr>
