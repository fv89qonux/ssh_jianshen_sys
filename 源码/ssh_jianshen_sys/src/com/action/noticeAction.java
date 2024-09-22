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

	// ��t_notice�������Ӳ���
	public String noticeAdd() {
		TNotice notice = new TNotice();

		HttpServletRequest request = ServletActionContext.getRequest();

		System.out.println(neirong);
		notice.setTitle(title);
		notice.setNeirong(neirong);
		notice.setAddtime(addtime);
		noticeDAO.save(notice);// ִ����Ӳ���
		this.setMessage("�����ɹ�");
		this.setPath("noticeMana.action");// ��ת
		return "succeed";
	}

	// ��t_notice����й�����ʾ����
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
		Pagination p = new Pagination();// ���� ��ҳ����
		p.setIndex(index);// ����ҳ��
		p.setPageSize(Pagesize.size);
		p.setTotle(noticeList.size());// �����ܹ�������
		p.setData(noticeList1);// ��������
		request1.setAttribute("page", p); // request.put("noticeList",
											// noticeList);
		return ActionSupport.SUCCESS;

	}

	// ��t_notice�����ɾ������
	public String noticeDel() {
		TNotice notice = noticeDAO.findById(id);
		noticeDAO.delete(notice);// ִ��ɾ��
		this.setMessage("�����ɹ�");
		this.setPath("noticeMana.action");// ��ת
		return "succeed";

	}

	// ��t_notice������޸�ǰ��������ȡ
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

	// ��t_notice������޸ı���
	public String noticeEdit() {
		TNotice notice = noticeDAO.findById(id);
		notice.setTitle(title);
		notice.setNeirong(neirong);
		notice.setAddtime(addtime);
		noticeDAO.getHibernateTemplate().update(notice);
		this.setMessage("�����ɹ�");
		this.setPath("noticeMana.action");// ��ת
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