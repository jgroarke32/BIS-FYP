namespace ClientMk1.Models
{
    public class PrimarySchoolDAL
    {
        public string County { get; set; }
        public string RollNo { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Ethos { get; set; }
        public string Irish { get; set; }
        public string DEIS { get; set; }
        public string TotalBoys { get; set; }
        public string TotalGirls { get; set; }
        public string TotalPupils { get; set; }
        public string Address { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public previousyrdata data2015 { get; set; }
        public previousyrdata data2014 { get; set; }
        public previousyrdata data2013 { get; set; }
        public previousyrdata data2012 { get; set; }
        public previousyrdata data2011 { get; set; }
    }
}