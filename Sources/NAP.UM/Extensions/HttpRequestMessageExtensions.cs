using System;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace NAP.UM.Extensions
{
    public static class HttpRequestMessageExtensions
    {
        public static HttpRequestMessage AddHMAC(this HttpRequestMessage request, string secretKey)
        {
            var machineIP = Dns.GetHostEntry(Dns.GetHostName());
            var requestUri = HttpUtility.UrlEncode(request.RequestUri.OriginalString.ToLowerInvariant());
            var requestHttpMethod = request.Method.ToString();

            // Calculate UNIX time
            var epochStart = new DateTime(1970, 01, 01, 0, 0, 0, 0, DateTimeKind.Utc);
            var timeSpan = DateTime.UtcNow - epochStart;
            var requestTimeStamp = Convert.ToUInt64(timeSpan.TotalSeconds).ToString();

            // create random nonce for each request
            var nonce = Guid.NewGuid().ToString("N");

            // Creating the raw signature string
            var signatureRawData = string.Format("{0}{1}{2}{3}{4}", machineIP, requestHttpMethod, requestUri, requestTimeStamp, nonce);
            var secretKeyByteArray = Convert.FromBase64String(secretKey);
            byte[] signature = Encoding.UTF8.GetBytes(signatureRawData);

            using (var hmac = new HMACSHA256(secretKeyByteArray))
            {
                byte[] signatureBytes = hmac.ComputeHash(signature);
                string requestSignatureBase64String = Convert.ToBase64String(signatureBytes);

                // Setting the values in the Authorization header using custom scheme (amx)
                string authHeader = string.Format("amx {0}", string.Format("{0}:{1}:{2}:{3}", machineIP, requestSignatureBase64String, nonce, requestTimeStamp));
                request.Headers.Add("Authorization", authHeader);
            }

            return request;
        }
    }
}