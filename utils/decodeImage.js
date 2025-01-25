exports.decodeImages = (projects) => {
  if (!projects.length) return [projects];
  const projectsWithImages = projects.map((project) => {
    if (project.attachment) {
      // Convert the BYTEA (binary) data to a Base64 string
      const base64Image = Buffer.from(project.attachment).toString("base64");
      return {
        ...project,
        attachment: `data:image/jpeg;base64,${base64Image}`, // Adjust MIME type if necessary
      };
    }
    if (project.attachments) {
        // Convert the BYTEA (binary) data to a Base64 string
        project.attachments = project.attachments.map((attachment) => {
            const base64Image = Buffer.from(attachment).toString("base64");
            return {
                ...project.attachments,
                attachment: `data:image/jpeg;base64,${base64Image}`, // Adjust MIME type if necessary
            };
        })
      }
    
    return project;
  });
  return projectsWithImages;
};