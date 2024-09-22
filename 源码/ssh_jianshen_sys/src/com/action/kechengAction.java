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

	// 对t_kecheng表进行添加操作
	public String kechengAdd() {
		TKecheng kecheng = new TKecheng();
		kecheng.setName(name);
		kecheng.setJieshao(jieshao);
		kecheng.setJiaolian(jiaolian);
		kecheng.setTel(tel);
		kechengDAO.save(kecheng);// 执行添加操作
		this.setMessage("操作成功");
		this.setPath("kechengMana.action");// 跳转
		return "succeed";
	}

	public String kechengAll() {
		String sql = "from TKecheng order by id DESC";
		List kechengList = kechengDAO.getHibernateTemplate().find(sql);
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("kechengAll", kechengList);

		return ActionSupport.SUCCESS;
	}

	// 对t_kecheng表进行管理显示操作
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
		Pagination p = new Pagination();// 创建 分页对象
		p.setIndex(index);// 设置页数
		p.setPageSize(Pagesize.size);
		p.setTotle(kechengList.size());// 设置总共的条数
		p.setData(kechengList1);// 设置数据
		request1.setAttribute("page", p); // request.put("kechengList",
											// kechengList);
		return ActionSupport.SUCCESS;

	}

	// 对t_kecheng表进行删除操作
	public String kechengDel() {
		TKecheng kecheng = kechengDAO.findById(id);
		kechengDAO.delete(kecheng);// 执行删除
		this.setMessage("操作成功");
		this.setPath("kechengMana.action");// 跳转
		return "succeed";

	}

	// 对t_kecheng表进行修改前的数据提取
	public String kechengEditPre() {
		TKecheng kecheng = kechengDAO.findById(id);
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("kecheng", kecheng);
		return ActionSupport.SUCCESS;

	}

	// 对t_kecheng表进行修改保存
	public String kechengEdit() {
		TKecheng kecheng = kechengDAO.findById(id);
		kecheng.setName(name);
		kecheng.setJieshao(jieshao);
		kecheng.setJiaolian(jiaolian);
		kecheng.setTel(tel);
		kechengDAO.getHibernateTemplate().update(kecheng);
		this.setMessage("操作成功");
		this.setPath("kechengMana.action");// 跳转
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