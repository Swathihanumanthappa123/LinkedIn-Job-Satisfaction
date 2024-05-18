import pandas as pd
import numpy as np
import re

pd.options.display.width = None
pd.options.display.max_columns = None
pd.set_option('display.max_rows', 5000)
pd.set_option('display.max_columns', 5000)


def get_candidate_scores(candidate_name, company):
    """Takes in a string candidate and string company and returns the overall fit scores for the company in terms of overall, skills, compensation, and culture"""

    job_info = pd.read_csv("C:\\Users\TimothyChang\Desktop\homewerk\BCAMP\LinkedIn-Data-Analysis/job_information.csv")
    candidate_info = pd.read_csv("C:\\Users\TimothyChang\Desktop\homewerk\BCAMP\LinkedIn-Data-Analysis/candidate_information.csv")
    num_job_posts = len(job_info["company_id"])
    job_info["remote_allowed"] = job_info["remote_allowed"].fillna(0)
    job_info["formatted_experience_level"] = job_info["formatted_experience_level"].fillna("Unspecify")
    job_info = job_info.drop(["med_salary", "job_posting_url"], axis="columns")

    print(candidate_info)

    for i in range(0, num_job_posts):
        sample = job_info.loc[[i]]
        if "Manager" in sample["title"].values[0]:
            job_info.loc[i, "formatted_experience_level"] = "Manager"
        elif "Director" in sample["title"].values[0]:
            job_info.loc[i, "formatted_experience_level"] = "Director"
        elif "Associate" in sample["title"].values[0]:
            job_info.loc[i, "formatted_experience_level"] = "Associate"
        elif "Senior" in sample["title"].values[0]:
            job_info.loc[i, "formatted_experience_level"] = "Senior"

    candidate = candidate_info[candidate_info["Name"] == candidate_name]

    original_skill_str = candidate["Skills"].values[0]
    desired_job = candidate["Desired Job Title"].values[0]
    desired_salary = int(re.sub(r'[^\w\s]','',candidate["Desired Salary"].values[0])[:-2])
    desired_level = candidate["Desired Job Level"].values[0]
    desired_type = candidate["Desired Job Type (part-time/full-time)"].values[0]
    working_model = candidate["Working Model (in-person, remote)"].values[0]
    user_work_life = candidate["Work-Life Balance?"].values[0]
    user_comp_bnf = candidate["Comp & Benefits?"].values[0]
    user_opp = candidate["Career Opportunities?"].values[0]
    skills_lst = original_skill_str.split(", ")
    djob_lst = desired_job.split(" ")
    dtype_lst = desired_type.split(", ")
    model_lst = working_model.split(", ")

    skll = []
    job_scr = []
    test_lst = []
    skills_scr = []
    comp_scr = []
    cult_scr = []
    for i in range(0, num_job_posts):
        sal_score = 0
        work_life_score = 0
        comp_bnf_score = 0
        opp_score = 0
        skill_score = 0
        work_type_score = 0
        work_model_score = 0
        # TODO: Make more score categories and calculate them, weight skills as more valuable than other categories

        sample = job_info.loc[[i]]
        skills_req = sample["skill_abr"].values[0]
        points = 0
        for skill in skills_lst:
            if skill in skills_req:
                points += 1

        skill_score = points / len(skills_req.split(' ')) * 3
                    #+ (points * 0.1))

        if np.isnan(sample["min_salary"].values[0]):
            sal_score = 0
        elif sample["min_salary"].values[0] >= desired_salary:
            sal_score = 1
        elif sample["min_salary"].values[0] < 1000:
            sal_score = 1 - (desired_salary - sample["min_salary"].values[0]*2000) / (desired_salary/2)
        else:
            sal_score = 1 - (desired_salary - sample["min_salary"].values[0]) / (desired_salary/2)

        if sample["work_life_balance"].values[0] >= user_work_life:
            work_life_score = 1
        else:
            work_life_score = (sample["work_life_balance"].values[0]) / user_work_life

        if sample["comp_benefits"].values[0] >= user_comp_bnf:
            comp_bnf_score = 1
        else:
            comp_bnf_score = (sample["comp_benefits"].values[0]) / user_comp_bnf

        if sample["work_life_balance"].values[0] >= user_opp:
            opp_score = 1
        else:
            opp_score = (sample["work_life_balance"].values[0]) / user_opp

        if sample["work_type"].values[0] in desired_type:
            work_type_score = 1
        else:
            work_type_score = 0

        if working_model == "remote" and sample["remote_allowed"].values[0] == 0:
            work_model_score = 0
        elif working_model == "in-person" and sample["remote_allowed"].values[0] == 1:
            work_model_score = 0
        else:
            work_model_score = 1


        score = work_life_score + comp_bnf_score + opp_score + skill_score + sal_score + work_type_score + work_model_score
        if np.isnan(sample["min_salary"].values[0]):
            score -= 0.4

        if sample["formatted_experience_level"].values[0] == desired_level:
            score += 0.3
        else: 
            score -= 0.3

        score = (score/9)*100
        score = round(score, 2)

        job_scr.append(score)
        skills_scr.append(skill_score/3 * 100)
        comp_scr.append((sal_score + comp_bnf_score) / 2 * 100)
        cult_scr.append((work_life_score + comp_bnf_score + opp_score) / 3 * 100)


    job_info["job_score"] = job_scr
    job_info["skills_score"] = skills_scr
    job_info["compensation_score"] = comp_scr
    job_info["culture_score"] = cult_scr
    job_info = job_info.sort_values("job_score", ascending=False)

    job_score_per_company = job_info.groupby(['name'])["job_score"].mean() #REALLY IMPORTANT
    skills_score_per_company = job_info.groupby(['name'])["skills_score"].mean() #REALLY IMPORTANT
    comp_score_per_company = job_info.groupby(['name'])["compensation_score"].mean() #REALLY IMPORTANT
    cult_score_per_company = job_info.groupby(['name'])["culture_score"].mean() #REALLY IMPORTANT


    job_score_res = round(job_score_per_company[company.lower()], 2)
    skills_score_res = round(skills_score_per_company[company.lower()], 2)
    comp_score_res = round(comp_score_per_company[company.lower()], 2)
    cult_score_res = round(cult_score_per_company[company.lower()], 2)


    res_str = "Candidate Name: " + candidate_name + "\nCompany: " + company + "\n\nOverall Match: " + str(job_score_res) + "\nSkills Match: " + str(skills_score_res) + "\nCompensation Score: " + str(comp_score_res) + "\nCulture Score: " + str(cult_score_res)
    return res_str

print(get_candidate_scores("Abner Aranda", "Apple"))
