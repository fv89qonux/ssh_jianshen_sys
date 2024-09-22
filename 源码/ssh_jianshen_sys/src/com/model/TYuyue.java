package com.model;


public class TYuyue implements java.io.Serializable
{
	private Integer id;
	private Integer pid;
	private String sdate;
	private String zt;
	private String beizhu;
	private String uname;

	public Integer getId()
	{
		return id;
	}
	public void setId(Integer id)
	{
		this.id = id;
	}
	
	public Integer getPid()
	{
		return pid;
	}
	public void setPid(Integer pid)
	{
		this.pid = pid;
	}
	
	public String getSdate()
	{
		return sdate;
	}
	public void setSdate(String sdate)
	{
		this.sdate = sdate;
	}
	
	public String getZt()
	{
		return zt;
	}
	public void setZt(String zt)
	{
		this.zt = zt;
	}
	
	public String getBeizhu()
	{
		return beizhu;
	}
	public void setBeizhu(String beizhu)
	{
		this.beizhu = beizhu;
	}
	
	public String getUname()
	{
		return uname;
	}
	public void setUname(String uname)
	{
		this.uname = uname;
	}
	
}