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
      <div class="list_bar"> <span style="float:left">健身知识</span> <span style="float:right"></span> </div>
  <div id="tw" class="list_content">
        <div style="width:100%;overflow:hidden;white-space:nowrap;">
 
 	 <TABLE  border=0 cellSpacing=8 cellPadding=8>
					                  <TR>
						                  <c:forEach items="${requestScope.wenzhangList}" var="wenzhang" varStatus="sta">
						                    <c:if test="${sta.index%4==0}">
						                       </tr>
						                    </c:if>
							               							                    <TR>
							                      <TD   align=left>
							                    
							                        							                   <A href="<%=path %>/wenzhangDetailQian.action?id=${wenzhang.id }"><FONT color=#ff0000></FONT>${wenzhang.mingcheng }</A>
							                     
							                      </TD>
							                    </TR>
							               
							          
						                  </c:forEach>
						              </TR>
					               </TABLE>               
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
