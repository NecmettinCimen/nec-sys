namespace NecSys.Api.Models
{
    public class ResultDto {
        public bool success { get; set; }
        public dynamic result { get; set; }
        public string error { get; set; }
        public ResultDto (dynamic result) {
            this.result = result;
            success = true;
        }
        public ResultDto (string error) {
            this.error = error;
            success = false;
        }
    }
}