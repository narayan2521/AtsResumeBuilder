// // // src/App.jsx
// // import { useState } from 'react';
// // import Header from './component/Header';
// // import ResumeForm from './component/ResumeForm';
// // import ResumePreview from './component/ResumePreview';
// // import './App.css';

// // function App() {
// //   // This state will hold ALL the user's resume data
// //   // We'll start with a basic structure
// //   const [resumeData, setResumeData] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     summary: '',
// //     education: [],
// //     experience: [],
// //     skills: []
// //   });

// //   return (
// //     <div className="App">
// //       <Header />
// //       <main className="app-main">
// //         {/* We pass the state and the function to update it to the form */}
// //         <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
// //         {/* We pass the current data to the preview component */}
// //         <ResumePreview resumeData={resumeData} />
// //       </main>
// //     </div>
// //   );
// // }


// // export default App;


// // src/App.jsx
// import { useState } from 'react';
// import Header from './component/Header';
// import ResumeForm from './component/ResumeForm';
// import ResumePreview from './component/ResumePreview';
// // import TemplateSelector from './TemplateSelector'; // We will change this component
// import styles from './App.module.css'; // Import CSS Module
// import ExportButton from './component/ExportButton';

// // Define our templates (just metadata for now)

// const TEMPLATES = [
//   { id: 'default', name: 'Default', description: 'Our standard clean layout' },
//   { id: 'modern', name: 'Modern', description: 'Clean and professional layout' },
//   { id: 'classic', name: 'Classic', description: 'Traditional timeline format' },
// ];

// function App() {
//   const [resumeData, setResumeData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '', // New field
//     linkedin: '', // New field
//     summary: '',
//     education: [{ id: 1, institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' }],
//     experience: [{ id: 1, company: '', position: '', startDate: '', endDate: '', description: '' }],
//     skills: [{ id: 1, name: '', level: '' }]
//   });

//   const [currentTemplate, setCurrentTemplate] = useState('default');

//     // Generate file name based on user's name
//   const getFileName = () => {
//     return resumeData.name ? resumeData.name.toLowerCase().replace(/\s+/g, '-') : 'my-resume';
//   };


//   return (
//     <div className={styles.app}>
//       <Header />
//       <main className={styles.appMain}>
//         <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        
//         <div className={styles.previewPanel}>
//           <div className={styles.templateSwitcher}>
//             <label htmlFor="template-select"><strong>Preview Template:</strong></label>
//             <select 
//               id="template-select"
//               value={currentTemplate} 
//               onChange={(e) => setCurrentTemplate(e.target.value)}
//               className={styles.templateDropdown}
//             >
//               {TEMPLATES.map(template => (
//                 <option key={template.id} value={template.id}>
//                   {template.name}
//                 </option>
//               ))}
//             </select>
//             {/* export option  */}
//               <ExportButton 
//               templateId={currentTemplate} 
//               fileName={getFileName()}
//             />
//           </div>
//           <ResumePreview resumeData={resumeData} templateId={currentTemplate} />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import { useState, useRef } from 'react'; 
import ExportButton from './component/ExportButton';
import html2pdf from 'html2pdf.js';
import styles from './App.module.css'; 
import Header from './component/Header';
import ResumeForm from './component/ResumeForm';
import ResumePreview from './component/ResumePreview'; 

const TEMPLATES = [
  { id: 'default', name: 'Default', description: 'Our standard clean layout' },
  { id: 'modern', name: 'Modern', description: 'Clean and professional layout' },
  { id: 'classic', name: 'Classic', description: 'Traditional timeline format' },
];

function App() {
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    summary: '',
    education: [{ id: 1, institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' }],
    experience: [{ id: 1, company: '', position: '', startDate: '', endDate: '', description: '' }],
    skills: [{ id: 1, name: '', level: 'Intermediate' }]
  });

  const [currentTemplate, setCurrentTemplate] = useState('default');
  const previewRef = useRef(null); // Create a ref for the preview container

  const getFileName = () => {
    return resumeData.name ? resumeData.name.toLowerCase().replace(/\s+/g, '-') : 'my-resume';
  };

  const handleExportPDF = () => {
    const element = previewRef.current;
    
    if (!element) {
      console.error('Preview container ref not found');
      return;
    }

    // Options for PDF generation
    const opt = {
      margin: 10,
      filename: `${getFileName()}-${currentTemplate}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };

    // Generate PDF
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .catch(err => {
        console.error('Error generating PDF:', err);
        alert('Error generating PDF. Please try again.');
      });
  };

  const handleExportWord = () => {
    alert('Word export functionality will be implemented in the next phase!');
  };

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.appMain}>
        <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        
        <div className={styles.previewPanel}>
          <div className={styles.templateSwitcher}>
            <label htmlFor="template-select"><strong>Preview Template:</strong></label>
            <select 
              id="template-select"
              value={currentTemplate} 
              onChange={(e) => setCurrentTemplate(e.target.value)}
              className={styles.templateDropdown}
            >
              {TEMPLATES.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            
            <ExportButton 
              onExportPDF={handleExportPDF}
              onExportWord={handleExportWord}
            />
          </div>
          
          {/* Add ref to the preview container */}
          <div ref={previewRef}>
            <ResumePreview resumeData={resumeData} templateId={currentTemplate} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;