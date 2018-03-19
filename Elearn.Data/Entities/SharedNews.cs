using Elearn.Data.Entities.Base;

namespace Elearn.Data.Entities
{
    public class ShareNews : Entity
    {
        public int NewsId { get; set; }
        public string Users { get; set; }
        public bool? IsMailSent { get; set; }

        public virtual News News { get; set; }

    }
}
