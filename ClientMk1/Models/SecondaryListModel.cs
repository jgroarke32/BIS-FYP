using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientMk1.Models
{
    public class SecondaryListModel
    {
        public List<SecondarySchooltable> Schools { get; set; }
        public List<string> countyfilteroptions { get; set; }
        public List<string> columns { get; set; }
        public List<string> Genders { get; set; }
        public List<string> IrishType { get; set; }
        public List<string> FeePaying { get; set; }
        public List<string> Religion { get; set; }
    }
}