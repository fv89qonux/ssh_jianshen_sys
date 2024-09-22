package com.action;

import java.util.List;
import java.util.Map;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import com.dao.TKechengDAO;
import com.model.TKecheng;
import com.opensymphony.xwork2.ActionSupport;
import com.util.Pagesize;
import com.util.Pagination;

@SuppressWarnings(value = { "unchecked", "serial" })
public class kechengAction extends ActionSupport {
	private Integer id;
	private String name;
	private String jieshao;
	private String jiaolian;
	private String tel;
	private String message;
	private String path;
	private TKechengDAO kechengDAO;

	// ��t_kecheng�������Ӳ���
	public String kechengAdd() {
		TKecheng kecheng = new TKecheng();
		kecheng.setName(name);
		kecheng.setJieshao(jieshao);
		kecheng.setJiaolian(jiaolian);
		kecheng.setTel(tel);
		kechengDAO.save(kecheng);// ִ����Ӳ���
		this.setMessage("�����ɹ�");
		this.setPath("kechengMana.action");// ��ת
		return "succeed";
	}

	public String kechengAll() {
		String sql = "from TKecheng order by id DESC";
		List kechengList = kechengDAO.getHibernateTemplate().find(sql);
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("kechengAll", kechengList);

		return ActionSupport.SUCCESS;
	}

	// ��t_kecheng����й�����ʾ����
	public String kechengMana() {
		String sql = "from TKecheng order by id DESC";
		List kechengList = kechengDAO.getHibernateTemplate().find(sql);
		Map request = (Map) ServletActionContext.getContext().get("request");
		HttpServletRequest request1 = ServletActionContext.getRequest();
		int index = 0;
		if (request1.getParameter("index") == null) {
			index = 1;
		} else {
			index = Integer.parseInt(request1.getParameter("index"));
		}
		int fromIndex = (index - 1) * Pagesize.size;
		int toIndex = Math.min(fromIndex + Pagesize.size, kechengList.size());
		List kechengList1 = kechengList.subList(fromIndex, toIndex);
		Pagination p = new Pagination();// ���� ��ҳ����
		p.setIndex(index);// ����ҳ��
		p.setPageSize(Pagesize.size);
		p.setTotle(kechengList.size());// �����ܹ�������
		p.setData(kechengList1);// ��������
		request1.setAttribute("page", p); // request.put("kechengList",
											// kechengList);
		return ActionSupport.SUCCESS;

	}

	// ��t_kecheng�����ɾ������
	public String kechengDel() {
		TKecheng kecheng = kechengDAO.findById(id);
		kechengDAO.delete(kecheng);// ִ��ɾ��
		this.setMessage("�����ɹ�");
		this.setPath("kechengMana.action");// ��ת
		return "succeed";

	}

	// ��t_kecheng������޸�ǰ��������ȡ
	public String kechengEditPre() {
		TKecheng kecheng = kechengDAO.findById(id);
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("kecheng", kecheng);
		return ActionSupport.SUCCESS;

	}

	// ��t_kecheng������޸ı���
	public String kechengEdit() {
		TKecheng kecheng = kechengDAO.findById(id);
		kecheng.setName(name);
		kecheng.setJieshao(jieshao);
		kecheng.setJiaolian(jiaolian);
		kecheng.setTel(tel);
		kechengDAO.getHibernateTemplate().update(kecheng);
		this.setMessage("�����ɹ�");
		this.setPath("kechengMana.action");// ��ת
		return "succeed";

	}

	public String kechengDetail() {
		Map request = (Map) ServletActionContext.getContext().get("request");
		TKecheng kecheng = kechengDAO.findById(id);
		request.put("data", kecheng);
		return ActionSupport.SUCCESS;
	}

	public TKechengDAO getKechengDAO() {
		return kechengDAO;
	}

	public void setKechengDAO(TKechengDAO kechengDAO) {
		this.kechengDAO = kechengDAO;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getJieshao() {
		return jieshao;
	}

	public void setJieshao(String jieshao) {
		this.jieshao = jieshao;
	}

	public String getJiaolian() {
		return jiaolian;
	}

	public void setJiaolian(String jiaolian) {
		this.jiaolian = jiaolian;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}
}