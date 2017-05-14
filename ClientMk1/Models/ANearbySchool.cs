namespace ClientMk1.Models
{
    public class ANearbySchool
    {
        public ANearbySchool(SecSchoolDAL school)
        {
            this.RollNo = school.RollNo;
            this.Name = school.Name;
            this.Address = school.Address;
            this.Principal = school.Principal;
            this.Religion = school.Religion;
            this.Phone = school.Phone;
            this.Email = school.Email;
            this.Gender = school.Gender;
            this.Irish = school.Irish;
            this.lat = school.lat;
            this.lon = school.lon;
            this.Male = school.Male;
            this.Female = school.Female;
            this.SchoolType = "Secondary";
        }

        public ANearbySchool(PrimarySchoolDAL school) //overladed constructor;
        {
            this.RollNo = school.RollNo;
            this.Name = school.Name;
            this.Address = school.Address;
            this.Religion = school.Ethos;
            this.Phone = school.Phone;
            this.Email = school.Email;
            this.Irish = school.Irish;
            this.lat = school.latitude;
            this.lon = school.longitude;
            this.Male = school.TotalBoys;
            this.Female = school.TotalGirls;
            this.SchoolType = "Primary";
        }

        public string RollNo { get; set; }
        public string Name { get; set; }
        public string Principal { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string Irish { get; set; }
        public string Religion { get; set; }
        public string Female { get; set; }
        public string Male { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string lat { get; set; }
        public string lon { get; set; }
        public string SchoolType { get; set; }
    }
}