using ClientMk1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientMk1.Extra_Classes
{
    public class SchoolCoversion
    {
        public List<School> DALtoschool(List<SchoolDAL> apiSchools)
        {
            List<School> editedSchools = new List<School>();
            foreach (SchoolDAL apiSchool in apiSchools)
            {
                if (apiSchool.Name != "")
                {
                    School editedSchool = new School();
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
                    editedSchool.TotalEnrolments = total;

                    editedSchools.Add(editedSchool);
                }
            }
            return editedSchools;
        }
    }
}