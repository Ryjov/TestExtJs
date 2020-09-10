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
using System.IO;
using FastReport.Export.Image;
using Microsoft.AspNetCore.Hosting;
using FastReport;
using System.Data;
using Npgsql;
using Dapper;
using System.Reflection;

namespace TestExtJs.Controllers
{
    public class ReportController : Controller
    {
        private IWebHostEnvironment _env;
        IReportRepository repo;
        public IActionResult Index()
        {
            return View();
        }
        public ReportController(IReportRepository r, IWebHostEnvironment env)
        {
            repo = r;
            _env = env;
        }
        [HttpGet]
        public IActionResult GetImg()
        {
            string webrootpath = _env.WebRootPath;
            List<UserModel> users = repo.PrepareReport();
            string jsonusers = JsonConvert.SerializeObject(users);
            Report report = new Report();
            var logWriter = new System.IO.StreamWriter($"{webrootpath}/reports/JsonUsersList.json"); 
            logWriter.WriteLine(jsonusers);
            logWriter.Dispose();
            report.Load($"{webrootpath}/reports/Registry.frx");
            report.RegisterData($"{webrootpath}/reports/JsonUsersList.json", "Пользователи");
            report.Prepare();
            using (ImageExport img = new ImageExport())
            {
                img.ImageFormat = ImageExportFormat.Jpeg;
                img.JpegQuality = 100;
                img.Resolution = 100;
                img.SeparateFiles = false;
                using (MemoryStream st = new MemoryStream())
                {
                    report.Export(img, st);
                    return base.File(st.ToArray(), "image/jpeg");
                }
            }
        }
    }
}
