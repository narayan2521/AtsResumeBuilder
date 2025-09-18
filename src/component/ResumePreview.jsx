import React from 'react';
import styles from '../styles/ResumePreview.module.css';

// Default Template
const DefaultTemplate = ({ resumeData }) => {
  return (
    <article className={styles.defaultTemplate}>
      <header className={styles.header}>
        <div className={styles.name}>{resumeData.name || 'Your Name'}</div>
        <div className={styles.contactInfo}>
          {resumeData.email && <span>📧 {resumeData.email}</span>}
          {resumeData.phone && <span>📞 {resumeData.phone}</span>}
          {resumeData.address && <span>📍 {resumeData.address}</span>}
          {resumeData.linkedin && <span>🔗 {resumeData.linkedin}</span>}
        </div>
      </header>

      {resumeData.summary && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Professional Summary</h3>
          <p className={styles.summary}>{resumeData.summary}</p>
        </section>
      )}

      {resumeData.education && resumeData.education.length > 0 && resumeData.education[0].institution && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Education</h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className={styles.educationItem}>
              <div className={styles.educationHeader}>
                <div className={styles.educationLeft}>
                  <div className={styles.educationDegree}>{edu.degree}</div>
                  <div className={styles.educationInstitution}>{edu.institution}</div>
                  {edu.field && <div className={styles.educationField}>Field: {edu.field}</div>}
                </div>
                <div className={styles.educationDates}>
                  {edu.startDate} - {edu.endDate || 'Present'}
                </div>
              </div>
              {edu.description && <p className={styles.educationDescription}>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience[0].company && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Work Experience</h3>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <div className={styles.experienceLeft}>
                  <div className={styles.experiencePosition}>{exp.position}</div>
                  <div className={styles.experienceCompany}>{exp.company}</div>
                </div>
                <div className={styles.experienceDates}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </div>
              </div>
              {exp.description && <p className={styles.experienceDescription}>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && resumeData.skills[0].name && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Skills</h3>
          <div className={styles.skillsContainer}>
            {resumeData.skills.map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                <span className={styles.skillName}>{skill.name}</span>
                {skill.level && <span className={styles.skillLevel}>({skill.level})</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

// Modern Template
const ModernTemplate = ({ resumeData }) => {
  return (
    <article className={styles.modernTemplate}>
      <div className={styles.modernLeftColumn}>
        <header className={styles.modernHeader}>
          <div className={styles.modernName}>{resumeData.name || 'Your Name'}</div>
          <div className={styles.modernContact}>
            {resumeData.email && <div>📧 {resumeData.email}</div>}
            {resumeData.phone && <div>📞 {resumeData.phone}</div>}
            {resumeData.address && <div>📍 {resumeData.address}</div>}
            {resumeData.linkedin && <div>🔗 {resumeData.linkedin}</div>}
          </div>
        </header>

        {resumeData.summary && (
          <section className={styles.modernSection}>
            <h3 className={styles.modernSectionTitle}>PROFILE</h3>
            <p className={styles.modernSummary}>{resumeData.summary}</p>
          </section>
        )}

        {resumeData.skills && resumeData.skills.length > 0 && resumeData.skills[0].name && (
          <section className={styles.modernSection}>
            <h3 className={styles.modernSectionTitle}>SKILLS</h3>
            <div className={styles.modernSkills}>
              {resumeData.skills.map((skill, index) => (
                <div key={index} className={styles.modernSkillItem}>
                  <span className={styles.modernSkillName}>{skill.name}</span>
                  {skill.level && (
                    <div className={styles.modernSkillBar}>
                      <div 
                        className={styles.modernSkillLevel} 
                        style={{width: 
                          skill.level === 'Beginner' ? '25%' : 
                          skill.level === 'Intermediate' ? '50%' : 
                          skill.level === 'Advanced' ? '75%' : '100%'
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className={styles.modernRightColumn}>
        {resumeData.education && resumeData.education.length > 0 && resumeData.education[0].institution && (
          <section className={styles.modernSection}>
            <h3 className={styles.modernSectionTitle}>EDUCATION</h3>
            {resumeData.education.map((edu, index) => (
              <div key={index} className={styles.modernEducationItem}>
                <div className={styles.modernEducationHeader}>
                  <div className={styles.modernEducationDegree}>{edu.degree}</div>
                  <div className={styles.modernEducationDates}>
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </div>
                </div>
                <div className={styles.modernEducationInstitution}>{edu.institution}</div>
                {edu.field && <div className={styles.modernEducationField}>{edu.field}</div>}
                {edu.description && <p className={styles.modernEducationDescription}>{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience[0].company && (
          <section className={styles.modernSection}>
            <h3 className={styles.modernSectionTitle}>EXPERIENCE</h3>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className={styles.modernExperienceItem}>
                <div className={styles.modernExperienceHeader}>
                  <div className={styles.modernExperiencePosition}>{exp.position}</div>
                  <div className={styles.modernExperienceDates}>
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </div>
                </div>
                <div className={styles.modernExperienceCompany}>{exp.company}</div>
                {exp.description && <p className={styles.modernExperienceDescription}>{exp.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </article>
  );
};

// Classic Template
const ClassicTemplate = ({ resumeData }) => {
  return (
    <article className={styles.classicTemplate}>
      <header className={styles.classicHeader}>
        <div className={styles.classicName}>{resumeData.name || 'Your Name'}</div>
        <div className={styles.classicContact}>
          {resumeData.email && <span>📧 {resumeData.email}</span>}
          {resumeData.phone && <span>📞 {resumeData.phone}</span>}
          {resumeData.address && <span>📍 {resumeData.address}</span>}
          {resumeData.linkedin && <span>🔗 {resumeData.linkedin}</span>}
        </div>
      </header>

      {resumeData.summary && (
        <section className={styles.classicSection}>
          <h3 className={styles.classicSectionTitle}>Objective</h3>
          <p className={styles.classicSummary}>{resumeData.summary}</p>
        </section>
      )}

      <div className={styles.classicTwoColumn}>
        <div className={styles.classicLeft}>
          {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience[0].company && (
            <section className={styles.classicSection}>
              <h3 className={styles.classicSectionTitle}>Experience</h3>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className={styles.classicExperienceItem}>
                  <div className={styles.classicExperienceHeader}>
                    <div className={styles.classicExperienceDates}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </div>
                    <div className={styles.classicExperienceDetails}>
                      <div className={styles.classicExperiencePosition}>{exp.position}</div>
                      <div className={styles.classicExperienceCompany}>{exp.company}</div>
                    </div>
                  </div>
                  {exp.description && <p className={styles.classicExperienceDescription}>{exp.description}</p>}
                </div>
              ))}
            </section>
          )}
        </div>

        <div className={styles.classicRight}>
          {resumeData.education && resumeData.education.length > 0 && resumeData.education[0].institution && (
            <section className={styles.classicSection}>
              <h3 className={styles.classicSectionTitle}>Education</h3>
              {resumeData.education.map((edu, index) => (
                <div key={index} className={styles.classicEducationItem}>
                  <div className={styles.classicEducationHeader}>
                    <div className={styles.classicEducationDates}>
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </div>
                    <div className={styles.classicEducationDetails}>
                      <div className={styles.classicEducationDegree}>{edu.degree}</div>
                      <div className={styles.classicEducationInstitution}>{edu.institution}</div>
                      {edu.field && <div className={styles.classicEducationField}>{edu.field}</div>}
                    </div>
                  </div>
                  {edu.description && <p className={styles.classicEducationDescription}>{edu.description}</p>}
                </div>
              ))}
            </section>
          )}

          {resumeData.skills && resumeData.skills.length > 0 && resumeData.skills[0].name && (
            <section className={styles.classicSection}>
              <h3 className={styles.classicSectionTitle}>Skills</h3>
              <div className={styles.classicSkills}>
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className={styles.classicSkillItem}>
                    {skill.name} {skill.level && `(${skill.level})`}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
};

// Main ResumePreview component
const ResumePreview = ({ resumeData, templateId }) => {
  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />;
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} />;
      case 'default':
      default:
        return <DefaultTemplate resumeData={resumeData} />;
    }
  };

  return (
    <section className={styles.resumePreview}>
      {/* <h2 className={styles.previewTitle}>Live Preview</h2> */}
      <div className={styles.previewContainer}>
        {renderTemplate()}
      </div>
    </section>
  );
};

export default ResumePreview;