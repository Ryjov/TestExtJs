using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestExtJs.Models
{
    public interface IUserRepository
    {
        List<UserModel> GetUsers();
        String GetUser(int id);
        String Update(UserModel user);
        String Create(UserModel user);
        List<UserModel> Delete(UserModel user);
    }
}
