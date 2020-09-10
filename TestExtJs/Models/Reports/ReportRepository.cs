using System;
using System.Collections.Generic;
using Dapper;
using Npgsql;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using System.Web.Helpers;
using Newtonsoft.Json;
using FastReport;
using Microsoft.AspNetCore.Hosting;

namespace TestExtJs.Models
{
    public class ReportRepository : IReportRepository
    {
        string connectionString = null;
        public ReportRepository(string conn)
        {
            connectionString = conn;
        }
        public List<UserModel> PrepareReport()
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                return db.Query<UserModel>("SELECT " +
                    "ps.id, ps.name, ps.snils, ps.email, ps.inn, ps.passport, ps.passport_type, pss.type AS pass_name" +
                    " FROM " +
                    "personas ps" +
                    " JOIN " +
                    "passports pss" +
                    " ON " +
                    "pss.id = ps.passport_type").ToList();
            }
        }
    }
}
