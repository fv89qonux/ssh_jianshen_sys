package com.action;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.apache.struts2.ServletActionContext;
import javax.servlet.http.HttpServletRequest;

import com.dao.TGoodsDAO;
import com.dao.TKechengDAO;
import com.dao.TLeibieDAO;
import com.dao.TOrderItemDAO;
import com.dao.TWenzhangDAO;
import com.model.TGoods;
import com.model.TLeibie;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class indexAction extends ActionSupport {
	private TKechengDAO kechengDAO;
	private TGoodsDAO goodsDAO;
	private TOrderItemDAO orderItemDAO;
	private TLeibieDAO leibieDAO;
	private TWenzhangDAO wenzhangDAO;

	// 首页数据
	public String index() {
		String sql = "from TKecheng order by id DESC";
		List kechengList = kechengDAO.getHibernateTemplate().find(sql);
		Map request = (Map) ServletActionContext.getContext().get("request");
		if (kechengList.size() > 8) {
			kechengList = kechengList.subList(0, 8);
		}

		request.put("kechengqt", kechengList);
		String lsql = "from TLeibie where Del='no'";
		List leibieList = leibieDAO.getHibernateTemplate().find(lsql);

		Map session = ActionContext.getContext().getSession();
		session.put("leibieList", leibieList);

		String sql1 = "from TWenzhang where del='no' and fujian<>'' order by id desc";
		List wenzhangList = wenzhangDAO.getHibernateTemplate().find(sql1);
		if (wenzhangList.size() > 5) {
			wenzhangList = wenzhangList.subList(0, 5);
		}
		request.put("wenzhangList", wenzhangList);

		// 循环显示新闻
		String sql2 = "from TLeibie where Del='no'";
		List leibieList1 = leibieDAO.getHibernateTemplate().find(sql2);
		for (int i = 0; i < leibieList1.size(); i++) {

			TLeibie leibie = (TLeibie) leibieList1.get(i);

			String ss = "from TWenzhang where del='no' and leibieId="
					+ leibie.getId();
			leibie.setXiaoleibieList(wenzhangDAO.getHibernateTemplate()
					.find(ss));
		}
		Map session1 = ActionContext.getContext().getSession();
		session1.put("leibieList1", leibieList1);
		String gsql = "from TGoods where goodsDel='no' and goodsIsnottejia='no' order by goodsId desc";
		List goodsNoTejiaList = goodsDAO.getHibernateTemplate().find(gsql);
		if (goodsNoTejiaList.size() > 10) {
			goodsNoTejiaList = goodsNoTejiaList.subList(0, 10);
		}
		request.put("goodsNoTejiaList", goodsNoTejiaList);

		// paihangbang
		List goodsList = new ArrayList();
		String psql = "select sum(goodsQuantity),goodsId from TOrderItem group by goodsId order by sum(goodsQuantity) desc";
		List list = orderItemDAO.getHibernateTemplate().find(psql);
		for (int i = 0; i < list.size(); i++) {
			Object[] b = (Object[]) list.get(i);
			int goodsId = Integer.parseInt(b[1].toString());
			System.out.println(goodsId + "&&");
			TGoods goods = goodsDAO.findById(goodsId);
			goodsList.add(goods);
		}
		if (goodsList.size() > 5) {
			goodsList = goodsList.subList(0, 5);
		}
		request.put("goodsList", goodsList);
		return ActionSupport.SUCCESS;
	}

	public TKechengDAO getKechengDAO() {
		return kechengDAO;
	}

	public void setKechengDAO(TKechengDAO kechengDAO) {
		this.kechengDAO = kechengDAO;
	}

	public TGoodsDAO getGoodsDAO() {
		return goodsDAO;
	}

	public void setGoodsDAO(TGoodsDAO goodsDAO) {
		this.goodsDAO = goodsDAO;
	}

	public TOrderItemDAO getOrderItemDAO() {
		return orderItemDAO;
	}

	public void setOrderItemDAO(TOrderItemDAO orderItemDAO) {
		this.orderItemDAO = orderItemDAO;
	}

	public TLeibieDAO getLeibieDAO() {
		return leibieDAO;
	}

	public void setLeibieDAO(TLeibieDAO leibieDAO) {
		this.leibieDAO = leibieDAO;
	}

	public TWenzhangDAO getWenzhangDAO() {
		return wenzhangDAO;
	}

	public void setWenzhangDAO(TWenzhangDAO wenzhangDAO) {
		this.wenzhangDAO = wenzhangDAO;
	}
}
