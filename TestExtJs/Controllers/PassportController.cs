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

namespace TestExtJs.Controllers
{
    public class PassportController : Controller
    {
        IPassportRepository repo;
        public PassportController(IPassportRepository r)
        {
            repo = r;
        }
        [HttpGet]
        public JsonResult PassportsList()
        {
            return Json(repo.GetPassports());
        }
        [HttpGet]
        public String PassportOne(int id)
        {
            return repo.GetPassport(id);
        }

        [HttpPost]
        public String PassportsAdd(PassportModel passport)
        {
            return repo.Create(passport);
        }

        [HttpPut]
        public String PassportsEdit(PassportModel passport)
        {
            return repo.Update(passport);
        }
        [HttpDelete]
        public JsonResult PassportsDelete(PassportModel passport)
        {
            return Json(repo.Delete(passport));
        }
    }
}
