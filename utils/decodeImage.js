const decodeOneProjectImages = (project) => {
  if (project.attachments) {
    // Convert the BYTEA (binary) data to a Base64 string
    project.attachments = project.attachments.map((attachment) => {
      const base64Image = Buffer.from(attachment.attachment).toString("base64");
      return {
        ...project.attachments.attachment,
        attachment: `data:${attachment.mime_type};base64,${base64Image}`,
      };
    });
  }
  return project;
};

// exports.decodeImages = (projects) => {
//   if (!projects.length) return [projects];
//   const projectsWithImages = projects.map((project) => {
//     if (project.attachment) {
//       // Convert the BYTEA (binary) data to a Base64 string
//       const base64Image = Buffer.from(project.attachment).toString("base64");
//       return {
//         ...project,
//         attachment: `data:image/jpeg;base64,${base64Image}`, // Adjust MIME type if necessary
//       };
//     }
//     if (project.attachments) {
//       // Convert the BYTEA (binary) data to a Base64 string
//       project.attachments = project.attachments.map((attachment) => {
//         const base64Image = Buffer.from(attachment).toString("base64");
//         return {
//           ...project.attachments,
//           attachment: `data:image/jpeg;base64,${base64Image}`, // Adjust MIME type if necessary
//         };
//       });
//     }

//     return project;
//   });
//   return projectsWithImages;
// };

// exports.decodeProjectsImages = (projects) => {
//   const projectsWithImages = projects.map((project) => {
//     if (project.attachments) {
//       // Convert the BYTEA (binary) data to a Base64 string
//       project.attachments = project.attachments.map((attachment) => {
//         console.log(attachment.attachmet);
//         const base64Image = Buffer.from(attachment.attachment).toString(
//           "base64"
//         );
//         return {
//           ...project.attachments.attachment,
//           image: `data:${attachment.mime_type};base64,${base64Image}`,
//         };
//       });
//     }
//     return project;
//   });
//   return projectsWithImages;
// };

exports.decodeProjectsImages = (projects) => {
  const projectsWithImages = projects.map((project) => {
    return decodeOneProjectImages(project);
  });
  return projectsWithImages;
};

exports.decodeOneProjectImages = decodeOneProjectImages;
// (project) => {
//   if (project.attachments) {
//     // Convert the BYTEA (binary) data to a Base64 string
//     project.attachments = project.attachments.map((attachment) => {
//       const base64Image = Buffer.from(attachment.attachment).toString("base64");
//       return {
//         ...project.attachments.attachment,
//         attachment: `data:${attachment.mime_type};base64,${base64Image}`,
//       };
//     });
//   }
//   return project;
// };

// this decodes a single image (for certifications)
exports.decodeImage = (certifications) => {
  const certificationsWithImages = certifications.map((certification) => {
    if (certification.attachment) {
      // Convert the BYTEA (binary) data to a Base64 string
      const base64Image = Buffer.from(certification.attachment).toString(
        "base64"
      );
      return {
        ...certification,
        attachment: `data:${certification.mime_type};base64,${base64Image}`, // Adjust MIME type if necessary
      };
    }
  });
  return certificationsWithImages;
};
