// // src/ExportButton.jsx
// import React from 'react';
// import html2pdf from 'html2pdf.js';
// import styles from '../styles/ExportButton.module.css';

// const ExportButton = ({ templateId, fileName = 'my-resume' }) => {
//   const handleExportPDF = () => {
//     // Get the preview container element
//     const element = document.querySelector(`.${styles.previewContainer}`);
    
//     if (!element) {
//       console.error('Preview container not found');
//       return;
//     }

//     // Options for PDF generation
//     const opt = {
//       margin: 10,
//       filename: `${fileName}-${templateId}.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//     };

//     // Generate PDF
//     html2pdf()
//       .set(opt)
//       .from(element)
//       .save()
//       .catch(err => {
//         console.error('Error generating PDF:', err);
//       });
//   };

//   const handleExportWord = () => {
//     // Placeholder for Word export functionality
//     alert('Word export functionality will be implemented in the next phase!');
//   };

//   return (
//     <div className={styles.exportControls}>
//       <button 
//         onClick={handleExportPDF} 
//         className={styles.exportButton}
//         title="Export as PDF"
//       >
//         📄 Export PDF
//       </button>
//       <button 
//         onClick={handleExportWord} 
//         className={styles.exportButton}
//         title="Export as Word Document"
//       >
//         📝 Export Word
//       </button>
//     </div>
//   );
// };

// export default ExportButton;

// src/ExportButton.jsx
import React from 'react';
import html2pdf from 'html2pdf.js';
import styles from '../styles/ExportButton.module.css';

const ExportButton = ({ onExportPDF, onExportWord }) => {
  return (
    <div className={styles.exportControls}>
      <button 
        onClick={onExportPDF} 
        className={styles.exportButton}
        title="Export as PDF"
      >
        📄 Export PDF
      </button>
      <button 
        onClick={onExportWord} 
        className={styles.exportButton}
        title="Export as Word Document"
      >
        📝 Export Word
      </button>
    </div>
  );
};

export default ExportButton;