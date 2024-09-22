<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page isELIgnored="false" %> 
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
%>
<jsp:include flush="true" page="/qiantai/header.jsp"></jsp:include>
 <script language="JavaScript" src="<%=path %>/js/public.js" type="text/javascript"></script>
	<script type="text/javascript">
        function orderDel(orderId)
        {
            var url="<%=path %>/orderDel.action?orderId="+orderId;
            window.location.href=url;
        }
        
        function orderDetail(orderId)
        {
                 var url="<%=path %>/orderDetail.action?orderId="+orderId;
                 var n="";
                 var w="700px";
                 var h="700px";
                 var s="resizable:no;help:no;status:no;scroll:yes";
			     openWin(url,n,w,h,s);
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
 
 <table width="99%" border="0" cellpadding="2" cellspacing="1" bgcolor="#FFFFFF" align="center" style="margin-top:8px">
				              <tr align="center" bgcolor="#FAFAF1" height="22">
				                  <td>订单编号</td>
				                  <td>金额</td>
				                  <td>下单日期</td>
				                  <td>订单状态</td>
				                  <td>编辑</td>
				              </tr>
							  <s:iterator value="#request.orderList" id="order">
							  <tr align='center' bgcolor="#FFFFFF" height="22">
								  <td>
									<s:property value="#order.orderBianhao"/>
								  </td>
								  <td>￥<s:property value="#order.orderJine"/><br/></td>
								  <td><s:property value="#order.orderDate"/></td>
								  <td>
								      <s:if test="#order.orderZhuangtai=='no'">
								            已下单，未受理
								      </s:if>
								      <s:if test="#order.orderZhuangtai=='yes'">
								            已下单，已受理
								      </s:if>
	                              </td>
								  <td>
								      <a href="#" onclick="orderDetail(<s:property value="#order.orderId"/>)">订单明细</a>
								      &nbsp;&nbsp;
								      <a href="#" onclick="orderDel(<s:property value="#order.orderId"/>)">删除</a>
								  </td>
							  </tr>
							  </s:iterator>
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
