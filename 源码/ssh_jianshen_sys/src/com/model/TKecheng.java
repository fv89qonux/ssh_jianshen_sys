package com.model;


public class TKecheng implements java.io.Serializable
{
	private Integer id;
	private String name;
	private String jieshao;
	private String jiaolian;
	private String tel;

	public Integer getId()
	{
		return id;
	}
	public void setId(Integer id)
	{
		this.id = id;
	}
	
	public String getName()
	{
		return name;
	}
	public void setName(String name)
	{
		this.name = name;
	}
	
	public String getJieshao()
	{
		return jieshao;
	}
	public void setJieshao(String jieshao)
	{
		this.jieshao = jieshao;
	}
	
	public String getJiaolian()
	{
		return jiaolian;
	}
	public void setJiaolian(String jiaolian)
	{
		this.jiaolian = jiaolian;
	}
	
	public String getTel()
	{
		return tel;
	}
	public void setTel(String tel)
	{
		this.tel = tel;
	}
	
}