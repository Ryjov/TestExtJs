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
        [HttpGet]
        public JsonResult UsersList()
        {
            return Json(repo.GetUsers());
        }
        [HttpPost]
        public JsonResult UsersAdd(UserModel user)
        {
            return Json(repo.Create(user));
        }
        [HttpPut]
        public void UsersEdit(UserModel user)
        {
            repo.Update(user);
        }
    }
}
