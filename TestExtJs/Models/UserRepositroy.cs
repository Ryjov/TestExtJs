using System;
using System.Collections.Generic;
using Dapper;
using Npgsql;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Microsoft.AspNetCore.Mvc;

namespace TestExtJs.Models
{
    public class UserRepository : IUserRepository
    {
        string connectionString = null;
        public UserRepository(string conn)
        {
            connectionString = conn;
        }
        public List<UserModel> GetUsers()
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                return db.Query<UserModel>("SELECT * FROM personas").ToList();
            }
        }
    }
}
