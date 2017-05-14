using ClientMk1.Extra_Classes;
using ClientMk1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ClientMk1.Controllers
{
    public class PrimarySchoolController : Controller
    {
        //
        // GET: /PrimarySchool/

        public ActionResult Index()
        {
            string path = "http://exceldataapi.azurewebsites.net/api/PrimarySch";
            //path = "http://localhost:63371/api/PrimarySch"; //uncomment for offline development;
            DataAccess Data = new DataAccess();
            DALdata apidata = Data.syncSecondarySchdata(path);

            List<PrimarySchooltable> EditedSchools = SchoolCoversion.DALtoPriSchool(apidata.primaryschools); //convert for business logic;

            EditedSchools = EditedSchools.OrderBy(school => school.Name).ToList(); //LINQ used here to order by school name;

            #region Get list of columns and removes some
            List<string> cols = new List<string>();
            var qwer = EditedSchools[0].GetType().GetProperties();
            foreach (var property in qwer)
            {
                if (property.Name != "Address" && property.Name != "RollNo")
                {
                    cols.Add(property.Name);
                }
            }
            #endregion
            PrimaryListModel schoolsList = new PrimaryListModel(); //may create seperate object;
            schoolsList.primaryschools = EditedSchools;
            schoolsList.counties = apidata.counties;
            schoolsList.columns = cols;
            schoolsList.DEIS = apidata.DEIS;
            schoolsList.IrishType = apidata.IrishType;
            schoolsList.Religion = apidata.Religion;
            return View(schoolsList);
        }

        //
        // GET: /PrimarySchool/Details/5

        public ActionResult Details(string rollno)
        {
            string path = "http://exceldataapi.azurewebsites.net/api/PrimarySch/" + rollno;
            //path = "http://localhost:63371/api/PrimarySch/" + rollno;
            DataAccess data = new DataAccess();
            IndivPriSchool school = data.getPrimaryschool(path);
            return View(school);
        }
    }
}
