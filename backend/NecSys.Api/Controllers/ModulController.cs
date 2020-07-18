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
    public class ModulController : ControllerBase {

        private string ToFullFileName (string id, string dir = "Moduller") => Path.Combine (dir, id + ".json");

        [HttpPost]
        public async Task<ResultDto> Post ([FromBody] ModulPostDto values) {
            try {

                var item = JsonSerializer.Deserialize<Modul> (values.values);

                if (!System.IO.Directory.Exists ("Moduller"))
                    System.IO.Directory.CreateDirectory ("Moduller");

                await System.IO.File.WriteAllTextAsync (ToFullFileName (item.ad), values.values);

                if (!string.IsNullOrEmpty (item.eskiad))
                    ModulSil (item.eskiad);

                return new ResultDto (true);
            } catch (System.Exception ex) {
                return new ResultDto (ex.Message);
            }
        }

        [HttpGet]
        public dynamic Get () {
            try {
                var files = Directory.GetFiles ("Moduller");

                var result = files.Where (w => !w.StartsWith ("Silinen")).Select (s => new { Modul = s.Split ("\\").Last ().Replace (".json", "") }).ToList ();
                return new {
                    data = result,
                        totalCount = result.Count
                };
            } catch (System.Exception) {

                throw;
            }
        }

        [HttpGet ("{id}")]
        public async Task<dynamic> Get (string id) {
            try {
                var result = await System.IO.File.ReadAllTextAsync (ToFullFileName (id));
                return result;
            } catch (System.Exception) {
                throw;
            }
        }

        [HttpDelete ("{id}")]
        public ResultDto Delete (string id) {
            return ModulSil (id);
        }
        private ResultDto ModulSil (string id) {
            try {

                if (!System.IO.Directory.Exists ("SilinenModuller"))
                    System.IO.Directory.CreateDirectory ("SilinenModuller");

                System.IO.File.Move (ToFullFileName (id), ToFullFileName (id + DateTime.Now.Ticks, "SilinenModuller"));

                return new ResultDto (true);
            } catch (System.Exception ex) {
                return new ResultDto (ex.Message);
            }
        }
    }

}