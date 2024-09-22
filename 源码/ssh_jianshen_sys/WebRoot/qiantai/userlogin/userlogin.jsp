<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script language="JavaScript" src="<%=path %>/js/public.js" type="text/javascript"></script>
	<script type="text/javascript">
	        function reg()
	        {
	                var url="<%=path %>/qiantai/userinfo/userReg.jsp";
	                var n="";
	                var w="480px";
	                var h="500px";
	                var s="resizable:no;help:no;status:no;scroll:yes";
				    openWin(url,n,w,h,s);
	        }
	        function login()
	        {
	           if(document.userLogin.username.value=="")
	           {
	               alert("请输入用户名");
	               return;
	           }
	           if(document.userLogin.pwd.value=="")
	           {
	               alert("请输入密码");
	               return;
	           }
	           document.userLogin.submit();
	        }
	        
	</script>
  </head>
  
  <body>
       <s:if test="#session.user==null">
			<form action="<%=path %>/userLogin.action" name="userLogin" method="post">
			      <table cellspacing="0" cellpadding="0" width="98%" align="center" border="0">
			          <tr>
			            <td align="center" colspan="2" height="10"></td>
			          </tr>
			          <tr>
			            <td align="right" width="31%" height="30" style="font-size: 11px;">用户名：</td>
			            <td align="left" width="69%"><input class="input" id="username" title="用户名不能为空" size="10" name="username" type="text" /></td>
			          </tr>
			          <tr>
			            <td align="right" height="30" style="font-size: 11px;">密　码：</td>
			            <td align="left"><input class="input" title="密码不能为空" type="password" size="10" name="pwd"/></td>
			          </tr>
			          <tr>
			            <td align="center" colspan="2" height="10"><font color="red"><s:property value="#request.error"/></font></td>
			          </tr>
			          <tr>
			            <td align="center" colspan="2" height="30">
			               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			               <input type="button" value="登  录" onclick="login()" style="border:#ccc 1px solid; background-color:#FFFFFF; font-size:12px; padding-top:3px;" />
						   &nbsp;
						   <input type="button" value="注  册" onclick="reg()" style="border:#ccc 1px solid; background-color:#FFFFFF; font-size:12px; padding-top:3px;" />
			            </td>
			          </tr>
			      </table>
		    </form>
		    </s:if>
		    <s:else>
		    
		        <br/>
		        <table cellspacing="0" cellpadding="0" width="98%" align="center" border="0">
			        <tr>
			            <td align="center" colspan="2" height="10"> 欢迎您：<s:property value="#session.user.username"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="<%=path %>/userLogout.action">退出</a><br></td>
			          </tr>
			          <tr>
			            <td align="right" width="50%" height="30" style="font-size: 14px;">&nbsp;&nbsp;<A href="<%=path %>/myYuyue.action" >我的预约</A></td>
			            <td align="left" width="50%"> &nbsp;&nbsp;<a href="#" onClick="myXinxi()">修改资料</a> &nbsp;</td>
			          </tr>
			          <tr>
			            <td align="right" width="50%" ><A href="<%=path %>/myCart.action" >我的购物车</A></td>
			            <td align="left" width="50%"> &nbsp;&nbsp;<A href="<%=path %>/myOrder.action" >我的订单</A></td>
			          </tr>
			
			   

			      </table>
			</s:else>
  </body>
</html>
