using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DateTime = System.DateTime;

namespace MauiBlazorPermissionsExample.Models
{
    public class StudentModel
    {
        [PrimaryKey, AutoIncrement]


        public int StudentID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
    }





    public class district
    {
        [PrimaryKey]
        public string district_id { get; set; }

        public int province_id { get; set; }

        public string district_name_thai { get; set; }

        public string district_name_eng { get; set; }

        public int comment { get; set; }

    }
    public class tambon
    {
        [PrimaryKey]
        public string tambon_id { get; set; }
        public string province_id { get; set; }
        public string district_id { get; set; }
        public string tambon_name_thai { get; set; }
        public string tambon_name_eng { get; set; }
        public string comment { get; set; }
        public string lat { get; set; }
        public string lng { get; set; }
    }

    public class const_prenme
    {
        [PrimaryKey]
        public string preid { get; set; }
        public string prenme { get; set; }
        public string prenmefull { get; set; }

    }

    public class const_reg
    {
        [PrimaryKey]
        public string regid { get; set; }
        public string regnme { get; set; }

    }
    public class const_currlev
    {
        [PrimaryKey]
        public string currlevid { get; set; }
        public string currlevnme { get; set; }

    }
    public class const_disability_type
    {
        [PrimaryKey]
        public string distypid { get; set; }
        public string distypnme { get; set; }

    }
    public class const_edulev
    {
        [PrimaryKey]
        public string edulevid { get; set; }
        public string edulevnme { get; set; }

    }
    public class const_elderly_grp
    {
        [PrimaryKey]
        public string elderly_grpid { get; set; }
        public string elderly_grpnme { get; set; }

    }
    public class const_house_conditions
    {
        [PrimaryKey]
        public string house_conid { get; set; }
        public string house_connme { get; set; }

    }
    public class const_occ
    {
        [PrimaryKey]
        public string occid { get; set; }
        public string occnme { get; set; }

    }
    public class const_pertyp
    {
        [PrimaryKey]
        public string pertypid { get; set; }
        public string pertypnme { get; set; }

    }


    public class const_plc
    {
        [PrimaryKey]
        public string plcid { get; set; }
        public string prvid { get; set; }
        public string ampid { get; set; }

        public string tmbid { get; set; }
        public string plcnme { get; set; }
        public string regionid { get; set; }

        public string plc_tar_x { get; set; }
        public string plc_tar_y { get; set; }

        public string plc_lat { get; set; }
        public string plc_lng { get; set; }

        public string plcidgen { get; set; }


    }

    public class const_plcnmegen
    {
        [PrimaryKey]
        public string plcidgen { get; set; }
        public string prvidgen { get; set; }
        public string ampidgen { get; set; }
        public string tmbidgen { get; set; }
        public string prvnmegen { get; set; }
        public string ampnmegen { get; set; }
        public string tmbnmegen { get; set; }
        public string plcnmegen { get; set; }
        public string regionnme { get; set; }
    }
    public class const_reltyp
    {
        [PrimaryKey]
        public string reltypid { get; set; }
        public string reltypnme { get; set; }

    }
    public class const_school
    {
        [PrimaryKey]
        public string schid { get; set; }
        public string schnme { get; set; }
        public string schnmefull { get; set; }
        public string type { get; set; }

    }
    public class const_sex
    {
        [PrimaryKey]
        public string sexid { get; set; }
        public string sexnme { get; set; }

    }
    public class const_stsmar
    {
        [PrimaryKey]
        public string stsmar { get; set; }
        public string stsmarnme { get; set; }

    }
    public class const_vaccination
    {
        [PrimaryKey]
        public string vaccination_id { get; set; }
        public string vaccination_nme { get; set; }

    }
    public class
        person
    {
        [PrimaryKey]
        public int perid { get; set; }
        public string HC { get; set; }
        public string JUN { get; set; }
        public string AMP { get; set; }
        public string TMP { get; set; }
        
        public string pid { get; set; }
        public string preid { get; set; }
        public string nme { get; set; }
        public string surnme { get; set; }
        public string brtdte { get; set; }
        public int age { get; set; }
        // [Range(typeof(string), "1", "1", ErrorMessage = "Male gender is required.")]
        public string sex { get; set; } = "1";
        public string reg { get; set; }
        public string stsmar { get; set; }
        public int numchi { get; set; }
        public int numchistd { get; set; }
        public string edulev { get; set; }
        public string currlevid { get; set; }
        public string blood_type { get; set; }
        public string occid { get; set; }
        public string add_occid { get; set; }
        public float sal { get; set; }
        public string roladr { get; set; }
        public string rolvllsoi { get; set; }
        public string rolvllno { get; set; }
        public string rolplcid { get; set; }
        public string tel { get; set; }
        public string lat { get; set; }
        public string lon { get; set; }
        public string house_conid { get; set; }
        public string picname1 { get; set; }
        public string picname2 { get; set; }
        public string congenital_disease { get; set; }
        public string congenital_disease_oth { get; set; }
        public string medical_permis { get; set; }
        public string medical_permis_oth { get; set; }
        public string medical_permis_office { get; set; }
        public string vaccination_id { get; set; }
        public string num_covid { get; set; }
        public string pertypid { get; set; }
        public string elderly_grpid { get; set; }
        public string distypid { get; set; }
        public string hav_attendant { get; set; }
        public string main_attendant_nme { get; set; }
        public string main_attendant_surnme { get; set; }
        public string main_attendant_brtdte { get; set; }
        public string main_attendant_rel { get; set; }
        public string main_attendant_occid { get; set; }
        public int main_attendant_sal { get; set; }
        public string main_attendant_tel { get; set; }
        public string optid { get; set; }
        public string alive { get; set; }
        public string percmm { get; set; }
        public int savofc { get; set; }
        public string savdte { get; set; }
        public int updofc { get; set; }
        public int upddte { get; set; }
    }

    public class ofc
    {
        [PrimaryKey]
        public string ofc_id { get; set; }
        public string ofc_no { get; set; }
        public string ofc_preid { get; set; }
        public string ofc_fname { get; set; }
        public string ofc_lname { get; set; }
        public string ofc_email { get; set; }
        public string usrnme { get; set; }
        public string password { get; set; }
        public string ofc_status { get; set; }
        public string optid { get; set; }
        public string ofc_pio { get; set; }
        public string ofc_nickname { get; set; }
        public string ofc_ofcnme { get; set; }
        public string ofc_pos { get; set; }
        public string ofc_pid { get; set; }
        public string ofc_brtdte { get; set; }
        public string ofc_age { get; set; }
        public string ofc_reg { get; set; }
        public string ofc_edulev { get; set; }
        public string ofc_graduated_sch { get; set; }
        public string ofc_stsmar { get; set; }
        public string ofc_numchi { get; set; }
        public string ofc_roladr { get; set; }
        public string ofc_rolvllsoi { get; set; }
        public string ofc_rolvllno { get; set; }
        public string ofc_rolplcid { get; set; }
        public string ofc_adr { get; set; }
        public string ofc_vllsoi { get; set; }
        public string ofc_vllno { get; set; }
        public string ofc_plcid { get; set; }
        public string ofc_tel { get; set; }
        public string ofc_fb { get; set; }
        public string ofc_line_id { get; set; }
        public string ofc_lat { get; set; }
        public string ofc_lng { get; set; }
        public string period { get; set; }
        public string work_exp { get; set; }
        public string training_exp { get; set; }
        public string impression { get; set; }
        public string feedback { get; set; }
        public string profile_photo { get; set; }
        public string ofc_cmm { get; set; }
        public string ofc_crated_at { get; set; }
        public string ofc_updated_at { get; set; }

    }
    public class login
    {
        public string user_in {get;set;}
        public string password_in { get; set; }
    }
}
