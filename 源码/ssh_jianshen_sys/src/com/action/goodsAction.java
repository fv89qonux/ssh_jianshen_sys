package com.action;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.dao.TCatelogDAO;
import com.dao.TGoodsDAO;
import com.model.TCatelog;
import com.model.TGoods;
import com.opensymphony.xwork2.ActionSupport;
import com.util.Pagesize;
import com.util.Pagination;

public class goodsAction extends ActionSupport {
	private int goodsId;
	private int goodsCatelogId;
	private String goodsName;
	private String goodsMiaoshu;
	private String fujian;
	private String goodsYanse;
	private int goodsShichangjia;
	private int goodsTejia;

	private int catelogId;
	private int goodsKucun;

	private String message;
	private String path;

	private TGoodsDAO goodsDAO;
	private TCatelogDAO catelogDAO;

	private int rukushuliang;

	public String goodsNoTejiaAdd() {
		TGoods goods = new TGoods();
		goods.setGoodsCatelogId(goodsCatelogId);
		goods.setGoodsName(goodsName);
		goods.setGoodsYanse(goodsYanse);
		goods.setGoodsMiaoshu(goodsMiaoshu);
		goods.setGoodsPic(fujian);
		goods.setGoodsShichangjia(goodsShichangjia);
		if (goodsTejia == 0)// 特格为0表示没有特价
		{
			goods.setGoodsTejia(goodsShichangjia);// 如果不是特价商品。把这个商品的特价设置为市场价格
			goods.setGoodsIsnottejia("no");
		} else {
			goods.setGoodsTejia(goodsTejia);
			goods.setGoodsIsnottejia("yes");
		}

		goods.setGoodsKucun(goodsKucun);
		goods.setGoodsDel("no");

		goodsDAO.save(goods);
		this.setMessage("操作成功");
		this.setPath("goodsManaNoTejia.action");
		return "succeed";

	}

	public String goodsPre() {
		HttpServletRequest req = ServletActionContext.getRequest();
		int id = Integer.parseInt(req.getParameter("id"));

		TGoods goods = goodsDAO.findById(id);

		req.setAttribute("goods", goods);
		return ActionSupport.SUCCESS;
	}

	public String goodsEdit() {
		HttpServletRequest req = ServletActionContext.getRequest();
		int id = Integer.parseInt(req.getParameter("id"));

		TGoods goods = goodsDAO.findById(id);

		goods.setGoodsCatelogId(goodsCatelogId);
		goods.setGoodsName(goodsName);
		goods.setGoodsYanse(goodsYanse);
		goods.setGoodsMiaoshu(goodsMiaoshu);
		goods.setGoodsPic(fujian);
		goods.setGoodsShichangjia(goodsShichangjia);

		goodsDAO.attachDirty(goods);

		this.setMessage("成功");
		this.setPath("goodsManaNoTejia.action");
		return "succeed";
	}

	public String goodsNoTejiaDel() {
		TGoods goods = goodsDAO.findById(goodsId);
		goods.setGoodsDel("yes");
		goodsDAO.attachDirty(goods);
		this.setMessage("操作成功");
		this.setPath("goodsManaNoTejia.action");
		return "succeed";
	}

	public String goodsManaNoTejia() {
		String sql = "from TGoods where goodsDel='no' order by goodsIsnottejia";
		List goodsList = goodsDAO.getHibernateTemplate().find(sql);
		for (int i = 0; i < goodsList.size(); i++) {
			TGoods goods = (TGoods) goodsList.get(i);
			System.out.println(goods.getGoodsCatelogId());
			goods.setGoodsCatelogName(catelogDAO.findById(
					goods.getGoodsCatelogId()).getCatelogName());
		}
		Map request = (Map) ServletActionContext.getContext().get("request");
		HttpServletRequest request1 = ServletActionContext.getRequest();

		int index = 0;
		if (request1.getParameter("index") == null) {
			index = 1;
		} else {
			index = Integer.parseInt(request1.getParameter("index"));
		}

		int fromIndex = (index - 1) * Pagesize.size;
		int toIndex = Math.min(fromIndex + Pagesize.size, goodsList.size());
		List goodsList1 = goodsList.subList(fromIndex, toIndex);

		Pagination p = new Pagination();// 创建 分页对象
		p.setIndex(index);// 设置页数
		p.setPageSize(Pagesize.size);
		p.setTotle(goodsList.size());// 设置总共的条数
		p.setData(goodsList1);// 设置数据

		request1.setAttribute("page", p);
		return ActionSupport.SUCCESS;
		// request.put("goodsList", goodsList);
		// return ActionSupport.SUCCESS;
	}

	public String goodsDetailHou() {
		Map request = (Map) ServletActionContext.getContext().get("request");

		TGoods goods = goodsDAO.findById(goodsId);
		request.put("goods", goods);
		return ActionSupport.SUCCESS;
	}

	public String goodsDetail() {
		Map request = (Map) ServletActionContext.getContext().get("request");

		TGoods goods = goodsDAO.findById(goodsId);
		request.put("goods", goods);
		return ActionSupport.SUCCESS;
	}

	public String goodsAllNoTejia() {

		String sql = "from TGoods where goodsDel='no' and goodsIsnottejia='no' order by goodsCatelogId";
		List goodsList = goodsDAO.getHibernateTemplate().find(sql);
		for (int i = 0; i < goodsList.size(); i++) {
			TGoods goods = (TGoods) goodsList.get(i);
			System.out.println(goods.getGoodsCatelogId());
			goods.setGoodsCatelogName(catelogDAO.findById(
					goods.getGoodsCatelogId()).getCatelogName());
		}
		Map request = (Map) ServletActionContext.getContext().get("request");
		HttpServletRequest request1 = ServletActionContext.getRequest();

		int index = 0;
		if (request1.getParameter("index") == null) {
			index = 1;
		} else {
			index = Integer.parseInt(request1.getParameter("index"));
		}

		int fromIndex = (index - 1) * Pagesize.size;
		int toIndex = Math.min(fromIndex + Pagesize.size, goodsList.size());
		List goodsList1 = goodsList.subList(fromIndex, toIndex);

		Pagination p = new Pagination();// 创建 分页对象
		p.setIndex(index);// 设置页数
		p.setPageSize(Pagesize.size);
		p.setTotle(goodsList.size());// 设置总共的条数
		p.setData(goodsList1);// 设置数据

		request1.setAttribute("page", p);
		return ActionSupport.SUCCESS;

	}

	public String goodsByCatelog() {
		Map request = (Map) ServletActionContext.getContext().get("request");

		String sql = "from TGoods where goodsDel='no' and goodsCatelogId=? order by goodsCatelogId";
		Object[] con = { catelogId };
		List goodsList = goodsDAO.getHibernateTemplate().find(sql, con);
		request.put("goodsList", goodsList);

		return ActionSupport.SUCCESS;
	}

	public String goodsSearch() {
		Map request = (Map) ServletActionContext.getContext().get("request");

		String sql = "from TGoods where goodsDel='no' and goodsName like '%"
				+ goodsName.trim() + "%'";

		List goodsList = goodsDAO.getHibernateTemplate().find(sql);
		request.put("goodsList", goodsList);

		return ActionSupport.SUCCESS;
	}

	public int getCatelogId() {
		return catelogId;
	}

	public void setCatelogId(int catelogId) {
		this.catelogId = catelogId;
	}

	public int getGoodsCatelogId() {
		return goodsCatelogId;
	}

	public void setGoodsCatelogId(int goodsCatelogId) {
		this.goodsCatelogId = goodsCatelogId;
	}

	public TGoodsDAO getGoodsDAO() {
		return goodsDAO;
	}

	public void setGoodsDAO(TGoodsDAO goodsDAO) {
		this.goodsDAO = goodsDAO;
	}

	public int getRukushuliang() {
		return rukushuliang;
	}

	public void setRukushuliang(int rukushuliang) {
		this.rukushuliang = rukushuliang;
	}

	public int getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(int goodsId) {
		this.goodsId = goodsId;
	}

	public String getGoodsMiaoshu() {
		return goodsMiaoshu;
	}

	public void setGoodsMiaoshu(String goodsMiaoshu) {
		this.goodsMiaoshu = goodsMiaoshu;
	}

	public String getGoodsName() {
		return goodsName;
	}

	public String getFujian() {
		return fujian;
	}

	public int getGoodsKucun() {
		return goodsKucun;
	}

	public void setGoodsKucun(int goodsKucun) {
		this.goodsKucun = goodsKucun;
	}

	public void setFujian(String fujian) {
		this.fujian = fujian;
	}

	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}

	public TCatelogDAO getCatelogDAO() {
		return catelogDAO;
	}

	public void setCatelogDAO(TCatelogDAO catelogDAO) {
		this.catelogDAO = catelogDAO;
	}

	public int getGoodsShichangjia() {
		return goodsShichangjia;
	}

	public void setGoodsShichangjia(int goodsShichangjia) {
		this.goodsShichangjia = goodsShichangjia;
	}

	public int getGoodsTejia() {
		return goodsTejia;
	}

	public void setGoodsTejia(int goodsTejia) {
		this.goodsTejia = goodsTejia;
	}

	public String getGoodsYanse() {
		return goodsYanse;
	}

	public void setGoodsYanse(String goodsYanse) {
		this.goodsYanse = goodsYanse;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
}
