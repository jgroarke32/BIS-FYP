﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientMk1.Models
{
    public class SchoolDAL
    {
        public string RollNo { get; set; }
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Address4 { get; set; }
        public string County { get; set; }
        public string POSTAL_CODE { get; set; }
        public string Principal { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string Boarding { get; set; }
        public string Irish { get; set; }
        public string Fees { get; set; }
        public string Religion { get; set; }
        public string Female { get; set; }
        public string Male { get; set; }
        public string EMAIL { get; set; }
        public string newAddress { get; set; }
        public List<string> data2015 { get; set; }
    }
}