using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using TacoKaiju.Models;

namespace TacoKaiju.Controllers
{
    public class HomeController : Controller
    {

        private MyContext _context {get;set;}

        public HomeController(MyContext mc)
        {
            _context = mc;
        }

        [HttpGet("")]
        public IActionResult Index()
        {
            return View(_context.Tacos.ToList());
        }

        [HttpPost("taco")]
        public JsonResult Create(Taco kt)
        {
            if(ModelState.IsValid) {
                _context.Tacos.Add(kt);
                _context.SaveChanges();
                return Json(new {msg="ok"});
            } 
            else
            {
                var allErrors = ModelState.ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                );
                return Json(new {msg="not ok", errors=allErrors});
            }
        }
    }
}
