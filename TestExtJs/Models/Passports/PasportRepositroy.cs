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

namespace TestExtJs.Models
{
    public class PassportRepository : IPassportRepository
    {
        string connectionString = null;
        public PassportRepository(string conn)
        {
            connectionString = conn;
        }
        public List<PassportModel> GetPassports()
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                return db.Query<PassportModel>("SELECT * FROM passports").ToList();
            }
        }
        public String GetPassport(int id)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {

                return JsonConvert.SerializeObject(db.Query<PassportModel>
                    ("SELECT " +
                    "*" +
                    " FROM " +
                    "passports" +
                    " WHERE " +
                    "id=" +
                    id).FirstOrDefault());
            }
        }
        public String Update(PassportModel passport)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                return JsonConvert.SerializeObject(db.Query<PassportModel>
                    ("UPDATE " +
                    "passports" +
                    " SET " +
                    "type = @type, " +
                    " WHERE " +
                    "id = @id" +
                    " RETURNING " +
                    "*", 
                    passport).FirstOrDefault());
            }
        }
        public String Create(PassportModel passport)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                return JsonConvert.SerializeObject(db.Query<PassportModel>
                    ("INSERT INTO" +
                    " passports " +
                    "(type)" +
                    " VALUES " +
                    "(@type) " +
                    "RETURNING " +
                    "*",
                    passport).FirstOrDefault());
            }
        }
        public List<PassportModel> Delete(PassportModel passport)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                return db.Query<PassportModel>("DELETE FROM passports WHERE id = @id", passport).ToList();
            }
        }
    }
}
