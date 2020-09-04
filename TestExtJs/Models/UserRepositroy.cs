﻿using System;
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
        public String GetUser(int id)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {

                return JsonConvert.SerializeObject(db.Query<UserModel>
                    ("SELECT " +
                    "*" +
                    " FROM " +
                    "personas" +
                    " WHERE " +
                    "id=" +
                    id).FirstOrDefault());
            }
        }
        public String Update(UserModel user)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                return JsonConvert.SerializeObject(db.Query<UserModel>
                    ("UPDATE " +
                    "personas" +
                    " SET " +
                    "name = @name, " +
                    "email = @email, " +
                    "passport=@passport, " +
                    "snils=@snils, " +
                    "inn=@inn" +
                    " WHERE " +
                    "id = @id" +
                    " RETURNING " +
                    "*", 
                    user).FirstOrDefault());
            }
        }
        public String Create(UserModel user)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                return JsonConvert.SerializeObject(db.Query<UserModel>
                    ("INSERT INTO" +
                    " personas " +
                    "(name, email, passport, snils, inn)" +
                    " VALUES " +
                    "(@name, @email, @passport, @snils, @inn) " +
                    "RETURNING " +
                    "*",
                    user).FirstOrDefault());
            }
        }
        public List<UserModel> Delete(UserModel user)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                return db.Query<UserModel>("DELETE FROM personas WHERE id = @id", user).ToList();
            }
        }
    }
}
