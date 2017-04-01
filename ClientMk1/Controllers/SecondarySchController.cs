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
            path = "http://localhost:63371/api/values";
            DataAccess data = new DataAccess();
            exceldata apidata = data.syncdata(path);
            SchoolCoversion Convert = new SchoolCoversion();
            List<School> EditedSchools = Convert.DALtoschool(apidata.schools);
            #region adds counties, genders, gaelscoil, fees and Religion to list;
            //List<string> counties = new List<string>();
            //List<string> Genders = new List<string>();
            //List<string> IrishType = new List<string>();
            //List<string> FeePaying = new List<string>();
            //List<string> Religion = new List<string>();
            //foreach (School sch in EditedSchools)
            //{
            //    if (!counties.Contains(sch.County) && sch.County != "")
            //    {
            //        counties.Add(sch.County);
            //    }
            //    if (!Genders.Contains(sch.SchoolGender) && sch.SchoolGender != "")
            //    {
            //        Genders.Add(sch.SchoolGender);
            //    }
            //    if (!IrishType.Contains(sch.IrishClassification) && sch.IrishClassification != "")
            //    {
            //        IrishType.Add(sch.IrishClassification);
            //    }
            //    if (!FeePaying.Contains(sch.FeePaying) && sch.FeePaying != "")
            //    {
            //        FeePaying.Add(sch.FeePaying);
            //    }
            //    if (!Religion.Contains(sch.Religion) && sch.Religion != "")
            //    {
            //        Religion.Add(sch.Religion);
            //    }
            //}
            #endregion

            #region Get list of columns and removes some
            List<string> cols = new List<string>();
            var qwer = EditedSchools[0].GetType().GetProperties();
            foreach (var property in qwer)
            {
                if (property.Name != "Address1" && property.Name != "Address2" && property.Name != "Address3" && property.Name != "Address4" && property.Name != "Boarding" && property.Name != "Female" && property.Name != "Male" && property.Name != "RollNo" && property.Name != "Principal" && property.Name != "Phone")
                {
                    cols.Add(property.Name);
                }
            }
            #endregion

            MasterSchools mschools = new MasterSchools();
            mschools.Schools = EditedSchools;
            mschools.name = "sdsd";
            mschools.countyfilteroptions = apidata.counties;
            mschools.SencondLevelSchoolcols = cols;
            mschools.Genders = apidata.Genders;
            mschools.IrishType = apidata.IrishType;
            mschools.FeePaying = apidata.FeePaying;
            mschools.Religion = apidata.Religion;
            return View(mschools);
        }

        //
        // GET: /SecondarySch/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /SecondarySch/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /SecondarySch/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /SecondarySch/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /SecondarySch/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /SecondarySch/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /SecondarySch/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
