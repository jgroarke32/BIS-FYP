using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientMk1.Models
{
    public class PrimarySchool
    {
        public string County { get; set; }
        public string LocalAuthorityDesc { get; set; }
        public string RollNo { get; set; }
        public string OfficialSchoolName { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public string AddressLine4 { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public string Religion { get; set; }
        public string IslandInd { get; set; }
        public string IrishClassification { get; set; }
        public string DEIS { get; set; }
        public string TotalBoys { get; set; }
        public string TotalGirls { get; set; }
        public string TotalPupils { get; set; }
    }
}