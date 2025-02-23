module.exports = {
  uploadFile: async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      const fileName = req.file.originalname;
      const fileStream = fs.createReadStream(
        path.join(__dirname, req.file.path)
      );

      const uploadStream = gridFSBucket.openUploadStream(fileName);
      uploadStream.end(req.file.buffer);

      uploadStream.on("finish", () => {
        res.status(201).send("File uploaded successfully.");
      });

      uploadStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file.");
      });
    } catch (error) {
      next(error);
    }
  },
};
