using System;
using System.ComponentModel.DataAnnotations;

namespace TacoKaiju.Models
{
    public class Taco
    {
        [Key]
        public int TacoId {get;set;}
        [Required]
        public string ShellType {get;set;}
        [Required]
        [MinLength(2)]
        public string Protein {get;set;}
        [Required]
        public string Fillings {get;set;}
        [Required]
        [Range(1, Int32.MaxValue)]
        public int? Calories {get;set;}
    }
}