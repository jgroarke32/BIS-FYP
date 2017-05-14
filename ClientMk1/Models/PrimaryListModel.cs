using System.Collections.Generic;

namespace ClientMk1.Models
{
    public class PrimaryListModel
    {
        public List<PrimarySchooltable> primaryschools { get; set; }
        public List<string> counties { get; set; }
        public List<string> IrishType { get; set; }
        public List<string> Religion { get; set; }
        public List<string> DEIS { get; set; }
        public List<string> columns { get; set; }
    }
}