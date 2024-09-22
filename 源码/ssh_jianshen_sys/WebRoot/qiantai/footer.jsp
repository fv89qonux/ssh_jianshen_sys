<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
		<div class="foot">





        <div class="foot_pic"></div>
		<div class="left foot_msg">
		
				<a target="_blank" href="<%=path %>/login.jsp" style="color:white">管理登录</a>
			<br />

		</div>
		<div style="clear: both"></div>
  </body>
</html>