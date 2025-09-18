 

// src/ResumeForm.jsx
import React from 'react';
import styles from '../styles/ResumeForm.module.css';

const ResumeForm = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target;
    
    if (index === null) {
      // Update simple fields (name, email, etc.)
      setResumeData({
        ...resumeData,
        [name]: value
      });
    } else {
      // Update array fields (education, experience, skills)
      const updatedSection = [...resumeData[section]];
      updatedSection[index] = {
        ...updatedSection[index],
        [name]: value
      };
      
      setResumeData({
        ...resumeData,
        [section]: updatedSection
      });
    }
  };

  const addEntry = (section) => {
    let newEntry;
    switch(section) {
      case 'education':
        newEntry = { id: Date.now(), institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' };
        break;
      case 'experience':
        newEntry = { id: Date.now(), company: '', position: '', startDate: '', endDate: '', description: '' };
        break;
      case 'skills':
        newEntry = { id: Date.now(), name: '', level: 'Intermediate' };
        break;
      default:
        return;
    }
    
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], newEntry]
    });
  };

  const removeEntry = (section, index) => {
    const updatedSection = resumeData[section].filter((_, i) => i !== index);
    setResumeData({
      ...resumeData,
      [section]: updatedSection
    });
  };

  return (
    <section className={styles.resumeForm}>
      <h2>Build Your Resume</h2>
      <form className={styles.formContainer}>

        {/* Personal Information Section */}
        <div className={styles.section}>
          <h3>Personal Information</h3>
          <div className={styles.twoColumns}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" value={resumeData.name} 
                     onChange={(e) => handleInputChange(e, 'personal')} 
                     placeholder="e.g., John Doe" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" value={resumeData.email} 
                     onChange={(e) => handleInputChange(e, 'personal')} 
                     placeholder="e.g., john.doe@example.com" required />
            </div>
          </div>
          
          <div className={styles.twoColumns}>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={resumeData.phone} 
                     onChange={(e) => handleInputChange(e, 'personal')} 
                     placeholder="e.g., (555) 123-4567" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="linkedin">LinkedIn</label>
              <input type="url" id="linkedin" name="linkedin" value={resumeData.linkedin} 
                     onChange={(e) => handleInputChange(e, 'personal')} 
                     placeholder="e.g., linkedin.com/in/johndoe" />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" value={resumeData.address} 
                   onChange={(e) => handleInputChange(e, 'personal')} 
                   placeholder="e.g., New York, NY" />
          </div>
        </div>

        {/* Professional Summary Section */}
        <div className={styles.section}>
          <h3>Professional Summary</h3>
          <div className={styles.formGroup}>
            <textarea id="summary" name="summary" value={resumeData.summary} 
                      onChange={(e) => handleInputChange(e, 'personal')} 
                      placeholder="Experienced software developer with 5+ years in web development..."
                      rows="4" />
          </div>
        </div>

        {/* Education Section */}
        <div className={styles.section}>
          <h3>
            Education
            <button type="button" className={styles.addButton} onClick={() => addEntry('education')}>
              + Add Education
            </button>
          </h3>
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className={styles.entry}>
              <button type="button" className={styles.removeButton} 
                      onClick={() => removeEntry('education', index)}>×</button>
              
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label>Institution *</label>
                  <input type="text" value={edu.institution} 
                         onChange={(e) => handleInputChange(e, 'education', index)}
                         name="institution" placeholder="University Name" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Degree *</label>
                  <input type="text" value={edu.degree} 
                         onChange={(e) => handleInputChange(e, 'education', index)}
                         name="degree" placeholder="Bachelor of Science" required />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Field of Study</label>
                <input type="text" value={edu.field} 
                       onChange={(e) => handleInputChange(e, 'education', index)}
                       name="field" placeholder="Computer Science" />
              </div>
              
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label>Start Date</label>
                  <input type="month" value={edu.startDate} 
                         onChange={(e) => handleInputChange(e, 'education', index)}
                         name="startDate" />
                </div>
                <div className={styles.formGroup}>
                  <label>End Date (or Expected)</label>
                  <input type="month" value={edu.endDate} 
                         onChange={(e) => handleInputChange(e, 'education', index)}
                         name="endDate" />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea value={edu.description} 
                          onChange={(e) => handleInputChange(e, 'education', index)}
                          name="description" placeholder="Relevant courses, achievements, GPA..."
                          rows="3" />
              </div>
            </div>
          ))}
        </div>

        {/* Work Experience Section */}
        <div className={styles.section}>
          <h3>
            Work Experience
            <button type="button" className={styles.addButton} onClick={() => addEntry('experience')}>
              + Add Experience
            </button>
          </h3>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className={styles.entry}>
              <button type="button" className={styles.removeButton} 
                      onClick={() => removeEntry('experience', index)}>×</button>
              
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label>Company *</label>
                  <input type="text" value={exp.company} 
                         onChange={(e) => handleInputChange(e, 'experience', index)}
                         name="company" placeholder="Company Name" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Position *</label>
                  <input type="text" value={exp.position} 
                         onChange={(e) => handleInputChange(e, 'experience', index)}
                         name="position" placeholder="Job Title" required />
                </div>
              </div>
              
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label>Start Date</label>
                  <input type="month" value={exp.startDate} 
                         onChange={(e) => handleInputChange(e, 'experience', index)}
                         name="startDate" />
                </div>
                <div className={styles.formGroup}>
                  <label>End Date (leave blank if current)</label>
                  <input type="month" value={exp.endDate} 
                         onChange={(e) => handleInputChange(e, 'experience', index)}
                         name="endDate" />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Description *</label>
                <textarea value={exp.description} 
                          onChange={(e) => handleInputChange(e, 'experience', index)}
                          name="description" placeholder="Describe your responsibilities and achievements..."
                          rows="4" required />
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className={styles.section}>
          <h3>
            Skills
            <button type="button" className={styles.addButton} onClick={() => addEntry('skills')}>
              + Add Skill
            </button>
          </h3>
          {resumeData.skills.map((skill, index) => (
            <div key={skill.id} className={styles.entry}>
              <button type="button" className={styles.removeButton} 
                      onClick={() => removeEntry('skills', index)}>×</button>
              
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label>Skill Name *</label>
                  <input type="text" value={skill.name} 
                         onChange={(e) => handleInputChange(e, 'skills', index)}
                         name="name" placeholder="e.g., JavaScript, Project Management" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Proficiency Level</label>
                  <select value={skill.level} 
                          onChange={(e) => handleInputChange(e, 'skills', index)}
                          name="level">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

      </form>
    </section>
  );
};

export default ResumeForm;