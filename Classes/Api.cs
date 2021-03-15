using System.Net.Http;
using System.Threading.Tasks;

namespace Evrit
{
    public static class Api
    {
        public static async Task<string> GetSearch(string q)
        {
            var apiUrl = Utils.GetConfigByName<string>("url");
            var apiKey = Utils.GetConfigByName<string>("apiKey");
            string data = string.Empty;
            
            using (HttpClient client = new HttpClient())
            using (HttpResponseMessage res = await client.GetAsync($"{apiUrl}?api_key={apiKey}&q={q}"))
            using (HttpContent content = res.Content)
            {
                data = await content.ReadAsStringAsync();

            }

            return data;
        }
    }
}