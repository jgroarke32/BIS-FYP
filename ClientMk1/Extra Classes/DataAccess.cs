using ClientMk1.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace ClientMk1.Extra_Classes
{
    public class DataAccess
    {
        public IndivSecSchool getSecondaryschool(string path)
        {
            using (WebClient webClient = new WebClient() { Encoding = System.Text.Encoding.UTF8 })
            {
                return JsonConvert.DeserializeObject<IndivSecSchool>(
                    webClient.DownloadString(path)
                );
            }
        }

        public IndivPriSchool getPrimaryschool(string path)
        {
            using (WebClient webClient = new WebClient() { Encoding = System.Text.Encoding.UTF8 })
            {
                return JsonConvert.DeserializeObject<IndivPriSchool>(
                    webClient.DownloadString(path)
                );
            }
        }

        public DALdata getallschools(string path)
        {
            using (WebClient webClient = new WebClient() { Encoding = System.Text.Encoding.UTF8 })
            {
                return JsonConvert.DeserializeObject<DALdata>(
                    webClient.DownloadString(path)
                );
            }
        }

        public List<PrimarySchoolDAL> getPrischools(string path)
        {
            using (WebClient webClient = new WebClient() { Encoding = System.Text.Encoding.UTF8 })
            {
                return JsonConvert.DeserializeObject<List<PrimarySchoolDAL>>(
                    webClient.DownloadString(path)
                );
            }
        }

        public DALdata syncSecondarySchdata(string path) //get all data from api;
        {
            using (WebClient webClient = new WebClient(){ Encoding = System.Text.Encoding.UTF8 })
            {              
                return JsonConvert.DeserializeObject<DALdata>(
                    webClient.DownloadString(path)
                );
            }
        }
    }
}