package com.tool.Model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings({"serial", "unchecked"})
public abstract class BaseCompetition<M extends BaseCompetition<M>> extends Model<M> implements IBean {

	public M setCompetitionId(java.lang.Integer competitionId) {
		set("Competition_id", competitionId);
		return (M)this;
	}
	
	public java.lang.Integer getCompetitionId() {
		return getInt("Competition_id");
	}

	public M setAdministratorId(java.lang.Integer administratorId) {
		set("Administrator_id", administratorId);
		return (M)this;
	}
	
	public java.lang.Integer getAdministratorId() {
		return getInt("Administrator_id");
	}

	public M setCompetitionType(java.lang.String competitionType) {
		set("Competition_type", competitionType);
		return (M)this;
	}
	
	public java.lang.String getCompetitionType() {
		return getStr("Competition_type");
	}

	public M setCompetitionName(java.lang.String competitionName) {
		set("Competition_name", competitionName);
		return (M)this;
	}
	
	public java.lang.String getCompetitionName() {
		return getStr("Competition_name");
	}

	public M setCompetitionSponsor(java.lang.String competitionSponsor) {
		set("Competition_sponsor", competitionSponsor);
		return (M)this;
	}
	
	public java.lang.String getCompetitionSponsor() {
		return getStr("Competition_sponsor");
	}

	public M setCompetitionSettime(java.util.Date competitionSettime) {
		set("Competition_setTime", competitionSettime);
		return (M)this;
	}
	
	public java.util.Date getCompetitionSettime() {
		return get("Competition_setTime");
	}

	public M setCompetitionEndtime(java.util.Date competitionEndtime) {
		set("Competition_endTime", competitionEndtime);
		return (M)this;
	}
	
	public java.util.Date getCompetitionEndtime() {
		return get("Competition_endTime");
	}

	public M setCompetitionRequest(java.lang.String competitionRequest) {
		set("Competition_request", competitionRequest);
		return (M)this;
	}
	
	public java.lang.String getCompetitionRequest() {
		return getStr("Competition_request");
	}

	public M setCompetitionReward(java.lang.String competitionReward) {
		set("Competition_reward", competitionReward);
		return (M)this;
	}
	
	public java.lang.String getCompetitionReward() {
		return getStr("Competition_reward");
	}

}
