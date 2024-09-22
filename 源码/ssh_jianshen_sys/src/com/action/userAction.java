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

	// 对t_user表进行添加操作
	public String userAdd() {
		TUser user = new TUser();
		user.setUsername(username);
		user.setPwd(pwd);
		user.setName(name);
		user.setSex(sex);
		user.setAge(age);
		user.setAddr(addr);
		user.setTel(tel);
		userDAO.save(user);// 执行添加操作
		this.setMessage("操作成功");
		this.setPath("userMana.action");// 跳转
		return "succeed";
	}

	public String useReg() {
		TUser user = new TUser();
		String sql = "from TUser where username=?";
		Object[] con = { username };
		List userList = userDAO.getHibernateTemplate().find(sql, con);
		if (userList.size() > 0) {
			this.setMessage("登陆账号重复!");
			return "failedAdd";

		}
		user.setUsername(username);
		user.setPwd(pwd);
		user.setName(name);
		user.setSex(sex);
		user.setAge(age);
		user.setAddr(addr);
		user.setTel(tel);
		userDAO.save(user);// 执行添加操作
		return "successAdd";
	}

	public String userLogin() {
		String sql = "from TUser where username=? and pwd=?";
		Object[] con = { username, pwd };
		List userList = userDAO.getHibernateTemplate().find(sql, con);
		if (userList.size() == 0) {
			this.setMessage("用户名或密码错误");
			this.setPath("qiantai/default.jsp");
		} else {
			Map session = ServletActionContext.getContext().getSession();
			TUser user = (TUser) userList.get(0);
			session.put("user", user);
			Cart cart = new Cart();
			session.put("cart", cart);

			this.setMessage("成功登录");
			this.setPath("qiantai/default.jsp");
		}
		return "succeed";
	}

	public String userLogout() {
		Map session = ServletActionContext.getContext().getSession();
		session.remove("user");
		return ActionSupport.SUCCESS;
	}

	// 对t_user表进行管理显示操作
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
		Pagination p = new Pagination();// 创建 分页对象
		p.setIndex(index);// 设置页数
		p.setPageSize(Pagesize.size);
		p.setTotle(userList.size());// 设置总共的条数
		p.setData(userList1);// 设置数据
		request1.setAttribute("page", p); // request.put("userList", userList);
		return ActionSupport.SUCCESS;

	}

	// 对t_user表进行删除操作
	public String userDel() {
		TUser user = userDAO.findById(id);
		userDAO.delete(user);// 执行删除
		this.setMessage("操作成功");
		this.setPath("userMana.action");// 跳转
		return "succeed";

	}

	// 对t_user表进行修改前的数据提取
	public String userEditPre() {
		TUser user = userDAO.findById(id);
		Map request = (Map) ServletActionContext.getContext().get("request");
		request.put("user", user);
		return ActionSupport.SUCCESS;

	}

	// 对t_user表进行修改保存
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
		this.setMessage("操作成功");
		this.setPath("userMana.action");// 跳转
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