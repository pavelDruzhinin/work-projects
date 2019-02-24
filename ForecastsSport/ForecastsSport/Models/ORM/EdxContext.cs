using ForecastsSport.Models.BaseModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ForecastsSport.Models.ORM
{
    public class EdxContext:DbContext
    {
        public EdxContext() : base("EdxConnection") { }
        public DbSet<EdxUserProfile> UserProfiles { get; set; }
    }
}