import pandas as pd
import numpy as np

pd.options.display.width = None
pd.options.display.max_columns = None
pd.set_option('display.max_rows', 5000)
pd.set_option('display.max_columns', 5000)

job_info = pd.read_csv("/Users/abner.aranda/Desktop/Job_Satisfaction_Project/Data/job_information.csv")
candidate_info = pd.read_csv("/Users/abner.aranda/Desktop/Job_Satisfaction_Project/Data/candidate_information.csv")
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

candidate = candidate_info[candidate_info["Name"] == "Duy Le"]

original_skill_str = candidate["Skills"].values[0]
desired_job = candidate["Desired Job Title"].values[0]
desired_level = candidate["Desired Job Level"].values[0]
user_work_life = candidate["Work-Life Balance?"].values[0]
user_comp_bnf = candidate["Comp & Benefits?"].values[0]
user_opp = candidate["Career Opportunities?"].values[0]
skills_lst = original_skill_str.split(", ")
djob_lst = desired_job.split(" ")

skll = []
scr = []
for i in range(0, num_job_posts):
    work_life_score = 0
    comp_bnf_score = 0
    opp_score = 0
    skill_score = 0

    sample = job_info.loc[[i]]
    skills_req = sample["skill_abr"].values[0]
    points = 0
    for skill in skills_lst:
        if skill in skills_req:
            points += 1

    skill_score = points / len(skills_lst)
                   #+ (points * 0.1))

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

    score = work_life_score + comp_bnf_score + opp_score + skill_score
    if np.isnan(sample["min_salary"].values[0]):
        score -= 0.4

    if sample["formatted_experience_level"].values[0] == desired_level:
        score += 0.3

    score = (score/4)*100
    scr.append(score)

job_info["job_score"] = scr
job_info = job_info.sort_values("job_score", ascending=False)
print(job_info.head(40))
