<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page isELIgnored="false" %> 
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
%>
<jsp:include flush="true" page="/qiantai/header.jsp"></jsp:include>
  <script language="javascript">
            function back1()
	        {
	           window.history.go(-1);
	        }
    </script>
<div class="page_row">
<!--左边的 -->
<div class="page_main_msg left"> 
  <!-- 第一 -->
 
  <div class="left_row">
  
   <div class="list pic_news">
      <div class="list_bar"> <span style="float:left">我的订单</span> <span style="float:right"></span> </div>
  <div id="tw" class="list_content">
        <div style="width:100%;overflow:hidden;white-space:nowrap;">
 
 <table width="99%" border="0" cellpadding="9" cellspacing="9" bgcolor="#FFFFFF" align="left" style="margin-top:8px">
				              <tr>
				                  <td align="left" style="color: red">恭喜您，订单提交成功！</td>
				              </tr>
				              <tr align="left">
				                  <td>订单编号：<s:property value="#request.order.orderBianhao"/></td>
				              </tr>
				              
				              <tr>
				                  <td align="left"> 总金额：<s:property value="#request.order.orderJine"/></td>
				              </tr>
				              <tr>
				                  <td align="left">下单日期:<s:property value="#request.order.orderDate"/></td>
				              </tr>
				              <tr>
				                  <td align="left">送货地址:<s:property value="#request.order.odderSonghuodizhi"/></td>
				              </tr>
				              <tr>
				                  <td align="left">付款方式:<s:property value="#request.order.odderFukuangfangshi"/></td>
				              </tr>
		        		</table>
  </div>
    </div>
  
  </div>
      </div>
  
</div>
<!--左边的 -->

<jsp:include flush="true" page="/qiantai/right.jsp"></jsp:include>
<jsp:include flush="true" page="/qiantai/footer.jsp"></jsp:include>

<!--foot -->
</body>
</html>
