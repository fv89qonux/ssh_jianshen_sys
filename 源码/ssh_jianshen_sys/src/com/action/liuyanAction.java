package com.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.dao.TLiuyanDAO;
import com.model.TAdmin;
import com.model.TLiuyan; //import com.model.TUser;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.util.Pagesize;
import com.util.Pagination;

public class liuyanAction extends ActionSupport {
	private int liuyanId;
	private String liuyanTitle;
	private String liuyanContent;

	private String huifu;
	private String huifushi;
	private TLiuyanDAO liuyanDAO;
	private String message;
	private String path;

	public String liuyanMana() {
		List liuyanList = liuyanDAO.findAll();
		Map request = (Map) ServletActionContext.getContext().get("request");
		HttpServletRequest request1 = ServletActionContext.getRequest();

		int index = 0;
		if (request1.getParameter("index") == null) {
			index = 1;
		} else {
			index = Integer.parseInt(request1.getParameter("index"));
		}

		int fromIndex = (index - 1) * Pagesize.size;
		int toIndex = Math.min(fromIndex + Pagesize.size, liuyanList.size());
		List liuyanList1 = liuyanList.subList(fromIndex, toIndex);

		Pagination p = new Pagination();// 创建 分页对象
		p.setIndex(index);// 设置页数
		p.setPageSize(Pagesize.size);
		p.setTotle(liuyanList.size());// 设置总共的条数
		p.setData(liuyanList1);// 设置数据

		request1.setAttribute("page", p);
		return ActionSupport.SUCCESS;

		// request.put("liuyanList", liuyanList);
		// return ActionSupport.SUCCESS;
	}

	public String liuyanAdd() {
		TLiuyan liuyan = new TLiuyan();
		liuyan.setLiuyanContent(liuyanContent);
		liuyan.setLiuyanTitle(liuyanTitle);
		liuyan.setLiuyanDate(new Date().toLocaleString());
		Map session = ActionContext.getContext().getSession();

		/*
		 * if(session.get("user")!=null) { TUser
		 * user=(TUser)session.get("user");
		 * liuyan.setLiuyanUser(user.getUserName()); }
		 */
		liuyan.setHuifu("");
		liuyan.setHuifushi("");
		liuyanDAO.save(liuyan);
		this.setMessage("留言成功");
		// this.setPath("liuyanAll.action");
		return "succeed";
	}

	public String liuyanHuifu() {
		TLiuyan liuyan = liuyanDAO.findById(liuyanId);
		liuyan.setHuifu(huifu);
		liuyan.setHuifushi(new SimpleDateFormat("yyyy-MM-dd HH:mm")
				.format(new Date()));

		liuyanDAO.attachDirty(liuyan);

		this.setMessage("留言回复成功");
		// this.setPath("liuyanMana.action");
		return "succeed";
	}

	public String liuyanDetail() {
		TLiuyan liuyan = liuyanDAO.findById(liuyanId);
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setAttribute("liuyan", liuyan);
		return ActionSupport.SUCCESS;
	}

	public String liuyanDel() {
		TLiuyan liuyan = liuyanDAO.findById(liuyanId);
		liuyanDAO.delete(liuyan);
		this.setMessage("留言删除成功");
		this.setPath("liuyanMana.action");
		return "succeed";
	}

	public String liuyanAll() {
		List liuyanList = liuyanDAO.findAll();
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("liuyanList", liuyanList);
		return ActionSupport.SUCCESS;
	}

	public String getLiuyanContent() {
		return liuyanContent;
	}

	public void setLiuyanContent(String liuyanContent) {
		this.liuyanContent = liuyanContent;
	}

	public TLiuyanDAO getLiuyanDAO() {
		return liuyanDAO;
	}

	public void setLiuyanDAO(TLiuyanDAO liuyanDAO) {
		this.liuyanDAO = liuyanDAO;
	}

	public int getLiuyanId() {
		return liuyanId;
	}

	public void setLiuyanId(int liuyanId) {
		this.liuyanId = liuyanId;
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

	public String getLiuyanTitle() {
		return liuyanTitle;
	}

	public void setLiuyanTitle(String liuyanTitle) {
		this.liuyanTitle = liuyanTitle;
	}

	public String getHuifushi() {
		return huifushi;
	}

	public void setHuifushi(String huifushi) {
		this.huifushi = huifushi;
	}

	public String getHuifu() {
		return huifu;
	}

	public void setHuifu(String huifu) {
		this.huifu = huifu;
	}

}
