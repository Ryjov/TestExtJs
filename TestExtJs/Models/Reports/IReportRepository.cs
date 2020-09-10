using FastReport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestExtJs.Models
{
    public interface IReportRepository
    {
        public List<UserModel> PrepareReport();
    }
}
