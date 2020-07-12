using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Datting.api.Dtos
{
    public class UserForUpdateDto
    {
        public string LookingFor { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
    }
}
