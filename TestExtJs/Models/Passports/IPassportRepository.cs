using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestExtJs.Models
{
    public interface IPassportRepository
    {
        List<PassportModel> GetPassports();
        String GetPassport(int id);
        String Update(PassportModel passport);
        String Create(PassportModel passport);
        List<PassportModel> Delete(PassportModel passport);
    }
}
