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
		       
		        if(document.formAdd.name.value=="")
		        {
		            alert("请输入完整信息!");
		            return false;
		        }
		   
		  
		        document.formAdd.submit();
		    }
</script>
</head>
<form name="formAdd" method="post" action="<%=path %>/kechengEdit.action" ><table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" >
 <tr><th height="29" align="center">修改</th></tr></table><table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" ><input type="hidden" name="id" value="${requestScope.kecheng.id}"/><tr align="center">
<td align="right"> 课程名称：</td>
<td align="left"><input name="name" type="text" id="name" size="20" value="${requestScope.kecheng.name}"></td>
</tr>
 <script type="text/javascript" src="<%=path %>/ueditor/ueditor.config.js"></script>
       <script type="text/javascript" src="<%=path %>/ueditor/ueditor.all.js"></script><tr align="center" bgcolor="#FFFFFF" >
						    <td width="15%" bgcolor="#FFFFFF" align="right">
						      课程介绍：
						    </td>
						    <td width="85%" bgcolor="#FFFFFF" align="left">
						      <textarea name="jieshao" id="jieshao">${requestScope.kecheng.jieshao }</textarea>
	                            <script type="text/javascript">
UE.getEditor('jieshao',{toolbars:[['FullScreen', 'Source','Undo', 'Redo','Bold','test']],wordCount:false,elementPathEnabled:false,
            initialFrameHeight:100,initialFrameWidth:340})   </script>
						    </td>
						</tr><tr align="center">
<td align="right"> 教练名称：</td>
<td align="left"><input name="jiaolian" type="text" id="jiaolian" size="20" value="${requestScope.kecheng.jiaolian}"></td>
</tr>
<tr align="center">
<td align="right"> 联系电话：</td>
<td align="left"><input name="tel" type="text" id="tel" size="20" value="${requestScope.kecheng.tel}"></td>
</tr>
<tr align="center" bgcolor="#ebf0f7">
          <td  colspan="2" >
		     <INPUT TYPE="hidden" name="action" value="yes">
            <input type="button" name="Submit" value="修改保存" onclick="check()">
          	<input type="button" name="Submit2" value="返回" onClick="history.back(-1)"></td>
        </tr>
		
      </table></FORM>