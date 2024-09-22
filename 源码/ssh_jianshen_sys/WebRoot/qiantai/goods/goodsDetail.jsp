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
        function buy1()
        {
            <s:if test="#session.user==null">
                  alert("请先登录");
            </s:if>
            <s:else>
                 document.buy.submit();
            </s:else>
        }
    </script>
	
<div class="page_row">
<!--左边的 -->
<div class="page_main_msg left"> 
  <!-- 第一 -->
 
  <div class="left_row">
  
   <div class="list pic_news">
      <div class="list_bar"> <span style="float:left">商品详情</span> <span style="float:right"></span> </div>
  <div id="tw" class="list_content">
        <div style="width:100%;overflow:hidden;white-space:nowrap;">
 
 	<form action="<%=path %>/addToCart.action" method="post" name="buy">
<table width="950"  border="0" align="left" cellpadding="4" cellspacing="1" >
						    <tr align="left" bgcolor="#F2FDFF">
						       <td align="left"><img style="border:1px solid #ccc; padding:3px;" src="<%=path %>/<s:property value="#request.goods.goodsPic"/>" width="140" height="120"/></td>
						    </tr>
						    <tr align="left" bgcolor="#F2FDFF">
						       <td align="left">商品名称：<s:property value="#request.goods.goodsName"/></td>
						    </tr>
						  
						    <tr align="left" bgcolor="#F2FDFF">
						       <td align="left">购买价格:<s:property value="#request.goods.goodsTejia"/></td>
						    </tr>
						    <tr align="left" bgcolor="#F2FDFF">
						       <td align="left">预订数量：<input type="text" name="quantity" value="1" size="8" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"/></td>
						    </tr>
						    <tr align="left" bgcolor="#F2FDFF">
						       <td align="left"><input type="hidden" name="goodsId" value="<s:property value="#request.goods.goodsId"/>"/><img onclick="buy1()" src="<%=path %>/img/goumai.jpg"/></td>
						    </tr>
						      <tr align="left" bgcolor="#F2FDFF">
						       <td align="left">商品介绍:<s:property value="#request.goods.goodsMiaoshu" escape="false"/></td>
						    </tr>
						</table>
						</form>
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
