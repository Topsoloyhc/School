#sql("findAdminOfProject")
   SELECT project.*,project_file.File_id,project_file.File_code,project_file.File_name, 
   competition.Administrator_id,competition.Competition_endTime,competition.Competition_name,competition.Competition_request,competition.Competition_reward,competition.Competition_setTime,competition.Competition_sponsor,competition.Competition_type  
   FROM competition LEFT OUTER JOIN project ON competition.Competition_id = project.Competition_id LEFT OUTER JOIN project_file ON project.Project_id = project_file.Project_id WHERE competition.Competition_id = #para(0) AND project.Project_school = #para(1);
#end

#sql("findAdminOfProjectSort")
   SELECT project.*,project_file.File_id,project_file.File_code,project_file.File_name, 
   competition.Administrator_id,competition.Competition_endTime,competition.Competition_name,competition.Competition_request,competition.Competition_reward,competition.Competition_setTime,competition.Competition_sponsor,competition.Competition_type   
   FROM competition LEFT OUTER JOIN project ON competition.Competition_id = project.Competition_id LEFT OUTER JOIN project_file ON project.Project_id = project_file.Project_id WHERE competition.Competition_id = #para(0) AND project.Project_school = #para(1) AND project.Project_type = #para(2) AND project.Project_status1 = #para(3);
#end

#sql("findAdminOfProjectSortByCompetion")
   SELECT project.*,project_file.File_id,project_file.File_code,project_file.File_name, 
   competition.Administrator_id,competition.Competition_endTime,competition.Competition_name,competition.Competition_request,competition.Competition_reward,competition.Competition_setTime,competition.Competition_sponsor,competition.Competition_type
   FROM competition LEFT OUTER JOIN project ON competition.Competition_id = project.Competition_id LEFT OUTER JOIN project_file ON project.Project_id = project_file.Project_id WHERE competition.Competition_id = #para(0) AND project.Project_school = #para(1) AND project.Project_type = #para(2);
#end

#sql("findAdminOfProjectSortByProjectStatus1")
   SELECT project.*,project_file.File_id,project_file.File_code,project_file.File_name, 
   competition.Administrator_id,competition.Competition_endTime,competition.Competition_name,competition.Competition_request,competition.Competition_reward,competition.Competition_setTime,competition.Competition_sponsor,competition.Competition_type  
   FROM competition LEFT OUTER JOIN project ON competition.Competition_id = project.Competition_id LEFT OUTER JOIN project_file ON project.Project_id = project_file.Project_id WHERE competition.Competition_id = #para(0) AND project.Project_school = #para(1) AND project.Project_status1 = #para(2);
#end

#sql("findAllProjectOfCompetion")
   SELECT project.*,project_file.File_id,project_file.File_code,project_file.File_name 
   FROM project LEFT OUTER JOIN project_file ON project.Project_id = project_file.Project_id WHERE project.Project_level<>1 AND project.Competition_id = #para(0) ORDER BY project.Project_school;
#end

#sql("findAllProjectOfCompetionSort")
   SELECT project.*,project_file.File_id,project_file.File_code,project_file.File_name 
   FROM project LEFT OUTER JOIN project_file ON project.Project_id = project_file.Project_id WHERE project.Project_level<>1 AND project.Competition_id = #para(0) AND project.Project_type = #para(1) AND project.Project_status2 = #para(2) ORDER BY project.Project_school;
#end

#sql("findAllProjectOfCompetionSortByCompetion")
   SELECT project.*,project_file.File_id,project_file.File_code,project_file.File_name 
   FROM project LEFT OUTER JOIN project_file ON project.Project_id = project_file.Project_id WHERE project.Project_level<>1 AND project.Competition_id = #para(0) AND project.Project_type = #para(1) ORDER BY project.Project_school;
#end

#sql("findAllProjectOfCompetionSortByProjectStatus2")
   SELECT project.*,project_file.File_id,project_file.File_code,project_file.File_name 
   FROM project LEFT OUTER JOIN project_file ON project.Project_id = project_file.Project_id WHERE project.Project_level<>1 AND project.Competition_id = #para(0) AND project.Project_status2 = #para(1) ORDER BY project.Project_school;
#end

#sql("findProjectOfTeam")
	SELECT project.*,team_member.Member_enrolTime,team_member.Member_id,team_member.Member_IDNumber,team_member.Member_mail,team_member.Member_name,team_member.Member_professional,team_member.Member_school,team_member.Member_tel,team_member.Member_type,
	project_file.File_id,project_file.File_code,project_file.File_name 
	FROM project_file RIGHT OUTER JOIN project ON project.Project_id = project_file.Project_id  LEFT OUTER JOIN team_member ON project.Team_id = team_member.Team_id WHERE project.Project_id =  #para(0);
#end

#sql("findAdviserById")
	SELECT * FROM adviser WHERE adviser.Adviser_id = #para(0);
#end

#sql("findPaticipantOfProject")
	SELECT project.* ,project_file.File_id,project_file.File_code,project_file.File_name ,team.Team_name,team.Team_setTime,participant.* 
	FROM project_file RIGHT OUTER JOIN project ON project_file.Project_id = project.Project_id  RIGHT OUTER JOIN team ON project.Team_id = team.Team_id RIGHT OUTER JOIN participant ON participant.Participant_id = team.Participant_id WHERE participant.Participant_id = #para(0);
#end

#sql("getAllReturnReceipt")
	SELECT members_information.*,administrator.Administrator_account,administrator.Administrator_address,administrator.Administrator_image,administrator.Administrator_mail,administrator.Administrator_name,administrator.Administrator_password,administrator.Administrator_school,administrator.Administrator_sex,administrator.Administrator_tel,administrator.Administrator_type,administrator.Information_code,administrator.Information_remarks 
	FROM members_information LEFT OUTER JOIN administrator ON members_information.Administrator_id = administrator.Administrator_id  WHERE members_information.Administrator_id = #para(0);
#end

#sql("findInviteOfUser")
	SELECT invite.*,participant.Participant_name,participant.Participant_phone,participant.Participant_account FROM invite LEFT OUTER JOIN participant ON invite.Invited_user = participant.Participant_id WHERE invite.Invite_user = #para(0) ORDER BY invite.Invite_status;
#end

#sql("findInvitedOfUser")
	SELECT invite.*,participant.Participant_name,participant.Participant_phone,participant.Participant_account FROM invite LEFT OUTER JOIN participant ON invite.Invite_user = participant.Participant_id WHERE invite.Invited_user = #para(0) ORDER BY invite.Invite_status;
#end

#sql("findAllCompetition")
	SELECT * FROM competition;
#end