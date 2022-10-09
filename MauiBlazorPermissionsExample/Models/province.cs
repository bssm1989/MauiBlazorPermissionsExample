using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace MauiBlazorPermissionsExample.Models
{
    public class province
    {
        [PrimaryKey]
        public string province_id { get; set; }
        public int region_id { get; set; }
        public string province_name_thai { get; set; }
        public string province_name_eng { get; set; }
        public string comment { get; set; }
        public int StudentID { get; set; }

    }
}

