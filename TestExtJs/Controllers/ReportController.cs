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
using System.Drawing;
using FastReport.Data;
using System.Xml;

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
        public IActionResult GetReport()
        {
            string webrootpath = _env.WebRootPath;
            List<UserModel> users = repo.PrepareReport();
            string jsonusers = JsonConvert.SerializeObject(users);

            XmlDocument doc = JsonConvert.DeserializeXmlNode("{\"Users\":" + jsonusers + "}", "root");
            StreamWriter logWriter = new System.IO.StreamWriter($"{webrootpath}/reports/JsonUsersList.xml");
            logWriter.WriteLine(doc.InnerXml);
            logWriter.Dispose();

            Report report = new Report();
            DataSet ds = new DataSet();
            ds.ReadXml($"{webrootpath}/reports/JsonUsersList.xml");
            report.RegisterData(ds);
            report.GetDataSource("Users").Enabled = true;

            ReportPage page = new ReportPage();
            report.Pages.Add(page);
            page.CreateUniqueName();

            GroupHeaderBand group = new GroupHeaderBand();
            page.Bands.Add(group);
            group.CreateUniqueName();
            group.Height = FastReport.Utils.Units.Centimeters * 2f;
            group.Condition = "[Users.name].Substring(0,1)";
            group.SortOrder = FastReport.SortOrder.Ascending;

            TextObject groupTxt = new TextObject();
            groupTxt.Parent = group;
            groupTxt.CreateUniqueName();
            groupTxt.Bounds = new RectangleF(0, 0, FastReport.Utils.Units.Centimeters * 18, FastReport.Utils.Units.Centimeters * 1);
            groupTxt.Font = new Font("Arial", 14, FontStyle.Bold);
            groupTxt.Text = "[[Users.name].Substring(0,1)]";
            groupTxt.VertAlign = VertAlign.Center;
            groupTxt.Fill = new LinearGradientFill(Color.White, Color.AliceBlue, 90, 0.5f, 1);

            DataBand data = new DataBand();
            group.Data = data;
            data.CreateUniqueName();
            data.DataSource = report.GetDataSource("Users");
            data.Height = FastReport.Utils.Units.Centimeters * 1f;

            TextObject productText = new TextObject();
            productText.Parent = data;
            productText.CreateUniqueName();
            productText.Bounds = new RectangleF(0, 0, FastReport.Utils.Units.Centimeters * 18, FastReport.Utils.Units.Centimeters * 2f);
            productText.Text = "[Users.name], [Users.email], [Users.pass_name], [Users.passport], СНИЛС: [Users.snils], ИНН: [Users.inn]";
            group.GroupFooter = new GroupFooterBand();
            group.GroupFooter.CreateUniqueName();
            group.GroupFooter.Height = FastReport.Utils.Units.Centimeters * 1;

            Total groupTotal = new Total();
            groupTotal.Name = "TotalRows";
            groupTotal.TotalType = TotalType.Count;
            groupTotal.Evaluator = data;
            groupTotal.PrintOn = group.GroupFooter;
            report.Dictionary.Totals.Add(groupTotal);

            TextObject totalText = new TextObject();
            totalText.Parent = group.GroupFooter;
            totalText.CreateUniqueName();
            totalText.Bounds = new RectangleF(0, 0, FastReport.Utils.Units.Centimeters * 18, FastReport.Utils.Units.Centimeters * 0.5f);
            totalText.Text = "Rows: [TotalRows]";
            totalText.HorzAlign = HorzAlign.Right;
            totalText.Border.Lines = BorderLines.Top;
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
