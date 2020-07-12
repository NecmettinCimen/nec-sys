using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.IO;

namespace NecSys.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ModulController : ControllerBase
    {
        [HttpPost]
        public async Task<ResultDto> Post([FromBody] PostDto values)
        {
            try
            {

                var item = JsonSerializer.Deserialize<Modul>(values.values);

                if (!System.IO.Directory.Exists("Moduller"))
                    System.IO.Directory.CreateDirectory("Moduller");

                await System.IO.File.WriteAllTextAsync(Path.Combine("Moduller", item.ad + ".json"), values.values);

                return new ResultDto(true);
            }
            catch (System.Exception ex)
            {
                return new ResultDto(ex.Message);
            }
        }
        [HttpGet]
        public ResultDto Get()
        {
            try
            {
                var files = Directory.GetFiles("Moduller");

                return new ResultDto(files);
            }
            catch (System.Exception)
            {

                throw;
            }
        }

    }

    public class PostDto
    {
        public string values { get; set; }
    }

    public class Modul
    {
        public string ad { get; set; }
    }
    public class ResultDto
    {
        public bool success { get; set; }
        public dynamic result { get; set; }
        public string error { get; set; }
        public ResultDto(dynamic result)
        {
            this.result = result;
            success = true;
        }
        public ResultDto(string error)
        {
            this.error = error;
            success = false;
        }
    }

}
