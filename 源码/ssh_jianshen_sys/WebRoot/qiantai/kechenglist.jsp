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
      <div class="list_bar"> <span style="float:left">课程列表</span> <span style="float:right"></span> </div>
  <div id="tw" class="list_content">
        <div style="width:100%;overflow:hidden;white-space:nowrap;">
 
 	<table width="96%"  border="0" align="center" cellpadding="4" cellspacing="1" >

 <tr align="center" bgcolor="#F2FDFF"><td class="optiontitle">序号</td>
<td class="optiontitle">课程名称</td>

<td class="optiontitle">教练名称</td>
<td class="optiontitle">联系电话</td>
<td class="optiontitle">操作</td></tr>
<c:forEach items="${requestScope.kechengAll}" var="kecheng"  varStatus="ss">

<tr align="center" bgcolor="#FFFFFF" onmouseover='this.style.background="#F2FDFF"' onmouseout='this.style.background="#FFFFFF"'>
<td bgcolor="#FFFFFF" align="center">${ss.index+1 }</td>

<td height="25">${kecheng.name}</td>


<td height="25">${kecheng.jiaolian}</td>

<td height="25">${kecheng.tel}</td>

<td height="25"><a href="<%=path %>/kechengDetail.action?id=${kecheng.id}">查看详情</a></td></tr>
</c:forEach></table> 
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
