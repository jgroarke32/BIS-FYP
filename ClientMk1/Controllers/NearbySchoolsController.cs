using ClientMk1.Extra_Classes;
using ClientMk1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ClientMk1.Controllers
{  
    public class NearbySchoolsController : Controller
    {
        //
        // GET: /NearbySchools/
        [RequireHttps]
        public ActionResult Index()
        {
            return View();
        }

        [RequireHttps]
        public JsonResult schooldistance(string lat, string lon, string setdistance) //requires the latitude, longitude and filter distance from user;
        {
            
            int distancefrom = int.Parse(setdistance);
            double latdble = Convert.ToDouble(lat);
            double londble = Convert.ToDouble(lon);
            string path = "http://exceldataapi.azurewebsites.net/api/NearbySch"; //API Path
            //path = "http://localhost:63371/api/NearbySch"; //uncomment for offline development;
            DataAccess Data = new DataAccess();
            DALdata apischools = Data.getallschools(path);


            List<ANearbySchool> distanceschools = new List<ANearbySchool>();
            foreach (SecSchoolDAL school in apischools.schools)
            {
                if (school.lat != "")
                {
                    double latitude = Convert.ToDouble(school.lat);
                    double longitude = Convert.ToDouble(school.lon);
                    double distance = DistanceAlgorithm.DistanceBetweenLocations(londble, latdble, longitude, latitude); //Havercosine algorithm used to calculate two points on a sphere i.e. earth
                    if (distance <= distancefrom) //if school is within the set distance then add it to list;
                    {
                        ANearbySchool nearbyschool = new ANearbySchool(school);
                        distanceschools.Add(nearbyschool);
                    }
                }
            }
            foreach (PrimarySchoolDAL school in apischools.primaryschools) //does the same as above but foreach primary school;
            {
                if (school.latitude != "")
                {
                    double latitude = Convert.ToDouble(school.latitude);
                    double longitude = Convert.ToDouble(school.longitude);
                    double distance = DistanceAlgorithm.DistanceBetweenLocations(londble, latdble, longitude, latitude);
                    if (distance <= distancefrom)
                    {
                        ANearbySchool nearbyschool = new ANearbySchool(school);
                        distanceschools.Add(nearbyschool);
                    }
                }
            }

            var jsonschools = Json(distanceschools); //return list in JSON;
            return jsonschools;
        }
    }
}
