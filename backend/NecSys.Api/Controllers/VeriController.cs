using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NecSys.Api.Models;

namespace NecSys.Api.Controllers {

    [ApiController]
    [Route ("[controller]")]
    public class VeriController : ControllerBase {

        string _dir = "Veriler";
        private string ToFullFileName (string id, string dir = null) => Path.Combine (dir??_dir, id + ".json");

        [HttpPost]
        public async Task<ResultDto> Post ([FromBody] VeriPostDto values) {
            try {

                if (!System.IO.Directory.Exists (_dir))
                    System.IO.Directory.CreateDirectory (_dir);

                List<dynamic> list = new List<dynamic> ();

                if (System.IO.File.Exists (ToFullFileName (values.Modul)))
                    list = JsonSerializer.Deserialize<List<dynamic>> (await System.IO.File.ReadAllTextAsync (ToFullFileName (values.Modul)));

                if (!string.IsNullOrEmpty (values.Id))
                    list = list.Where (f => !JsonSerializer.Serialize (f).Contains (values.Id)).ToList ();

                var item = JsonSerializer.Deserialize<dynamic> (values.Form);
                list.Add (item);

                await System.IO.File.WriteAllTextAsync (ToFullFileName (values.Modul), JsonSerializer.Serialize (list));

                return new ResultDto (true);
            } catch (System.Exception ex) {
                return new ResultDto (ex.Message);
            }
        }

        [HttpGet ("{modul}")]
        public async Task<dynamic> Get (string modul) {
            try {

                List<dynamic> result = JsonSerializer.Deserialize<List<dynamic>> (await System.IO.File.ReadAllTextAsync (ToFullFileName (modul)));

                return new {
                    data = result,
                        totalCount = result.Count
                };
            } catch (System.Exception) {

                throw;
            }
        }

        [HttpGet ("{modul}/{id}")]
        public async Task<dynamic> Get (string modul, string id) {
            try {
                var result = await System.IO.File.ReadAllTextAsync (ToFullFileName (modul));

                List<dynamic> list = JsonSerializer.Deserialize<List<dynamic>> (result);
                var item = list.FirstOrDefault (f => JsonSerializer.Serialize (f).Contains (id));

                return item;
            } catch (System.Exception ex) {
                return new ResultDto (ex.Message);
            }
        }

        [HttpDelete ("{modul}/{id}")]
        public async Task<ResultDto> Delete (string modul, string id) {
            try {

                List<dynamic> list = JsonSerializer.Deserialize<List<dynamic>> (await System.IO.File.ReadAllTextAsync (ToFullFileName (modul)));

                var item = list.FirstOrDefault (f => JsonSerializer.Serialize (f).Contains (id));
                list = list.Where (f => !JsonSerializer.Serialize (f).Contains (id)).ToList ();

                await System.IO.File.WriteAllTextAsync (ToFullFileName (modul), JsonSerializer.Serialize (list));

                if (!System.IO.Directory.Exists ($"Silinen{_dir}"))
                    System.IO.Directory.CreateDirectory ($"Silinen{_dir}");

                await System.IO.File.WriteAllTextAsync (ToFullFileName (modul + DateTime.Now.Ticks, $"Silinen{_dir}"), JsonSerializer.Serialize (item));

                return new ResultDto (true);
            } catch (System.Exception ex) {
                return new ResultDto (ex.Message);

            }
        }
    }
}