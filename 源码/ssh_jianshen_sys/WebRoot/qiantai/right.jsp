<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%><!-- 右边的用户登录。留言。投票 -->
			<div class="page_other_msg right">
				<div class="left_row">
					<div class="list">
						<div class="list_bar">
							用户中心
						</div>
						<div class="list_content">
							<div id="div">



								<jsp:include flush="true" page="/qiantai/userlogin/userlogin.jsp"></jsp:include>

							</div>
						</div>
					</div>
				</div>

				<div class="left_row">
				    <div class="list">
				        <div class="list_bar"><span style="float:left">网站公告</span>
							&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
				        <div class="list_content">
				            <div id="div">
				                   <div style="overflow:hidden;height:150px;">
							             <div id="roll-orig-1607838439">




		 <table width="100%" cellpadding="0" cellspacing="0" border="0">
				 <s:action name="indexNotice" executeResult="true" flush="true"></s:action>
		 </table>
	</body>
</html>

							             </div>
						                 <div id="roll-copy-1607838439"></div>
				                   </div>
					        </div>
					    </div>
				    </div>
				</div>
			</div>
			<div style="clear: both"></div>