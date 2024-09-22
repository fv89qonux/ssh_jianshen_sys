package com.dao;

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.model.TKecheng;
public class TKechengDAO extends HibernateDaoSupport
{
	private static final Log log = LogFactory.getLog(TKechengDAO.class);

	protected void initDao()
	{
		// do nothing
	}public void save(TKecheng transientInstance)
	{
		log.debug("saving TKecheng instance");
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

	public void delete(TKecheng persistentInstance)
	{
		log.debug("deleting TKecheng instance");
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

	public TKecheng findById(java.lang.Integer id)
	{
		log.debug("getting TKecheng instance with id: " + id);
		try
		{
			TKecheng instance = (TKecheng) getHibernateTemplate().get(
					"com.model.TKecheng", id);
			return instance;
		} catch (RuntimeException re)
		{
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(TKecheng instance)
	{
		log.debug("finding TKecheng instance by example");
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
		log.debug("finding TKecheng instance with property: " + propertyName
				+ ", value: " + value);
		try
		{
			String queryString = "from TKecheng as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re)
		{
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findAll()
	{
		log.debug("finding all TKecheng instances");
		try
		{
			String queryString = "from TKecheng";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re)
		{
			log.error("find all failed", re);
			throw re;
		}
	}

	public TKecheng merge(TKecheng detachedInstance)
	{
		log.debug("merging TKecheng instance");
		try
		{
			TKecheng result = (TKecheng) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re)
		{
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(TKecheng instance)
	{
		log.debug("attaching dirty TKecheng instance");
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

	public void attachClean(TKecheng instance)
	{
		log.debug("attaching clean TKecheng instance");
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

	public static TKechengDAO getFromApplicationContext(ApplicationContext ctx)
	{
		return (TKechengDAO) ctx.getBean("TKechengDAO");
	}
}