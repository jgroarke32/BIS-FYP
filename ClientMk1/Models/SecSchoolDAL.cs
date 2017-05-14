using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientMk1.Models
{
    public class SecSchoolDAL
    {
        public string RollNo { get; set; }
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Address4 { get; set; }
        public string County { get; set; }
        public string Eircode { get; set; }
        public string Principal { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string Boarding { get; set; }
        public string Irish { get; set; }
        public string Fees { get; set; }
        public string Religion { get; set; }
        public string Female { get; set; }
        public string Male { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string lat { get; set; }
        public string lon { get; set; }
        public previousyrdata data2015 { get; set; }
        public previousyrdata data2014 { get; set; }
        public previousyrdata data2013 { get; set; }
        public previousyrdata data2012 { get; set; }
        public previousyrdata data2011 { get; set; }
    }
}