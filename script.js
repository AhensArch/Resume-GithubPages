// Load and render resume from JSON
async function loadResume() {
  try {
    const response = await fetch('resume-data.json');
    if (!response.ok) throw new Error('Failed to load resume data');
    
    const data = await response.json();
    renderResume(data);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('app').innerHTML = '<p style="color: red;">Error loading resume. Make sure resume-data.json is in the same folder.</p>';
  }
}

function renderResume(data) {
  const html = `
    <div class="header">
      <h1>${data.personalInfo.name}</h1>
      <div class="contact">
        ${data.personalInfo.location} | ${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.linkedin}
      </div>
    </div>

    <div class="summary section">
      <p>${data.summary}</p>
    </div>

    <!-- Work Experience -->
    <div class="section">
      <div class="section-title">Work Experience</div>
      ${data.workExperience.map(job => `
        <div class="job">
          <div class="job-header">
            <div class="job-title">${job.jobTitle}</div>
            <div class="job-date">${job.startDate} - ${job.endDate}</div>
          </div>
          <div class="job-company">${job.company}</div>
          <ul class="job-responsibilities">
            ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>

    <!-- Education -->
    <div class="section">
      <div class="section-title">Education</div>
      ${data.education.map(edu => `
        <div class="education-item">
          <div class="education-header">
            <div class="education-degree">${edu.degree}</div>
            <div class="education-years">${edu.years}</div>
          </div>
          <div class="education-school">${edu.school}</div>
        </div>
      `).join('')}
    </div>

    <!-- Certifications -->
    <div class="section">
      <div class="section-title">Certifications</div>
      <div class="certifications">
        ${data.certifications.map(cert => `<div class="cert-item">${cert}</div>`).join('')}
      </div>
    </div>

    <!-- Skills -->
    <div class="section">
      <div class="section-title">Technical Skills</div>
      <div class="skills-section">
        ${Object.entries(data.skills).map(([category, skills]) => `
          <div class="skill-item">
            <span class="skill-category">${category}:</span>
            <span class="skill-content">${skills}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('app').innerHTML = html;
}

// Load resume when page loads
document.addEventListener('DOMContentLoaded', loadResume);
