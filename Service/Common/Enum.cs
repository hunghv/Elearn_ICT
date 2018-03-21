using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Common
{

    public enum SortOrder
    {
        [Display(Name = "asc")]
        Asc,
        [Display(Name = "desc")]
        Desc,
        [Display(Name = "none")]
        None
    }

}
