package com.action;

import java.util.List;
import java.util.Map;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import com.dao.TUserDAO;

import com.model.TUser;
import com.opensymphony.xwork2.ActionSupport;
import com.util.Cart;
import com.util.Pagesize;
import com.util.Pagination;

@SuppressWarnings(value = { "unchecked", "serial" })
public class userAction extends ActionSupport {
	private Integer id;
	private String username;
	private String pwd;
	private String name;
	private String sex;
	private String age;
	private String addr;
	private String tel;
	private String message;
	private String path;
	private TUserDAO userDAO;

	// ��t_user�������Ӳ���
	public String userAdd() {
		TUser user = new TUser();
		user.setUsername(username);
		user.setPwd(pwd);
		user.setName(name);
		user.setSex(sex);
		user.setAge(age);
		user.setAddr(addr);
		user.setTel(tel);
		userDAO.save(user);// ִ����Ӳ���
		this.setMessage("�����ɹ�");
		this.setPath("userMana.action");// ��ת
		return "succeed";
	}

	public String useReg() {
		TUser user = new TUser();
		String sql = "from TUser where username=?";
		Object[] con = { username };
		List userList = userDAO.getHibernateTemplate().find(sql, con);
		if (userList.size() > 0) {
			this.setMessage("��½�˺��ظ�!");
			return "failedAdd";

		}
		user.setUsername(username);
		user.setPwd(pwd);
		user.setName(name);
		user.setSex(sex);
		user.setAge(age);
		user.setAddr(addr);
		user.setTel(tel);
		userDAO.save(user);// ִ����Ӳ���
		return "successAdd";
	}

	public String userLogin() {
		String sql = "from TUser where username=? and pwd=?";
		Object[] con = { username, pwd };
		List userList = userDAO.getHibernateTemplate().find(sql, con);
		if (userList.size() == 0) {
			this.setMessage("�û������������");
			this.setPath("qiantai/default.jsp");
		} else {
			Map session = ServletActionContext.getContext().getSession();
			TUser user = (TUser) userList.get(0);
			session.put("user", user);
			Cart cart = new Cart();
			session.put("cart", cart);

			this.setMessage("�ɹ���¼");
			this.setPath("qiantai/default.jsp");
		}
		return "succeed";
	}

	public String userLogout() {
		Map session = ServletActionContext.getContext().getSession();
		session.remove("user");
		return ActionSupport.SUCCESS;
	}

	// ��t_user����й�����ʾ����
	public String userMana() {
		String sql = "from TUser order by id DESC";
		List userList = userDAO.getHibernateTemplate().find(sql);
		Map request = (Map) ServletActionContext.getContext().get("request");
		HttpServletRequest request1 = ServletActionContext.getRequest();
		int index = 0;
		if (request1.getParameter("index") == null) {
			index = 1;
		} else {
			index = Integer.parseInt(request1.getParameter("index"));
		}
		int fromIndex = (index - 1) * Pagesize.size;
		int toIndex = Math.min(fromIndex + Pagesize.size, userList.size());
		List userList1 = userList.subList(fromIndex, toIndex);
		Pagination p = new Pagination();// ���� ��ҳ����
		p.setIndex(index);// ����ҳ��
		p.setPageSize(Pagesize.size);
		p.setTotle(userList.size());// �����ܹ�������
		p.setData(userList1);// ��������
		request1.setAttribute("page", p); // request.put("userList", userList);
		return ActionSupport.SUCCESS;

	}

	// ��t_user�����ɾ������
	public String userDel() {
		TUser user = userDAO.findById(id);
		userDAO.delete(user);// ִ��ɾ��
		this.setMessage("�����ɹ�");
		this.setPath("userMana.action");// ��ת
		return "succeed";

	}

	// ��t_user������޸�ǰ��������ȡ
	public String userEditPre() {
		TUser user = userDAO.findById(id);
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("user", user);
		return ActionSupport.SUCCESS;

	}

	// ��t_user������޸ı���
	public String userEdit() {
		TUser user = userDAO.findById(id);
		user.setUsername(username);
		user.setPwd(pwd);
		user.setName(name);
		user.setSex(sex);
		user.setAge(age);
		user.setAddr(addr);
		user.setTel(tel);
		userDAO.getHibernateTemplate().update(user);
		this.setMessage("�����ɹ�");
		this.setPath("userMana.action");// ��ת
		return "succeed";

	}

	public TUserDAO getUserDAO() {
		return userDAO;
	}

	public void setUserDAO(TUserDAO userDAO) {
		this.userDAO = userDAO;
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}
}