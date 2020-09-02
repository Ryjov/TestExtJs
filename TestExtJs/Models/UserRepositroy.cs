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
        public void Update(UserModel user)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                var sqlQuery = "UPDATE personas SET name = @name, email = @emaile, passport=@passport, snils=@snils, inn=@inn WHERE id = @id";
                db.Execute(sqlQuery, user);
            }
        }
        public List<UserModel> Create(UserModel user)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                return db.Query<UserModel>("INSERT INTO personas (name, email, passport, snils, inn) VALUES (@name, @email, @passport, @snils, @inn)", user).ToList();

                // если мы хотим получить id добавленного пользователя
                //var sqlQuery = "INSERT INTO Users (Name, Age) VALUES(@Name, @Age); SELECT CAST(SCOPE_IDENTITY() as int)";
                //int? userId = db.Query<int>(sqlQuery, user).FirstOrDefault();
                //user.Id = userId.Value;
            }
        }
    }
}
