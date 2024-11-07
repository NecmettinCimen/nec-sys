using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NecSys.Api.Models;

namespace NecSys.Api.Controllers
{

    [ApiController]
    [Route ("[controller]")]
    public class DosyaController : ControllerBase {

        string _dir = "Dosyalar";
        string _file = "Dosyalar.json";
        private string ToFullFileName (string id, string dir = null) => Path.Combine (dir??_dir, id);

        [HttpPost]
        public async Task<ResultDto> Post () {
            try {

                if (!Directory.Exists (_dir))
                    Directory.CreateDirectory (_dir);

                var file = Request.Form.Files.First ();

                using (var stream = System.IO.File.Create (ToFullFileName (file.FileName))) {
                    await file.CopyToAsync (stream);
                }

                List<DosyaDto> list = new List<DosyaDto> ();

                if (System.IO.File.Exists (ToFullFileName (_file)))
                    list = JsonSerializer.Deserialize<List<DosyaDto>> (await System.IO.File.ReadAllTextAsync (ToFullFileName (_file)));

                list.Add (new DosyaDto{ FileName = file.FileName, ContentType = file.ContentType, Length = file.Length, Name = file.Name });

                await System.IO.File.WriteAllTextAsync (ToFullFileName (_file), JsonSerializer.Serialize (list));

                return new ResultDto (true);
            } catch (System.Exception ex) {
                return new ResultDto (ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get () {
            try {
                var path = ToFullFileName (_file);
                var file = await System.IO.File.ReadAllBytesAsync (path);
                return File (file, "application/json");
            } catch (System.Exception) {
                return NotFound ();
            }
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> Get (string id) {
            try {
                var result = await System.IO.File.ReadAllTextAsync (ToFullFileName (_file));

                List<DosyaDto> list = JsonSerializer.Deserialize<List<DosyaDto>> (result);
                var item = list.FirstOrDefault (f => f.FileName == id);

                var path = ToFullFileName (item.FileName);
                var file = await System.IO.File.ReadAllBytesAsync (path);

                return File (file, item.ContentType);
            } catch (System.Exception) {
                return NotFound ();
            }
        }

        [HttpDelete ("{id}")]
        public async Task<ResultDto> Delete (string id) {
            try {

                List<DosyaDto> list = JsonSerializer.Deserialize<List<DosyaDto>> (await System.IO.File.ReadAllTextAsync (ToFullFileName (_file)));

                var item = list.FirstOrDefault (f => JsonSerializer.Serialize (f).Contains (id));
                list = list.Where (f => !JsonSerializer.Serialize (f).Contains (id)).ToList ();

                await System.IO.File.WriteAllTextAsync (ToFullFileName (_file), JsonSerializer.Serialize (list));

                if (!Directory.Exists ($"Silinen{_dir}"))
                    Directory.CreateDirectory ($"Silinen{_dir}");

                System.IO.File.Move (ToFullFileName (item.FileName), ToFullFileName (item.FileName, $"Silinen{_dir}"));

                return new ResultDto (true);
            } catch (System.Exception ex) {
                return new ResultDto (ex.Message);

            }
        }
    }
}