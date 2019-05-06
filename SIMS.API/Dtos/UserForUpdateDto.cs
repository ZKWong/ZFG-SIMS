
using System;
using System.Collections.Generic;
using SIMS.API.Models;

namespace SIMS.API.Dtos
{
    public class UserForUpdateDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhoneNumber2 { get; set; }
        public string Notes { get; set; }
        // Bachelor's Info
        public DateTime? BachelorsStartDate { get; set; }
        public string BachelorsMentor { get; set; }
        public string BachelorsProjectAdvisor { get; set; }
        public string BachelorsThesisAdvisor { get; set; }
        public string BachelorsProjectTitle { get; set; }
        public string BachelorsThesisTitle { get; set; }
        public DateTime? BachelorsGradDate { get; set; }
        // Master's Info
        public DateTime? MastersStartDate { get; set; }
        public string MastersFocus { get; set; }
        public string MastersProjectAdvisor { get; set; }
        public string MastersThesisAdvisor { get; set; }
        public string MastersCommMember1 { get; set; }
        public string MastersCommMember2 { get; set; }
        public string MastersCommMember3 { get; set; }
        public string MastersCommMember4 { get; set; }
        public string MastersCommMember5 { get; set; }
        public DateTime? MastersCommFormDate { get; set; }
        public DateTime? MastersDefenseDate { get; set; }
        public string MastersProjectTitle { get; set; }
        public string MastersThesisTitle { get; set; }
        public DateTime? MastersGradDate { get; set; }
        // PhD
        public string DoctoralCandidate { get; set; }
        public DateTime? DoctorateStartDate { get; set; }
        public DateTime? DateAcceptedForCandidacy { get; set; }
        public string DoctorateAdvisor { get; set; }
        public string ExternalAdvisor { get; set; }
        public DoctorateCommittee DoctorateCommittee { get; set; }
        public string DoctorateCommMember1 { get; set; }
        public string DoctorateCommMember2 { get; set; }
        public string DoctorateCommMember3 { get; set; }
        public string DoctorateCommMember4 { get; set; }
        public string DoctorateCommMember5 { get; set; }
        public string DoctorateCommMember6 { get; set; }
        public DateTime? DoctorateCommFormDate { get; set; }
        public DateTime? DissertationDefenseDate { get; set; }
        public string DissertationTitle { get; set; }
        public DateTime? DoctorateGradDate { get; set; }

        // faculty
        public string Office { get; set; }
        public string ResearchInterest { get; set; }
        public string Degree { get; set; }
        public string Designation { get; set; }
        public string Current { get; set; }
        public string Title { get; set; }
    }
}