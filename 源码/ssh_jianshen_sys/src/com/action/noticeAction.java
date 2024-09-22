package com.action;

import java.util.List;
import java.util.Map;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import com.dao.TNoticeDAO;
import com.model.TNotice;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.util.Pagesize;
import com.util.Pagination;

@SuppressWarnings(value = { "unchecked", "serial" })
public class noticeAction extends ActionSupport {
	private Integer id;
	private String title;
	private String neirong;
	private String addtime;
	private String message;
	private String path;
	private TNoticeDAO noticeDAO;

	// 对t_notice表进行添加操作
	public String noticeAdd() {
		TNotice notice = new TNotice();

		HttpServletRequest request = ServletActionContext.getRequest();

		System.out.println(neirong);
		notice.setTitle(title);
		notice.setNeirong(neirong);
		notice.setAddtime(addtime);
		noticeDAO.save(notice);// 执行添加操作
		this.setMessage("操作成功");
		this.setPath("noticeMana.action");// 跳转
		return "succeed";
	}

	// 对t_notice表进行管理显示操作
	public String noticeMana() {
		String sql = "from TNotice order by id DESC";
		List noticeList = noticeDAO.getHibernateTemplate().find(sql);
		Map request = (Map) ServletActionContext.getContext().get("request");
		HttpServletRequest request1 = ServletActionContext.getRequest();
		int index = 0;
		if (request1.getParameter("index") == null) {
			index = 1;
		} else {
			index = Integer.parseInt(request1.getParameter("index"));
		}
		int fromIndex = (index - 1) * Pagesize.size;
		int toIndex = Math.min(fromIndex + Pagesize.size, noticeList.size());
		List noticeList1 = noticeList.subList(fromIndex, toIndex);
		Pagination p = new Pagination();// 创建 分页对象
		p.setIndex(index);// 设置页数
		p.setPageSize(Pagesize.size);
		p.setTotle(noticeList.size());// 设置总共的条数
		p.setData(noticeList1);// 设置数据
		request1.setAttribute("page", p); // request.put("noticeList",
											// noticeList);
		return ActionSupport.SUCCESS;

	}

	// 对t_notice表进行删除操作
	public String noticeDel() {
		TNotice notice = noticeDAO.findById(id);
		noticeDAO.delete(notice);// 执行删除
		this.setMessage("操作成功");
		this.setPath("noticeMana.action");// 跳转
		return "succeed";

	}

	// 对t_notice表进行修改前的数据提取
	public String noticeEditPre() {
		TNotice notice = noticeDAO.findById(id);
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("notice", notice);
		return ActionSupport.SUCCESS;

	}

	public String noticeAll() {
		String sql = "from TNotice order by id Desc";
		List noticeList = noticeDAO.getHibernateTemplate().find(sql);

		Map request = (Map) ServletActionContext.getContext().get("request");

		request.put("noticeAll", noticeList);
		return ActionSupport.SUCCESS;
	}

	public String indexNotice() {
		String sql = "from TNotice order by id Desc";
		List indexnoticeList = noticeDAO.getHibernateTemplate().find(sql);
		if (indexnoticeList.size() > 5) {
			indexnoticeList = indexnoticeList.subList(0, 5);
		}
		Map request = (Map) ServletActionContext.getContext().get("request");

		request.put("indexnoticeList", indexnoticeList);
		return ActionSupport.SUCCESS;
	}

	// 对t_notice表进行修改保存
	public String noticeEdit() {
		TNotice notice = noticeDAO.findById(id);
		notice.setTitle(title);
		notice.setNeirong(neirong);
		notice.setAddtime(addtime);
		noticeDAO.getHibernateTemplate().update(notice);
		this.setMessage("操作成功");
		this.setPath("noticeMana.action");// 跳转
		return "succeed";

	}

	public String noticeDetail() {
		Map request = (Map) ServletActionContext.getContext().get("request");
		TNotice notice = noticeDAO.findById(id);
		request.put("data", notice);
		return ActionSupport.SUCCESS;
	}

	public TNoticeDAO getNoticeDAO() {
		return noticeDAO;
	}

	public void setNoticeDAO(TNoticeDAO noticeDAO) {
		this.noticeDAO = noticeDAO;
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

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getNeirong() {
		return neirong;
	}

	public void setNeirong(String neirong) {
		this.neirong = neirong;
	}

	public String getAddtime() {
		return addtime;
	}

	public void setAddtime(String addtime) {
		this.addtime = addtime;
	}
}