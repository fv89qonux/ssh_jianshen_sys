package com.model;

/**
 * TWenzhang entity. @author MyEclipse Persistence Tools
 */

public class TWenzhang implements java.io.Serializable
{

	private Integer id;
	private Integer leibieId;
	private String mingcheng;
	private String jieshao;
	
	private String fujian;
	private Integer hits;

	private String shijian;
	
	private String del;
	private String catelogName;

	public Integer getId()
	{
		return id;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

	public Integer getLeibieId()
	{
		return leibieId;
	}

	public void setLeibieId(Integer leibieId)
	{
		this.leibieId = leibieId;
	}

	public String getMingcheng()
	{
		return mingcheng;
	}

	public void setMingcheng(String mingcheng)
	{
		this.mingcheng = mingcheng;
	}

	public String getJieshao()
	{
		return jieshao;
	}

	public void setJieshao(String jieshao)
	{
		this.jieshao = jieshao;
	}

	public String getFujian()
	{
		return fujian;
	}

	public void setFujian(String fujian)
	{
		this.fujian = fujian;
	}

	public Integer getHits()
	{
		return hits;
	}

	public void setHits(Integer hits)
	{
		this.hits = hits;
	}


	public String getShijian()
	{
		return shijian;
	}

	public void setShijian(String shijian)
	{
		this.shijian = shijian;
	}

	public String getDel()
	{
		return del;
	}

	public void setDel(String del)
	{
		this.del = del;
	}

	public String getCatelogName() {
		return catelogName;
	}

	public void setCatelogName(String catelogName) {
		this.catelogName = catelogName;
	}

}