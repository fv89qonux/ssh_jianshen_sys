package com.action;

import java.util.List;
import java.util.Map;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import com.dao.TYuyueDAO;

import com.model.TUser;
import com.model.TYuyue;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.util.Pagesize;
import com.util.Pagination;

@SuppressWarnings(value = { "unchecked", "serial" })
public class yuyueAction extends ActionSupport {
	private Integer id;
	private Integer pid;
	private String sdate;
	private String zt;
	private String beizhu;
	private String uname;
	private String message;
	private String path;
	private TYuyueDAO yuyueDAO;

	// ��t_yuyue�������Ӳ���
	public String yuyueAdd() {
		Date date = new Date();
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		// ��֤�Ƿ��ظ�����
		String sql = "from TYuyue where uname='" + uname + "' and pid=" + pid;
		List yuyueList = yuyueDAO.getHibernateTemplate().find(sql);
		if (yuyueList.size() > 0) {
			this.setMessage("�Ѿ�ԤԼ����,�����ظ�ԤԼ");
			this.setPath("kechengDetail.action?id=" + pid);

			return "succeed";

		}
		TYuyue yuyue = new TYuyue();
		yuyue.setPid(pid);
		yuyue.setSdate(format.format(date));
		yuyue.setZt("δ���");
		yuyue.setBeizhu(beizhu);
		yuyue.setUname(uname);
		yuyueDAO.save(yuyue);// ִ����Ӳ���
		this.setMessage("ԤԼ�ɹ�");
		this.setPath("qiantai/default.jsp");

		return "succeed";
	}

	// ��t_yuyue����й�����ʾ����
	public String yuyueMana() {
		String sql = "from TYuyue order by id DESC";
		List yuyueList = yuyueDAO.getHibernateTemplate().find(sql);
		Map request = (Map) ServletActionContext.getContext().get("request");
		HttpServletRequest request1 = ServletActionContext.getRequest();
		int index = 0;
		if (request1.getParameter("index") == null) {
			index = 1;
		} else {
			index = Integer.parseInt(request1.getParameter("index"));
		}
		int fromIndex = (index - 1) * Pagesize.size;
		int toIndex = Math.min(fromIndex + Pagesize.size, yuyueList.size());
		List yuyueList1 = yuyueList.subList(fromIndex, toIndex);
		Pagination p = new Pagination();// ���� ��ҳ����
		p.setIndex(index);// ����ҳ��
		p.setPageSize(Pagesize.size);
		p.setTotle(yuyueList.size());// �����ܹ�������
		p.setData(yuyueList1);// ��������
		request1.setAttribute("page", p); // request.put("yuyueList",
		// yuyueList);
		return ActionSupport.SUCCESS;

	}

	// ��t_yuyue�����ɾ������
	public String yuyueDel() {
		TYuyue yuyue = yuyueDAO.findById(id);
		yuyueDAO.delete(yuyue);// ִ��ɾ��
		this.setMessage("�����ɹ�");
		this.setPath("yuyueMana.action");// ��ת
		return "succeed";

	}

	public String myYuyue() {
		Map session = ServletActionContext.getContext().getSession();
		TUser user = (TUser) session.get("user");

		String sql = "from TYuyue where uname='" + user.getUsername() + "'";
		List yuyueList = yuyueDAO.getHibernateTemplate().find(sql);
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("mydata", yuyueList);

		return ActionSupport.SUCCESS;

	}

	public String myyuyueDel() {
		TYuyue yuyue = yuyueDAO.findById(id);
		yuyueDAO.delete(yuyue);// ִ��ɾ��
		this.setMessage("�����ɹ�");
		this.setPath("myYuyue.action");// ��ת
		return "succeed";

	}

	public String yuyueShenhe() {
		TYuyue yuyue = yuyueDAO.findById(id);

		yuyue.setZt("�����");

		yuyueDAO.getHibernateTemplate().update(yuyue);
		this.setMessage("��˳ɹ�");
		this.setPath("yuyueMana.action");// ��ת
		return "succeed";

	}

	// ��t_yuyue������޸�ǰ��������ȡ
	public String yuyueEditPre() {
		TYuyue yuyue = yuyueDAO.findById(id);
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("yuyue", yuyue);
		return ActionSupport.SUCCESS;

	}

	// ��t_yuyue������޸ı���
	public String yuyueEdit() {
		TYuyue yuyue = yuyueDAO.findById(id);
		yuyue.setPid(pid);
		yuyue.setSdate(sdate);
		yuyue.setZt(zt);
		yuyue.setBeizhu(beizhu);
		yuyue.setUname(uname);
		yuyueDAO.getHibernateTemplate().update(yuyue);
		this.setMessage("�����ɹ�");
		this.setPath("yuyueMana.action");// ��ת
		return "succeed";

	}

	public TYuyueDAO getYuyueDAO() {
		return yuyueDAO;
	}

	public void setYuyueDAO(TYuyueDAO yuyueDAO) {
		this.yuyueDAO = yuyueDAO;
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

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getSdate() {
		return sdate;
	}

	public void setSdate(String sdate) {
		this.sdate = sdate;
	}

	public String getZt() {
		return zt;
	}

	public void setZt(String zt) {
		this.zt = zt;
	}

	public String getBeizhu() {
		return beizhu;
	}

	public void setBeizhu(String beizhu) {
		this.beizhu = beizhu;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}
}