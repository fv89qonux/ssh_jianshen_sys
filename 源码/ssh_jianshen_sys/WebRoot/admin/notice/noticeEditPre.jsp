<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>


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
function check()
		    {
		       
		        if(document.formAdd.title.value=="")
		        {
		            alert("请输入完整信息!");
		            return false;
		        }
		   
		  
		        document.formAdd.submit();
		    }
</script>
</head>
<form name="formAdd" method="post" action="<%=path %>/noticeEdit.action" ><table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" >
 <tr><th height="29" align="center">修改公告</th></tr></table><table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" ><input type="hidden" name="id" value="${requestScope.notice.id}"/><tr align="center">
<td align="right"> 标题：</td>
<td align="left"><input name="title" type="text" id="title" size="40" value="${requestScope.notice.title}"></td>
</tr>
<tr align="center">
<td align="right"> 内容</td>
<td align="left"> <FCK:editor instanceName="neirong"  basePath="/fckeditor" width="500" height="200" value="${requestScope.notice.neirong }" toolbarSet="Basic">
                                </FCK:editor>
</td>
</tr> <tr align="center" bgcolor="#ebf0f7">
          <td  colspan="2" >
		     <INPUT TYPE="hidden" name="action" value="yes">
            <input type="button" name="Submit" value="修改保存" onclick="check()">
          	<input type="button" name="Submit2" value="返回" onClick="history.back(-1)"></td>
        </tr>
		</FORM>
      </table>