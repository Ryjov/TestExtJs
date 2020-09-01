using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestExtJs.Models;

namespace TestExtJs.Controllers
{
    public class HomeController : Controller
    {
        IUserRepository repo;
        public IActionResult Index()
        {
            return View();
        }
        public HomeController(IUserRepository r)
        {
            repo = r;
        }
        public List<UserModel> UsersList()
        {
            return repo.GetUsers();
        }
    }
}
