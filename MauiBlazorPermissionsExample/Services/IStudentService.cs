using MauiBlazorPermissionsExample.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MauiBlazorPermissionsExample.Services
{
    public interface IStudentService
    {
        Task<List<StudentModel>> GetAllStudent();
        Task<StudentModel> GetStudentByID(int StudentID);
        Task<int> AddStudent(StudentModel studentModel);
        Task<int> UpdateStudent(StudentModel studentModel);
        Task<int> DeleteStudent(StudentModel studentModel);
        Task<int> syncProvinceAsync();
        Task<List<province>> GetAllprovince();
        Task<List<district>> GetAlldistrict();
        Task<List<tambon>> GetAllTambon();
        Task<List<district>> GetDistricByID(string provinceId);
        Task<List<tambon>> GetTambonByID(string districtId);
        Task<person> GetpersonByHC(string StudentID);


        Task<List<const_prenme>> GetAllconst_prenme();
        Task<List<const_sex>> GetAllconst_sex();
        Task<List<const_currlev>> GetAllconst_currlev();
        Task<List<const_disability_type>> GetAllconst_disability_type();
        Task<List<const_edulev>> GetAllconst_edulev();
        Task<List<const_elderly_grp>> GetAllconst_elderly_grp();
        Task<List<const_house_conditions>> GetAllconst_house_conditions();
        Task<List<const_occ>> GetAllconst_occ();
        Task<List<const_pertyp>> GetAllconst_pertyp();
        Task<List<const_reg>> GetAllconst_reg();
        Task<List<const_reltyp>> GetAllconst_reltyp();
        Task<List<const_school>> GetAllconst_school();
        Task<List<const_stsmar>> GetAllconst_stsmar();
        Task<List<const_vaccination>> GetAllconst_vaccination();
        Task<List<person>> GetAllperson();
        Task<int> getLogin(login userType);
        //Task<List<ofc>> GetAllofcFirst();
        Task<List<ofc>> GetAllofc();
        Task<int> Deleteofc(ofc studentModel);
        Task<int> getPersonsByStaff();
    }
}
