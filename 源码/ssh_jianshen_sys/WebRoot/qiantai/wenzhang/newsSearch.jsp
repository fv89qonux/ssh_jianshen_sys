<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page isELIgnored="false" %> 
<%
String path = request.getContextPath();
%>
<jsp:include flush="true" page="/qiantai/header.jsp"></jsp:include>
<div class="right">
  
    <div class="location"> <strong>新闻列表</strong> </div>
    <ul class="art_list2">
    
     <c:forEach items="${requestScope.newsList}" var="wenzhang" varStatus="sta">

      <li><em>${wenzhang.shijian}</em><A href="<%=path %>/wenzhangDetailQian.action?id=${wenzhang.id }">${wenzhang.mingcheng }</a>
      </li>
        </c:forEach>
     
    </ul>
	
  </div>
  <jsp:include flush="true" page="/qiantai/footer.jsp"></jsp:include>
</body>
</html>

