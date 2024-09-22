<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page isELIgnored="false" %> 
<%
String path = request.getContextPath();
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
	<meta http-equiv="pragma" content="no-cache"/>
	<meta http-equiv="cache-control" content="no-cache"/>
	<meta http-equiv="expires" content="0"/>    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3"/>
	<meta http-equiv="description" content="This is my page"/>
	<link href="css/Common.css" rel="stylesheet" type="text/css" />
    <link href="css/sitegeneric08.css" rel="stylesheet" type="text/css" />
    <script language="JavaScript" src="<%=path %>/js/public.js" type="text/javascript"></script>
    <script language="JavaScript" type="text/javascript">
    </script>
	<style type="text/css">
	    .c1-bline{border-bottom:#999 1px dashed;border-top:1px;}
		.f-right{float:right}
		.f-left{float:left}
		.clear{clear:both}
				#newest_box{ position:relative;float:left;height:100%;width:960px;border:1px solid #ddd;border-radius:5px;-webkit-box-shadow:0px 3px 10px rgba(33,33,33,0.4);background:#FFF;}
				#container{ margin:0px auto;font-size:12px;padding:0px;width:960px;background:#FFF;}
			.hd{height: 28px;width:100%;line-height: 27px;background: -webkit-gradient(linear,left top,left 25,from(#fff),color-stop(100%,#f6f6f6),to(#f6f6f6));border-bottom: 1px solid #ddd;border-radius: 5px 5px 0 0;}
		.hd .title{padding-left:10px;float:left;font-size:14px;}
		.hd .title a{color:#555;border-left:5px #ddd solid;padding-left:4px;text-decoration:none;line-height:29px;}
	

	</style>
	
    <script language="javascript">
		
		
		function liuyanAdd()
		
        {
          <s:if test="#session.user==null">
	                  alert("请先登录");
	            </s:if>
	             <s:else>
                 var strUrl = "<%=path %>/qiantai/liuyan/liuyanAdd.jsp";
	             var ret = window.showModalDialog(strUrl,"","dialogWidth:800px; dialogHeight:500px; dialogLeft: status:no; directories:yes;scrollbars:yes;Resizable=no;");
	             window.location.reload();
	              </s:else>
        }
        
        function liuyanDetail(id)
        {
             var strUrl = "<%=path %>/liuyanDetail.action?liuyanId="+id;
             var ret = window.showModalDialog(strUrl,"","dialogWidth:800px; dialogHeight:500px; dialogLeft: status:no; directories:yes;scrollbars:yes;Resizable=no;");
        }
     </script>
  </head>
  
  <body>
	
	<div id="container">
<jsp:include flush="true" page="/qiantai/header.jsp"></jsp:include>    
		
		
		
		
		
		
		<br>
        <div class="cls10" style="height: 1px;"></div>
       	<div id="newest_box">
           	<div class="hd">
                   <div class="title">
                       <span style="float:left">网站留言板</span>
					   <span style="float:right"><a href="#" onclick="liuyanAdd()" style="color:red">我要留言</a>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                   </div>
           	</div>
            <div style="height: 400px;">
               	<div class="c1-body">
                     <c:forEach items="${requestScope.liuyanList}" var="liuyan" varStatus="sta">
				           <div class="c1-bline" style="padding:7px 0px;">
		                        <div class="f-left">
		                             &nbsp;&nbsp;&nbsp;<img src="<%=path %>/images/head-mark4.gif" align="middle" class="img-vm" border="0"/> 
		                             <a href="#" onclick="liuyanDetail(${liuyan.liuyanId })" style="color:blue">${liuyan.liuyanTitle }</a>
		                        </div>
					            <div class="f-right">${liuyan.liuyanDate }&nbsp;&nbsp;&nbsp;</div>
					            <div class="clear"></div>
				           </div>             
				     </c:forEach>
					 <div class="pg-3"></div>             		  
				 </div>
            </div>
        </div>
            
            
            
                  
          
                   
            
        
        
<!--foot -->	
<div align="center" class="Wrapper">
	<div id="footer" align="center" class="Footer">
		 <jsp:include flush="true" page="/qiantai/footer.jsp"></jsp:include>
	</div>
</div>
<!--foot -->    </div>
</body>
</html>
