using AspNetCoreMVC=Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace TestExtJs.Models
{
    public class UserModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string passport { get; set; }
        public string snils { get; set; }
        public string inn { get; set; }
        public int passport_type { get; set; }
        public string pass_name { get; set; }
    }
}
