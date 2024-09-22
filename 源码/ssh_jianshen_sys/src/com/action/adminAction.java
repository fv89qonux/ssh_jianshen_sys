package com.action;

import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import javax.servlet.http.HttpServletRequest;

import com.dao.TAdminDAO;
import com.model.TAdmin;
import com.opensymphony.xwork2.ActionSupport;
import com.util.Pagesize;
import com.util.Pagination;

public class adminAction extends ActionSupport {
	private int userId;
	private String userName;
	private String userPw;

	private String message;
	private String path;

	private int index = 1;

	private TAdminDAO adminDAO;

	public String adminAdd() {
		TAdmin admin = new TAdmin();
		admin.setUserName(userName);
		admin.setUserPw(userPw);
		adminDAO.save(admin);
		this.setMessage("操作成功");
		this.setPath("adminManage.action");
		return "succeed";
	}

	public String adminManage() {
		List adminList = adminDAO.findAll();
		Map request = (Map) ServletActionContext.getContext().get("request");
		HttpServletRequest request1 = ServletActionContext.getRequest();

		int index = 0;
		if (request1.getParameter("index") == null) {
			index = 1;
		} else {
			index = Integer.parseInt(request1.getParameter("index"));
		}

		int fromIndex = (index - 1) * Pagesize.size;
		int toIndex = Math.min(fromIndex + Pagesize.size, adminList.size());
		List adminList1 = adminList.subList(fromIndex, toIndex);

		Pagination p = new Pagination();// 创建 分页对象
		p.setIndex(index);// 设置页数
		p.setPageSize(Pagesize.size);
		p.setTotle(adminList.size());// 设置总共的条数
		p.setData(adminList1);// 设置数据

		request1.setAttribute("page", p);
		return ActionSupport.SUCCESS;
		// request.put("adminList", adminList);
		// return ActionSupport.SUCCESS;
	}

	public String adminDel() {
		adminDAO.delete(adminDAO.findById(userId));
		this.setMessage("删除成功");
		this.setPath("adminManage.action");
		return "succeed";
	}

	public TAdminDAO getAdminDAO() {
		return adminDAO;
	}

	public void setAdminDAO(TAdminDAO adminDAO) {
		this.adminDAO = adminDAO;
	}

	public String getMessage() {
		return message;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
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

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPw() {
		return userPw;
	}

	public void setUserPw(String userPw) {
		this.userPw = userPw;
	}

}
