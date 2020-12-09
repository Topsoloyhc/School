package com.tool.Model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings({"serial", "unchecked"})
public abstract class BaseProject<M extends BaseProject<M>> extends Model<M> implements IBean {

	public M setProjectId(java.lang.Integer projectId) {
		set("Project_id", projectId);
		return (M)this;
	}
	
	public java.lang.Integer getProjectId() {
		return getInt("Project_id");
	}

	public M setTeamId(java.lang.Integer teamId) {
		set("Team_id", teamId);
		return (M)this;
	}
	
	public java.lang.Integer getTeamId() {
		return getInt("Team_id");
	}

	public M setCompetitionId(java.lang.Integer competitionId) {
		set("Competition_id", competitionId);
		return (M)this;
	}
	
	public java.lang.Integer getCompetitionId() {
		return getInt("Competition_id");
	}

	public M setProjectSchool(java.lang.String projectSchool) {
		set("Project_school", projectSchool);
		return (M)this;
	}
	
	public java.lang.String getProjectSchool() {
		return getStr("Project_school");
	}

	public M setProjectType(java.lang.Integer projectType) {
		set("Project_type", projectType);
		return (M)this;
	}
	
	public java.lang.Integer getProjectType() {
		return getInt("Project_type");
	}

	public M setProjectSettime(java.util.Date projectSettime) {
		set("Project_setTime", projectSettime);
		return (M)this;
	}
	
	public java.util.Date getProjectSettime() {
		return get("Project_setTime");
	}

	public M setProjectLevel(java.lang.Integer projectLevel) {
		set("Project_level", projectLevel);
		return (M)this;
	}
	
	public java.lang.Integer getProjectLevel() {
		return getInt("Project_level");
	}

	public M setProjectStatus1(java.lang.Integer projectStatus1) {
		set("Project_status1", projectStatus1);
		return (M)this;
	}
	
	public java.lang.Integer getProjectStatus1() {
		return getInt("Project_status1");
	}

	public M setProjectStatus2(java.lang.Integer projectStatus2) {
		set("Project_status2", projectStatus2);
		return (M)this;
	}
	
	public java.lang.Integer getProjectStatus2() {
		return getInt("Project_status2");
	}

	public M setProjectStatus3(java.lang.Integer projectStatus3) {
		set("Project_status3", projectStatus3);
		return (M)this;
	}
	
	public java.lang.Integer getProjectStatus3() {
		return getInt("Project_status3");
	}

	public M setAdviser1(java.lang.Integer adviser1) {
		set("Adviser_1", adviser1);
		return (M)this;
	}
	
	public java.lang.Integer getAdviser1() {
		return getInt("Adviser_1");
	}

	public M setAdviser2(java.lang.Integer adviser2) {
		set("Adviser_2", adviser2);
		return (M)this;
	}
	
	public java.lang.Integer getAdviser2() {
		return getInt("Adviser_2");
	}

	public M setProjectName(java.lang.String projectName) {
		set("Project_name", projectName);
		return (M)this;
	}
	
	public java.lang.String getProjectName() {
		return getStr("Project_name");
	}

	public M setProjectIntroduction(java.lang.String projectIntroduction) {
		set("Project_introduction", projectIntroduction);
		return (M)this;
	}
	
	public java.lang.String getProjectIntroduction() {
		return getStr("Project_introduction");
	}

	public M setProjectLogo(java.lang.String projectLogo) {
		set("Project_logo", projectLogo);
		return (M)this;
	}
	
	public java.lang.String getProjectLogo() {
		return getStr("Project_logo");
	}

	public M setScore1(java.lang.String score1) {
		set("Score_1", score1);
		return (M)this;
	}
	
	public java.lang.String getScore1() {
		return getStr("Score_1");
	}

	public M setScore2(java.lang.String score2) {
		set("Score_2", score2);
		return (M)this;
	}
	
	public java.lang.String getScore2() {
		return getStr("Score_2");
	}

	public M setScore3(java.lang.String score3) {
		set("Score_3", score3);
		return (M)this;
	}
	
	public java.lang.String getScore3() {
		return getStr("Score_3");
	}

	public M setScore4(java.lang.String score4) {
		set("Score_4", score4);
		return (M)this;
	}
	
	public java.lang.String getScore4() {
		return getStr("Score_4");
	}

	public M setScore5(java.lang.String score5) {
		set("Score_5", score5);
		return (M)this;
	}
	
	public java.lang.String getScore5() {
		return getStr("Score_5");
	}

	public M setJudges1(java.lang.Integer judges1) {
		set("Judges_1", judges1);
		return (M)this;
	}
	
	public java.lang.Integer getJudges1() {
		return getInt("Judges_1");
	}

	public M setJudges2(java.lang.Integer judges2) {
		set("Judges_2", judges2);
		return (M)this;
	}
	
	public java.lang.Integer getJudges2() {
		return getInt("Judges_2");
	}

	public M setJudges3(java.lang.Integer judges3) {
		set("Judges_3", judges3);
		return (M)this;
	}
	
	public java.lang.Integer getJudges3() {
		return getInt("Judges_3");
	}

	public M setJudges4(java.lang.Integer judges4) {
		set("Judges_4", judges4);
		return (M)this;
	}
	
	public java.lang.Integer getJudges4() {
		return getInt("Judges_4");
	}

	public M setJudges5(java.lang.Integer judges5) {
		set("Judges_5", judges5);
		return (M)this;
	}
	
	public java.lang.Integer getJudges5() {
		return getInt("Judges_5");
	}

	public M setProjectHost(java.lang.String projectHost) {
		set("Project_host", projectHost);
		return (M)this;
	}
	
	public java.lang.String getProjectHost() {
		return getStr("Project_host");
	}

}
