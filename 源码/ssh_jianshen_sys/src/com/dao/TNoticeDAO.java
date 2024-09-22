package com.dao;

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.model.TNotice;
public class TNoticeDAO extends HibernateDaoSupport
{
	private static final Log log = LogFactory.getLog(TNoticeDAO.class);

	protected void initDao()
	{
		// do nothing
	}public void save(TNotice transientInstance)
	{
		log.debug("saving TNotice instance");
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

	public void delete(TNotice persistentInstance)
	{
		log.debug("deleting TNotice instance");
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

	public TNotice findById(java.lang.Integer id)
	{
		log.debug("getting TNotice instance with id: " + id);
		try
		{
			TNotice instance = (TNotice) getHibernateTemplate().get(
					"com.model.TNotice", id);
			return instance;
		} catch (RuntimeException re)
		{
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(TNotice instance)
	{
		log.debug("finding TNotice instance by example");
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
		log.debug("finding TNotice instance with property: " + propertyName
				+ ", value: " + value);
		try
		{
			String queryString = "from TNotice as model where model."
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
		log.debug("finding all TNotice instances");
		try
		{
			String queryString = "from TNotice";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re)
		{
			log.error("find all failed", re);
			throw re;
		}
	}

	public TNotice merge(TNotice detachedInstance)
	{
		log.debug("merging TNotice instance");
		try
		{
			TNotice result = (TNotice) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re)
		{
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(TNotice instance)
	{
		log.debug("attaching dirty TNotice instance");
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

	public void attachClean(TNotice instance)
	{
		log.debug("attaching clean TNotice instance");
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

	public static TNoticeDAO getFromApplicationContext(ApplicationContext ctx)
	{
		return (TNoticeDAO) ctx.getBean("TNoticeDAO");
	}
}