//ȫ�ֳ�������
/** GRID�Ǳ༭ģʽʱ����,�зָ��*/
var COL_SPLIT_FLAG = "\"\\,";
var ROW_SPLIT_FLAG = "\"\\;";
//var COL_SPLIT_FLAG = ",";
//var ROW_SPLIT_FLAG = ";";
var EQUAL_FLAG="<equal>";
eval("document.write('<script language=\"vbscript\" src=\"../../../../vbs/common.vbs\"></script>')");
//���ô洢���̺���
/*
��������execProc
������procName �洢������
            args ���ò���
����ֵ���ַ������ͣ��෵��ֵ�Զ��ŷָ������ó�������-1��

args��Ϊ�������ݣ��ֱ�Ϊ�������ֵ������������ͣ�����������͡�
���и������ݿ����ж��ֵ����ֵ֮���Զ��ţ�,���ָ������֮����ð�ŷָ:����
�����������ֻ��ȡ����ֵ��STRING��INT��LONG��DOUBLE��DATE��

����ʾ�����£�
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

//��ʽ���������.
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
//Ψһ��У�麯��
/*
��������isUnique
������tableName ����
            condition У������
����ֵ���ַ������ͣ�����0��ʾУ��ɹ��������ʾУ��ʧ�ܡ�������ó�������-1��

tableName ��������������ʹ��SQL�﷨���� AD_LOV_CODE a,AD_PROGRAM b
condition ����У��������ʹ��SQL�﷨���� ROW_ID=12345

����ʾ�����£�
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
//���ڸ����ֶ�����ƴSQL��䣬ר����isUnique(tableName,primaryKey,uniqueKey,condition)
function putUniqueSql(fieldCode,inputValue,fieldType,relation)
{
  	switch(fieldType){
  		case "1": return fieldCode+relation+"'"+inputValue+"'";break;
  		case "2": return fieldCode+relation+inputValue;break;
  		case "3": return to_char(fieldCode,'yyyy-mm-dd')+relation+"'"+inputValue+"'";break;
  	}
}
//Ψһ��У����չ
//primaryKey��primaryInputName+","+primaryFieldCode+","+primaryType
//uniqueKey��uniqueInputName+","+uniqueFieldCode+","+uniqueType+";"+....
//primaryType��uniqueType��1��string��2����ֵ��3�����ڣ�yyyy-mm-dd����
//condition������
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
//ִ�и��²���SQL����
/*
��������execUpdate
������sql SQL���

����ֵ���ַ������ͣ�����0��ʾִ�гɹ�������1��ʾִ��ʧ�ܡ�������ó�������-1��

sql Ҫִ�е�SQL,ֻ֧�ָ��²���SQL,�����ӡ�ɾ�����޸ģ�ʹ��SQL �﷨��


����ʾ�����£�
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
//���ҳ���Ƿ����ύ״̬
function validDocStatus()
{
  if(document.readyState=="loading")
  {
     alert("�������ڴ�����ȴ������������");
     return false;
  }
  return true;
}

//����Lookup IFRAME
function fhiddenifLookupTB()
{
  document.all.ifLookupTB.style.visibility = 'hidden';
  document.all.ifLookupTB.style.pixelTop = 1;
  document.all.ifLookupTB.style.pixelLeft = 1;
  document.all.ifLookupTB.style.pixelHeight = 1;
  document.all.ifLookupTB.style.pixelWidth = 1;
}

//����Lookup IFRAME�����ҳ��
function fhiddenParifLookupTB()
{
  parent.document.all.ifLookupTB.style.visibility = 'hidden';
  parent.document.all.ifLookupTB.style.pixelTop = 1;
  parent.document.all.ifLookupTB.style.pixelLeft = 1;
  parent.document.all.ifLookupTB.style.pixelHeight = 1;
  parent.document.all.ifLookupTB.style.pixelWidth = 1;
  parent.document.all.ifLookupTB.src='';
}
//��ʾLookup IFRAME
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
//����ListBox IFRAME
function fhiddenifListBox()
{
  document.all.ifListBox.style.visibility = 'hidden';
  document.all.ifListBox.style.pixelTop = 1;
  document.all.ifListBox.style.pixelLeft = 1;
  document.all.ifListBox.style.pixelHeight = 1;
  document.all.ifListBox.style.pixelWidth = 1;
}
//����ListBox IFRAME�����ҳ��
function fhiddenParifListBox()
{
  parent.document.all.ifListBox.style.visibility = 'hidden';
  parent.document.all.ifListBox.style.pixelTop = 1;
  parent.document.all.ifListBox.style.pixelLeft = 1;
  parent.document.all.ifListBox.style.pixelHeight = 1;
  parent.document.all.ifListBox.style.pixelWidth = 1;
  parent.document.all.ifListBox.src='';
}
//��ʾListBox IFRAME
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
  var msg="û�з�����Ϣ��";
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
            curtime=curmin+"��"+cursec+"�룡"
        else
            curtime=cursec+"�룡";
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

//��ʾһ�� obj:�ж���
function showRow(obj)
{
   obj.style.display = "";
   return true;
}
//����һ�� obj:�ж���
function hideRow(obj)
{
  obj.style.display = "none";
  return true;
}
//ȡ��ǰ�����ʾ������
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

//����ָ��sumColName��ֵ��setColName
// obj ��prefixǰ׺��nDec ��ʽ��С���� ����λ��
//����sumCol("dataTable","orderDetail","quantOrder","totQuantOrder",0)
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
//ָ�����λ��
// prefixǰ׺��idÿ���У� col����
//����setFocus("orderDetail",id,"quantOrder");
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
		 alert("ϵͳ��ѯʧ�ܣ�");
         return "";
	}
    return strRet;
}
//ȥ���ո�
String.prototype.trim = function()
{
    return this.replace(/(^[\s|��]*)|([\s|��]*$)/g, "");
}
//��ȡ�ַ���ǰ��Ŀ��ַ�

	//ȥ��ո�;
function ltrim(s){
 return s.replace( /^\s*/, "");
}
//ȥ�ҿո�;
function rtrim(s){
 return s.replace( /\s*$/, "");
}
//���ҿո�;
function trim(s){
 return rtrim(ltrim(s));
}
//��ȡ�ַ���ǰ��Ŀ��ַ��س����ͻ��з�
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

//�������
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

//�������
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

//���绰����
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

//У������
function checkInteger(str) {
    if(checkNumberPlus(str)) {
        return str.indexOf('.') < 0;
    }
	return false;
}
//У������
function checkPNumber(str) {
	if(checkNumberPlus(str)) {
		return str.indexOf('-') < 0;
	}
	return false;
}
//����У��ָ���������
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

//У��������
function checkPInteger(str) {
	if(checkInteger(str)) {
		return str.indexOf('-') < 0;
	}
	return false;
}

//�򿪴���
function openDialog(WINurl,WINwidth,WINheight,xyPosition)
{
 if(xyPosition==0)//��Ļ����
   {
    showx = (window.screen.availWidth  - WINwidth)/2;
    showy = (window.screen.availHeight - WINheight)/2;
   }
 else//�¼�����
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
//����������ڻ�ʱ��Ƚϣ�gujun2004��12��9�޸�
//date1��ʼ���ڡ�date2��ֹ����
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
//��ÿͻ���ϵͳ����
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
//��ȡ�ͻ���ϵͳʱ��
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


//���ָ�ʽ������
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


//���grid�е�radio��checkbox��ֵ�������radio�򷵻�һ���ַ����������checkbox�򷵻ض���ַ������м��ö��Ÿ�����
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

//��ñ�ѡ��radio��checkbox������,�����radio�򷵻�һ�������������checkbox�򷵻����������м��ö��Ÿ�����
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

//���ҳ���������ֵ��
function getObjValue(objName)
{
	var obj = eval("document.all('" + objName + "')");
        if(obj == null) return "null";
      	return obj.value.trim();
}

//���ҳ����id��innerHTMLֵ,���innerHTMLֵ�а���label��ȡlabel�е�innerHTMLֵ��
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

//���ҳ��table�б�ѡ�����б����ֶ�ֵ��ֵ������ǵ�ѡ�򷵻�һ���ַ���������Ƕ�ѡ�򷵻ض���ַ������м��ö��Ÿ�������
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

//���ҳ����select�������ʾֵ��
function getSelectObjName(objName)
{
	var obj = eval("document.all('" + objName + "')");
      	var selfSelectedIndex = obj.selectedIndex;
      	selectObjName = obj[selfSelectedIndex].innerHTML;
      	if(selectObjName == "��ѡ��"){
                selectObjName = "&nbsp;";
      	}
      	return selectObjName;
}

//���ҳ������������ͣ�
function getObjType(objName)
{
	var obj = eval("document.all('" + objName + "')");
      	return obj.type;
}

//���ҳ�����������ʾֵ��ĿǰרΪ��������޸ģ�
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

//����ҳ���������ֵ��
function setObjValue(objName,objNameValue)
{
	var obj = eval("document.all('" + objName + "')");
	if(!(typeof(obj)=="object"))return '';
	obj.value = objNameValue;
}

//ʹ��grid�е�radio������ѡ�У�
function setNoChecked(objName)
{
  var objChk
  for(var i=0;i<getElementLen(objName);i++)
  {
          objChk=getObj(objName,i);
          objChk.checked = false;
  }
}


//���ѡ�ж����postֵ
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


//����ѡ�еļ�¼ɾ����
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

//���ػ���ʾ���
function grid_displayTab(obj,ctx) {
	var displayType = "";
	if(document.all.showtable.value.length>0){
		displayType = "none";
		document.all.push_up.src = ctx+"/images/push_down_c1.gif";
		document.all.push_up_td.title = "չ��";
		document.all.queryPanelTable.style.display = displayType;
		document.all.showtable.value='';
	}else {
		displayType = "";
		document.all.push_up.src = ctx+"/images/push_up_c1.gif";
		document.all.push_up_td.title = "�۵�";
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


//GRID�����չ�۵�
function grid_display(obj) {
	var gridExpandFlag = getObjValue("gridExpandFlag");
	var displayType = "";
	if (gridExpandFlag == "1") {
		displayType = "none";
		setObjValue("gridExpandFlag","0");
		obj.src = ctx + "/images/expand_arrow.jpg";
		obj.alt = "չ��";
		window.lcfGridTable.style.display = displayType;
	}else {
		displayType = "";
		setObjValue("gridExpandFlag","1");
		obj.src = ctx + "/images/pucker_arrow.jpg";
		obj.alt = "�۵�";
		window.lcfGridTable.style.display = displayType;
	}

}

//��GRID�����չ�۵�
function mult_grid_display(obj) {
	var multGridExpandFlag = getObjValue("multGridExpandFlag");
	var displayType = "";
	if (multGridExpandFlag == "1") {
		displayType = "none";
		setObjValue("multGridExpandFlag","0");
		obj.src = ctx + "/images/expand_arrow.jpg";
		obj.alt = "չ��";
		window.multGridTable.style.display = displayType;
	}else {
		displayType = "";
		setObjValue("multGridExpandFlag","1");
		obj.src = ctx + "/images/pucker_arrow.jpg";
		obj.alt = "�۵�";
		window.multGridTable.style.display = displayType;
	}

}


//�������չ�۵�
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
          obj.alt = "չ��";
        }
        else{
          displayType = "";
          setObjValue(lineName + "_flag","1")
          obj.src =ctx + "/images/pucker_arrow.jpg";
          obj.alt = "�۵�";
        }
        for(var i=parseInt(begin_tr);i<parseInt(end_tr);i++){
        	 window.table_form.rows(i).style.display = displayType;
        }
}


//ȫ�������չ
function pannel_Expand_all() {
  if(document.all.panel_display_all_img != undefined) {
    pannel_Expand_all_has_allExpandButton();
  }
  if(document.all.gridImg != undefined) {
    window.lcfGridTable.style.display = "";
  }

}
//ȫ�������չ��ȫչ��ťʱ
function pannel_Expand_all_has_allExpandButton() {
        var obj = document.all.panel_display_all_img;
	var allPannelRows = getObjValue("allPannelRows");
        var allPannelRows_flag = getObjValue("allPannelRows_flag");
        var allPannelRowsArray = allPannelRows.split(";");
        displayType = "";
        setObjValue("allPannelRows_flag","1");
        obj.src =ctx + "/images/all_pucker_arrow.jpg";
        obj.alt = "ȫ���۵�";
        for(var i=1;i<allPannelRowsArray.length;i++){
         	var lineName = allPannelRowsArray[i].split(",")[0];
            	var begin_tr = allPannelRowsArray[i].split(",")[1];
               	var end_tr = allPannelRowsArray[i].split(",")[2];
                eval("document.all." + lineName + "_img").src = ctx + "/images/pucker_arrow.jpg";
                eval("document.all." + lineName + "_img").alt = "�۵�";
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
          document.all.gridImg.alt = "�۵�";
	  window.lcfGridTable.style.display = displayType;

        }
        var multGridExpandFlag = getObjValue("multGridExpandFlag");
        if (multGridExpandFlag == "null") {
        }else {

          displayType = "";
	  setObjValue("multGridExpandFlag","1");
	  document.all.multGridImg.src = ctx + "/images/pucker_arrow.jpg";
	  document.all.multGridImg.alt = "�۵�";
	  window.multGridTable.style.display = displayType;
          }

}

//ȫ�������չ�۵�
function pannel_display_all(obj){
	var allPannelRows = getObjValue("allPannelRows");
        var allPannelRows_flag = getObjValue("allPannelRows_flag");
        var allPannelRowsArray = allPannelRows.split(";");

        if(allPannelRows_flag == "1"){
          displayType = "none";
          setObjValue("allPannelRows_flag","0");
          obj.src =ctx + "/images/all_expand_arrow.jpg";
          obj.alt = "ȫ��չ��";
        }
        else{
          displayType = "";
          setObjValue("allPannelRows_flag","1");
          obj.src =ctx + "/images/all_pucker_arrow.jpg";
          obj.alt = "ȫ���۵�";
        }
        for(var i=1;i<allPannelRowsArray.length;i++){
          	var lineName = allPannelRowsArray[i].split(",")[0];
            	var begin_tr = allPannelRowsArray[i].split(",")[1];
               	var end_tr = allPannelRowsArray[i].split(",")[2];

		if(allPannelRows_flag == "1"){
                  	eval("document.all." + lineName + "_img").src = ctx + "/images/expand_arrow.jpg";
                      	eval("document.all." + lineName + "_img").alt = "չ��";
                      	setObjValue(lineName + "_flag","0");
		}
                else{
                  	eval("document.all." + lineName + "_img").src = ctx + "/images/pucker_arrow.jpg";
                      	eval("document.all." + lineName + "_img").alt = "�۵�";
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
			document.all.gridImg.alt = "չ��";
			window.lcfGridTable.style.display = displayType;
        	}else {
        		displayType = "";
			setObjValue("gridExpandFlag","1");
			document.all.gridImg.src = ctx + "/images/pucker_arrow.jpg";
			document.all.gridImg.alt = "�۵�";
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
			document.all.multGridImg.alt = "չ��";
			window.multGridTable.style.display = displayType;
        	}else {
        		displayType = "";
			setObjValue("multGridExpandFlag","1");
			document.all.multGridImg.src = ctx + "/images/pucker_arrow.jpg";
			document.all.multGridImg.alt = "�۵�";
			window.multGridTable.style.display = displayType;
        	}
        }
}

/**
* Ψһ��У��
* para:code		���룬���ݿ���ֶ���
* para:value		ֵ����ҪУ���ֵ
* para:tableName	����
* para:condition	��У��Ĳ�ѯ����
* para:action		��ǰ�������ͣ���edit��,"add"��
* para:id		������޸ĵ�ʱ������Ҫ�������ֵ
* para:ctx		�����ĸ�
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
//�����ַ����û�
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
//�õ�From������Ԫ�ص�NAME��ֵ�������GET������Ҫ���[name]=[value]&...[name]=[value]��
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

//���������������ΪNumber
function onlyNumber(obj){
	var checkStr = obj.value;

        if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13) || (window.event.keyCode == 46)|| (window.event.keyCode == 45)))
   	{
     		window.event.keyCode = 0 ;
                return false;
    	}

  	if(window.event!=null){
      		//��һλ����������С���㡰.��
      		if(checkStr == null || checkStr=="" ){
                	if(window.event.keyCode == 46)
                        	window.event.keyCode = 0 ;
                }
                //�����һλ�Ǹ��ţ��ڶ�λ��ֹ���롰.��
                if(checkStr=="-"){
                        if(window.event.keyCode == 46)
                                window.event.keyCode = 0 ;
                }
                //�����һλ���븺�ţ�����λ���������븺�š�-��
                if(checkStr.indexOf("-")>-1 || checkStr.length>1){
                        if(window.event.keyCode == 45)
                                window.event.keyCode = 0 ;
                }
                //����Ѿ����롰.����������λ���������롰.��
                if(checkStr.indexOf(".")>-1){
                        if(window.event.keyCode == 46)
                                window.event.keyCode = 0 ;
                }
  	}
    	return true;
}

//�ж��ַ��Ƿ����-1234567890.֮��
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


//У���Ƿ��ǺϷ�������
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
  //����Ϊһ�����,��һ���ַ�����Ϊ.�Ż���-��
  if(len == 1) {
    if( m==0 || i == 0) {
      alert("��һ���ַ�����Ϊ.�Ż���-��!!!");
      return false;
    }
  }
  if(isInNumber(str) == false) {
    alert("�Ƿ��ַ�!!!");
    return false;
  }
  //�жϸ���
  if(i > -1) {
    if(i != 0) {
      alert("-��һ��Ҫ�ǵ�һ���ַ�!!!");
      return false;
    }
    j = str.lastIndexOf("-");
    if(j != i) {
      alert("-�Ų��ܶ���һ��!!!");
      return false;
    }
    isHasSubtractSign = true;
  }
  //�жϵ��
  if(m > -1) {
    if (m == 0 || m == (len-1)) {
      alert(".�Ų����ǵ�һ���������һ��!!!");
      return false;
    }
    n = str.lastIndexOf(".");
    if(m != n) {
      alert(".�Ų��ܶ���һ��!!! ");
      return false;
    }
    if(isHasSubtractSign == true) {
      if(m == 1) {
        alert(".�Ų����ǵڶ���!!!");
        return false;
      }
    }
  }
  return true;
}


//У�������������Ϊ�Ϸ���Number
function validNumber(obj,colSize,precision){
   return true;
	var checkStr = obj.value;
        if(checkNumber(checkStr) == false) {
          obj.focus();
          return false;
        }
        colSize = parseInt(colSize);
        precision = parseInt(precision);
        var m = checkStr.length;                      //����ֵ��λ��
        var n = checkStr.indexOf(".");                //��.����λ��
        var k = checkStr.indexOf("-");                //��-����λ��
        var j;                                        //��������
        var i;                                        //С������

	//�������ֵ�к��С�.������ȡ����ֵ���������ȣ�
 	if(n > -1){
           	//�������ֵ�к��С�����
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
           	//�������ֵ�к��С�����
           	if(k > -1){
  			j = m - 1;
           	}
                else{
                  	j = m;
                }
                i = 0;
 	}
      	//��������ֵ���������Ⱥ�С������
      	if((j > colSize - precision) || (i > precision)){
                alert(checkStr + "�ľ��Ȳ�����Ҫ����������С�ڵ���" + (colSize - precision) + "��С������С�ڵ���" + precision + "��");
                obj.focus();
                return false
      	}
        return true;
}
//���������������Ϊ����
function onlyCalendar(obj){
	var checkStr = obj.value;
      	var m =  checkStr.length;

        if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 13) || (window.event.keyCode == 45)))
   	{
     		window.event.keyCode = 0 ;
                return false;
    	}

  	if(window.event!=null){
              	//����ַ�����δ�ﵽ��λ��7λ���������롰-������֮��������롰-��
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
//У�������������Ϊ�Ϸ�������
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
                        	alert(checkStr + "�ĸ�ʽ������Ҫ���·���1-12֮�䣡");
                              	obj.focus();
                        	return false;
                        }
                        if(day > 31 || day ==0){
                        	alert(checkStr + "�ĸ�ʽ������Ҫ������1-31֮�䣡");
                              	obj.focus();
                        	return false;
                        }
                        else if((month == 2 || month == 4 || month ==6 || month ==9 || month ==11) && day == 31){
                          	alert(checkStr + "�ĸ�ʽ������" + month + "����31�գ�");
                              	obj.focus();
                        	return false;
                        }
                        else if(month == 2  && day == 30){
                          	alert(checkStr + "�ĸ�ʽ������"+year+"��" +month+"����30�գ�");
                              	obj.focus();
                        	return false;
                        }
                        else if((year%100==0)&&(year%400!=0) && month == 2  && day == 29){
                          	alert(checkStr + "�ĸ�ʽ������"+year+"��" +month+"����29�գ�");
                              	obj.focus();
                        	return false;
                        }
                        else if((year%4)!=0 && month == 2  && day == 29){
                          	alert(checkStr + "�ĸ�ʽ������"+year+"��" +month+"����29�գ�");
                              	obj.focus();
                        	return false;
                        }
          	}
              	else{
                 	alert(checkStr + "�ĸ�ʽ������Ҫ��YYYY-MM-DD��");
                      	obj.focus();
                        return false;
              	}
        }
        return true;
}
//У��Time�����е����������������Ϊ�Ϸ������ڣ������������ֶε�ֵ��
function validTimeDate(obj){
  	var hidden_name = obj.name.substr(0,obj.name.indexOf("_date"));     //��ȡ�����ֶε�����
      	var checkStr = obj.value;                                           //���������ֵ
      	var hms_value = getObjValue(hidden_name + "_hms")                   //ʱ�������ֵ

      	//���������������ݺϷ���Ȼ���ж����������������Ƿ�Ϊ�գ�Ȼ�����ж�ʱ�������������Ƿ�Ϊ�գ�
  	if(validCalendar(obj)){
            	//�����������ֵ��Ϊ�ղ���ʱ�������ֵ��Ϊ�գ����������ֶε�ֵ�������������ֶε�ֵΪ��ֵ��
        	if(!(checkStr == null || checkStr == "" ) && !(hms_value == null || hms_value=="" )){
                	getWholeTime(hidden_name);
        	}
              	else{
                        setObjValue(hidden_name,"");
              	}
  	}
        return true;
}
//����Time�����е�ʱ�������������Ϊʱ�䣻
function onlyTime(obj){
	var checkStr = obj.value;
      	var m =  checkStr.length;

        if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57)) || (window.event.keyCode == 13) || (window.event.keyCode == 58)))
   	{
     		window.event.keyCode = 0 ;
                return false;
    	}

  	if(window.event!=null){
              	//����ַ�����δ�ﵽ2��5λ���������롰:������֮��������롰:��
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
//У��Time�����е�ʱ���������������Ϊ�Ϸ���ʱ���룻
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
                        	alert(checkStr + "�ĸ�ʽ������Ҫ��Сʱ��00-23֮�䣡");
                              	obj.focus();
                        	return false;
                        }
                        if(minute > 59){
                        	alert(checkStr + "�ĸ�ʽ������Ҫ�������00-59֮�䣡");
                              	obj.focus();
                        	return false;
                        }
                        if(second > 59){
                        	alert(checkStr + "�ĸ�ʽ������Ҫ������00-59֮�䣡");
                              	obj.focus();
                        	return false;
                        }
          	}
              	else{
                 	alert(checkStr + "�ĸ�ʽ������Ҫ��HH:MI:SS��");
                      	obj.focus();
                        return false;
              	}
        }
        return true;
}
//У��Time�����е�ʱ���������������Ϊ�Ϸ���ʱ���룬�����������ֶε�ֵ��
function validTime(obj){
  	var hidden_name = obj.name.substr(0,obj.name.indexOf("_hms"));      //��ȡ�����ֶε�����
      	var checkStr = obj.value;                                           //ʱ�������ֵ
      	var date_value = getObjValue(hidden_name + "_date")                 //���������ֵ

      	//���ʱ������������ݺϷ���Ȼ���ж�ʱ���������������Ƿ�Ϊ�գ�Ȼ�����ж����������������Ƿ�Ϊ�գ�
  	if(validHMS(obj)){
            	//���ʱ��������ֵ��Ϊ�ղ������ڵ�����ֵ��Ϊ�գ����������ֶε�ֵ�������������ֶε�ֵΪ��ֵ��
        	if(!(checkStr == null || checkStr == "" ) && !(date_value == null || date_value=="" )){
                	getWholeTime(hidden_name);
        	}
              	else{
                        setObjValue(hidden_name,"");
              	}
  	}
        return true;
}
//��������ť���������ڴ��ݲ�������ģ̬���ڣ�
function affixmanage(){
  	//�ж��Ƿ�ѡ�м�¼��
  	if(hasSelectedRecord('chk'))
    	{
              	//��ȡ���������ֶε�ֵ��
              	main_table_code = getObjValue("main_table_code");
              	//��ȡѡ�м�¼��row_idֵ��
		record_id = getCheckedValue('chk');
  		str = "table_code=" + main_table_code + "&record_id=" + record_id
              	//�򿪸��������ģ̬���ڣ�
              	window.showModalDialog('../../../../lightclient/services/filemgr/FilemanagerList.do?'+str,self,'help:no;status:no;dialogWidth:' + (availWidthScreen-availWidthScreenDifference)
    		+'px;dialogHeight:' + (availHeightScreen-availHeightScreenDifference) + 'px;');
    	}
    	else{
        	alert("��ѡ���¼��");
    	}
}
//��ָ���ؼ��ý��㣻
function setInputFocus(objName){
  	var obj = eval("document.all('" + objName + "')");
        if(obj.style.display == "none") {
        }else {
          obj.focus();
        }

}

//���ƿؼ����ַ����ĳ���  ��Ҫ���õĿؼ�������onpropertychange,ʹ���ڿ��Ƹ����ı��༭�ؼ����ַ�������
function textLengthControl(obj,len)
{
    if(obj.value.length>len)
    {
        alert("��¼������ݳ����˸��ֶε��޶�����!");
        obj.value=obj.value.substring(0,len);
    }
}

//�ж�form���ı��ؼ��Ƿ�������������
function validFormText(name,isMustInput) {
  //��ȡ��������ı��ؼ�������ֵ
  TextValue = getObjValue(name);
  //�������ֵ�ؼ�����
  if(isMustInput == "false") {
    return true;
  }
  if(isMustInput == "true" && TextValue==""){
     	alert("������ֵ��");
        setInputFocus(name);
        return false;
  }
  return true;
}

//�ж�grid���ı��ؼ��Ƿ��������õı��������
function validGridText(name,isMustInput){
	var objTable = eval("dataTable");
	var strTableTotalRows = objTable.rows.length;    //��ȡobjTable������

        //ѭ���жϣ��������ʾ���Ͳ���Ϊ��none���������validFromText������
	for (var i = 1;i < strTableTotalRows;i++) {
		if(objTable.rows(i).style.display != "none") {
                	if(!validFormText("DATA[" + (i-1) + "]." + name,isMustInput)){
                          	return false;
                	}
		}
	}
	return true;
}
//�ж�form����ֵ�ؼ��Ƿ��������õ����ֵ����Сֵ�ͱ��������
function validFormNumber(name,maxValue,minValue,isMustInput){
  	//��ȡ��������ֵ������ֵ��
  	numberValue = parseFloat(getObjValue(name));
      	maxValue = parseFloat(maxValue);
      	minValue = parseFloat(minValue);

      	//�������ֵ�ؼ�����
      	if(isMustInput == "true" && isNaN(numberValue)){
        	alert("������ֵ��");
              	setInputFocus(name);
              	return false;
      	}
      	else if(!isNaN(numberValue)){
         	if(!isNaN(maxValue) && numberValue > maxValue){
                	alert("�������ֵ����������������ֵ��");
              		setInputFocus(name);
                      	return false;
         	}
              	if(!isNaN(minValue) && numberValue < minValue){
                	alert("�������ֵС�������������Сֵ��");
              		setInputFocus(name);
                      	return false;
         	}
      	}
      	return true;
}
//�ж�grid����ֵ�ؼ��Ƿ��������õ����ֵ����Сֵ�ͱ��������
function validGridNumber(name,maxValue,minValue,isMustInput){
	var objTable = eval("dataTable");
	var strTableTotalRows = objTable.rows.length;    //��ȡobjTable������

        //ѭ���жϣ��������ʾ���Ͳ���Ϊ��none���������validFormNumber������
	for (var i = 1;i < strTableTotalRows;i++) {
		if(objTable.rows(i).style.display != "none") {
                	if(!validFormNumber("DATA[" + (i-1) + "]." + name,maxValue,minValue,isMustInput)){
                		return false;
                        }
		}
	}
	return true;
}
//�ж�form�����ڿؼ��Ƿ��������õ����ֵ����Сֵ�ͱ��������
function validFormDate(name,maxValue,minValue,isMustInput){
	//��ȡ�����������ڵ�����ֵ��
  	dateValue = getObjValue(name);

      	//��������ڿؼ�����
      	if(isMustInput == "true" && dateValue ==""){
        	alert("���������ڣ�");
              	setInputFocus(name);
              	return false;
      	}
      	else if(dateValue !=""){
         	if(maxValue !="" && dateValue > maxValue){
                	alert("����������ڴ������������������ڣ�");
              		setInputFocus(name);
                      	return false;
         	}
              	if(minValue !="" && dateValue < minValue){
                	alert("�����������С�������������С���ڣ�");
              		setInputFocus(name);
                      	return false;
         	}
      	}
      	return true;
}
//�ж�grid�����ڿؼ��Ƿ��������õ����ֵ����Сֵ�ͱ��������
function validGridDate(name,maxValue,minValue,isMustInput){
	var objTable = eval("dataTable");
	var strTableTotalRows = objTable.rows.length;    //��ȡobjTable������

        //ѭ���жϣ��������ʾ���Ͳ���Ϊ��none���������validFormDate������
	for (var i = 1;i < strTableTotalRows;i++) {
		if(objTable.rows(i).style.display != "none") {
                	if(!validFormDate("DATA[" + (i-1) + "]." + name,maxValue,minValue,isMustInput)){
                          	return false;
                	}
		}
	}
	return true;
}
//�ж�form��ʱ��ؼ��Ƿ��������õ����ֵ����Сֵ�ͱ��������
function validFormTime(name,maxValue,minValue,isMustInput){
	//��ȡ��������ʱ�������ֵ��
  	timeValue = getObjValue(name);

      	//��������ڿؼ�����
      	if(isMustInput == "true" && timeValue ==""){
        	alert("������ʱ�䣡");
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
                	alert("�������ʱ�����������������ʱ�䣡");
              		setInputFocus(name);
                      	return false;
         	}
              	if(minValue != "" && timeValue < minValue){
                	alert("�������ʱ��С�������������Сʱ�䣡");
              		setInputFocus(name);
                      	return false;
         	}
      	}
      	return true;
}
//�ж�grid��ʱ��ؼ��Ƿ��������õ����ֵ����Сֵ�ͱ��������
function validGridTime(name,maxValue,minValue,isMustInput){
	var objTable = eval("dataTable");
	var strTableTotalRows = objTable.rows.length;    //��ȡobjTable������

        //ѭ���жϣ��������ʾ���Ͳ���Ϊ��none���������validFormTime������
	for (var i = 1;i < strTableTotalRows;i++) {
		if(objTable.rows(i).style.display != "none") {
                	if(!validFormTime("DATA[" + (i-1) + "]." + name,maxValue,minValue,isMustInput)){
                          	return false;
                	}
		}
	}
	return true;
}
//���ڶ��ƵĶ�tab��ϸ֮����л���
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

//������ƶ���ĳһ��ʱ���ı���һ�����е�Ԫ�صı���ɫ
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

//������뿪ĳһ��ʱ���ָ���һ�����е�Ԫ�صı���ɫ
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


//��GRID����ҳ������
function sortGrid(obj,fName,mode) {
   var objGridTable = document.all.dataTable;
   var objAllRows = objGridTable.rows;
   if(obj.alt=='����') {
     for(var i = 1; i < objGridTable.rows.length;i++) {
       for(var j = 1; j < objGridTable.rows.length-i; j++) {
     	 if(getGridCompareValue(objAllRows,j,fName,mode) > getGridCompareValue(objAllRows,j+1,fName,mode)) {
     	   objGridTable.moveRow(j,j+1);
     	 }
        }
     }
     obj.alt="����";
     obj.src=ctx + "/images/sortDown.gif";
   }else if(obj.alt=='����') {
     for(var i = 1; i < objGridTable.rows.length;i++) {
       for(var j = 1; j < objGridTable.rows.length-i; j++) {
         if(getGridCompareValue(objAllRows,j,fName,mode) < getGridCompareValue(objAllRows,j+1,fName,mode)) {
           objGridTable.moveRow(j,j+1);
     	  }
       }
      }
      obj.alt="����";
      obj.src=ctx + "/images/sortUp.gif";
   }
}

//��GRID����ҳ������ʱ,ȡ�Ƚϵ��ֶ�ֵ
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
//ȫѡorderAmount�ֶ�����
{
          obj.select();
}

//add by zhangmin��
//��һ���ַ�����ʽ������ת��Ϊ������ʽ��
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
//��ȡ��Ŀ���ͽṹ����ֵ
/*
��������getTreeInfo
������companyId ��˾���
            fiscalYear ������
            element_id code��id��ҳ��ؼ�����
            element_name ��Ŀ���Ƶ�ҳ��ؼ�����
            returnType  ����ֵ����    1 id  2  name 3 code  4 id+name  5 code+name   6 ֻ��ĩ����Ŀ����
             isMultiTree ���ͽṹ y ��ѡ n ��ѡ    Ĭ��Ϊ��ѡ
             fiscalYearElement ���fiscalYear��Ҫ��ǰ̨���Ƶ����������ҳ��ؼ�����
             filter  �������� ������ȡ�û�ƿ�Ŀ������
*/
function getTreeInfo(contextName,companyId,fiscalYear,element_id,element_name,returnType,isMultiTree,fiscalYearElement,filter) {
      var returnValue ='';
      if(fiscalYear==''){
           fiscalYear = document.getElementById(fiscalYearElement).value;
      }
      //��ѡ��
     if(isMultiTree == 'y'){
          returnValue =  window.showModalDialog(contextName+"/o2d/util/tree/MultiTreeFrame.jsp?fiscalYear="+fiscalYear+"&companyId="+companyId+"&filter="+filter,returnType,"status=0"); //status��0��������ȥ���߿�
     }
     //��ѡ��
     else{

         if(filter==null){
            filter = "";
         }
         returnValue =  window.showModalDialog(contextName+"/o2d/util/tree/RadioTreeFrame.jsp?fiscalYear="+fiscalYear+"&companyId="+companyId+"&filter="+filter,returnType,"status=0");
     }
     //����ֵΪ��
     if(returnValue==null) returnValue='';
     //����ֵ��Ŀid code
     if(returnType == 1||returnType ==3|| returnType ==6){
          document.getElementById(element_id).value = returnValue;
     }
     //����ֵ��Ŀ����
     if(returnType == 2){
     alert(returnValue);
          document.getElementById(element_name).value = returnValue;
     }
     //����ֵ4: id��name,5: code+name
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
//��ȡ�������Ŀ���ͽṹ����ֵ
/*
��������getControlAreaTreeInfo
������  controlAreaId ������ id
             companyId ��˾���
             fiscalYear ������
             includeSelf_YN �Ƿ��������
            element_id code��id��ҳ��ؼ�����
            element_name ��Ŀ���Ƶ�ҳ��ؼ�����
            returnType  ����ֵ����    1 id  2  name 3 code  4 id+name  5 code+name   7  id +code
            isMultiTree ���ͽṹ y ��ѡ n ��ѡ    Ĭ��Ϊ��ѡ
            fiscalYearElement ���fiscalYear��Ҫ��ǰ̨���Ƶ����������ҳ��ؼ�����
            filter  �������� ������ȡ�û�ƿ�Ŀ������
*/
function getControlAreaTreeInfo(contextName,controlAreaId,companyId,fiscalYear,includeSelf_YN,element_id,element_name,returnType,isMultiTree,fiscalYearElement){
      var returnValue ='';
      if(fiscalYear==''){
           fiscalYear = document.getElementById(fiscalYearElement).value;
      }
      //��ѡ��
     if(isMultiTree == 'y'){
          returnValue =  window.showModalDialog(contextName+"/o2d/util/tree/ControlAreaMultiTreeFrame.jsp?fiscalYear="+fiscalYear+"&companyId="+companyId+"&controlAreaId="+controlAreaId+"&includeSelf_YN="+includeSelf_YN,returnType,"status=0"); //status��0��������ȥ���߿�
     }
     //��ѡ��
     else{
         returnValue =  window.showModalDialog(contextName+"/o2d/util/tree/ControlAreaTreeFrame.jsp?fiscalYear="+fiscalYear+"&companyId="+companyId+"&controlAreaId="+controlAreaId+"&includeSelf_YN="+includeSelf_YN,returnType,"status=0"); //status��0��������ȥ���߿�
     }
     //����ֵΪ��
     if(returnValue==null) returnValue='';
     //����ֵ��Ŀid code
     if(returnType == 1||returnType ==3){
          document.getElementById(element_id).value = returnValue;
     }
     //����ֵ��Ŀ����
     if(returnType == 2){
     alert(returnValue);
          document.getElementById(element_name).value = returnValue;
     }
     //����ֵ4: id��name,5: code+name;6:id+code
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
//ֻ������text����������ĸ������
function ValidInput(){
    if((event.keyCode>=32&&event.keyCode<48)||(event.keyCode>57&&event.keyCode<65)||(event.keyCode>90&&event.keyCode<97)||(event.keyCode>122&&event.keyCode<127))
    {
        event.returnValue =false;
    }
}
//add by jialiang
//�����������ͽṹ
/*
��������getLookupTree
������
     tagType ��ѯ����Ϣʱselect����Ҫ���ֶ�����,ǰ�ĸ�������id,name.parentId,findId
                    �����Ƿ���ֵ����������ӵ��Ǳ����arrayPagePara��Ӧ,������ʽΪ
     arrayPagePara ��������Ϣ��ҳ��ؼ�����,��arrayTreePara��Ӧ,������ʽ a@b@c
     treeType      ��������,һ�㲻��Ҫ
*/
function getLookupTree(contextPath,tagType,condition,arrayPagePara,treeType)
{
     var returnValue = "";
     returnValue =  window.showModalDialog(contextPath+"/o2d/util/tree/LookUpTreeFrame.jsp?tagType="+tagType+"&condition="+condition+"&treeType="+treeType,"status=0"); //status��0��������ȥ���߿�
     var arrayPage =  arrayPagePara.split('@');
     var arrayReturnValue = returnValue.split('@');
     for(var count = 0;count<arrayReturnValue.length;count++){
       document.getElementById(arrayPage[count]).value = arrayReturnValue[count];
     }
}
/**
*add by jialiang
*��ѡ�������ͽṹ�ؼ�ǰ̨ʵ��
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
            //modify by jialiang at 2006-06-27  ��� ��onchangeWhere��������ֵΪ"-1"ʱonclickʧЧ����
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
        //ѭ��ÿ��ȡarrayPage��column��arrayReturnValue�е�column�Ƚ������ͬ���arrayReturnValue��
        //column��Ӧ��ֵ������arrayPage��pageElementΪ���ֵ�ҳ��Ԫ����
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
*��ѡ�������ͽṹ�ؼ�ǰ̨ʵ��
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
           //modify by jialiang at 2006-06-27  ��� ��onchangeWhere��������ֵΪ"-1"ʱonclickʧЧ����
           var clickValue = eval(changeWhereValue+"()");
           if(clickValue=='-1'){
                return false;
           }
           urlStr += "&onChangeWhereValue="+clickValue;
	    }
	}
    var retval = window.showModalDialog(urlStr,args,"dialogWidth:"+width+"px; dialogHeight:"+height+"px; dialogLeft:"+showx+"px; dialogTop:"+showy+"px; status:no; directories:yes;scrollbars:no;Resizable=no;help=no;");
    if(retval!=null&&retval!=''){
        //arrayPageΪҳ��Ԫ����������column@pageElement
        var arrayPage = returnRelation.split('@');
        //arrayReturnValueΪ����ֵ����
        var arrayReturnValue = retval.split('@');
        //�������Ԫ��
        for(var k = 0;k<=arrayPage.length-2;k=k+2){
            document.getElementById(arrayPage[k+1]).value = "";
        }
        //ѭ��ÿ��ȡarrayPage��column��arrayReturnValue�е�column�Ƚ������ͬ���arrayReturnValue��
        //column��Ӧ��ֵ������arrayPage��pageElementΪ���ֵ�ҳ��Ԫ����
        for(var k = 0;k<=arrayPage.length-2;k=k+2){
            for(var count = 0;count<=arrayReturnValue.length-2;count=count+2){
                if(arrayPage[k]==arrayReturnValue[count]){
                    //��һ�η�ֵʱҳ��Ԫ��Ϊ��
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
//У���Ƿ�����ȷ�����ڸ�ʽ
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
//У������
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
//��֤ҳ�������
//msgΪ������� elementΪҳ��Ԫ������
function checkValidate(msg,element)
{
    if(document.getElementById(element).value==null||document.getElementById(element).value=='')
    {
        alert('������'+msg) ;
        return false;
    }
}
//��ѯ�����������ܺ�������add by liuxiaoyan
function query_panel_display(obj) {
	var displayType = "";
	//var src=obj.src;
	//var prefix=src.substring(0,src.indexOf("query"));
	if(document.all.showtable.value.length>0){
		displayType = "none";
		//document.all.push_up.src = prefix+"query_down_arrowhead2.gif";
		//document.all.push_up.alt = "չ��";
		document.all.queryPanelTable.style.display = displayType;
		document.all.showtable.value='';
	}else {
		displayType = "";
		//document.all.push_up.src =prefix+"query_up_arrowhead2.gif";
		//document.all.push_up.alt = "�۵�";
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
		document.all.push_up_td.title = "չ��";
		document.all.queryPanelTable.style.display = displayType;
		document.all.showtable.value='';
	}else {
		displayType = "";
		document.all.push_up.src = ctx+"/images/push_up_c1.gif";
		document.all.push_up_td.title = "�۵�";
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

//����ȷ�϶Ի���,businessNameΪ�������֣����ʲ���Ƭ��ƾ֤��¼��confirmNameΪִ�еĶ�������ɾ�������ˣ����ˣ�
function MPC_confirm(businessName,confirmName){

  return window.confirm("�Ƿ�ȷ��"+confirmName+"ѡ�е�"+businessName+"��");

}

//������onblur�¼�ʱ,�����ı����е��ַ�����
function objCheckLen(obj,maxLength){
  var len = strLength(obj.value);
  if(len > maxLength){
  	alert("����ӦС���������󳤶�" + maxLength);
    obj.focus();
    obj.select();
  }
}
//�����ڱ���ʱ,�����ı����е��ַ�����
function objCheckLen(obj){
  var len = strLength(obj.value);
  var maxLength = obj.maxLength;
  if(len > maxLength){
    return false;
  }
  return true;
}
/**
 * �õ�һ���ַ����ĳ���,��ʾ�ĳ���,һ�����ֻ��պ��ĳ���Ϊ2,Ӣ���ַ�����Ϊ1
 * @param String s ,��Ҫ�õ����ȵ��ַ���
 * @return int, �õ����ַ�������
 * @author:�²�
 * @�������:2005.06.09
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
 * ��֤text��textarea�ĳ����Ƿ���ȷ
 * @�������:2005.06.09
 */
function validateData(){
    var checks = self.document.forms[0];
    for(var i=0;i< checks.elements.length;i++){
        if(checks.elements[i].type=="text") {
            var len = strLength(checks.elements[i].value);
            var maxLength = checks.elements[i].maxLength;
            if(len > maxLength){
                alert("����ӦС���������󳤶�" + maxLength+"���ַ�!");
                checks.elements[i].focus();
                checks.elements[i].select();
                return false;
            }
        }
        if(checks.elements[i].tagName=="TEXTAREA"){
            var len = strLength(checks.elements[i].value);
            var maxLength = document.getElementById(checks.elements[i].name+"_maxLength").value;
            if(len > maxLength)  {
                alert("����ӦС���������󳤶�" + maxLength+"���ַ�!");
                checks.elements[i].focus();
                checks.elements[i].select();
                return false;
            }
        }
    }
    return true;
}
//�س�ʱ��������һ������
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

//������ť����¼�
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
*���˵��ؼ�text��ǰ��ո񣬲�������ֵ
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

//У��Email
function checkEmail(email)
{
     if(email.indexOf("@")<0||email.indexOf(".")<0)
     {
         return false;
     }
    return true;
}

//У���ֻ�����
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
 * ������:checkNumberPlus
 * ����:str ҪУ����ַ���
 * ����ֵ:true or false
 * ����˵��:У���ַ���,�ǲ���ȫ�������������
 * ����ʾ������:checkNumberPlus("232323")
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
 * ������:checkInteger
 * ����:str ҪУ����ַ���
 * ����ֵ:true or false
 * ����˵��:У������
 * ����ʾ������:checkInteger("2222");
 */
function checkInteger(str) {
    if(checkNumberPlus(str)) {
        return str.indexOf('.') < 0;
    }
	return false;
}

/**
 * ������:checkPInteger
 * ����:str ҪУ����ַ���
 * ����ֵ:true or false
 * ����˵��:У��������
 * ����ʾ������:checkPInteger("2222")
 */
function checkPInteger(str) {
	if(checkInteger(str)) {
		return str.indexOf('-') < 0;
	}
	return false;
}

/**   *javascript��дCookie����    */ 

//���Cookie������ֵ
function GetCookieVal(offset)
{
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
	endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

//�趨Cookieֵ
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

//ɾ��Cookie
function DelCookie(name)
{
	var exp = new Date();
	exp.setTime (exp.getTime() - 1);
	var cval = GetCookie (name);
	document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString();
}

//���Cookie��ԭʼֵ
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

