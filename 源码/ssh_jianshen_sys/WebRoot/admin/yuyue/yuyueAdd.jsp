<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page isELIgnored="false"%>
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
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/base.css" />
		<script language="JavaScript" src="<%=path%>/js/public.js"
			type="text/javascript"></script>
		<script type="text/javascript" src="<%=path%>/js/popup.js"></script>
		<script type="text/javascript">
function check()
		    {
		       
		        if(document.formAdd.name.value=="")
		        {
		            alert("请输入完整信息!");
		            return false;
		        }
		   
		  
		        document.formAdd.submit();
		    }
</script>
	</head>
	<form name="formAdd" method="post" action="<%=path%>/yuyueAdd.action"
		enctype="multipart/form-data" onSubmit="return check()">
		<table width="96%" border="0" align="center" cellpadding="4"
			cellspacing="1">
			<tr>
				<th height="29" align="center">
					添加预约
				</th>
			</tr>
		</table>
		<table width="96%" border="0" align="center" cellpadding="4"
			cellspacing="1">
			<input type="hidden" name="id" value="${requestScope.yuyue.id }" />
			<tr align="center">
				<td align="right">
					活动：
				</td>
				<td align="left">
					<input name="pid" type="text" id="pid" size="20"
						onkeyup="this.value=this.value.replace(/\D/g,'')"
						onafterpaste="this.value=this.value.replace(/\D/g,'')" value="1">
				</td>
			</tr>
			<script type="text/javascript" src="<%=path%>/js/laydate.js"></script>
			<tr align="center">
				<td align="right">
					预约时间：
				</td>
				<td align="left">
					<input name="sdate" type="text" id="sdate" size="20"
						class="laydate-icon">
					<script type="text/javascript">!function(){laydate.skin('dahong');	laydate({elem: '#sdate'});}();</script>

				</td>
			</tr>
			<tr align="center">
				<td align="right">
					预约状态：
				</td>
				<td align="left">
					<input name="zt" type="text" id="zt" size="20">
				</td>
			</tr>
			<tr align="center">
				<td align="right">
					备注：
				</td>
				<td align="left">
					<input name="beizhu" type="text" id="beizhu" size="20">
				</td>
			</tr>
			<input name="uname" type="hidden" value="${sessionScope.loginname}">
			<tr align="center" bgcolor="#ebf0f7">
				<td colspan="2">
					<input type="Submit" name="Submit" value="保存">
					<input type="button" name="Submit2" value="返回"
						onClick="history.back(-1)">
				</td>
			</tr>
			</FORM>
		</table>