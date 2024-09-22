package com.dao;

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.model.TWenzhang;

/**
 * A data access object (DAO) providing persistence and search support for
 * TWenzhang entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see com.model.TWenzhang
 * @author MyEclipse Persistence Tools
 */

public class TWenzhangDAO extends HibernateDaoSupport
{
	private static final Log log = LogFactory.getLog(TWenzhangDAO.class);
	// property constants
	public static final String MINGCHENG = "mingcheng";
	public static final String JIESHAO = "jieshao";
	public static final String FUJIAN = "fujian";


	public static final String SHIFOUTEJIA = "shijian";
	public static final String DEL = "del";

	protected void initDao()
	{
		// do nothing
	}

	public void save(TWenzhang transientInstance)
	{
		log.debug("saving TWenzhang instance");
		try
		{
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re)
		{
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(TWenzhang persistentInstance)
	{
		log.debug("deleting TWenzhang instance");
		try
		{
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re)
		{
			log.error("delete failed", re);
			throw re;
		}
	}

	public TWenzhang findById(java.lang.Integer id)
	{
		log.debug("getting TWenzhang instance with id: " + id);
		try
		{
			TWenzhang instance = (TWenzhang) getHibernateTemplate().get(
					"com.model.TWenzhang", id);
			return instance;
		} catch (RuntimeException re)
		{
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(TWenzhang instance)
	{
		log.debug("finding TWenzhang instance by example");
		try
		{
			List results = getHibernateTemplate().findByExample(instance);
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re)
		{
			log.error("find by example failed", re);
			throw re;
		}
	}

	public List findByProperty(String propertyName, Object value)
	{
		log.debug("finding TWenzhang instance with property: " + propertyName
				+ ", value: " + value);
		try
		{
			String queryString = "from TWenzhang as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re)
		{
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByMingcheng(Object mingcheng)
	{
		return findByProperty(MINGCHENG, mingcheng);
	}

	public List findByJieshao(Object jieshao)
	{
		return findByProperty(JIESHAO, jieshao);
	}

	public List findByFujian(Object fujian)
	{
		return findByProperty(FUJIAN, fujian);
	}


	
	public List findByShijian(Object shijian)
	{
		return findByProperty(SHIFOUTEJIA, shijian);
	}

	public List findByDel(Object del)
	{
		return findByProperty(DEL, del);
	}

	public List findAll()
	{
		log.debug("finding all TWenzhang instances");
		try
		{
			String queryString = "from TWenzhang";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re)
		{
			log.error("find all failed", re);
			throw re;
		}
	}

	public TWenzhang merge(TWenzhang detachedInstance)
	{
		log.debug("merging TWenzhang instance");
		try
		{
			TWenzhang result = (TWenzhang) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re)
		{
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(TWenzhang instance)
	{
		log.debug("attaching dirty TWenzhang instance");
		try
		{
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re)
		{
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(TWenzhang instance)
	{
		log.debug("attaching clean TWenzhang instance");
		try
		{
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re)
		{
			log.error("attach failed", re);
			throw re;
		}
	}

	public static TWenzhangDAO getFromApplicationContext(ApplicationContext ctx)
	{
		return (TWenzhangDAO) ctx.getBean("TWenzhangDAO");
	}
}