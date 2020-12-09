package com.tool.Model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings({"serial", "unchecked"})
public abstract class BaseInvite<M extends BaseInvite<M>> extends Model<M> implements IBean {

	public M setInviteId(java.lang.Integer inviteId) {
		set("Invite_id", inviteId);
		return (M)this;
	}
	
	public java.lang.Integer getInviteId() {
		return getInt("Invite_id");
	}

	public M setInviteUser(java.lang.Integer inviteUser) {
		set("Invite_user", inviteUser);
		return (M)this;
	}
	
	public java.lang.Integer getInviteUser() {
		return getInt("Invite_user");
	}

	public M setInvitedUser(java.lang.Integer invitedUser) {
		set("Invited_user", invitedUser);
		return (M)this;
	}
	
	public java.lang.Integer getInvitedUser() {
		return getInt("Invited_user");
	}

	public M setInviteTeam(java.lang.Integer inviteTeam) {
		set("Invite_team", inviteTeam);
		return (M)this;
	}
	
	public java.lang.Integer getInviteTeam() {
		return getInt("Invite_team");
	}

	public M setInviteStatus(java.lang.Integer inviteStatus) {
		set("Invite_status", inviteStatus);
		return (M)this;
	}
	
	public java.lang.Integer getInviteStatus() {
		return getInt("Invite_status");
	}

}