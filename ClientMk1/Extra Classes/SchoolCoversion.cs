using ClientMk1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientMk1.Extra_Classes
{
    public class SchoolCoversion
    {
        public static List<SecondarySchooltable> DALtoSecSchool(List<SecSchoolDAL> apiSchools)
        {
            List<SecondarySchooltable> editedSchools = new List<SecondarySchooltable>();
            foreach (SecSchoolDAL apiSchool in apiSchools)
            {
                if (apiSchool.Name != "")
                {
                    SecondarySchooltable editedSchool = new SecondarySchooltable(); //maybe constructor;
                    editedSchool.RollNo = apiSchool.RollNo;
                    editedSchool.Name = apiSchool.Name;
                    editedSchool.County = apiSchool.County;
                    editedSchool.Gender = apiSchool.Gender;
                    editedSchool.Irish = apiSchool.Irish;
                    editedSchool.Fees = apiSchool.Fees;
                    editedSchool.Religion = apiSchool.Religion;
                    editedSchool.Address1 = apiSchool.Address1;
                    editedSchool.Address2 = apiSchool.Address2;
                    editedSchool.Address3 = apiSchool.Address3;
                    editedSchool.Address4 = apiSchool.Address4;
                    int totalgirls = 0; int totalboys = 0;
                    bool IsgirlSuccess = int.TryParse(apiSchool.Female, out totalgirls);
                    bool IsboySuccess = int.TryParse(apiSchool.Male, out totalboys);
                    int total = totalgirls + totalboys;
                    editedSchool.Size = total;

                    editedSchools.Add(editedSchool);
                }
            }
            return editedSchools;
        }

        public static List<PrimarySchooltable> DALtoPriSchool(List<PrimarySchoolDAL> apiSchools)
        {
            List<PrimarySchooltable> editedSchools = new List<PrimarySchooltable>();
            foreach (PrimarySchoolDAL apiSchool in apiSchools)
            {
                if (apiSchool.Name != "")
                {
                    PrimarySchooltable school = new PrimarySchooltable();
                    school.RollNo = apiSchool.RollNo;
                    school.Name = apiSchool.Name;
                    school.Address = apiSchool.Address;
                    school.County = apiSchool.County;
                    school.Irish = apiSchool.Irish;
                    school.Religion = apiSchool.Ethos;
                    school.DEIS = apiSchool.DEIS;
                    school.Girls = int.Parse(apiSchool.TotalGirls);
                    school.Boys = int.Parse(apiSchool.TotalBoys);
                    school.Total = int.Parse(apiSchool.TotalPupils);

                    editedSchools.Add(school);
                }
            }
            return editedSchools;
        }
    }
}