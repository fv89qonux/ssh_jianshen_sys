package com.action;

import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;

import com.dao.TWenzhangDAO;
import com.model.TWenzhang;
import com.dao.TLeibieDAO;
import com.opensymphony.xwork2.ActionSupport;

public class wenzhangAction extends ActionSupport {
	private Integer id;
	private Integer leibieId;
	private String mingcheng;
	private String jieshao;
	private Integer hits;

	private String fujian;

	private String shijian;

	private String del;

	private TWenzhangDAO wenzhangDAO;

	private TLeibieDAO leibieDAO;

	public String wenzhangAdd() {
		TWenzhang wenzhang = new TWenzhang();

		// wenzhang.setId(id);
		wenzhang.setLeibieId(leibieId);
		wenzhang.setMingcheng(mingcheng);
		wenzhang.setJieshao(jieshao);

		wenzhang.setFujian(fujian);
		wenzhang.setHits(0);

		wenzhang.setShijian(shijian);

		wenzhang.setDel("no");

		wenzhangDAO.save(wenzhang);

		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("msg", "信息添加成功");
		return "msg";
	}

	public String wenzhangMana() {
		String sql = "from TWenzhang where del='no' order by leibieId";
		List wenzhangList = wenzhangDAO.getHibernateTemplate().find(sql);
		for (int i = 0; i < wenzhangList.size(); i++) {
			TWenzhang news = (TWenzhang) wenzhangList.get(i);
			news.setCatelogName(leibieDAO.findById(news.getLeibieId())
					.getMingcheng());
			System.out.print(news.getCatelogName());
		}
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("wenzhangList", wenzhangList);
		return ActionSupport.SUCCESS;
	}

	public String wenzhangAll() {
		String sql = "from TWenzhang where del='no' order by leibieId";
		List wenzhangList = wenzhangDAO.getHibernateTemplate().find(sql);
		for (int i = 0; i < wenzhangList.size(); i++) {
			TWenzhang news = (TWenzhang) wenzhangList.get(i);
			news.setCatelogName(leibieDAO.findById(news.getLeibieId())
					.getMingcheng());
			System.out.print(news.getCatelogName());
		}
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("wenzhangList", wenzhangList);
		return ActionSupport.SUCCESS;
	}

	public String wenzhangDel() {
		TWenzhang wenzhang = wenzhangDAO.findById(id);
		wenzhang.setDel("yes");

		wenzhangDAO.attachDirty(wenzhang);

		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("msg", "信息删除成功");
		return "msg";
	}

	public String wenzhangPre() {
		TWenzhang wenzhang = wenzhangDAO.findById(id);

		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("wenzhang", wenzhang);
		return ActionSupport.SUCCESS;
	}

	public String wenzhangEdit() {
		TWenzhang wenzhang = wenzhangDAO.findById(id);

		// wenzhang.setId(id);
		wenzhang.setLeibieId(leibieId);
		wenzhang.setMingcheng(mingcheng);
		wenzhang.setJieshao(jieshao);

		wenzhang.setFujian(fujian);

		wenzhang.setDel("no");

		wenzhangDAO.attachDirty(wenzhang);

		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("msg", "信息修改成功");
		return "msg";
	}

	public String wenzhangNew() {
		String sql = "from TWenzhang where del='no' order by id desc";
		List wenzhangList = wenzhangDAO.getHibernateTemplate().find(sql);
		if (wenzhangList.size() > 8) {
			wenzhangList = wenzhangList.subList(0, 8);
		}
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("wenzhangList", wenzhangList);
		return ActionSupport.SUCCESS;
	}

	public String wenzhangDetailHou() {
		Map request = (Map) ServletActionContext.getContext().get("request");

		TWenzhang wenzhang = wenzhangDAO.findById(id);
		request.put("wenzhang", wenzhang);
		return ActionSupport.SUCCESS;
	}

	public String wenzhangDetailQian() {
		// TWenzhang wenzhang=wenzhangDAO.findById(id);

		String sql = "from TWenzhang where del='no' order by id desc";
		List wenzhangList = wenzhangDAO.getHibernateTemplate().find(sql);
		if (wenzhangList.size() > 8) {
			wenzhangList = wenzhangList.subList(0, 8);
		}
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("wenzhangList", wenzhangList);

		TWenzhang wenzhang = wenzhangDAO.findById(id);
		System.out.println("------" + wenzhang.getHits() + "&&&&&&&&&&&&&&&");
		wenzhang.setHits(wenzhang.getHits() + 1);

		wenzhangDAO.attachDirty(wenzhang);
		request.put("wenzhang", wenzhang);
		return ActionSupport.SUCCESS;

	}

	public String newsSearch() {
		String sql = "from TWenzhang where mingcheng  like '%"
				+ mingcheng.trim() + "%'";
		List newsList = wenzhangDAO.getHibernateTemplate().find(sql);
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("newsList", newsList);
		return ActionSupport.SUCCESS;
	}

	public String wenzhangByLeibie() {
		String sql = "from TWenzhang where del='no' and leibieId=?";
		Object[] con = { leibieId };

		Map request = (Map) ServletActionContext.getContext().get("request");
		List wenzhangList = wenzhangDAO.getHibernateTemplate().find(sql, con);
		request.put("wenzhangList", wenzhangList);

		System.out.println(wenzhangList.size() + "&&");

		return ActionSupport.SUCCESS;
	}

	public Integer getLeibieId() {
		return leibieId;
	}

	public void setLeibieId(Integer leibieId) {
		this.leibieId = leibieId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMingcheng() {
		return mingcheng;
	}

	public void setMingcheng(String mingcheng) {
		this.mingcheng = mingcheng;
	}

	public String getJieshao() {
		return jieshao;
	}

	public void setJieshao(String jieshao) {
		this.jieshao = jieshao;
	}

	public String getFujian() {
		return fujian;
	}

	public void setFujian(String fujian) {
		this.fujian = fujian;
	}

	public String getShijian() {
		return shijian;
	}

	public void setShijian(String shijian) {
		this.shijian = shijian;
	}

	public String getDel() {
		return del;
	}

	public void setDel(String del) {
		this.del = del;
	}

	public TLeibieDAO getLeibieDAO() {
		return leibieDAO;
	}

	public void setLeibieDAO(TLeibieDAO leibieDAO) {
		this.leibieDAO = leibieDAO;
	}

	public void setTLeibieDAO(TLeibieDAO leibieDAO) {
		this.leibieDAO = leibieDAO;
	}

	public TWenzhangDAO getWenzhangDAO() {
		return wenzhangDAO;
	}

	public void setWenzhangDAO(TWenzhangDAO wenzhangDAO) {
		this.wenzhangDAO = wenzhangDAO;
	}

	public Integer getHits() {
		return hits;
	}

	public void setHits(Integer hits) {
		this.hits = hits;
	}

}
