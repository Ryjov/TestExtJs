using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestExtJs.Models
{
    public interface IUserRepository
    {
        List<UserModel> GetUsers();
        void Update(UserModel user);
        List<UserModel> Create(UserModel user);
    }
}
