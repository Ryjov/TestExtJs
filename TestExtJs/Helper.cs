using FastReport;
using FastReport.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using TestExtJs.Models;

namespace TestExtJs
{
    public static class Helper
    {
        public static DataSet FillDataSet (List<UserModel> list)
        {
            string jsonusers = JsonConvert.SerializeObject(list);
            DataSet ds = JsonConvert.DeserializeObject<DataSet>("{\"Users\":" + jsonusers + "}");
            return ds;
        }
        public static Report CreateReport (DataSet ds)
        {
            Report report = new Report();
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
            return report;
        }
    }
}
