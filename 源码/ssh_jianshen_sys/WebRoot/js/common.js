//全局常量定义
/** GRID是编辑模式时的行,列分割符*/
var COL_SPLIT_FLAG = "\"\\,";
var ROW_SPLIT_FLAG = "\"\\;";
//var COL_SPLIT_FLAG = ",";
//var ROW_SPLIT_FLAG = ";";
var EQUAL_FLAG="<equal>";
eval("document.write('<script language=\"vbscript\" src=\"../../../../vbs/common.vbs\"></script>')");
//调用存储过程函数
/*
方法名：execProc
参数：procName 存储过程名
            args 调用参数
返回值：字符串类型，多返回值以逗号分割。如果调用出错，返回-1。

args分为三块数据，分别为输入参数值、输入参数类型，输出参数类型。
其中各块数据可以有多个值，各值之间以逗号（,）分割，块数据之间以冒号分割（:）。
输入参数类型只能取下列值：STRING，INT，LONG，DOUBLE，DATE。

调用示例如下：
execProc("PRC_GET_ROW_ID_1","2004-11-19:DATE:INT,DATE")

*/
function execProc(procName,args)
{
   var xml = new ActiveXObject("MSXML2.XMLHTTP.4.0");
   postPara="doWhat=executeProcedure&args="+procName+":"+args
   xml.open("POST", "../../../../CommonAction.do?", false);
   xml.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded");
   xml.send(URLEncoding(postPara));
   return xml.responseText;

}

//格式化金额数据.
function mpcFormatNumber(srcStr,nAfterDot){
    var srcStr,nAfterDot;
    var resultStr,nTen;
    srcStr = ""+srcStr+"";
    strLen = srcStr.length;
    dotPos = srcStr.indexOf(".",0);
    if(srcStr==''){
        resultStr='0.'
        for(var k=0;k<nAfterDot;k++){
            resultStr=resultStr+'0';
        }
        return resultStr;
    }
    if (dotPos == -1){
        resultStr = srcStr+".";
        for (i=0;i<nAfterDot;i++){
            resultStr = resultStr+"0";
        }
        return resultStr;
    }
    else{
        if ((strLen - dotPos - 1) >nAfterDot){
            nAfter = dotPos + nAfterDot + 1;
            nTen =1;
            for(j=0;j<nAfterDot;j++){
                nTen = nTen*10;
            }
            resultStr = Math.round(parseFloat(srcStr)*nTen)/nTen;

            var dotPos2=(""+resultStr+"").indexOf(".",0);

            return resultStr;
        }
        else{
            resultStr = srcStr;
            for (i=0;i<(nAfterDot - strLen + dotPos + 1);i++){
                resultStr = resultStr+"0";
            }
            return resultStr;
        }
    }
}
//唯一性校验函数
/*
方法名：isUnique
参数：tableName 表名
            condition 校验条件
返回值：字符串类型，返回0表示校验成功，否则表示校验失败。如果调用出错，返回-1。

tableName 可以输入多表名，使用SQL语法，如 AD_LOV_CODE a,AD_PROGRAM b
condition 输入校验条件，使用SQL语法，如 ROW_ID=12345

调用示例如下：
isUnique("AD_LOV_CODE","ROW_ID=9898918")

*/
function isUnique(tableName,condition)
{
   var xml = new ActiveXObject("MSXML2.XMLHTTP.4.0");
   eval("condition=condition.replace( /"+"="+"/g, '"+EQUAL_FLAG+"')");

   postPara="doWhat=isUnique&args= "+tableName+" WHERE "+condition;

   xml.open("POST", "../../../../CommonAction.do?", false);
   xml.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded");
   xml.send(URLEncoding(postPara));

   return xml.responseText;

}
//用于根据字段类型拼SQL语句，专用于isUnique(tableName,primaryKey,uniqueKey,condition)
function putUniqueSql(fieldCode,inputValue,fieldType,relation)
{
  	switch(fieldType){
  		case "1": return fieldCode+relation+"'"+inputValue+"'";break;
  		case "2": return fieldCode+relation+inputValue;break;
  		case "3": return to_char(fieldCode,'yyyy-mm-dd')+relation+"'"+inputValue+"'";break;
  	}
}
//唯一性校验扩展
//primaryKey：primaryInputName+","+primaryFieldCode+","+primaryType
//uniqueKey：uniqueInputName+","+uniqueFieldCode+","+uniqueType+";"+....
//primaryType、uniqueType：1、string；2、数值；3、日期（yyyy-mm-dd）；
//condition：条件
function isUniqueExp(tableName,primaryKey,uniqueKey,condition,errMsg)
{
  	var primaryInputValue = getObjValue(primaryKey.split(",")[0]);
  	var primaryFieldCode = primaryKey.split(",")[1];
  	var primaryType = primaryKey.split(",")[2];
	var uniqueKeyAarry = uniqueKey.split(";");
	var uniqueKeyLen = uniqueKeyAarry.length;
	var strWhere;
	var uniqueInputValue;
	var uniqueFieldCode;
	var uniqueType;
	var returnValue;

	for(var i=0;i<uniqueKeyLen;i++){
		uniqueInputValue = getObjValue(uniqueKeyAarry[i].split(",")[0]);
		uniqueFieldCode = uniqueKeyAarry[i].split(",")[1];
		uniqueType = uniqueKeyAarry[i].split(",")[2];

		if(i == 0){
			strWhere = putUniqueSql(uniqueFieldCode,uniqueInputValue,uniqueType,"=");
		}
		else{
			strWhere = strWhere+" and "+putUniqueSql(uniqueFieldCode,uniqueInputValue,uniqueType,"=");
		}
	}
	if(condition != ""){
		strWhere = strWhere+" and "+condition;
	}
	if(primaryInputValue != ""){
		strWhere = strWhere+" and "+putUniqueSql(primaryFieldCode,primaryInputValue,primaryType,"<>");
	}
	returnValue = isUnique(tableName,strWhere);
	if(returnValue == "0"){
		return true;
	}
	else{
		alert(errMsg);
		return false;
	}
}
//执行更新操作SQL函数
/*
方法名：execUpdate
参数：sql SQL语句

返回值：字符串类型，返回0表示执行成功，返回1表示执行失败。如果调用出错，返回-1。

sql 要执行的SQL,只支持更新操作SQL,如增加、删除、修改，使用SQL 语法。


调用示例如下：
execUpdate("INSERT INTO AD_LOV_CODE(row_id,lov_code) VALUES ('1234567','123466')")

*/
function execUpdate(sql)
{
   var xml = new ActiveXObject("MSXML2.XMLHTTP.4.0");
   eval("sql=sql.replace( /"+"="+"/g, '"+EQUAL_FLAG+"')");

   postPara="doWhat=executeUpdate&args="+sql;
   xml.open("POST", "../../../../CommonAction.do?", false);
   xml.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded");
   xml.send(URLEncoding(postPara));

   return xml.responseText;

}
//检查页面是否处于提交状态
function validDocStatus()
{
  if(document.readyState=="loading")
  {
     alert("程序正在处理，请等待程序处理结束！");
     return false;
  }
  return true;
}

//隐藏Lookup IFRAME
function fhiddenifLookupTB()
{
  document.all.ifLookupTB.style.visibility = 'hidden';
  document.all.ifLookupTB.style.pixelTop = 1;
  document.all.ifLookupTB.style.pixelLeft = 1;
  document.all.ifLookupTB.style.pixelHeight = 1;
  document.all.ifLookupTB.style.pixelWidth = 1;
}

//隐藏Lookup IFRAME并清除页面
function fhiddenParifLookupTB()
{
  parent.document.all.ifLookupTB.style.visibility = 'hidden';
  parent.document.all.ifLookupTB.style.pixelTop = 1;
  parent.document.all.ifLookupTB.style.pixelLeft = 1;
  parent.document.all.ifLookupTB.style.pixelHeight = 1;
  parent.document.all.ifLookupTB.style.pixelWidth = 1;
  parent.document.all.ifLookupTB.src='';
}
//显示Lookup IFRAME
function fLookupTB(objSender,strUrl,width,height){
var top = objSender.offsetTop+objSender.offsetHeight;
var left = objSender.offsetLeft;
if (document.all.ifLookupTB.style.visibility == 'hidden')
  {
  document.all.ifLookupTB.src =strUrl;
  document.all.ifLookupTB.style.pixelWidth = 300;
  document.all.ifLookupTB.style.pixelHeight = 300;
  for (objSender=objSender.offsetParent; objSender != null; objSender=objSender.offsetParent) {
    top = objSender.offsetTop + top;
    left = objSender.offsetLeft + left;
  }
  document.all.ifLookupTB.style.pixelTop= top;
  document.all.ifLookupTB.style.pixelLeft = left;
  document.all.ifLookupTB.style.visibility = '';
  document.all.ifLookupTB.focus();
  }
  else
  {
  document.all.ifLookupTB.style.visibility = 'hidden';
  document.all.ifLookupTB.style.pixelTop = 1;
  document.all.ifLookupTB.style.pixelLeft = 1;
  document.all.ifLookupTB.style.pixelHeight = 1;
  document.all.ifLookupTB.style.pixelWidth = 1;
  }
}
//隐藏ListBox IFRAME
function fhiddenifListBox()
{
  document.all.ifListBox.style.visibility = 'hidden';
  document.all.ifListBox.style.pixelTop = 1;
  document.all.ifListBox.style.pixelLeft = 1;
  document.all.ifListBox.style.pixelHeight = 1;
  document.all.ifListBox.style.pixelWidth = 1;
}
//隐藏ListBox IFRAME并清除页面
function fhiddenParifListBox()
{
  parent.document.all.ifListBox.style.visibility = 'hidden';
  parent.document.all.ifListBox.style.pixelTop = 1;
  parent.document.all.ifListBox.style.pixelLeft = 1;
  parent.document.all.ifListBox.style.pixelHeight = 1;
  parent.document.all.ifListBox.style.pixelWidth = 1;
  parent.document.all.ifListBox.src='';
}
//显示ListBox IFRAME
function fListBox(objSender,strUrl,width,height)
{
var top = objSender.offsetTop+objSender.offsetHeight;
var left = objSender.offsetLeft;
if (document.all.ifListBox.style.visibility == 'hidden')
  {
  document.all.ifListBox.src =strUrl;
  document.all.ifListBox.style.pixelWidth = width;
  document.all.ifListBox.style.pixelHeight = height;
  for (objSender=objSender.offsetParent; objSender != null; objSender=objSender.offsetParent) {
    top = objSender.offsetTop + top;
    left = objSender.offsetLeft + left;
  }
  document.all.ifListBox.style.pixelTop= top;
  document.all.ifListBox.style.pixelLeft = left;
  document.all.ifListBox.style.visibility = '';
  document.all.ifListBox.focus();
  }
  else
  {
  document.all.ifListBox.style.visibility = 'hidden';
  document.all.ifListBox.style.pixelTop = 1;
  document.all.ifListBox.style.pixelLeft = 1;
  document.all.ifListBox.style.pixelHeight = 1;
  document.all.ifListBox.style.pixelWidth = 1;
  }
}
function fShowMsg(strMsg,autoHidden)
{
  var icon=1;
  var msg="没有返回信息！";
  icon  = strMsg.split(':')[0];
  msg = strMsg.split(':')[1];
  if(icon.length<1)
  {
    icon = 4;
    msg = strMsg;
  }
  fShowMessage(icon,msg,autoHidden)
}
function fShowMessage(icon,strMsg,autoHidden)
{
  if(strMsg.length>0)
  {
      dlblShowMessage.style.visibility='visible';
      dlblShowMessage.style.left=(window.screen.width*0.4)/2+100;
      dlblShowMessage.style.top=document.body.scrollTop+160;
      lblShowMessage1.innerHTML=strMsg;

      document.all.chenggong.style.display = 'none';
      document.all.chucuo.style.display = 'none';
      document.all.info.style.display = 'none';
      document.all.yanzhongcuowu.style.display = 'none';
      document.all.working.style.display = 'none';
      document.all.closediv.style.display = 'none';
      if (icon==1) document.all.chenggong.style.display = '';
      if (icon==2) document.all.chucuo.style.display = '';
      if (icon==3) document.all.info.style.display = '';
      if (icon==4) document.all.yanzhongcuowu.style.display = '';
      if (icon==5)
      {
        document.all.info.style.display = '';
        document.all.working.style.display = '';
        autoHidden = 0 ;
      }
  if ((autoHidden==1)&&(icon!=4))
  {
       if (document.images)
        {
            parselimit=limit.split(":");
            parselimit=parselimit[0]*60+parselimit[1]*1+1;
        }
         fTimeHidden()
  }
  else if(icon !=5) document.all.closediv.style.display = '';
  }
}

function fHiddenMessage()
{
  dlblShowMessage.style.visibility='hidden';
}
function fTimeHidden()
{
    if (!document.images)    return;
    if (parselimit==1)
        fHiddenMessage()
    else{
        parselimit-=1;
        curmin=Math.floor(parselimit/60);
        cursec=parselimit%60;
        if (curmin!=0)
            curtime=curmin+"分"+cursec+"秒！"
        else
            curtime=cursec+"秒！";
        lblShowSeconds.innerHTML=curtime;
//        window.status=curtime;
        setTimeout("fTimeHidden()",1000);
    }
}

function fShowMessage1(strMsg)
{
  dlblShowMessage.style.visibility='visible';
  dlblShowMessage.style.left=(window.screen.width*0.4)/2+20;
  dlblShowMessage.style.top=document.body.scrollTop+160;
  lblShowMessage1.outerHTML=strMsg;
}

//显示一行 obj:行对象
function showRow(obj)
{
   obj.style.display = "";
   return true;
}
//隐藏一行 obj:行对象
function hideRow(obj)
{
  obj.style.display = "none";
  return true;
}
//取当前表可显示的行数
function getShowRowCount(obj)
{
  var table = eval(obj);
  var maxShow=0;
  for (i=0; i < table.rows.length; i++)
     {
   		var t= table.rows(i);
   		if (t.style.display != "none")
   		  maxShow=maxShow+1;
     }
   return  maxShow;
}

//汇总指定sumColName的值到setColName
// obj 表；prefix前缀；nDec 格式化小数点 保留位数
//例：sumCol("dataTable","orderDetail","quantOrder","totQuantOrder",0)
function sumCol(obj,prefix,sumColName,setColName,nDec)
{
   var colname ="";
   var nRow;		// Various table stats
   var table;				// Table object
   var sumValue = 0;
   var colValue = 0;
	if (obj  != "")
	{
		table = eval(obj);  // Assumes that the obj is THE OBJECT
	}
	if (table == null) return;  // Check whether it's an object
	if (table.tagName != "TABLE") return;  // Check whether it's a table
	nRow = table.rows.length;// Setting the number of rows
	if (nRow < 1) return;// Should have at least 1 row
	// Loop through rows
	for (var i=0; i<nRow; i++)
	{
      if(prefix!="")
      {
        colname = prefix+"[" + i + "]." + sumColName;
      }
      colValue = document.forms[0].elements[colname].value;
      if (checkNumber(colValue))
        {
          if (colValue == "") { colValue =0;}
          sumValue = parseFloat(sumValue) + parseFloat(colValue);
         }
      else
      	{
          sumValue = -1;
          break;
        }
    }
   document.forms[0].elements[setColName].value =  FormatNumber(parseFloat(sumValue),nDec);
}
//指定光标位置
// prefix前缀；id每几行； col列名
//例：setFocus("orderDetail",id,"quantOrder");
function setFocus(prefix,id,col)
{
   // alert(col);
    var colname ="";
    if((id>=0)&&(prefix!=""))
        colname = prefix+"[" + id + "]." + col;
    else
        colname = col;
    var focusControl = document.forms[0].elements[colname];
    if (typeof(focusControl)!="object")
         return false;
    if (focusControl.type == "hidden")
        return false;
 //    alert(document.forms[0].elements[colname].style.display);
//    if (document.forms[0].elements[colname].style.display == "none")
//    if (id >11 )
//         return false;
    focusControl.focus();
    if (focusControl.tagName=="INPUT")
      focusControl.select();
    return true;
}
function httpGet(http,url)
{
   var strRet = "";
   if(url.length!=0)
   {
        http.open("GET",url,false);
        http.send();
        strRet = http.responseText;
    }
    strRet = trimNC(strRet);
    if (strRet.length==0)
	{
		 alert("系统查询失败！");
         return "";
	}
    return strRet;
}
//去除空格
String.prototype.trim = function()
{
    return this.replace(/(^[\s|　]*)|([\s|　]*$)/g, "");
}
//截取字符串前后的空字符

	//去左空格;
function ltrim(s){
 return s.replace( /^\s*/, "");
}
//去右空格;
function rtrim(s){
 return s.replace( /\s*$/, "");
}
//左右空格;
function trim(s){
 return rtrim(ltrim(s));
}
//截取字符串前后的空字符回车符和换行符
function trimNC(strValue)
{
	var  i=0;
	var intLen;
	if (strValue.length == 0)return ""
	while (i == 0)
	  {
	    i = strValue.indexOf("\r",0);
	    strValue=strValue.replace("\r","")
	  }
    i=0;
	while (i == 0)
	  {
	    i = strValue.indexOf(" ",0);
	    strValue=strValue.replace(" ","")
	  }
    i=0;
	while (i == 0)
	  {
	    i = strValue.indexOf("\n",0);
	    strValue=strValue.replace("\n","")
	  }

    intLen = (strValue.length - 1)
    while (strValue.lastIndexOf(" ") == intLen)
      {
        strValue=strValue.substr(0,intLen-1)
        intLen = strValue.length
	  }
	return strValue;
}

//检查数字
function checkNumber(str) {
    var i;
    var len = str.length;
    var chkStr = "-1234567890.";
    if (len == 1) {
	if (chkStr.indexOf(str.charAt(i)) < 0) {
	    return false;
	}
    } else {
	if ((chkStr.indexOf(str.charAt(0)) < 0) || ((str.charAt(0) == "0")&&(str.charAt(1)!="."))) {
	    return false;
	}
	 for (i = 1; i < len; i++) {
		if (chkStr.indexOf(str.charAt(i)) < 0) {
			    return false;
		}
	}
    }
    return true;
}

//检查数字
function checkNumberPlus(str) {
    var i;
    var len = str.length;
    var chkStr = "-1234567890.";
    if (len == 1) {
	if (chkStr.indexOf(str.charAt(i)) < 0) {
	    return false;
	}
    } else {
	if ((chkStr.indexOf(str.charAt(0)) < 0) || ((str.charAt(0) == "0")&&(str.charAt(1)!="."))) {
	    return false;
	}
	 for (i = 1; i < len; i++) {
		if (chkStr.indexOf(str.charAt(i)) < 0) {
			    return false;
		}
	}
    }
    return true;
}

//检查电话数字
function checkTelNumber(str) {
    var i;
    var len = str.length;
    var chkStr = "-1234567890";
    if (len == 1) {
       if (chkStr.indexOf(str.charAt(i)) < 0) {
	       return false;
       }
     } else {
	     if (str.charAt(0) == "-" || str.charAt(len-1) == "-") {
	      return false;
	   }
	     for (i = 1; i < len; i++) {
		    if (chkStr.indexOf(str.charAt(i)) < 0) {
			    return false;
		  }
	   }
    }
    return true;
}

//校验整数
function checkInteger(str) {
    if(checkNumberPlus(str)) {
        return str.indexOf('.') < 0;
    }
	return false;
}
//校验正数
function checkPNumber(str) {
	if(checkNumberPlus(str)) {
		return str.indexOf('-') < 0;
	}
	return false;
}
//检查有，分隔符的正数
function checkPNumberFiliale(str) {
	if(checkNumberPlusFiliale(str)) {
		return str.indexOf('-') < 0;
	}
	return false;
}

function checkNumberPlusFiliale(str){
 var i;
    var len = str.length;
    var chkStr = "-1234567890,.";
    if (len == 1) {
	if (chkStr.indexOf(str.charAt(i)) < 0) {
	    return false;
	}
    } else {
	if ((chkStr.indexOf(str.charAt(0)) < 0) || ((str.charAt(0) == "0")&&(str.charAt(1)!="."))) {
	    return false;
	}
	 for (i = 1; i < len; i++) {
		if (chkStr.indexOf(str.charAt(i)) < 0) {
			    return false;
		}
	}
    }
    return true;
}

//校验正整数
function checkPInteger(str) {
	if(checkInteger(str)) {
		return str.indexOf('-') < 0;
	}
	return false;
}

//打开窗口
function openDialog(WINurl,WINwidth,WINheight,xyPosition)
{
 if(xyPosition==0)//屏幕中央
   {
    showx = (window.screen.availWidth  - WINwidth)/2;
    showy = (window.screen.availHeight - WINheight)/2;
   }
 else//事件附近
   {
	   showx = event.screenX - event.offsetX - 4 - WINwidth ; // + deltaX;
	   showy = event.screenY - event.offsetY + 18; // + deltaY;
	  }
	newWINwidth = WINwidth + 4 + 18;
	var features =
		'dialogWidth:'  + newWINwidth  + 'px;' +
		'dialogHeight:' + WINheight + 'px;' +
		'dialogLeft:'   + showx     + 'px;' +
		'dialogTop:'    + showy     + 'px;' +
		'directories:no; localtion:no; menubar:no; status=no; toolbar=no;scrollbars:yes;Resizeable=no';
	var vDialog = window.showModalDialog(WINurl, " ", features);
	return vDialog;
}
//检查两个日期或时间比较，gujun2004－12－9修改
//date1起始日期、date2截止日期
function dateCompare(date1,date2,msg)
{
  	if(date1 != "" && date2 != ""){
  		if(date1 > date2){
            		alert(msg);
       			return false;
  		}
      		else{
                	return true;
      		}
  	}
      	else{
        	return true;
      	}
}
//获得客户端系统日期
function getClientSysDate()
{
 var sysDate,year,month,date;
 sysDate = new Date();
 year = String(sysDate.getFullYear());
 month = String(sysDate.getMonth()+1);
 date = String(sysDate.getDate());
 if(month.length<2)
  month = "0"+month;
 if(date.length<2)
  date = "0"+date;
 return(year+"-"+month+"-"+date);
}
//获取客户端系统时间
function getClientSysTime()
{
 var hour,minute,second,sysDate;
 sysDate = new Date();
 hour = String(sysDate.getHours());
 minute = String(sysDate.getMinutes());
 second = String(sysDate.getSeconds());
 if(hour.length<2)
  hour = "0"+hour;
 if(minute.length<2)
  minute = "0"+minute;
 if(second.length<2)
  second = "0"+second;
 return(hour+":"+minute+":"+second);
}


//数字格式化函数
function FormatNumber(srcStr,nAfterDot){
    var srcStr,nAfterDot;
    var resultStr,nTen;
    srcStr = ""+srcStr+"";
    var strLen = srcStr.length;
    dotPos = srcStr.indexOf(".",0);
    if (dotPos == -1){
       if (nAfterDot==0) return  srcStr;
        resultStr = srcStr+".";
        for (i=0;i<nAfterDot;i++){
            resultStr = resultStr+"0";
        }
        return resultStr;
    } else {
         if ((strLen - dotPos - 1) > nAfterDot){
              nAfter = dotPos + nAfterDot + 1;
              nTen =1;
              for(j=0;j<nAfterDot;j++){
                   nTen = nTen*10;
              }
              resultStr = Math.round(parseFloat(srcStr)*nTen)/nTen;
                  return resultStr;
          }else{
              resultStr = srcStr;
              for (i=0;i<(nAfterDot - strLen + dotPos + 1);i++){
                  resultStr = resultStr+"0";
              }
              return resultStr;
          }
     }
 }

function ExportExcel()
{
  var cell1;
  cell1=document.all("objCellID");
  cell1.DoExportExcelFile("");

}
function onprint()
{
  var cell1;
  cell1=document.all("objCellID");
  cell1.DoPrint(1);
}
function onprintpreview()
{
  var cell1;
  cell1=document.all("objCellID");
  cell1.DoPrintPreview(1);
}


//获得grid中的radio或checkbox的值，如果是radio则返回一个字符串，如果是checkbox则返回多个字符串，中间用逗号隔开；
function getCheckedValue(objName)
{
  	var objChk;
  	var CheckedValue = "";
  	var j=1;
  	for(var i=0;i<getElementLen(objName);i++)
  	{
          	objChk=getObj(objName,i);
          	if(objChk.checked&&(!objChk.disabled))
          	{
                  	if(j==1){
                  		CheckedValue = objChk.value;
                  	}
                  	else{
                    		CheckedValue = CheckedValue + "," + objChk.value;
                  	}
                  	j = j + 1;
          	}
  	}
  	return CheckedValue;
}

//获得被选中radio或checkbox的索引,如果是radio则返回一个索引，如果是checkbox则返回索引串，中间用逗号隔开；
function getCheckedIndex(objName)
{
  	var objChk
  	var j = 1;
        var indexValue = "";
  	for(var i=0;i<getElementLen(objName);i++){
          	objChk=getObj(objName,i);
          	if(objChk.checked&&(!objChk.disabled)){
			if(j==1){
                  		indexValue = i;
                      	}
                  	else{
                    		indexValue = indexValue + "," + i;
                  	}
                  	j = j + 1;
          	}
  	}
      	return indexValue;
}

//获得页面中组件的值；
function getObjValue(objName)
{
	var obj = eval("document.all('" + objName + "')");
        if(obj == null) return "null";
      	return obj.value.trim();
}

//获得页面中id的innerHTML值,如果innerHTML值中包含label则取label中的innerHTML值；
function getObjInnerHtml(objName)
{
  	var innelHtmlValue = "";
	var obj = eval("document.all('" + objName + "')");
      	if(!(typeof(obj) == "object")) return '';
      	if((obj.innerHTML).indexOf("LABEL") < 0){
                innelHtmlValue = obj.innerHTML;
      	}
        else{
          	var i = (obj.innerHTML).indexOf(">",0);
              	var j = (obj.innerHTML).indexOf("</",0);
              	innelHtmlValue = (obj.innerHTML).substr(i+1,j-i-1);
        }
      	return innelHtmlValue;
}

//获得页面table中被选择行中表格的字段值的值，如果是单选则返回一个字符串，如果是多选则返回多个字符串，中间用逗号隔开；；
function getCellValue(checkObjName,cellObjName)
{
  	var objChk;
  	var cellValue = "";
      	var indexValue;

      	indexValue = getCheckedIndex(checkObjName) + "";
      	if(indexValue != "" && indexValue.indexOf(",") < 0){
                cellValue = getObjInnerHtml(cellObjName + indexValue);
      	}
      	else if(indexValue != "" && indexValue.indexOf(",") > 0){
         	var indexCount =  indexValue.indexOf(",");
              	var indexAarry = indexValue.split(",");
              	var j = 1;

              	for(var i=0;i<indexCount+1;i++){
                        if(j==1){
                  		cellValue = getObjInnerHtml(cellObjName + indexAarry[i]);
                      	}
                  	else{
                    		cellValue = cellValue + "," + getObjInnerHtml(cellObjName + indexAarry[i]);
                  	}
                  	j = j + 1;
              	}

      	}
        return cellValue;
}

//获得页面中select组件的显示值；
function getSelectObjName(objName)
{
	var obj = eval("document.all('" + objName + "')");
      	var selfSelectedIndex = obj.selectedIndex;
      	selectObjName = obj[selfSelectedIndex].innerHTML;
      	if(selectObjName == "请选择"){
                selectObjName = "&nbsp;";
      	}
      	return selectObjName;
}

//获得页面中组件的类型；
function getObjType(objName)
{
	var obj = eval("document.all('" + objName + "')");
      	return obj.type;
}

//获得页面中组件的显示值，目前专为便捷增加修改；
function getObjDisplayValue(objName)
{
	var typeValue = getObjType(objName);
      	var displayValue;
      	if(typeValue == "select-one"){
                displayValue = getSelectObjName(objName);
      	}
      	else{
        	displayValue = getObjValue(objName);
      	}
      	return displayValue;
}

//赋给页面中组件的值；
function setObjValue(objName,objNameValue)
{
	var obj = eval("document.all('" + objName + "')");
	if(!(typeof(obj)=="object"))return '';
	obj.value = objNameValue;
}

//使得grid中的radio都不被选中；
function setNoChecked(objName)
{
  var objChk
  for(var i=0;i<getElementLen(objName);i++)
  {
          objChk=getObj(objName,i);
          objChk.checked = false;
  }
}


//组合选中对象的post值
function getPostValue(objName){
  var objChk;
  var chkPostValue;
  var j=1;
  for(var i=0;i<getElementLen(objName);i++)
  {
          objChk=getObj(objName,i);
          if(objChk.checked&&(!objChk.disabled))
          {
                  if(j==1){
                  	chkPostValue = objName + "=" + objChk.value;
                  }
                  else{
                    	chkPostValue = chkPostValue + "&" + objName + "=" + objChk.value;
                  }
                  j = j + 1;
          }
  }
  return chkPostValue;
}


//根据选中的记录删除行
function deleteRows(objName){
  var objChk;
  for(var i=0;i<getElementLen(objName);i++)
  {
          objChk=getObj(objName,i);
          if(objChk.checked&&(!objChk.disabled))
          {
                   eval("document.all.dataRow"+i).style.display = "none";
          }
  }
  return "1";
}

//隐藏或显示表格
function grid_displayTab(obj,ctx) {
	var displayType = "";
	if(document.all.showtable.value.length>0){
		displayType = "none";
		document.all.push_up.src = ctx+"/images/push_down_c1.gif";
		document.all.push_up_td.title = "展开";
		document.all.queryPanelTable.style.display = displayType;
		document.all.showtable.value='';
	}else {
		displayType = "";
		document.all.push_up.src = ctx+"/images/push_up_c1.gif";
		document.all.push_up_td.title = "折叠";
		document.all.queryPanelTable.style.display = displayType;
		document.all.showtable.value='visible';
	}
	try
	{
        resizeTable();
        window.onresize=  resizeTable;
    }
    catch(e)
    {
    }
}


//GRID面板扩展折叠
function grid_display(obj) {
	var gridExpandFlag = getObjValue("gridExpandFlag");
	var displayType = "";
	if (gridExpandFlag == "1") {
		displayType = "none";
		setObjValue("gridExpandFlag","0");
		obj.src = ctx + "/images/expand_arrow.jpg";
		obj.alt = "展开";
		window.lcfGridTable.style.display = displayType;
	}else {
		displayType = "";
		setObjValue("gridExpandFlag","1");
		obj.src = ctx + "/images/pucker_arrow.jpg";
		obj.alt = "折叠";
		window.lcfGridTable.style.display = displayType;
	}

}

//多GRID面板扩展折叠
function mult_grid_display(obj) {
	var multGridExpandFlag = getObjValue("multGridExpandFlag");
	var displayType = "";
	if (multGridExpandFlag == "1") {
		displayType = "none";
		setObjValue("multGridExpandFlag","0");
		obj.src = ctx + "/images/expand_arrow.jpg";
		obj.alt = "展开";
		window.multGridTable.style.display = displayType;
	}else {
		displayType = "";
		setObjValue("multGridExpandFlag","1");
		obj.src = ctx + "/images/pucker_arrow.jpg";
		obj.alt = "折叠";
		window.multGridTable.style.display = displayType;
	}

}


//单面板扩展折叠
function pannel_display(obj,lineName){
	var lineNameValue = getObjValue(lineName + "_line");
        var lineNameFlag = getObjValue(lineName + "_flag");
        var begin_tr = lineNameValue.split(",")[0];
        var end_tr = lineNameValue.split(",")[1];
        var displayType = "";
        if(lineNameFlag == "1"){
          displayType = "none";
          setObjValue(lineName + "_flag","0");
          obj.src =ctx + "/images/expand_arrow.jpg";
          obj.alt = "展开";
        }
        else{
          displayType = "";
          setObjValue(lineName + "_flag","1")
          obj.src =ctx + "/images/pucker_arrow.jpg";
          obj.alt = "折叠";
        }
        for(var i=parseInt(begin_tr);i<parseInt(end_tr);i++){
        	 window.table_form.rows(i).style.display = displayType;
        }
}


//全部面板扩展
function pannel_Expand_all() {
  if(document.all.panel_display_all_img != undefined) {
    pannel_Expand_all_has_allExpandButton();
  }
  if(document.all.gridImg != undefined) {
    window.lcfGridTable.style.display = "";
  }

}
//全部面板扩展有全展按钮时
function pannel_Expand_all_has_allExpandButton() {
        var obj = document.all.panel_display_all_img;
	var allPannelRows = getObjValue("allPannelRows");
        var allPannelRows_flag = getObjValue("allPannelRows_flag");
        var allPannelRowsArray = allPannelRows.split(";");
        displayType = "";
        setObjValue("allPannelRows_flag","1");
        obj.src =ctx + "/images/all_pucker_arrow.jpg";
        obj.alt = "全部折叠";
        for(var i=1;i<allPannelRowsArray.length;i++){
         	var lineName = allPannelRowsArray[i].split(",")[0];
            	var begin_tr = allPannelRowsArray[i].split(",")[1];
               	var end_tr = allPannelRowsArray[i].split(",")[2];
                eval("document.all." + lineName + "_img").src = ctx + "/images/pucker_arrow.jpg";
                eval("document.all." + lineName + "_img").alt = "折叠";
                setObjValue(lineName + "_flag","1");
                for(var j=parseInt(begin_tr);j<parseInt(end_tr);j++){
                	window.table_form.rows(j).style.display = displayType;
                }
        }
        var gridExpandFlag = getObjValue("gridExpandFlag");
        if (gridExpandFlag == "null") {
        }else {

          displayType = "";
	  setObjValue("gridExpandFlag","1");
	  document.all.gridImg.src = ctx + "/images/pucker_arrow.jpg";
          document.all.gridImg.alt = "折叠";
	  window.lcfGridTable.style.display = displayType;

        }
        var multGridExpandFlag = getObjValue("multGridExpandFlag");
        if (multGridExpandFlag == "null") {
        }else {

          displayType = "";
	  setObjValue("multGridExpandFlag","1");
	  document.all.multGridImg.src = ctx + "/images/pucker_arrow.jpg";
	  document.all.multGridImg.alt = "折叠";
	  window.multGridTable.style.display = displayType;
          }

}

//全部面板扩展折叠
function pannel_display_all(obj){
	var allPannelRows = getObjValue("allPannelRows");
        var allPannelRows_flag = getObjValue("allPannelRows_flag");
        var allPannelRowsArray = allPannelRows.split(";");

        if(allPannelRows_flag == "1"){
          displayType = "none";
          setObjValue("allPannelRows_flag","0");
          obj.src =ctx + "/images/all_expand_arrow.jpg";
          obj.alt = "全部展开";
        }
        else{
          displayType = "";
          setObjValue("allPannelRows_flag","1");
          obj.src =ctx + "/images/all_pucker_arrow.jpg";
          obj.alt = "全部折叠";
        }
        for(var i=1;i<allPannelRowsArray.length;i++){
          	var lineName = allPannelRowsArray[i].split(",")[0];
            	var begin_tr = allPannelRowsArray[i].split(",")[1];
               	var end_tr = allPannelRowsArray[i].split(",")[2];

		if(allPannelRows_flag == "1"){
                  	eval("document.all." + lineName + "_img").src = ctx + "/images/expand_arrow.jpg";
                      	eval("document.all." + lineName + "_img").alt = "展开";
                      	setObjValue(lineName + "_flag","0");
		}
                else{
                  	eval("document.all." + lineName + "_img").src = ctx + "/images/pucker_arrow.jpg";
                      	eval("document.all." + lineName + "_img").alt = "折叠";
                  	setObjValue(lineName + "_flag","1");
                }
                for(var j=parseInt(begin_tr);j<parseInt(end_tr);j++){
                	window.table_form.rows(j).style.display = displayType;
                }
        }
        var gridExpandFlag = getObjValue("gridExpandFlag");
        if (gridExpandFlag == "null") {
        }else {
        	if(allPannelRows_flag == "1") {
        		displayType = "none";
			setObjValue("gridExpandFlag","0");
			document.all.gridImg.src = ctx + "/images/expand_arrow.jpg";
			document.all.gridImg.alt = "展开";
			window.lcfGridTable.style.display = displayType;
        	}else {
        		displayType = "";
			setObjValue("gridExpandFlag","1");
			document.all.gridImg.src = ctx + "/images/pucker_arrow.jpg";
			document.all.gridImg.alt = "折叠";
			window.lcfGridTable.style.display = displayType;
        	}
        }
        var multGridExpandFlag = getObjValue("multGridExpandFlag");
        if (multGridExpandFlag == "null") {
        }else {
        	if(allPannelRows_flag == "1") {
        		displayType = "none";
			setObjValue("multGridExpandFlag","0");
			document.all.multGridImg.src = ctx + "/images/expand_arrow.jpg";
			document.all.multGridImg.alt = "展开";
			window.multGridTable.style.display = displayType;
        	}else {
        		displayType = "";
			setObjValue("multGridExpandFlag","1");
			document.all.multGridImg.src = ctx + "/images/pucker_arrow.jpg";
			document.all.multGridImg.alt = "折叠";
			window.multGridTable.style.display = displayType;
        	}
        }
}

/**
* 唯一性校验
* para:code		编码，数据库表字段名
* para:value		值，需要校验的值
* para:tableName	表名
* para:condition	做校验的查询条件
* para:action		当前操作类型（“edit”,"add"）
* para:id		如果是修改的时候，则需要传入检验值
* para:ctx		上下文根
*/
function singleValue(code,value,tableName,condition,action,id,ctx)
{
  var codeCondition = "";
  var valueCondition = "";
  if (typeof(code) == "object")
  {
          var codeArraySize = code.length;
          for (var i=0;i<codeArraySize;i++)
          {
		  codeCondition = codeCondition + "&code=" + code[i];
		  valueCondition = valueCondition + "&value=" + value[i];
          }
  }
  else
  {
	  codeCondition = codeCondition + "&code="+code;
	  valueCondition = valueCondition + "&value="+value;
  }
  var postPara = "1=1"
          + codeCondition
          + valueCondition
          + "&id=" + id
          + "&action="+action
          + "&tableName="+tableName
          + "&condition="+condition
  var xml = new ActiveXObject("MSXML2.XMLHTTP.4.0");
  var myWindowOpener = window.dialogArguments;
  xml.open("POST",
      ctx+"/css4/common/biz/bizUtil/SingleValueQuery.do?" + postPara, false)
  xml.send();
  var returnText = xml.responseText;
  if (returnText == "" || returnText !="0")
  	return false;
  else
  	return true;
}

function getWholeTime(name)
{
        setObjValue(name,getObjValue(name+"_date") + " " + getObjValue(name+"_hms"));
}



//////////////////////////////////////////////////////////////////////////////
//特殊字符串置换
//////////////////////////////////////////////////////////////////////////////
//function replaceString(strdata){
//    str = strdata.replace(/\//g, "//");
//    str = str.replace(/\;/g, "/;");
//    str = str.replace(/:/g, "/:");
//    str = str.replace(/'/g, "/'");
//    str = str.replace(/\[/g, "/[");
//    str = str.replace(/\]/g, "/]");
//    return str;
//}

function replaceStr(str)
{
    str = str.replace(/%/g,"%25");
    str = str.replace(/&/g,"%26");
    str = str.replace(/\n/g,"%0A");
    str = str.replace(/\+/g,"%2B");
    str = str.replace(/#/g,"%23");
    str = str.replace(/=/g,"~");
    //str = str.replace(/</g,"&#60;");
    //str = str.replace(/>/g,"&#62;");
    //str = str.replace(/\\/g,"&#92;");
    //str = str.replace(/</g,"&#60;");
    //str = str.replace(/>/g,"&#62;");
    //str = str.replace(/\"/g,"&#34;");
    //str = str.replace(/ /g,"&nbsp;");

    return str;
}


//////////////////////////////////////////////////////////////////////////////
//得到From中所有元素的NAME和值，并组成GET请求中要求的[name]=[value]&...[name]=[value]串
//////////////////////////////////////////////////////////////////////////////
function getAlldata(obj){
    var data = "";
    for (i=0; i<obj.length; i++ ){
        if ( obj(i).type != "submit" && obj(i).type != "reset" && obj(i).type != "button"){
            if( obj(i).type == "select-multiple"){
                for(j=0; j<obj(i).length;j++){
                    if (obj(i).options[j].selected ){
                        data = data+obj(i).name+"="+replaceStr(obj(i).options[j].value)+"&";
                    }
                }
            }else if(obj(i).type =="radio" || obj(i).type =="checkbox"){
                if (obj(i).checked){
                    data=data+obj(i).name+"="+replaceStr(obj(i).value)+"&";

                }
            }else{
                data=data+obj(i).name+"="+replaceStr(obj(i).value)+"&";
            }
        }
    }
    return data.substr(0, data.length-1);
}

//控制输入框中内容为Number
function onlyNumber(obj){
	var checkStr = obj.value;

        if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13) || (window.event.keyCode == 46)|| (window.event.keyCode == 45)))
   	{
     		window.event.keyCode = 0 ;
                return false;
    	}

  	if(window.event!=null){
      		//第一位不允许输入小数点“.”
      		if(checkStr == null || checkStr=="" ){
                	if(window.event.keyCode == 46)
                        	window.event.keyCode = 0 ;
                }
                //如果第一位是负号，第二位禁止输入“.”
                if(checkStr=="-"){
                        if(window.event.keyCode == 46)
                                window.event.keyCode = 0 ;
                }
                //如果第一位输入负号，其他位不允许输入负号“-”
                if(checkStr.indexOf("-")>-1 || checkStr.length>1){
                        if(window.event.keyCode == 45)
                                window.event.keyCode = 0 ;
                }
                //如果已经输入“.”，则其他位不允许输入“.”
                if(checkStr.indexOf(".")>-1){
                        if(window.event.keyCode == 46)
                                window.event.keyCode = 0 ;
                }
  	}
    	return true;
}

//判断字符是否仅在-1234567890.之间
function isInNumber(str) {
  var len = str.length;
  var chkStr = "-1234567890.";
  for(i = 0; i < len; i++) {
    if(chkStr.indexOf(str.charAt(i)) < 0) {
      return false;
    }
  }
  return true;
}


//校验是否是合法的数字
function checkNumber(str) {
  var len = str.length;
  var isHasPoint = false;
  var isHasSubtractSign = false;
  var i;
  var j;
  var m;
  var n;
  m = str.indexOf(".");
  i = str.indexOf("-");
  if(len == 0) {
    return true;
  }
  //长度为一的情况,第一个字符不能为.号或者-号
  if(len == 1) {
    if( m==0 || i == 0) {
      alert("第一个字符不能为.号或者-号!!!");
      return false;
    }
  }
  if(isInNumber(str) == false) {
    alert("非法字符!!!");
    return false;
  }
  //判断负号
  if(i > -1) {
    if(i != 0) {
      alert("-号一定要是第一个字符!!!");
      return false;
    }
    j = str.lastIndexOf("-");
    if(j != i) {
      alert("-号不能多于一个!!!");
      return false;
    }
    isHasSubtractSign = true;
  }
  //判断点号
  if(m > -1) {
    if (m == 0 || m == (len-1)) {
      alert(".号不能是第一个或者最后一个!!!");
      return false;
    }
    n = str.lastIndexOf(".");
    if(m != n) {
      alert(".号不能多于一个!!! ");
      return false;
    }
    if(isHasSubtractSign == true) {
      if(m == 1) {
        alert(".号不能是第二个!!!");
        return false;
      }
    }
  }
  return true;
}


//校验输入框中内容为合法的Number
function validNumber(obj,colSize,precision){
   return true;
	var checkStr = obj.value;
        if(checkNumber(checkStr) == false) {
          obj.focus();
          return false;
        }
        colSize = parseInt(colSize);
        precision = parseInt(precision);
        var m = checkStr.length;                      //输入值的位置
        var n = checkStr.indexOf(".");                //“.”的位置
        var k = checkStr.indexOf("-");                //“-”的位置
        var j;                                        //整数长度
        var i;                                        //小数长度

	//如果输入值中含有“.”；获取输入值的整数长度；
 	if(n > -1){
           	//如果输入值中含有“－”
           	if(k > -1){
        		j = n - 1;
                      	i = m - n - 1;
           	}
                else{
                  	j = n;
                      	i = m - n - 1;
                }
 	}
 	else{
           	//如果输入值中含有“－”
           	if(k > -1){
  			j = m - 1;
           	}
                else{
                  	j = m;
                }
                i = 0;
 	}
      	//检验输入值的整数长度和小数长度
      	if((j > colSize - precision) || (i > precision)){
                alert(checkStr + "的精度不符，要求整数长度小于等于" + (colSize - precision) + "、小数长度小于等于" + precision + "！");
                obj.focus();
                return false
      	}
        return true;
}
//控制输入框中内容为日期
function onlyCalendar(obj){
	var checkStr = obj.value;
      	var m =  checkStr.length;

        if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 13) || (window.event.keyCode == 45)))
   	{
     		window.event.keyCode = 0 ;
                return false;
    	}

  	if(window.event!=null){
              	//如果字符长度未达到四位或7位不允许输入“-”，反之则必须输入“-”
              	if(m < 4){
                	if(window.event.keyCode == 45)
                        	window.event.keyCode = 0 ;
                              	return false;
              	}
              	else if(m == 4){
                	if(window.event.keyCode != 45)
                        	window.event.keyCode = 0 ;
                              	return false;
              	}
              	else if(m > 4 && m < 7){
                	if(window.event.keyCode == 45)
                        	window.event.keyCode = 0 ;
                              	return false;
              	}
              	else if(m == 7){
                	if(window.event.keyCode != 45)
                        	window.event.keyCode = 0 ;
                              	return false;
              	}
              	else if((m > 7) && (m < 10)){
                	if(window.event.keyCode == 45)
                        	window.event.keyCode = 0 ;
                              	return false;
              	}
  	}
    	return true;
}
//校验输入框中内容为合法的日期
function validCalendar(obj){
	var checkStr = obj.value;
      	var m = checkStr.length;
      	var year;
      	var month;
      	var day;

        if(!(checkStr == null || checkStr=="" )){
          	if(m == 10 && checkStr.charAt(4) == "-" && checkStr.charAt(7) == "-"){
          		year = parseInt(checkStr.split('-')[0],10);
              		month = parseInt(checkStr.split('-')[1],10);
              		day = parseInt(checkStr.split('-')[2],10);

                        if(month > 12 || month == 0){
                        	alert(checkStr + "的格式不符，要求月份在1-12之间！");
                              	obj.focus();
                        	return false;
                        }
                        if(day > 31 || day ==0){
                        	alert(checkStr + "的格式不符，要求日在1-31之间！");
                              	obj.focus();
                        	return false;
                        }
                        else if((month == 2 || month == 4 || month ==6 || month ==9 || month ==11) && day == 31){
                          	alert(checkStr + "的格式不符，" + month + "月无31日！");
                              	obj.focus();
                        	return false;
                        }
                        else if(month == 2  && day == 30){
                          	alert(checkStr + "的格式不符，"+year+"月" +month+"月无30日！");
                              	obj.focus();
                        	return false;
                        }
                        else if((year%100==0)&&(year%400!=0) && month == 2  && day == 29){
                          	alert(checkStr + "的格式不符，"+year+"月" +month+"月无29日！");
                              	obj.focus();
                        	return false;
                        }
                        else if((year%4)!=0 && month == 2  && day == 29){
                          	alert(checkStr + "的格式不符，"+year+"月" +month+"月无29日！");
                              	obj.focus();
                        	return false;
                        }
          	}
              	else{
                 	alert(checkStr + "的格式不符，要求YYYY-MM-DD！");
                      	obj.focus();
                        return false;
              	}
        }
        return true;
}
//校验Time类型中的日期输入框中内容为合法的日期，并赋予隐藏字段的值；
function validTimeDate(obj){
  	var hidden_name = obj.name.substr(0,obj.name.indexOf("_date"));     //获取隐藏字段的名称
      	var checkStr = obj.value;                                           //日期输入框值
      	var hms_value = getObjValue(hidden_name + "_hms")                   //时间输入框值

      	//如果日期输入框内容合法，然后判断日期输入框的内容是否为空，然后再判断时间输入框的内容是否为空；
  	if(validCalendar(obj)){
            	//如果日期输入值不为空并且时间的输入值不为空，则赋予隐藏字段的值，否则赋予隐藏字段的值为空值；
        	if(!(checkStr == null || checkStr == "" ) && !(hms_value == null || hms_value=="" )){
                	getWholeTime(hidden_name);
        	}
              	else{
                        setObjValue(hidden_name,"");
              	}
  	}
        return true;
}
//控制Time类型中的时间输入框中内容为时间；
function onlyTime(obj){
	var checkStr = obj.value;
      	var m =  checkStr.length;

        if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 13) || (window.event.keyCode == 58)))
   	{
     		window.event.keyCode = 0 ;
                return false;
    	}

  	if(window.event!=null){
              	//如果字符长度未达到2或5位不允许输入“:”，反之则必须输入“:”
              	if(m < 2){
                	if(window.event.keyCode == 58)
                        	window.event.keyCode = 0 ;
                              	return false;
              	}
              	else if(m == 2){
                	if(window.event.keyCode != 58)
                        	window.event.keyCode = 0 ;
                              	return false;
              	}
              	else if(m > 2 && m < 5){
                	if(window.event.keyCode == 58)
                        	window.event.keyCode = 0 ;
                              	return false;
              	}
              	else if(m == 5){
                	if(window.event.keyCode != 58)
                        	window.event.keyCode = 0 ;
                              	return false;
              	}
              	else if((m > 5) && (m < 8)){
                	if(window.event.keyCode == 58)
                        	window.event.keyCode = 0 ;
                              	return false;
              	}
  	}
    	return true;
}
//校验Time类型中的时分秒输入框中内容为合法的时分秒；
function validHMS(obj){
        var checkStr = obj.value;
      	var m = checkStr.length;
      	var hour;
      	var minute;
      	var second;

        if(!(checkStr == null || checkStr=="" )){
          	if(m == 8 && checkStr.charAt(2) == ":" && checkStr.charAt(5) == ":"){
          		hour = parseInt(checkStr.split(':')[0],10);
              		minute = parseInt(checkStr.split(':')[1],10);
              		second = parseInt(checkStr.split(':')[2],10);

                        if(hour > 23){
                        	alert(checkStr + "的格式不符，要求小时在00-23之间！");
                              	obj.focus();
                        	return false;
                        }
                        if(minute > 59){
                        	alert(checkStr + "的格式不符，要求分钟在00-59之间！");
                              	obj.focus();
                        	return false;
                        }
                        if(second > 59){
                        	alert(checkStr + "的格式不符，要求秒在00-59之间！");
                              	obj.focus();
                        	return false;
                        }
          	}
              	else{
                 	alert(checkStr + "的格式不符，要求HH:MI:SS！");
                      	obj.focus();
                        return false;
              	}
        }
        return true;
}
//校验Time类型中的时分秒输入框中内容为合法的时分秒，并赋予隐藏字段的值；
function validTime(obj){
  	var hidden_name = obj.name.substr(0,obj.name.indexOf("_hms"));      //获取隐藏字段的名称
      	var checkStr = obj.value;                                           //时间输入框值
      	var date_value = getObjValue(hidden_name + "_date")                 //日期输入框值

      	//如果时分秒输入框内容合法，然后判断时分秒输入框的内容是否为空，然后再判断日期输入框的内容是否为空；
  	if(validHMS(obj)){
            	//如果时分秒输入值不为空并且日期的输入值不为空，则赋予隐藏字段的值，否则赋予隐藏字段的值为空值；
        	if(!(checkStr == null || checkStr == "" ) && !(date_value == null || date_value=="" )){
                	getWholeTime(hidden_name);
        	}
              	else{
                        setObjValue(hidden_name,"");
              	}
  	}
        return true;
}
//附件管理按钮方法：用于传递参数，打开模态窗口；
function affixmanage(){
  	//判断是否选中记录；
  	if(hasSelectedRecord('chk'))
    	{
              	//获取主表隐藏字段的值；
              	main_table_code = getObjValue("main_table_code");
              	//获取选中记录的row_id值；
		record_id = getCheckedValue('chk');
  		str = "table_code=" + main_table_code + "&record_id=" + record_id
              	//打开附件管理的模态窗口；
              	window.showModalDialog('../../../../lightclient/services/filemgr/FilemanagerList.do?'+str,self,'help:no;status:no;dialogWidth:' + (availWidthScreen-availWidthScreenDifference)
    		+'px;dialogHeight:' + (availHeightScreen-availHeightScreenDifference) + 'px;');
    	}
    	else{
        	alert("请选择记录！");
    	}
}
//给指定控件置焦点；
function setInputFocus(objName){
  	var obj = eval("document.all('" + objName + "')");
        if(obj.style.display == "none") {
        }else {
          obj.focus();
        }

}

//控制控件中字符串的长度  需要调用的控件方法是onpropertychange,使用于控制各类文本编辑控件的字符串长度
function textLengthControl(obj,len)
{
    if(obj.value.length>len)
    {
        alert("你录入的数据超出了该字段的限定长度!");
        obj.value=obj.value.substring(0,len);
    }
}

//判断form中文本控件是否满足必输的需求
function validFormText(name,isMustInput) {
  //获取被检验的文本控件的输入值
  TextValue = getObjValue(name);
  //如果该数值控件必输
  if(isMustInput == "false") {
    return true;
  }
  if(isMustInput == "true" && TextValue==""){
     	alert("请输入值！");
        setInputFocus(name);
        return false;
  }
  return true;
}

//判断grid中文本控件是否满足配置的必输的需求；
function validGridText(name,isMustInput){
	var objTable = eval("dataTable");
	var strTableTotalRows = objTable.rows.length;    //获取objTable的行数

        //循环判断，如果行显示类型不是为“none”，则调用validFromText方法；
	for (var i = 1;i < strTableTotalRows;i++) {
		if(objTable.rows(i).style.display != "none") {
                	if(!validFormText("DATA[" + (i-1) + "]." + name,isMustInput)){
                          	return false;
                	}
		}
	}
	return true;
}
//判断form中数值控件是否满足配置的最大值和最小值和必输的需求；
function validFormNumber(name,maxValue,minValue,isMustInput){
  	//获取被检验数值的输入值；
  	numberValue = parseFloat(getObjValue(name));
      	maxValue = parseFloat(maxValue);
      	minValue = parseFloat(minValue);

      	//如果该数值控件必输
      	if(isMustInput == "true" && isNaN(numberValue)){
        	alert("请输入值！");
              	setInputFocus(name);
              	return false;
      	}
      	else if(!isNaN(numberValue)){
         	if(!isNaN(maxValue) && numberValue > maxValue){
                	alert("您输入的值大于允许输入的最大值！");
              		setInputFocus(name);
                      	return false;
         	}
              	if(!isNaN(minValue) && numberValue < minValue){
                	alert("您输入的值小于允许输入的最小值！");
              		setInputFocus(name);
                      	return false;
         	}
      	}
      	return true;
}
//判断grid中数值控件是否满足配置的最大值和最小值和必输的需求；
function validGridNumber(name,maxValue,minValue,isMustInput){
	var objTable = eval("dataTable");
	var strTableTotalRows = objTable.rows.length;    //获取objTable的行数

        //循环判断，如果行显示类型不是为“none”，则调用validFormNumber方法；
	for (var i = 1;i < strTableTotalRows;i++) {
		if(objTable.rows(i).style.display != "none") {
                	if(!validFormNumber("DATA[" + (i-1) + "]." + name,maxValue,minValue,isMustInput)){
                		return false;
                        }
		}
	}
	return true;
}
//判断form中日期控件是否满足配置的最大值和最小值和必输的需求；
function validFormDate(name,maxValue,minValue,isMustInput){
	//获取被检验数日期的输入值；
  	dateValue = getObjValue(name);

      	//如果该日期控件必输
      	if(isMustInput == "true" && dateValue ==""){
        	alert("请输入日期！");
              	setInputFocus(name);
              	return false;
      	}
      	else if(dateValue !=""){
         	if(maxValue !="" && dateValue > maxValue){
                	alert("您输入的日期大于允许输入的最大日期！");
              		setInputFocus(name);
                      	return false;
         	}
              	if(minValue !="" && dateValue < minValue){
                	alert("您输入的日期小于允许输入的最小日期！");
              		setInputFocus(name);
                      	return false;
         	}
      	}
      	return true;
}
//判断grid中日期控件是否满足配置的最大值和最小值和必输的需求；
function validGridDate(name,maxValue,minValue,isMustInput){
	var objTable = eval("dataTable");
	var strTableTotalRows = objTable.rows.length;    //获取objTable的行数

        //循环判断，如果行显示类型不是为“none”，则调用validFormDate方法；
	for (var i = 1;i < strTableTotalRows;i++) {
		if(objTable.rows(i).style.display != "none") {
                	if(!validFormDate("DATA[" + (i-1) + "]." + name,maxValue,minValue,isMustInput)){
                          	return false;
                	}
		}
	}
	return true;
}
//判断form中时间控件是否满足配置的最大值和最小值和必输的需求；
function validFormTime(name,maxValue,minValue,isMustInput){
	//获取被检验数时间的输入值；
  	timeValue = getObjValue(name);

      	//如果该日期控件必输
      	if(isMustInput == "true" && timeValue ==""){
        	alert("请输入时间！");
              	if(getObjValue(name + "_date") == ""){
              		setInputFocus(name + "_date");
                      	return false;
              	}
              	else if(getObjValue(name + "_hms") == ""){
                	setInputFocus(name + "_hms");
                      	return false;
              	}
              	return false;
      	}
      	else if(timeValue !=""){
         	if(maxValue != "" && timeValue > maxValue){
                	alert("您输入的时间大于允许输入的最大时间！");
              		setInputFocus(name);
                      	return false;
         	}
              	if(minValue != "" && timeValue < minValue){
                	alert("您输入的时间小于允许输入的最小时间！");
              		setInputFocus(name);
                      	return false;
         	}
      	}
      	return true;
}
//判断grid中时间控件是否满足配置的最大值和最小值和必输的需求；
function validGridTime(name,maxValue,minValue,isMustInput){
	var objTable = eval("dataTable");
	var strTableTotalRows = objTable.rows.length;    //获取objTable的行数

        //循环判断，如果行显示类型不是为“none”，则调用validFormTime方法；
	for (var i = 1;i < strTableTotalRows;i++) {
		if(objTable.rows(i).style.display != "none") {
                	if(!validFormTime("DATA[" + (i-1) + "]." + name,maxValue,minValue,isMustInput)){
                          	return false;
                	}
		}
	}
	return true;
}
//用于定制的多tab明细之间的切换；
function tabChange(tabIndex,tabTotal) {
	var obj = eval("document.all.tab" + tabIndex);

	for(var i=1;i<tabTotal+1;i++){
		eval("document.all.tab" + i).style.display='none';
	}
	obj.style.display='';
	return;
}

function oneRowBack() {
 if(document.all("dataTable").rows.length==2){
   document.all("chk")[0].checked = true;
   commonSelectDate("one");
 }
}

//当鼠标移动到某一行时，改变这一行所有的元素的背景色
function onRowMouseOver(trHandle){
  trHandle.style.backgroundColor='#F1F1F1';
  var td = trHandle.cells;

  for(var i = 0;i<td.length;i++){
    var objsInTD = td[i].childNodes;
    for(var j = 0;j<objsInTD.length;j++){
    	try{
      	  objsInTD[j].style.backgroundColor ='#F1F1F1' ;
	}catch(e){

	}
    }
  }
}

//当鼠标离开某一行时，恢复这一行所有的元素的背景色
function onRowMouseOut(trHandle){
  trHandle.style.backgroundColor='';
  var td = trHandle.cells;

  for(var i = 0;i<td.length;i++){
    var objsInTD = td[i].childNodes;
    for(var j = 0;j<objsInTD.length;j++){
    	try{
      	  objsInTD[j].style.backgroundColor ='' ;
	}catch(e){

	}
    }
  }
  }


//对GRID进行页面排序
function sortGrid(obj,fName,mode) {
   var objGridTable = document.all.dataTable;
   var objAllRows = objGridTable.rows;
   if(obj.alt=='升序') {
     for(var i = 1; i < objGridTable.rows.length;i++) {
       for(var j = 1; j < objGridTable.rows.length-i; j++) {
     	 if(getGridCompareValue(objAllRows,j,fName,mode) > getGridCompareValue(objAllRows,j+1,fName,mode)) {
     	   objGridTable.moveRow(j,j+1);
     	 }
        }
     }
     obj.alt="降序";
     obj.src=ctx + "/images/sortDown.gif";
   }else if(obj.alt=='降序') {
     for(var i = 1; i < objGridTable.rows.length;i++) {
       for(var j = 1; j < objGridTable.rows.length-i; j++) {
         if(getGridCompareValue(objAllRows,j,fName,mode) < getGridCompareValue(objAllRows,j+1,fName,mode)) {
           objGridTable.moveRow(j,j+1);
     	  }
       }
      }
      obj.alt="升序";
      obj.src=ctx + "/images/sortUp.gif";
   }
}

//在GRID进行页面排序时,取比较的字段值
function getGridCompareValue(objOldAllData,i,fName,mode) {
   var k = objOldAllData[i].id;
   k = trim(k.substr("dataRow".length,k.length-1));
   if(mode=='VIEW') {
     return trim(eval("objOldAllData["+i+"].all."+fName+k+".innerHTML"));
   }else {
	 var objName = "DATA["+k+"]."+fName;
     var obj = eval("objOldAllData["+i+"].all(objName)");
     return obj.value;
   }
}
//add by zhangmin
function selectAllFile(obj)
//全选orderAmount字段文字
{
          obj.select();
}

//add by zhangmin；
//将一个字符串格式的日期转变为日期形式；
function string2date(strDate)
{
    var dateArray;
    var backDate;

    dateArray=strDate.split("/");
    backDate=new Date();
    backDate.setFullYear(dateArray[0],dateArray[1],dateArray[2]);
    return backDate;
}
//add by jialiang
//获取科目树型结构返回值
/*
方法名：getTreeInfo
参数：companyId 公司序号
            fiscalYear 会计年度
            element_id code和id的页面控件名称
            element_name 科目名称的页面控件名称
            returnType  返回值类型    1 id  2  name 3 code  4 id+name  5 code+name   6 只有末级科目可用
             isMultiTree 树型结构 y 多选 n 单选    默认为单选
             fiscalYearElement 如果fiscalYear需要在前台控制的情况下填入页面控件名称
             filter  过滤条件 ，过滤取得会计科目的种类
*/
function getTreeInfo(contextName,companyId,fiscalYear,element_id,element_name,returnType,isMultiTree,fiscalYearElement,filter) {
      var returnValue ='';
      if(fiscalYear==''){
           fiscalYear = document.getElementById(fiscalYearElement).value;
      }
      //多选树
     if(isMultiTree == 'y'){
          returnValue =  window.showModalDialog(contextName+"/o2d/util/tree/MultiTreeFrame.jsp?fiscalYear="+fiscalYear+"&companyId="+companyId+"&filter="+filter,returnType,"status=0"); //status＝0的作用是去掉边框
     }
     //单选树
     else{

         if(filter==null){
            filter = "";
         }
         returnValue =  window.showModalDialog(contextName+"/o2d/util/tree/RadioTreeFrame.jsp?fiscalYear="+fiscalYear+"&companyId="+companyId+"&filter="+filter,returnType,"status=0");
     }
     //返回值为空
     if(returnValue==null) returnValue='';
     //返回值科目id code
     if(returnType == 1||returnType ==3|| returnType ==6){
          document.getElementById(element_id).value = returnValue;
     }
     //返回值科目名称
     if(returnType == 2){
     alert(returnValue);
          document.getElementById(element_name).value = returnValue;
     }
     //返回值4: id＋name,5: code+name
      if(returnType ==4||returnType ==5 ){
      var returnArray = returnValue.split(",");
      var count ;
      var tempId='';
      var tempName='';
      for(count = 0;count<returnArray.length-1;count+=2){
      tempId += returnArray[count]+',';
      tempName += returnArray[count+1]+',';
      }
       document.getElementById(element_id).value =tempId.substring(0,tempId.length-1);
       document.getElementById(element_name).value = tempName.substring(0,tempName.length-1);
     }
}
//获取控制域科目树型结构返回值
/*
方法名：getControlAreaTreeInfo
参数：  controlAreaId 控制域 id
             companyId 公司序号
             fiscalYear 会计年度
             includeSelf_YN 是否包含自身
            element_id code和id的页面控件名称
            element_name 科目名称的页面控件名称
            returnType  返回值类型    1 id  2  name 3 code  4 id+name  5 code+name   7  id +code
            isMultiTree 树型结构 y 多选 n 单选    默认为单选
            fiscalYearElement 如果fiscalYear需要在前台控制的情况下填入页面控件名称
            filter  过滤条件 ，过滤取得会计科目的种类
*/
function getControlAreaTreeInfo(contextName,controlAreaId,companyId,fiscalYear,includeSelf_YN,element_id,element_name,returnType,isMultiTree,fiscalYearElement){
      var returnValue ='';
      if(fiscalYear==''){
           fiscalYear = document.getElementById(fiscalYearElement).value;
      }
      //多选树
     if(isMultiTree == 'y'){
          returnValue =  window.showModalDialog(contextName+"/o2d/util/tree/ControlAreaMultiTreeFrame.jsp?fiscalYear="+fiscalYear+"&companyId="+companyId+"&controlAreaId="+controlAreaId+"&includeSelf_YN="+includeSelf_YN,returnType,"status=0"); //status＝0的作用是去掉边框
     }
     //单选树
     else{
         returnValue =  window.showModalDialog(contextName+"/o2d/util/tree/ControlAreaTreeFrame.jsp?fiscalYear="+fiscalYear+"&companyId="+companyId+"&controlAreaId="+controlAreaId+"&includeSelf_YN="+includeSelf_YN,returnType,"status=0"); //status＝0的作用是去掉边框
     }
     //返回值为空
     if(returnValue==null) returnValue='';
     //返回值科目id code
     if(returnType == 1||returnType ==3){
          document.getElementById(element_id).value = returnValue;
     }
     //返回值科目名称
     if(returnType == 2){
     alert(returnValue);
          document.getElementById(element_name).value = returnValue;
     }
     //返回值4: id＋name,5: code+name;6:id+code
      if(returnType ==4||returnType ==5||returnType==7){
      var returnArray = returnValue.split(",");
      var count ;
      var tempId='';
      var tempName='';
      for(count = 0;count<returnArray.length-1;count+=2){
      tempId += returnArray[count]+',';
      tempName += returnArray[count+1]+',';
      }
       document.getElementById(element_id).value =tempId.substring(0,tempId.length-1);
       document.getElementById(element_name).value = tempName.substring(0,tempName.length-1);
     }
}
//只允许在text框中输入字母和数字
function ValidInput(){
    if((event.keyCode>=32&&event.keyCode<48)||(event.keyCode>57&&event.keyCode<65)||(event.keyCode>90&&event.keyCode<97)||(event.keyCode>122&&event.keyCode<127))
    {
        event.returnValue =false;
    }
}
//add by jialiang
//弹出窗口树型结构
/*
方法名：getLookupTree
参数：
     tagType 查询树信息时select所需要的字段名称,前四个必须是id,name.parentId,findId
                    后面是返回值可以任意添加但是必须和arrayPagePara对应,参数格式为
     arrayPagePara 回填树信息的页面控件名称,和arrayTreePara对应,参数格式 a@b@c
     treeType      扩充属性,一般不需要
*/
function getLookupTree(contextPath,tagType,condition,arrayPagePara,treeType)
{
     var returnValue = "";
     returnValue =  window.showModalDialog(contextPath+"/o2d/util/tree/LookUpTreeFrame.jsp?tagType="+tagType+"&condition="+condition+"&treeType="+treeType,"status=0"); //status＝0的作用是去掉边框
     var arrayPage =  arrayPagePara.split('@');
     var arrayReturnValue = returnValue.split('@');
     for(var count = 0;count<arrayReturnValue.length;count++){
       document.getElementById(arrayPage[count]).value = arrayReturnValue[count];
     }
}
/**
*add by jialiang
*单选弹出树型结构控件前台实现
*/
function treePopupRadioTreeWindow(url,args,width,height,returnRelation){
    var showx = event.screenX - event.offsetX - 4 - 210 ; // + deltaX;
	var showy = event.screenY - event.offsetY -150; // + deltaY;
	var urlStr = url;
	var paramArray = url.split('&');
	var changeWhereValue = '';
	for(var i=0;i<paramArray.length;i++){
	    var paramSecondArray = paramArray[i].split('=');
	    if(paramSecondArray[0]=='onChangeWhere'){
           changeWhereValue = paramSecondArray[1];
            //modify by jialiang at 2006-06-27  添加 当onchangeWhere方法返回值为"-1"时onclick失效功能
            var clickValue = eval(changeWhereValue+"()"); 
           if(clickValue == '-1'){
                return false;
           }
           urlStr += "&onChangeWhereValue=" + clickValue;
	    }
	}
    //window.open(urlStr);
   var retval = window.showModalDialog(urlStr,args,"dialogWidth:"+width+"px; dialogHeight:"+height+"px; dialogLeft:"+showx+"px; dialogTop:"+showy+"px; status:no; directories:yes;scrollbars:no;Resizable=no;help=no;");
    if(retval!=null&&retval!=''){
        var arrayPage =  returnRelation.split('@');
        var arrayReturnValue = retval.split('@');
        //循环每次取arrayPage的column与arrayReturnValue中的column比较如果相同则把arrayReturnValue中
        //column对应的值放入以arrayPage中pageElement为名字的页面元素中
        for(var k = 0;k<=arrayPage.length-2;k=k+2){
            for(var count = 0;count<arrayReturnValue.length-2;count=count+2){
                if(arrayPage[k]==arrayReturnValue[count]){
                    document.getElementById(arrayPage[k+1]).value = arrayReturnValue[count+1];
                    break;
                }
            }
        }
    }
 }
/**
*add by jialiang
*多选弹出树型结构控件前台实现
*/
function treePopupMultiTreeWindow(url,args,width,height,returnRelation){
    var showx = event.screenX - event.offsetX - 4 - 210 ; // + deltaX;
	var showy = event.screenY - event.offsetY -150; // + deltaY;
    var urlStr = url;
	var paramArray = url.split('&');
	var changeWhereValue = '';
	for(var i=0;i<paramArray.length;i++){
	    var paramSecondArray = paramArray[i].split('=');
	    if(paramSecondArray[0]=='onChangeWhere'){
           changeWhereValue = paramSecondArray[1];
           //modify by jialiang at 2006-06-27  添加 当onchangeWhere方法返回值为"-1"时onclick失效功能
           var clickValue = eval(changeWhereValue+"()");
           if(clickValue=='-1'){
                return false;
           }
           urlStr += "&onChangeWhereValue="+clickValue;
	    }
	}
    var retval = window.showModalDialog(urlStr,args,"dialogWidth:"+width+"px; dialogHeight:"+height+"px; dialogLeft:"+showx+"px; dialogTop:"+showy+"px; status:no; directories:yes;scrollbars:no;Resizable=no;help=no;");
    if(retval!=null&&retval!=''){
        //arrayPage为页面元素名称数组column@pageElement
        var arrayPage = returnRelation.split('@');
        //arrayReturnValue为返回值数组
        var arrayReturnValue = retval.split('@');
        //清空所有元素
        for(var k = 0;k<=arrayPage.length-2;k=k+2){
            document.getElementById(arrayPage[k+1]).value = "";
        }
        //循环每次取arrayPage的column与arrayReturnValue中的column比较如果相同则把arrayReturnValue中
        //column对应的值放入以arrayPage中pageElement为名字的页面元素中
        for(var k = 0;k<=arrayPage.length-2;k=k+2){
            for(var count = 0;count<=arrayReturnValue.length-2;count=count+2){
                if(arrayPage[k]==arrayReturnValue[count]){
                    //第一次放值时页面元素为空
                    if(document.getElementById(arrayPage[k+1]).value==''){
                        document.getElementById(arrayPage[k+1]).value = arrayReturnValue[count+1];
                    }else{
                        document.getElementById(arrayPage[k+1]).value = document.getElementById(arrayPage[k+1]).value+","+arrayReturnValue[count+1];
                    }
                }
            }
        }
    }
}
//校验是否是正确的日期格式
function GetDay(varYear, varMonth)
{
var lngDay

varYear = parseInt(varYear)
varMonth = parseInt(varMonth)
switch (varMonth) {
case 1 :
case 3 :
case 5 :
case 7 :
case 8 :
case 10 :
case 12 :
lngDay = 31
break
case 4 :
case 6 :
case 9 :
case 11 :
lngDay = 30
break
case 2 :
if ((varYear % 4 == 0 && varYear % 100 != 0) || (varYear % 400 == 0))
lngDay = 29
else
lngDay = 28
break
} // switch
return lngDay
}
//校验日期
function validateDate(year, month, day)
{

var strDate, arrDate
var lngYear, lngMonth, lngDay
var strReg
var strError
strError = ""
strReg = /^\d{4}-\d{1,2}-\d{1,2}$/;
strDate = year+'-'+month+'-'+day;
arrDate = strDate.split("-")
if (strReg.test(strDate)) {
lngYear = parseInt(arrDate[0], 10)
lngMonth = parseInt(arrDate[1], 10)
lngDay = parseInt(arrDate[2], 10)
}

if (!strReg.test(strDate)) {
  return false
}
else if (lngMonth < 1 || lngMonth > 12) {
 return false
}
else if (lngDay < 1 || lngDay > GetDay(lngYear, lngMonth)) {
 return false
}
  return true;
}
//验证页面必输项
//msg为输出名称 element为页面元素名称
function checkValidate(msg,element)
{
    if(document.getElementById(element).value==null||document.getElementById(element).value=='')
    {
        alert('请输入'+msg) ;
        return false;
    }
}
//查询面板的收缩功能函数－－add by liuxiaoyan
function query_panel_display(obj) {
	var displayType = "";
	//var src=obj.src;
	//var prefix=src.substring(0,src.indexOf("query"));
	if(document.all.showtable.value.length>0){
		displayType = "none";
		//document.all.push_up.src = prefix+"query_down_arrowhead2.gif";
		//document.all.push_up.alt = "展开";
		document.all.queryPanelTable.style.display = displayType;
		document.all.showtable.value='';
	}else {
		displayType = "";
		//document.all.push_up.src =prefix+"query_up_arrowhead2.gif";
		//document.all.push_up.alt = "折叠";
		document.all.queryPanelTable.style.display = displayType;
		document.all.showtable.value='visible';
	}
	//added by xiaxiaotao  2005/12/12
    // if a html should resize, resize it auto.
	if(window.onresize)
	window.onresize();
	//added by xiaxiaotao  2005/12/12
}

function grid_display(obj) {
	var displayType = "";
	if(document.all.showtable.value.length>0){
		displayType = "none";
		document.all.push_up.src = ctx+"/images/push_down_c1.gif";
		document.all.push_up_td.title = "展开";
		document.all.queryPanelTable.style.display = displayType;
		document.all.showtable.value='';
	}else {
		displayType = "";
		document.all.push_up.src = ctx+"/images/push_up_c1.gif";
		document.all.push_up_td.title = "折叠";
		document.all.queryPanelTable.style.display = displayType;
		document.all.showtable.value='visible';
	}
	try
	{
        resizeTable();
        window.onresize=  resizeTable;
    }
    catch(e)
    {
    }
}

//加上确认对话框,businessName为对象名字，如资产卡片，凭证记录？confirmName为执行的动作，如删除？复核？结账？
function MPC_confirm(businessName,confirmName){

  return window.confirm("是否确认"+confirmName+"选中的"+businessName+"？");

}

//用于在onblur事件时,检验文本框中的字符个数
function objCheckLen(obj,maxLength){
  var len = strLength(obj.value);
  if(len > maxLength){
  	alert("输入应小于允许的最大长度" + maxLength);
    obj.focus();
    obj.select();
  }
}
//用于在保存时,检验文本框中的字符个数
function objCheckLen(obj){
  var len = strLength(obj.value);
  var maxLength = obj.maxLength;
  if(len > maxLength){
    return false;
  }
  return true;
}
/**
 * 得到一个字符串的长度,显示的长度,一个汉字或日韩文长度为2,英文字符长度为1
 * @param String s ,需要得到长度的字符串
 * @return int, 得到的字符串长度
 * @author:陈博
 * @添加日期:2005.06.09
 */
function strLength(s){
	var i,str1,str2,str3,nLen;
	str1 = s;
	nLen = 0;
	for(i=1;i<=str1.length;i++){
		str2=str1.substring(i-1,i)
		str3=escape(str2);
		if(str3.length>3){
			nLen = nLen + 2;
		}
		else{
			nLen = nLen + 1;
		}
	}
	return nLen;
}
/**
 * 验证text和textarea的长度是否正确
 * @添加日期:2005.06.09
 */
function validateData(){
    var checks = self.document.forms[0];
    for(var i=0;i< checks.elements.length;i++){
        if(checks.elements[i].type=="text") {
            var len = strLength(checks.elements[i].value);
            var maxLength = checks.elements[i].maxLength;
            if(len > maxLength){
                alert("输入应小于允许的最大长度" + maxLength+"个字符!");
                checks.elements[i].focus();
                checks.elements[i].select();
                return false;
            }
        }
        if(checks.elements[i].tagName=="TEXTAREA"){
            var len = strLength(checks.elements[i].value);
            var maxLength = document.getElementById(checks.elements[i].name+"_maxLength").value;
            if(len > maxLength)  {
                alert("输入应小于允许的最大长度" + maxLength+"个字符!");
                checks.elements[i].focus();
                checks.elements[i].select();
                return false;
            }
        }
    }
    return true;
}
//回车时，设置下一个焦点
function setMainFocus(col)
{
   var keyCode=window.event.keyCode;
   if(keyCode==13||window.event.type=='propertychange')
   {
      var obj=document.getElementById(col);
      if(obj)
      {
          if(obj.tagName=='IMG'){
            obj.click();
          }else{
            obj.focus();
          }
      }
   }
}

//帮助按钮点击事件
function helpClick(){
  var module_code=document.getElementById("module_code").value;
 //var result=window.showModelessDialog(ctx+"/mpc/util/help/help.jsp?module_code="+module_code, "", "dialogWidth:800px; dialogHeight:650px; edge: Sunken; center: Yes; help: Yes; resizable: Yes; status: No;scroll:No;unadorned:Yes;");
    var url = ctx+"/o2d/util/help/help.jsp?module_code="+module_code;
    //window.open(url);
    var result=window.open(url,"helpDialog","height=620,width=800,left=70,top=20,status=no,toolbar=no,menubar=no,resizable=0, scrollbar=no,location=no");

}

//***********************************uniflow start******************************************//
   // JavaScript Documentfunction
function setClass(eleName,clsName)
{
 //document.all(eleName).className = clsName;
}

//common button refresh
function refresh()
{
  var url = window.location.href;

  var index = url.indexOf("?");
  if(index!=-1)
    location.href = url.substring(0,index);
  else
    location.href = url;
}

/**
* This function removes all spaces from a string
*/
function trim(a_strVarContent)
{
  var pos1, pos2, newstring;

  pos1 = 0;
  pos2 = 0;
  newstring = ""

  if ( a_strVarContent.length > 0 )
  {
    for( i=0; i<a_strVarContent.length; i++)
    {
 if ( a_strVarContent.charAt(i) == " " )
   pos1 = pos1 + 1;
 else
   break;
    }
    if(i!=a_strVarContent.length)
    {
 for( i=a_strVarContent.length-1; i>=0 ; i--)
 {
   if ( a_strVarContent.charAt(i) == " " )
     pos2 = pos2 + 1;
   else
     break;
 }
    }
    newstring = a_strVarContent.substring(pos1, a_strVarContent.length-pos2)
  }
  return newstring;
}

/**
*过滤掉控件text的前后空格，并返回新值
*/
function getTrimText(textfield)
{
  var value = textfield.value;
  textfield.value = trim(value);

  return textfield.value;
}
//****************************** uniflow end *******************************************//
//
function adjustPageSet(cell, breakRow, rows){
  cell.PrintSetBottomTitle(rows-1, rows);
  cell.PrintRange(2, 1, cell.GetCols(0), cell.GetRows(0));
  cell.InsertRow(breakRow, 1, 0);
  cell.DeleteRow(breakRow, 1, 0);
}
//
function parseString(str){
	if(str == "")
		return 0;
	if(str == "-")
		return 0;
	var arr = str.split(",");
	var returnValue = "";
	for(i=0;i<arr.length;i++){
		returnValue += arr[i];
	}
	return parseFloat(returnValue);
}

//
function formatNumber(number){
    var str            = number.toString();
    var pattern = '#,###.00';
    var strInt;
    var strFloat;
    var formatInt;
    var formatFloat;
    if(/\./g.test(pattern)){
        formatInt        = pattern.split('.')[0];
        formatFloat        = pattern.split('.')[1];
    }else{
        formatInt        = pattern;
        formatFloat        = null;
    }

    if(/\./g.test(str)){
        if(formatFloat!=null){
            var tempFloat    = Math.round(parseFloat('0.'+str.split('.')[1])*Math.pow(10,formatFloat.length))/Math.pow(10,formatFloat.length);
            strInt        = (Math.floor(number)+Math.floor(tempFloat)).toString();
            strFloat    = /\./g.test(tempFloat.toString())?tempFloat.toString().split('.')[1]:'0';
        }else{
            strInt        = Math.round(number).toString();
            strFloat    = '0';
        }
    }else{
        strInt        = str;
        strFloat    = '0';
    }
    if(formatInt!=null){
        var outputInt    = '';
        var zero        = formatInt.match(/0*$/)[0].length;
        var comma        = null;
        if(/,/g.test(formatInt)){
            comma        = formatInt.match(/,[^,]*/)[0].length-1;
        }
        var newReg        = new RegExp('(\\d{'+comma+'})','g');

        if(strInt.length<zero){
            outputInt        = new Array(zero+1).join('0')+strInt;
            outputInt        = outputInt.substr(outputInt.length-zero,zero)
        }else{
            outputInt        = strInt;
        }

        var
        outputInt            = outputInt.substr(0,outputInt.length%comma)+outputInt.substring(outputInt.length%comma).replace(newReg,(comma!=null?',':'')+'$1')
        outputInt            = outputInt.replace(/^,/,'');

        strInt    = outputInt;
    }

    if(formatFloat!=null){
        var outputFloat    = '';
        var zero        = formatFloat.match(/^0*/)[0].length;

        if(strFloat.length<zero){
            outputFloat        = strFloat+new Array(zero+1).join('0');
            //outputFloat        = outputFloat.substring(0,formatFloat.length);
            var outputFloat1    = outputFloat.substring(0,zero);
            var outputFloat2    = outputFloat.substring(zero,formatFloat.length);
            outputFloat        = outputFloat1+outputFloat2.replace(/0*$/,'');
        }else{
            outputFloat        = strFloat.substring(0,formatFloat.length);
        }

        strFloat    = outputFloat;
    }else{
        if(pattern!='' || (pattern=='' && strFloat=='0')){
            strFloat    = '';
        }
    }
	if(strInt+(strFloat==''?'':'.'+strFloat)=='0.00')
		return "-";
    return strInt+(strFloat==''?'':'.'+strFloat);
}

//校验Email
function checkEmail(email)
{
     if(email.indexOf("@")<0||email.indexOf(".")<0)
     {
         return false;
     }
    return true;
}

//校验手机号码
function checkMobile(mobile)
{
    if(mobile.length!=11)
    {
        return false;
    }

    if(!checkPInteger(mobile))
    {
        return false;
    }
    return true;
}

/**
 * 方法名:checkNumberPlus
 * 参数:str 要校检的字符串
 * 返回值:true or false
 * 方法说明:校检字符串,是不是全部是由数字组成
 * 调用示例如下:checkNumberPlus("232323")
 */
function checkNumberPlus(str) {
    var i;
    var len = str.length;
    var chkStr = "-1234567890.";
    if (len == 1) {
	if (chkStr.indexOf(str.charAt(i)) < 0) {
	    return false;
	}
    } else {
	if ((chkStr.indexOf(str.charAt(0)) < 0) || ((str.charAt(0) == "0")&&(str.charAt(1)!="."))) {
	    return false;
	}
	for (i = 1; i < len; i++) {
	  if (chkStr.indexOf(str.charAt(i)) < 0) {
		return false;
	  }
	}
    }
    return true;
}

/**
 * 方法名:checkInteger
 * 参数:str 要校检的字符串
 * 返回值:true or false
 * 方法说明:校验整数
 * 调用示例如下:checkInteger("2222");
 */
function checkInteger(str) {
    if(checkNumberPlus(str)) {
        return str.indexOf('.') < 0;
    }
	return false;
}

/**
 * 方法名:checkPInteger
 * 参数:str 要校检的字符串
 * 返回值:true or false
 * 方法说明:校验正整数
 * 调用示例如下:checkPInteger("2222")
 */
function checkPInteger(str) {
	if(checkInteger(str)) {
		return str.indexOf('-') < 0;
	}
	return false;
}

/**   *javascript读写Cookie函数    */ 

//获得Cookie解码后的值
function GetCookieVal(offset)
{
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
	endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

//设定Cookie值
function SetCookie(name, value)
{
	var expdate = new Date();
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	if(expires!=null) expdate.setTime(expdate.getTime() + ( expires * 1000 ));
	document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))
	+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))
	+((secure == true) ? "; secure" : "");
}

//删除Cookie
function DelCookie(name)
{
	var exp = new Date();
	exp.setTime (exp.getTime() - 1);
	var cval = GetCookie (name);
	document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString();
}

//获得Cookie的原始值
function GetCookie(name)
{
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen)
	{
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
		return GetCookieVal (j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}

