using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestExtJs.Models;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Hosting;
using FastReport;
using FastReport.Export.Image;
using System.IO;

namespace TestExtJs.Controllers
{
    public class HomeController : Controller
    {
        private IWebHostEnvironment _env;
        IUserRepository repo;
        public IActionResult Index()
        {
            return View();
        }
        public HomeController(IUserRepository r, IWebHostEnvironment env)
        {
            repo = r;
            _env = env;
        }
        [HttpGet]
        public JsonResult UsersList()
        {
            return Json(repo.GetUsers());
        }
        [HttpGet]
        public String UsersOne(int id)
        {
            return repo.GetUser(id);
        }
        [HttpPost]
        public String UsersAdd(UserModel user)
        {
            return repo.Create(user);
        }
        [HttpPut]
        public String UsersEdit(UserModel user)
        {
            return repo.Update(user);
        }
        [HttpDelete]
        public JsonResult UsersDelete(UserModel user)
        {
            return Json(repo.Delete(user));
        }
    }
}
