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
        public async Task<MasterSchools> publicreturn(string path)
        {
            MasterSchools schools = await GetProductAsync(path);
            return schools;
        }


        async Task<MasterSchools> GetProductAsync(string path)
        {

            HttpClient client = new HttpClient();
            MasterSchools product = null;
            HttpResponseMessage response = await client.GetAsync(path);
            if (response.IsSuccessStatusCode)
            {
                product = await response.Content.ReadAsAsync<MasterSchools>();
            }
            return product;
        }


        public exceldata syncdata(string path)
        {
            using (WebClient webClient = new WebClient(){ Encoding = System.Text.Encoding.UTF8 })
            {              
                return JsonConvert.DeserializeObject<exceldata>(
                    webClient.DownloadString(path)
                );
            }
        }

        public List<PrimarySchool> syncPrimarySchdata(string path)
        {
            using (WebClient webClient = new WebClient() { Encoding = System.Text.Encoding.UTF8 })
            {
                return JsonConvert.DeserializeObject<List<PrimarySchool>>(
                    webClient.DownloadString(path)
                );
            }
        }
    }
}