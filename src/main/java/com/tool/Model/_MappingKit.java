package com.tool.Model;

import com.jfinal.plugin.activerecord.ActiveRecordPlugin;

/**
 * Generated by JFinal, do not modify this file.
 * <pre>
 * Example:
 * public void configPlugin(Plugins me) {
 *     ActiveRecordPlugin arp = new ActiveRecordPlugin(...);
 *     _MappingKit.mapping(arp);
 *     me.add(arp);
 * }
 * </pre>
 */
public class _MappingKit {
	
	public static void mapping(ActiveRecordPlugin arp) {
		arp.addMapping("administrator", "Administrator_id", Administrator.class);
		arp.addMapping("adviser", "Adviser_id", Adviser.class);
		arp.addMapping("competition", "Competition_id", Competition.class);
		arp.addMapping("information_file", "File_id", InformationFile.class);
		arp.addMapping("invite", "Invite_id", Invite.class);
		arp.addMapping("members_information", "Information_id", MembersInformation.class);
		arp.addMapping("participant", "Participant_id", Participant.class);
		arp.addMapping("project", "Project_id", Project.class);
		arp.addMapping("project_file", "File_id", ProjectFile.class);
		arp.addMapping("team", "Team_id", Team.class);
		arp.addMapping("team_member", "Member_id", TeamMember.class);
	}
}

