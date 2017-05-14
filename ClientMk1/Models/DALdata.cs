using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientMk1.Models
{
    public class DALdata
    {
        public List<SecSchoolDAL> schools { get; set; }
        public List<PrimarySchoolDAL> primaryschools { get; set; }
        public List<string> counties { get; set; }
        public List<string> Genders { get; set; }
        public List<string> IrishType { get; set; }
        public List<string> FeePaying { get; set; }
        public List<string> Religion { get; set; }
        public List<string> DEIS { get; set; }
    }
}