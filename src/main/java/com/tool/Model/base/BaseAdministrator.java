package com.tool.Model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings({"serial", "unchecked"})
public abstract class BaseAdministrator<M extends BaseAdministrator<M>> extends Model<M> implements IBean {

	public M setAdministratorId(java.lang.Integer administratorId) {
		set("Administrator_id", administratorId);
		return (M)this;
	}
	
	public java.lang.Integer getAdministratorId() {
		return getInt("Administrator_id");
	}

	public M setAdministratorImage(java.lang.String administratorImage) {
		set("Administrator_image", administratorImage);
		return (M)this;
	}
	
	public java.lang.String getAdministratorImage() {
		return getStr("Administrator_image");
	}

	public M setAdministratorName(java.lang.String administratorName) {
		set("Administrator_name", administratorName);
		return (M)this;
	}
	
	public java.lang.String getAdministratorName() {
		return getStr("Administrator_name");
	}

	public M setAdministratorSex(java.lang.String administratorSex) {
		set("Administrator_sex", administratorSex);
		return (M)this;
	}
	
	public java.lang.String getAdministratorSex() {
		return getStr("Administrator_sex");
	}

	public M setAdministratorSchool(java.lang.String administratorSchool) {
		set("Administrator_school", administratorSchool);
		return (M)this;
	}
	
	public java.lang.String getAdministratorSchool() {
		return getStr("Administrator_school");
	}

	public M setAdministratorTel(java.lang.String administratorTel) {
		set("Administrator_tel", administratorTel);
		return (M)this;
	}
	
	public java.lang.String getAdministratorTel() {
		return getStr("Administrator_tel");
	}

	public M setAdministratorMail(java.lang.String administratorMail) {
		set("Administrator_mail", administratorMail);
		return (M)this;
	}
	
	public java.lang.String getAdministratorMail() {
		return getStr("Administrator_mail");
	}

	public M setAdministratorAddress(java.lang.String administratorAddress) {
		set("Administrator_address", administratorAddress);
		return (M)this;
	}
	
	public java.lang.String getAdministratorAddress() {
		return getStr("Administrator_address");
	}

	public M setAdministratorAccount(java.lang.String administratorAccount) {
		set("Administrator_account", administratorAccount);
		return (M)this;
	}
	
	public java.lang.String getAdministratorAccount() {
		return getStr("Administrator_account");
	}

	public M setAdministratorPassword(java.lang.String administratorPassword) {
		set("Administrator_password", administratorPassword);
		return (M)this;
	}
	
	public java.lang.String getAdministratorPassword() {
		return getStr("Administrator_password");
	}

	public M setAdministratorType(java.lang.Integer administratorType) {
		set("Administrator_type", administratorType);
		return (M)this;
	}
	
	public java.lang.Integer getAdministratorType() {
		return getInt("Administrator_type");
	}

	public M setNetworkLink(java.lang.String networkLink) {
		set("Network_link", networkLink);
		return (M)this;
	}
	
	public java.lang.String getNetworkLink() {
		return getStr("Network_link");
	}

	public M setProjectMain(java.lang.Integer projectMain) {
		set("Project_main", projectMain);
		return (M)this;
	}
	
	public java.lang.Integer getProjectMain() {
		return getInt("Project_main");
	}

	public M setProjectVillage(java.lang.Integer projectVillage) {
		set("Project_village", projectVillage);
		return (M)this;
	}
	
	public java.lang.Integer getProjectVillage() {
		return getInt("Project_village");
	}

	public M setInformationRemarks(java.lang.String informationRemarks) {
		set("Information_remarks", informationRemarks);
		return (M)this;
	}
	
	public java.lang.String getInformationRemarks() {
		return getStr("Information_remarks");
	}

	public M setInformationCode(java.lang.String informationCode) {
		set("Information_code", informationCode);
		return (M)this;
	}
	
	public java.lang.String getInformationCode() {
		return getStr("Information_code");
	}

}
