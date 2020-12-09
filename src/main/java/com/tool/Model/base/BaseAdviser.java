package com.tool.Model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings({"serial", "unchecked"})
public abstract class BaseAdviser<M extends BaseAdviser<M>> extends Model<M> implements IBean {

	public M setAdviserId(java.lang.Integer adviserId) {
		set("Adviser_id", adviserId);
		return (M)this;
	}
	
	public java.lang.Integer getAdviserId() {
		return getInt("Adviser_id");
	}

	public M setAdviserName(java.lang.String adviserName) {
		set("Adviser_name", adviserName);
		return (M)this;
	}
	
	public java.lang.String getAdviserName() {
		return getStr("Adviser_name");
	}

	public M setAdviserSchool(java.lang.String adviserSchool) {
		set("Adviser_school", adviserSchool);
		return (M)this;
	}
	
	public java.lang.String getAdviserSchool() {
		return getStr("Adviser_school");
	}

	public M setAdviserAcademy(java.lang.String adviserAcademy) {
		set("Adviser_academy", adviserAcademy);
		return (M)this;
	}
	
	public java.lang.String getAdviserAcademy() {
		return getStr("Adviser_academy");
	}

	public M setAdviserRank(java.lang.Integer adviserRank) {
		set("Adviser_rank", adviserRank);
		return (M)this;
	}
	
	public java.lang.Integer getAdviserRank() {
		return getInt("Adviser_rank");
	}

}