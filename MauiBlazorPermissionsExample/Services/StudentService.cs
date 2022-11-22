using SQLite;
using MauiBlazorPermissionsExample.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Diagnostics;
using System.IO;
using System.Net.Http;

namespace MauiBlazorPermissionsExample.Services
{
    public class StudentService:IStudentService
    {
        private SQLiteAsyncConnection _dbConnection;

        public StudentService()
        {
            SetUpDb();
        }

        private async void SetUpDb()
        {
            if (_dbConnection == null)
            {
                string dbPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Studentx15.db3");
               

                Console.WriteLine(dbPath);
                _dbConnection = new SQLiteAsyncConnection(dbPath);
               
                try
                {
                    await _dbConnection.CreateTableAsync<province>();
                }
                catch (Exception ex)
                {
                    var show = ex;
                }
                
                await _dbConnection.CreateTableAsync<StudentModel>();
                
               
                await _dbConnection.CreateTableAsync<district>();
                await _dbConnection.CreateTableAsync<tambon>();


                await _dbConnection.CreateTableAsync<const_prenme>();
                await _dbConnection.CreateTableAsync<const_sex>();
                await _dbConnection.CreateTableAsync<const_currlev>();
                await _dbConnection.CreateTableAsync<const_disability_type>();
                await _dbConnection.CreateTableAsync<const_edulev>();
                await _dbConnection.CreateTableAsync<const_elderly_grp>();
                await _dbConnection.CreateTableAsync<const_house_conditions>();
                await _dbConnection.CreateTableAsync<const_occ>();
                await _dbConnection.CreateTableAsync<const_pertyp>();
                await _dbConnection.CreateTableAsync<const_reg>();
                await _dbConnection.CreateTableAsync<const_reltyp>();
                await _dbConnection.CreateTableAsync<const_school>();
                await _dbConnection.CreateTableAsync<const_stsmar>();
                await _dbConnection.CreateTableAsync<const_vaccination>();
                await _dbConnection.CreateTableAsync<person>();
                await _dbConnection.CreateTableAsync<ofc>();

            }
        }


        public async Task<int> AddStudent(StudentModel studentModel)
        {
            return await _dbConnection.InsertAsync(studentModel);
        }

        public async Task<int> DeleteStudent(StudentModel studentModel)
        {
            return await _dbConnection.DeleteAsync(studentModel);
        }
        public async Task<int> UpdateStudent(StudentModel studentModel)
        {
            return await _dbConnection.UpdateAsync(studentModel);
        }
        public async Task<List<StudentModel>> GetAllStudent()
        {
            return await _dbConnection.Table<StudentModel>().ToListAsync();
        }

        public async Task<StudentModel> GetStudentByID(int StudentID)
        {
            var student = await _dbConnection.QueryAsync<StudentModel>($"Select * From {nameof(StudentModel)} where StudentID={StudentID} ");
            return student.FirstOrDefault();
        }
        public async Task<int> Addofc(ofc studentModel)
        {
            return await _dbConnection.InsertAsync(studentModel);
        }

        public async Task<int> Deleteofc(ofc studentModel)
         {
            try
             {
                    return await _dbConnection.DeleteAsync(studentModel);
            }
            catch (Exception ex)
            {
                var show = ex;
                return 0;
            }
           
        }
        public async Task<int> Updateofc(ofc studentModel)
        {
            return await _dbConnection.UpdateAsync(studentModel);
        }
        public async Task<List<ofc>> GetAllofc()
        {
            return await _dbConnection.Table<ofc>().ToListAsync();
        }
        //public async Task<ofc> GetAllofcFirst()
        //{
        //    List<ofc> userStaffs = await _dbConnection.Table<ofc>().ToListAsync();
        //    return userStaffs.FirstOrDefault();
        //}
        public async Task<ofc> GetofcByID(int StudentID)
        {
            var student = await _dbConnection.QueryAsync<ofc>($"Select * From {nameof(ofc)} where ofc_id={StudentID} ");
            return student.FirstOrDefault();
        }
        public async Task<person> GetpersonByHC(string StudentID)
        {
            var student = await _dbConnection.QueryAsync<person>($"Select * From {nameof(person)} where id={StudentID} ");
            return student.FirstOrDefault();
        }

        public async Task<int> AddProvince(province provinceModel)
        {
            return await _dbConnection.InsertOrReplaceAsync(provinceModel);
        }
        public async Task<List<province>> GetAllprovince()
        {
            return await _dbConnection.Table<province>().ToListAsync();
        }
        public async Task<List<district>> GetAlldistrict()
        {
            return await _dbConnection.Table<district>().ToListAsync();
        }
        public async Task<List<district>> GetDistricByID(string provinceId)
        {
            var districts = await _dbConnection.QueryAsync<district>($"Select * From {nameof(district)} where province_id={provinceId} ");
            return districts;
        }

        public async Task<int> AddDistrict(district dataList)
        {
            return await _dbConnection.InsertOrReplaceAsync(dataList);
        }
        public async Task<List<tambon>> GetAllTambon()
        {
            return await _dbConnection.Table<tambon>().ToListAsync();
        }
        public async Task<int> AddTambon(tambon dataList)
        {
            return await _dbConnection.InsertOrReplaceAsync(dataList);
        }
        public async Task<List<tambon>> GetTambonByID(string districId)
        {
            var tambons = await _dbConnection.QueryAsync<tambon>($"Select * From {nameof(tambon)} where district_id={districId} ");
            return tambons;
        }

        public async Task<List<const_prenme>> GetAllconst_prenme()
        {
            return await _dbConnection.Table<const_prenme>().ToListAsync();
        }
        public async Task<List<const_sex>> GetAllconst_sex()
        {
            return await _dbConnection.Table<const_sex>().ToListAsync();
        }
        public async Task<List<const_currlev>> GetAllconst_currlev()
        {
            return await _dbConnection.Table<const_currlev>().ToListAsync();
        }
        public async Task<List<const_disability_type>> GetAllconst_disability_type()
        {
            return await _dbConnection.Table<const_disability_type>().ToListAsync();
        }
        public async Task<List<const_edulev>> GetAllconst_edulev()
        {
            return await _dbConnection.Table<const_edulev>().ToListAsync();
        }
        public async Task<List<const_elderly_grp>> GetAllconst_elderly_grp()
        {
            return await _dbConnection.Table<const_elderly_grp>().ToListAsync();
        }
        public async Task<List<const_house_conditions>> GetAllconst_house_conditions()
        {
            return await _dbConnection.Table<const_house_conditions>().ToListAsync();
        }
        public async Task<List<const_occ>> GetAllconst_occ()
        {
            return await _dbConnection.Table<const_occ>().ToListAsync();
        }
        public async Task<List<const_pertyp>> GetAllconst_pertyp()
        {
            return await _dbConnection.Table<const_pertyp>().ToListAsync();
        }
        public async Task<List<const_reg>> GetAllconst_reg()
        {
            return await _dbConnection.Table<const_reg>().ToListAsync();
        }
        public async Task<List<const_reltyp>> GetAllconst_reltyp()
        {
            return await _dbConnection.Table<const_reltyp>().ToListAsync();
        }
        public async Task<List<const_school>> GetAllconst_school()
        {
            return await _dbConnection.Table<const_school>().ToListAsync();
        }
        public async Task<List<const_stsmar>> GetAllconst_stsmar()
        {
            return await _dbConnection.Table<const_stsmar>().ToListAsync();
        }
        public async Task<List<const_vaccination>> GetAllconst_vaccination()
        {
            return await _dbConnection.Table<const_vaccination>().ToListAsync();
        }
        public async Task<List<person>> GetAllperson()
        {
            return await _dbConnection.Table<person>().ToListAsync();
        }


        public async Task<int> Addconst_prenme(const_prenme dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_sex(const_sex dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_currlev(const_currlev dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_disability_type(const_disability_type dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_edulev(const_edulev dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_elderly_grp(const_elderly_grp dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_house_conditions(const_house_conditions dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_occ(const_occ dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_pertyp(const_pertyp dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_reg(const_reg dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_reltyp(const_reltyp dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_school(const_school dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_stsmar(const_stsmar dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addconst_vaccination(const_vaccination dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> Addperson(person dataList) { return await _dbConnection.InsertOrReplaceAsync(dataList); }
        public async Task<int> getPersonsByStaff()
        {
            try
            {
                using (var client = new HttpClient())
                {
                    //ofc userStaffs = await this.GetAllofcFirst();
                    string table="person",
                        ofc_rolplcid= "950201", pertypid="1", field="";

                    string url = $"https://www.psutrobon.com/gis_bssm/index.php?table=" + table + "&field=" + field+ "&pertypid="+ pertypid+ "&ofc_rolplcid="+ ofc_rolplcid;
                    Debug.WriteLine(url);
                    var apiResponse = await client.GetAsync(url);
                    if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        var response = await apiResponse.Content.ReadAsStringAsync();
                        //var DeserializedObjList3 = (List<province>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<province>));
                        int deserilizeResponse = -1;
                        foreach (var item in (List<person>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<person>)))
                        {
                            deserilizeResponse = await this.Addperson(item);
                        }
                    }
                }


                return 1;
            }

            catch (Exception ex)
            {
                var show = ex;
                return 0;
            }

        }
        public async Task<int> getLogin(login userType)
        {

            try
            {
                using(var client = new HttpClient())
                {
                    string url = $"https://www.psutrobon.com/gis_bssm/dsccLogin/index.php?email="+userType.user_in+"&password="+userType.password_in;
                    Debug.WriteLine(url);
                    var apiResponse = await client.GetAsync(url);
                    if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        var response = await apiResponse.Content.ReadAsStringAsync();
                        //var DeserializedObjList3 = (List<province>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<province>));
                        int deserilizeResponse = -1;
                        foreach (var item in (List<ofc>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<ofc>)))
                        {
                            deserilizeResponse = await this.Addofc(item);
                        }
                    }
                }
                

                    return 1;
            }
            catch (Exception ex)
            {
                var show = ex;
                return 0;
            }
           
        }
        //public async Task<ofc> getUserLogin()
        //{
            
        //    try
        //    {
                
        //        return 1;
        //    }
        //    catch (Exception ex)
        //    {
        //        var show = ex;
        //        return 0;
        //    }

        //}


        public async Task<int> syncProvinceAsync()
        {
            try
            {
                using (var client=new HttpClient())
                {

                    Debug.WriteLine("drop**************");
                    var checkList = await this.GetAllprovince();
                    Debug.WriteLine(checkList.Count() + " num************");
                    var check_const_prenme = await this.GetAllconst_prenme();
                    //  var check_const_sex = await this.GetAllconst_sex();
                    var check_const_currlev = await this.GetAllconst_currlev();
                    var check_const_disability_type = await this.GetAllconst_disability_type();
                    var check_const_edulev = await this.GetAllconst_edulev();
                    var check_const_elderly_grp = await this.GetAllconst_elderly_grp();
                    var check_const_house_conditions = await this.GetAllconst_house_conditions();
                    var check_const_occ = await this.GetAllconst_occ();
                    var check_const_pertyp = await this.GetAllconst_pertyp();
                    var check_const_reg = await this.GetAllconst_reg();
                    var check_const_reltyp = await this.GetAllconst_reltyp();
                    var check_const_school = await this.GetAllconst_school();
                    var check_const_stsmar = await this.GetAllconst_stsmar();
                    var check_const_vaccination = await this.GetAllconst_vaccination();
                    Debug.WriteLine(check_const_prenme.Count() + "**********");
                    //   Debug.WriteLine(check_const_sex.Count() + "**********");
                    Debug.WriteLine(check_const_currlev.Count() + "**********");
                    Debug.WriteLine(check_const_disability_type.Count() + "**********");
                    Debug.WriteLine(check_const_edulev.Count() + "**********");
                    Debug.WriteLine(check_const_elderly_grp.Count() + "**********");
                    Debug.WriteLine(check_const_house_conditions.Count() + "**********");
                    Debug.WriteLine(check_const_occ.Count() + "**********");
                    Debug.WriteLine(check_const_pertyp.Count() + "**********");
                    Debug.WriteLine(check_const_reg.Count() + "**********");
                    Debug.WriteLine(check_const_reltyp.Count() + "**********");
                    Debug.WriteLine(check_const_school.Count() + "**********");
                    Debug.WriteLine(check_const_stsmar.Count() + "**********");
                    Debug.WriteLine(check_const_vaccination.Count() + "**********");
                    if (check_const_vaccination.Count()<1)
                    //if (true)
                        {
                        string url = $"https://www.psutrobon.com/gis_bssm/index.php?table=province";
                        var apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();
                            //var DeserializedObjList3 = (List<province>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<province>));
                            int deserilizeResponse = -1;
                            foreach (var item in (List<province>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<province>)))
                            {
                                deserilizeResponse = await this.AddProvince(item);
                            }
                        }

                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=district";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            var response = await apiResponse.Content.ReadAsStringAsync();
                            int deserilizeResponse = -1;
                            foreach (var item in (List<district>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<district>)))
                            {
                                deserilizeResponse = await this.AddDistrict(item);
                            }
                        }

                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=tambon";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {
                            var response = await apiResponse.Content.ReadAsStringAsync();
                            int deserilizeResponse = -1;
                            foreach (var item in (List<tambon>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<tambon>)))
                            {
                                deserilizeResponse = await this.AddTambon(item);
                            }
                        }


                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_prenme";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_prenme>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_prenme>)))
                            {
                                deserilizeResponse = await this.Addconst_prenme(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_sex";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_sex>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_sex>)))
                            {
                                deserilizeResponse = await this.Addconst_sex(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_currlev";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_currlev>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_currlev>)))
                            {
                                deserilizeResponse = await this.Addconst_currlev(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_disability_type";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_disability_type>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_disability_type>)))
                            {
                                deserilizeResponse = await this.Addconst_disability_type(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_edulev";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_edulev>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_edulev>)))
                            {
                                deserilizeResponse = await this.Addconst_edulev(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_elderly_grp";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_elderly_grp>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_elderly_grp>)))
                            {
                                deserilizeResponse = await this.Addconst_elderly_grp(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_house_conditions";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_house_conditions>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_house_conditions>)))
                            {
                                deserilizeResponse = await this.Addconst_house_conditions(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_occ";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_occ>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_occ>)))
                            {
                                deserilizeResponse = await this.Addconst_occ(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_pertyp";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_pertyp>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_pertyp>)))
                            {
                                deserilizeResponse = await this.Addconst_pertyp(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_reg";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_reg>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_reg>)))
                            {
                                deserilizeResponse = await this.Addconst_reg(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_reltyp";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_reltyp>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_reltyp>)))
                            {
                                deserilizeResponse = await this.Addconst_reltyp(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_school";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_school>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_school>)))
                            {
                                deserilizeResponse = await this.Addconst_school(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_stsmar";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_stsmar>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_stsmar>)))
                            {
                                deserilizeResponse = await this.Addconst_stsmar(item);
                            }
                        }
                        url = $"https://www.psutrobon.com/gis_bssm/index.php?table=const_vaccination";
                        apiResponse = await client.GetAsync(url);
                        if (apiResponse.StatusCode == System.Net.HttpStatusCode.OK)
                        {

                            var response = await apiResponse.Content.ReadAsStringAsync();

                            int deserilizeResponse = -1;
                            foreach (var item in (List<const_vaccination>)Newtonsoft.Json.JsonConvert.DeserializeObject(response, typeof(List<const_vaccination>)))
                            {
                                deserilizeResponse = await this.Addconst_vaccination(item);
                            }
                        }
                    }
                    
                    return 1;
                }
            }
            catch (Exception ex)
            {
                var show = ex;
                return 0;
            }

                
        }
    }
}
