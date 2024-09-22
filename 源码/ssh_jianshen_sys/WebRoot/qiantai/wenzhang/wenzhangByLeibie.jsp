<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page isELIgnored="false" %> 
<%
String path = request.getContextPath();
%>
<jsp:include flush="true" page="/qiantai/header.jsp"></jsp:include>
<div class="left">
  <div class="box" style="height:auto; width:230px">
  <div class="title">
  最新新闻
  </div>
  <ul class="list">
 <c:forEach items="${requestScope.wenzhangList}" var="wenzhang" varStatus="sta">

      <li><A href="<%=path %>/wenzhangDetailQian.action?id=${wenzhang.id }">${wenzhang.mingcheng }</a>
      </li>
        </c:forEach>
  </ul>
  </div>
  </div>
  <div class="right">
  
    <div class="location"> <strong>新闻列表</strong> </div>
    <ul class="art_list2">
    
     <c:forEach items="${requestScope.wenzhangList}" var="wenzhang" varStatus="sta">

      <li><em>${wenzhang.shijian}</em><A href="<%=path %>/wenzhangDetailQian.action?id=${wenzhang.id }">${wenzhang.mingcheng }</a>
      </li>
        </c:forEach>
     
    </ul>
	
  </div>
  <jsp:include flush="true" page="/qiantai/footer.jsp"></jsp:include>
</body>
</html>
