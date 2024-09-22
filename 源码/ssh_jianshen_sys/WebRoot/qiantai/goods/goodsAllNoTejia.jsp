<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page isELIgnored="false" %> 
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
%>
<jsp:include flush="true" page="/qiantai/header.jsp"></jsp:include>
   <script type="text/javascript">
	       function go(index)
           {
               window.location.href="<%=path %>/goodsNoTejia.action?index="+index;
           }
	    </script>
	
<div class="page_row">
<!--左边的 -->
<div class="page_main_msg left"> 
  <!-- 第一 -->
 
  <div class="left_row">
  
   <div class="list pic_news">
      <div class="list_bar"> <span style="float:left">商品列表</span> <span style="float:right"></span> </div>
  <div id="tw" class="list_content">
        <div style="width:100%;overflow:hidden;white-space:nowrap;">
 
 	<table width="99%" border="0" cellpadding="2" cellspacing="1" bgcolor="#FFFFFF" align="center" style="margin-top:8px">
				              <tr align="center" bgcolor="#FAFAF1" height="22">
					                  <td>商品名称</td>
					                  <td>市场价</td>
					                  <td>图片</td>
					                  <td>操作</td>
					              </tr>
<c:forEach items="${requestScope.page.data}" var="goods"  varStatus="sta">
								  <tr align='center' bgcolor="#FFFFFF" height="22">
									  <td>${ goods.goodsName }</td>
									  <td>￥ ${ goods.goodsShichangjia }</td>
									  <td><a href="<%=path %>/goodsDetail.action?goodsId=${ goods.goodsId}">
									   <img style="border:1px solid #ccc; padding:3px;" src="<%=path %>/${ goods.goodsPic}" width="60" height="60" border="0"/> </a></td>
									  <td><a href="<%=path %>/goodsDetail.action?goodsId=${ goods.goodsId}">
									  <img alt="" src="<%=path %>/img/goumai.jpg" border=0/></a></td>
								  </tr>
								 </c:forEach>

	        			</table>
	        			  <table border='0' cellpadding='0' cellspacing='0' align="center">
						        <tr>
							        <td width='98%' align="right">
							                  共<span style='color:#FF0000'>${requestScope.page.totle}</span>条记录&nbsp;&nbsp;&nbsp;&nbsp;
							                  每页<span style='color:#FF0000'>${requestScope.page.pageSize}</span>条&nbsp;&nbsp;&nbsp;&nbsp;
							                  第<span style='color:#FF0000'>${requestScope.page.index}</span>页/共${requestScope.page.totlePage}页&nbsp;&nbsp;&nbsp;&nbsp;
							                <c:if test="${requestScope.page.index==1}">
							                       首&nbsp;&nbsp;&nbsp;页&nbsp;&nbsp;&nbsp;&nbsp;上一页&nbsp;&nbsp;&nbsp;&nbsp;
							                </c:if>
							                <c:if test="${requestScope.page.index!=1}">
							                       <a style='color: red' href='#' onclick="go(1)">首&nbsp;&nbsp;页</a>
							                       &nbsp;&nbsp;&nbsp;&nbsp;
							                       <a style='color: red' href='#' onclick="go(${requestScope.page.index-1})">上一页</a>
							                       &nbsp;&nbsp;&nbsp;&nbsp;
							                </c:if>
							                <c:if test="${requestScope.page.index >= requestScope.page.totlePage}">
							                          下一页&nbsp;&nbsp;&nbsp;&nbsp;末&nbsp;&nbsp;页&nbsp;&nbsp;&nbsp;&nbsp;
							                </c:if>
							                <c:if test="${requestScope.page.index < requestScope.page.totlePage}">
							                       <a style='color: red' href='#' onclick="go(${requestScope.page.index+1})">下一页</a>
							                       &nbsp;&nbsp;&nbsp;&nbsp;
							                       <a style='color: red' href='#' onclick="go(${requestScope.page.totlePage})">末&nbsp;&nbsp;页</a>
							                </c:if>
							        </td>
						       </tr></table>
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
