using ClientMk1.Extra_Classes;
using ClientMk1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ClientMk1.Controllers
{
    public class SecondarySchController : Controller
    {
        //
        // GET: /SecondarySch/

        public ActionResult Index()
        {
            string path = "http://exceldataapi.azurewebsites.net/api/values";
            //path = "http://localhost:63371/api/values"; //uncomment for offline dev;
            DataAccess data = new DataAccess(); //object that interacts with API for data;
            DALdata apidata = data.syncSecondarySchdata(path); //access api for data
            List<SecondarySchooltable> EditedSchools = SchoolCoversion.DALtoSecSchool(apidata.schools);
         

            #region Get list of columns for table and removes some
            List<string> cols = new List<string>();
            var qwer = EditedSchools[0].GetType().GetProperties();
            foreach (var property in qwer)
            {
                if (property.Name != "Address1" && property.Name != "Address2" && property.Name != "Address3" && property.Name != "Address4" && property.Name != "RollNo")
                {
                    cols.Add(property.Name);
                }
            }
            #endregion

            SecondaryListModel schoolsList = new SecondaryListModel();
            schoolsList.Schools = EditedSchools;
            schoolsList.countyfilteroptions = apidata.counties; //contains all the filter options to reduce work client side;
            schoolsList.columns = cols;
            schoolsList.Genders = apidata.Genders;
            schoolsList.IrishType = apidata.IrishType;
            schoolsList.FeePaying = apidata.FeePaying;
            schoolsList.Religion = apidata.Religion;
            return View(schoolsList);
        }

        //
        // GET: /SecondarySch/Details/5

        public ActionResult Details(string rollno)
        {
            string path = "http://exceldataapi.azurewebsites.net/api/values/" + rollno; //for pair programming rem missing / at end;
            //path = "http://localhost:63371/api/values/" + rollno; //offline dev;
            DataAccess data = new DataAccess();
            IndivSecSchool school = data.getSecondaryschool(path); //dataaccess from api;
            return View(school);
        }
    }
}
