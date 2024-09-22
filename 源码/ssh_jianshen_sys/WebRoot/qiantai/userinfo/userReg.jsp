<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<%
String path = request.getContextPath();
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	    <base target="_self"/>
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3" />
		<meta http-equiv="description" content="This is my page" />
		<script language="javascript">
            function closeOpen()
		    {
		       window.returnValue=false;
		       window.close();
		    }
		    function check()
		    {
		        if(document.formAdd.username.value=="")
		        {
		            alert("请输入用户名");
		            return false;
		        }
		        if(document.formAdd.pwd.value=="")
		        {
		            alert("请输入密码");
		            return false;
		        }
		        if(document.formAdd.repwd.value!=document.formAdd.pwd.value)
		        {
		            alert("两次密码不一致");
		            return false;
		        }
		        document.formAdd.submit();
		    }
        </script>
	</head>
	<body>
			<form name="formAdd" method="post" action="<%=path %>/useReg.action" >
<table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" >
 <tr><th height="29" align="center">用户注册</th></tr></table><table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" ><tr align="center">
<td align="right"> 登陆账号：</td>
<td align="left"><input name="username" type="text" id="username" size="20" ></td>
</tr>
<tr align="center">
<td align="right"> 登录密码：</td>
<td align="left"><input name="pwd" type="password" id="pwd" size="20" ></td>
</tr>
<tr align="center">
<td align="right"> 确认密码：</td>
<td align="left"><input name="repwd" type="password" id="repwd" size="20" ></td>
</tr>
<tr align="center">
<td align="right"> 姓名：</td>
<td align="left"><input name="name" type="text" id="name" size="20" ></td>
</tr>
<tr align="center">
<td align="right"> 性别：</td>
<td align="left">
<input type="radio" name="sex" value="男" checked="checked"/>男
&nbsp;&nbsp;&nbsp;&nbsp;
<input type="radio" name="sex" value="女"/>女
</td>
</tr><tr align="center">
<td align="right"> 年龄：</td>
<td align="left"><input name="age" type="text" id="age" size="6" ></td>
</tr>
<tr align="center">
<td align="right"> 地址：</td>
<td align="left"><input name="addr" type="text" id="addr" size="20" ></td>
</tr>
<tr align="center">
<td align="right"> 联系电话：</td>
<td align="left"><input name="tel" type="text" id="tel" size="20" ></td>
</tr>

<tr align="center" bgcolor="#ebf0f7">
          <td  colspan="2" >
            <input type="button" name="Submit" value="注册" onclick="check()">
							<input type="button" value="取消" onclick="closeOpen()"/>
        </tr>
		
      </table>
      </FORM>
				
	</body>
</html>
