using ClientMk1.Extra_Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ClientMk1.Models;

namespace ClientMk1.Controllers
{
    public class PrimarySchController : Controller
    {
        //
        // GET: /PrimarySch/

        public ActionResult Index()
        {
            string path = "http://exceldataapi.azurewebsites.net/api/PrimarySch";
            DataAccess Data = new DataAccess();
            List<PrimarySchool> schools = Data.syncPrimarySchdata(path);
            //SchoolCoversion Convert = new SchoolCoversion();
            //List<School> EditedSchools = Convert.DALtoschool(schools); //No need for conversion just yet;
            List<string> counties = new List<string>();
            List<string> Genders = new List<string>();
            List<string> IrishType = new List<string>();
            List<string> DEIS = new List<string>();
            List<string> Religion = new List<string>();

            foreach (PrimarySchool sch in schools) //may change to editedschools;
            {
                if (!counties.Contains(sch.County) && sch.County != "")
                {
                    counties.Add(sch.County);
                }
                //if (!Genders.Contains(sch.SchoolGender) && sch.SchoolGender != "") //Nedd a way to identify all boys/girls schools;
                //{
                //    Genders.Add(sch.SchoolGender);
                //}
                if (!IrishType.Contains(sch.IrishClassification) && sch.IrishClassification != "")
                {
                    IrishType.Add(sch.IrishClassification);
                }
                if (!DEIS.Contains(sch.DEIS) && sch.DEIS != "")
                {
                    DEIS.Add(sch.DEIS);
                }
                if (!Religion.Contains(sch.Religion) && sch.Religion != "")
                {
                    Religion.Add(sch.Religion);
                }
            }

            MasterSchools mschools = new MasterSchools(); //may create seperate object;
            mschools.PrimarySch = schools;
            mschools.name = "sdsd";
            mschools.countyfilteroptions = counties;
            //mschools.SencondLevelSchoolcols = cols;
            //mschools.Genders = Genders;
            mschools.IrishType = IrishType;
            mschools.FeePaying = DEIS;
            mschools.Religion = Religion;
            return View(mschools);
        }

        //
        // GET: /PrimarySch/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /PrimarySch/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /PrimarySch/Create

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
        // GET: /PrimarySch/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /PrimarySch/Edit/5

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
        // GET: /PrimarySch/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /PrimarySch/Delete/5

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
