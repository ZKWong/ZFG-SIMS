using System;
using System.Collections.Generic;
using SIMS.API.Models;

namespace SIMS.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string FullName { get { return LastName + ", " + FirstName;} }
        public string DateOfBirth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string PhoneNumber2 { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string CurrentAcademicLevel { get; set; }
        public string DegreeProgram { get; set; }
        public string CurrentProgram { get; set; }
        public string Notes { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotosForDetailedDto> Photos { get; set; }

         // Bachelors Info
        public string BachelorsStartDate { get; set; }
        public string BachelorsMentor { get; set; }
        public string BachelorsProjectAdvisor { get; set; }
        public string BachelorsThesisAdvisor { get; set; }
        public string BachelorsProjectTitle { get; set; }
        public string BachelorsThesisTitle { get; set; }
        public string BachelorsGradDate { get; set; }
        
        // Masters Info
        public string MastersStartDate { get; set; }
        public string MastersFocus { get; set; }
        public string MastersProjectAdvisor { get; set; }
        public string MastersThesisAdvisor { get; set; }
        public string MastersCommMember1 { get; set; }
        public string MastersCommMember2 { get; set; }
        public string MastersCommMember3 { get; set; }
        public string MastersCommMember4 { get; set; }
        public string MastersCommMember5 { get; set; }
        public string MastersCommFormDate { get; set; }
        public string MastersDefenseDate { get; set; }
        public string MastersProjectTitle { get; set; }
        public string MastersThesisTitle { get; set; }
        public string MastersGradDate { get; set; }

         //PhD Info
        public string DoctoralCandidate { get; set; }
        public string DoctorateStartDate { get; set; }
        public string DateAcceptedForCandidacy { get; set; }
        public string DoctorateAdvisor { get; set; }
        public string ExternalAdvisor { get; set; }
        public string DoctorateCommMember1 { get; set; }
        public string DoctorateCommMember2 { get; set; }
        public string DoctorateCommMember3 { get; set; }
        public string DoctorateCommMember4 { get; set; }
        public string DoctorateCommMember5 { get; set; }
        public string DoctorateCommMember6 { get; set; }
        public string DoctorateCommFormDate { get; set; }
        public string DissertationDefenseDate { get; set; }
        public string DissertationTitle { get; set; }
        public string DoctorateGradDate { get; set; }

         // faculty info
        public string Office { get; set; }
        public string ResearchInterest { get; set; }
        public string Degree { get; set; }
        public string Designation { get; set; }
        public string Current { get; set; }
        public string Title { get; set; }
    }
}