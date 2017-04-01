using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientMk1.Models
{
    public class MasterSchools
    {
        public List<School> Schools { get; set; }
        public List<PrimarySchool> PrimarySch { get; set; }
        public string name { get; set; }
        public List<string> countyfilteroptions { get; set; }
        public List<string> SencondLevelSchoolcols { get; set; }
        public List<string> Genders { get; set; }
        public List<string> IrishType { get; set; }
        public List<string> FeePaying { get; set; }
        public List<string> Religion { get; set; }
    }
}