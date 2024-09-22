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
          function yuyue(id)
          {
              <c:if test="${sessionScope.user==null}">
                  alert("请先登录");
              </c:if>
           
              <c:if test="${sessionScope.user!=null}">
       
             location.href="yuyueAdd.action?pid="+id+"&uname=${sessionScope.user.username}";
              </c:if>
          }
      </script>
<link href="css/css.css" rel="stylesheet" type="text/css">

</head><table width="950"  border="0" align="center" cellpadding="4" cellspacing="1" >
 <tr>
    <td height="19" colspan="4" class="tdtitle">
	<div align="center" class="title"> 详情</div></td>
  </tr>
<tr align="center" bgcolor="#F2FDFF">
<td align="right"> 课程名称：</td>
<td align="left">${requestScope.data.name }</td>
</tr>
<tr align="center" bgcolor="#F2FDFF">
<td align="right"> 课程介绍：</td>
<td align="left">${requestScope.data.jieshao }</td>
</tr>
<tr align="center" bgcolor="#F2FDFF">
<td align="right"> 教练名称：</td>
<td align="left">${requestScope.data.jiaolian }</td>
</tr>
<tr align="center" bgcolor="#F2FDFF">
<td align="right"> 联系电话：</td>
<td align="left">${requestScope.data.tel }</td>
</tr>
<tr align="center" bgcolor="#F2FDFF">
<td align="right"> 预约：</td>
<td align="left"><a  href="#" onclick="yuyue(${requestScope.data.id})"><img src="images/yuyue.jpg" border=0 width=150 height=46></a></td>
</tr></table>

<jsp:include flush="true" page="/qiantai/footer.jsp"></jsp:include>