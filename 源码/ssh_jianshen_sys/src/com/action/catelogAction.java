package com.action;

import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.dao.TCatelogDAO;
import com.dao.TGoodsDAO;
import com.model.TCatelog;
import com.opensymphony.xwork2.ActionSupport;
import com.util.Pagesize;
import com.util.Pagination;

public class catelogAction extends ActionSupport {
	private int catelogId;
	private String catelogName;
	private String catelogMiaoshu;

	private String message;
	private String path;

	private TCatelogDAO catelogDAO;
	private TGoodsDAO goodsDAO;

	public String catelogMana() {
		String sql = "from TCatelog where catelogDel='no'";
		List cateLogList = catelogDAO.getHibernateTemplate().find(sql);
		Map request = (Map) ServletActionContext.getContext().get("request");

		HttpServletRequest request1 = ServletActionContext.getRequest();
		int index = 0;
		if (request1.getParameter("index") == null) {
			index = 1;
		} else {
			index = Integer.parseInt(request1.getParameter("index"));
		}

		int fromIndex = (index - 1) * Pagesize.size;
		int toIndex = Math.min(fromIndex + Pagesize.size, cateLogList.size());
		List cateLogList1 = cateLogList.subList(fromIndex, toIndex);

		Pagination p = new Pagination();// 创建 分页对象
		p.setIndex(index);// 设置页数
		p.setPageSize(Pagesize.size);
		p.setTotle(cateLogList.size());// 设置总共的条数
		p.setData(cateLogList1);// 设置数据

		request1.setAttribute("page", p);
		return ActionSupport.SUCCESS;
		// request.put("cateLogList", cateLogList);
		// return ActionSupport.SUCCESS;
	}

	public String catelogAll() {
		String sql = "from TCatelog where catelogDel='no'";
		List cateLogList = catelogDAO.getHibernateTemplate().find(sql);
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("cateLogList", cateLogList);
		return ActionSupport.SUCCESS;
	}

	public String catelogAdd() {
		TCatelog catelog = new TCatelog();
		catelog.setCatelogName(catelogName);
		catelog.setCatelogMiaoshu(catelogMiaoshu);
		catelog.setCatelogDel("no");
		catelogDAO.save(catelog);
		this.setMessage("操作成功");
		this.setPath("catelogMana.action");
		return "succeed";
	}

	public String catelogDel() {
		String sql = "from TGoods where goodsDel='no' and goodsCatelogId="
				+ catelogId;
		List goodsList = goodsDAO.getHibernateTemplate().find(sql);
		if (goodsList.size() > 0) {
			this.setMessage("请先删除此类别下的苗圃");
			this.setPath("catelogMana.action");
		} else {
			TCatelog catelog = catelogDAO.findById(catelogId);
			catelog.setCatelogDel("yes");
			catelogDAO.attachDirty(catelog);
			this.setMessage("操作成功");
			this.setPath("catelogMana.action");
		}
		return "succeed";
	}

	public String catelogEditPre() {
		TCatelog catelog = catelogDAO.findById(catelogId);
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("catelog", catelog);
		return ActionSupport.SUCCESS;
	}

	public String catelogEdit() {
		TCatelog catelog = catelogDAO.findById(catelogId);
		catelog.setCatelogName(catelogName);
		catelog.setCatelogMiaoshu(catelogMiaoshu);
		catelog.setCatelogDel("no");
		catelogDAO.attachDirty(catelog);
		this.setMessage("操作成功");
		this.setPath("catelogMana.action");
		return "succeed";
	}

	public String catelogSelect() {
		String sql = "from TCatelog where catelogDel='no'";
		List cateLogList = catelogDAO.getHibernateTemplate().find(sql);
		Map request = (Map) ServletActionContext.getContext().get("request");

		request.put("cateLogsl", cateLogList);
		return ActionSupport.SUCCESS;
	}

	public TCatelogDAO getCatelogDAO() {
		return catelogDAO;
	}

	public void setCatelogDAO(TCatelogDAO catelogDAO) {
		this.catelogDAO = catelogDAO;
	}

	public int getCatelogId() {
		return catelogId;
	}

	public void setCatelogId(int catelogId) {
		this.catelogId = catelogId;
	}

	public String getCatelogMiaoshu() {
		return catelogMiaoshu;
	}

	public void setCatelogMiaoshu(String catelogMiaoshu) {
		this.catelogMiaoshu = catelogMiaoshu;
	}

	public String getCatelogName() {
		return catelogName;
	}

	public void setCatelogName(String catelogName) {
		this.catelogName = catelogName;
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

	public TGoodsDAO getGoodsDAO() {
		return goodsDAO;
	}

	public void setGoodsDAO(TGoodsDAO goodsDAO) {
		this.goodsDAO = goodsDAO;
	}

}
