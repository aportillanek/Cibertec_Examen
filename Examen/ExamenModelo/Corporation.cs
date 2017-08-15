using Dapper.Contrib.Extensions;
using System;

namespace Examen.Modelos
{
    public class Corporation
    {
        [ExplicitKey]
        public int corp_no { get; set; }
        public string corp_name { get; set; }
        public string street { get; set; }
        public string City { get; set; }
        public string state_prov { get; set; }
        public string country { get; set; }
        public string mail_code { get; set; }
        public string phone_no { get; set; }
        public DateTime expr_dt { get; set; }
        public string corp_code { get; set; }        
    }
}
