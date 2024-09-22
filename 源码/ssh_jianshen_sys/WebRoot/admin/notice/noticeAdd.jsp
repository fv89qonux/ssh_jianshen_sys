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
<form name="formAdd" method="post" action="<%=path %>/noticeAdd.action" ><table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" >
 <tr><th height="29" align="center">添加公告</th></tr></table><table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" ><tr align="center">
<td align="right"> 标题：</td>
<td align="left"><input name="title" type="text" id="title" size="40" ></td>
</tr>


<!-- <tr align="center">
<td align="right"> 内容</td>
<td align="left"> <FCK:editor instanceName="neirong"  basePath="/fckeditor" width="500" height="200" value="请输入内容" toolbarSet="Basic">
                                </FCK:editor>
</td>
</tr> -->
		<script type="text/javascript" src="<%=path %>/ueditor/ueditor.config.js"></script>
       <script type="text/javascript" src="<%=path %>/ueditor/ueditor.all.js"></script>
<tr align="center" bgcolor="#FFFFFF" >
						    <td width="15%" bgcolor="#FFFFFF" align="right">
						   
内容:
						    </td>
						    <td width="85%" bgcolor="#FFFFFF" align="left">
						      <textarea name="neirong" id="neirong" ></textarea>
	                            <script type="text/javascript">
UE.getEditor('neirong',{toolbars:[['FullScreen', 'Source','Undo', 'Redo','Bold','test']],wordCount:false,elementPathEnabled:false,
            initialFrameHeight:100,initialFrameWidth:340})   </script>
						    </td>
						</tr>
 <tr align="center" bgcolor="#ebf0f7">
          <td  colspan="2" >
            <input type="button" name="Submit" value="保存" onclick="check()">
          	<input type="button" name="Submit2" value="返回" onClick="history.back(-1)"></td>
        </tr>
		</FORM>
      </table>
    