import React, { useState, useRef, useEffect } from "react";
import "../styles/main.css";
import { api } from "../services/api";

const Upload = ({ onUploadComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]); // Pending files
  const [uploadedFiles, setUploadedFiles] = useState(() => {
    try {
      const saved = localStorage.getItem("uploadedFilesHistory");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }); // Successfully uploaded files
  const [uploadProgress, setUploadProgress] = useState({}); // { fileName: percentage }
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    patientId: "",
    recordingDate: "",
    sessionType: "Resting State",
    notes: "",
  });

  const [datasetFiles, setDatasetFiles] = useState([]);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const files = await api.getDatasetFiles();
        setDatasetFiles(files);
      } catch (error) {
        console.error("Failed to load local datasets", error);
      }
    };
    fetchDatasets();
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const validExtensions = [
      "edf",
      "cdv",
      "csv",
      "bdf",
      "mat",
      "fif",
      "set",
      "vhdr",
    ];
    const newFiles = Array.from(fileList).filter((file) => {
      const extension = file.name.split(".").pop().toLowerCase();
      return validExtensions.includes(extension);
    });

    if (newFiles.length !== fileList.length) {
      alert(
        "Some files were rejected. Supported formats: .edf, .bdf, .csv, .mat, .fif, .set, .vhdr",
      );
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  const removeUploadedFile = (indexToRemove) => {
    setUploadedFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, index) => index !== indexToRemove);
      localStorage.setItem("uploadedFilesHistory", JSON.stringify(newFiles));
      return newFiles;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select a file first.");
      return;
    }
    if (!formData.patientId || !formData.recordingDate) {
      alert("Please fill in the required fields (Patient ID, Recording Date).");
      return;
    }

    setIsUploading(true);

    try {
      for (const file of files) {
        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

        const response = await api.uploadDataset(file, formData);

        // Set progress to 100 after successful upload
        setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
        setUploadedFiles((prev) => {
          const newFiles = [...prev, { name: file.name, size: file.size }];
          localStorage.setItem(
            "uploadedFilesHistory",
            JSON.stringify(newFiles),
          );
          return newFiles;
        });

        // Store active dataset for the Dashboard
        localStorage.setItem(
          "activeDataset",
          JSON.stringify({
            filename: file.name,
            patientId: formData.patientId,
          }),
        );
      }

      setFiles([]);
      setUploadProgress({});
      setFormData({
        patientId: "",
        recordingDate: "",
        sessionType: "Resting State",
        notes: "",
      });

      // If running inside Dashboard, close upload view
      if (onUploadComplete) {
        setTimeout(() => onUploadComplete(), 1000);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f0f4f8",
        padding: "2rem",
        overflowY: "auto",
      }}
    >
      <div className="container-xl">
        {/* Stats Cards */}
        <div className="row mb-4 g-3">
          <div className="col-md-4">
            <div className="bg-white p-3 rounded-3 shadow-sm d-flex align-items-center gap-3">
              <div className="bg-light p-2 rounded-circle text-primary">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div>
                <div className="small text-muted">Total Uploads</div>
                <div className="fw-bold fs-5">{uploadedFiles.length}</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white p-3 rounded-3 shadow-sm d-flex align-items-center gap-3">
              <div className="bg-light p-2 rounded-circle text-success">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <div className="small text-muted">Processing</div>
                <div className="fw-bold fs-5">
                  {isUploading ? "Active" : "Idle"}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white p-3 rounded-3 shadow-sm d-flex align-items-center gap-3">
              <div className="bg-light p-2 rounded-circle text-info">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <div className="small text-muted">Status</div>
                <div className="fw-bold fs-5">Secure Connection</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Left Column: Upload Zone */}
          <div className="col-lg-6">
            <div className="bg-white p-4 rounded-3 shadow-sm h-100">
              <h5 className="fw-bold mb-4">Upload EEG Dataset</h5>

              <div
                className={`upload-zone p-5 rounded-3 text-center d-flex flex-column align-items-center justify-content-center ${dragActive ? "bg-light border-primary" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !isUploading && inputRef.current.click()}
                style={{
                  border: "2px dashed #cbd5e1",
                  minHeight: "300px",
                  cursor: isUploading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  background: dragActive ? "#f1f5f9" : "#fff",
                  opacity: isUploading ? 0.6 : 1,
                }}
              >
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  onChange={handleChange}
                  accept=".edf,.bdf,.csv,.mat,.fif,.set,.vhdr"
                  style={{ display: "none" }}
                  disabled={isUploading}
                />

                <div className="mb-3 p-3 rounded-circle bg-light">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <h6 className="fw-semibold mb-2">
                  Drag and drop your EEG file here
                </h6>
                <p className="text-muted small mb-3">or click to browse</p>
                <p className="text-muted" style={{ fontSize: "0.75rem" }}>
                  Supported: .edf, .bdf, .csv, .mat, .fif, .set, .vhdr • Max 500
                  MB
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata Form */}
          <div className="col-lg-6">
            <div className="bg-white p-4 rounded-3 shadow-sm h-100">
              <h5 className="fw-bold mb-4">Dataset Metadata</h5>

              <div className="mb-3">
                <label className="form-label small fw-semibold">
                  Patient ID <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="e.g., P001234"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  disabled={isUploading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">
                  Recording Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control bg-light border-0"
                  name="recordingDate"
                  value={formData.recordingDate}
                  onChange={handleInputChange}
                  disabled={isUploading}
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold">
                  Session Type <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select bg-light border-0"
                  name="sessionType"
                  value={formData.sessionType}
                  onChange={handleInputChange}
                  disabled={isUploading}
                >
                  <option>Resting State</option>
                  <option>Motor Imagery</option>
                  <option>Visual Evoked Potential</option>
                  <option>P300 Speller</option>
                  <option>Sleep Monitoring</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold">
                  Additional Notes
                </label>
                <textarea
                  className="form-control bg-light border-0"
                  rows="3"
                  placeholder="Any additional information about this recording..."
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  disabled={isUploading}
                ></textarea>
              </div>

              <button
                className="btn btn-primary w-100 py-2 fw-semibold"
                onClick={handleUpload}
                disabled={isUploading}
                style={{
                  background: isUploading ? "#cbd5e1" : "var(--primary)",
                  border: "none",
                  color: "#fff",
                }}
              >
                {isUploading ? "Uploading..." : "Upload Dataset"}
              </button>
              {files.length === 0 && !isUploading && (
                <p className="text-center mt-2 text-muted small">
                  Please select a file first
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Local Datasets Section */}
        {datasetFiles.length > 0 && (
          <div className="row mt-4">
            <div className="col-12">
              <div className="bg-white p-4 rounded-3 shadow-sm">
                <h5 className="fw-bold mb-3">
                  <i className="fas fa-server me-2 text-primary"></i>Available
                  Local Datasets
                </h5>
                <p className="text-muted small mb-3">
                  These files are already preprocessed on the server. Select one
                  to immediately start streaming without uploading.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {datasetFiles.map((df, idx) => (
                    <button
                      key={idx}
                      className="btn btn-outline-primary d-flex align-items-center gap-2"
                      onClick={() => {
                        localStorage.setItem(
                          "activeDataset",
                          JSON.stringify({
                            filename: df.filename,
                            patientId: df.subject || "S1",
                          }),
                        );
                        if (onUploadComplete) onUploadComplete();
                      }}
                      disabled={isUploading}
                    >
                      <i className="fas fa-file-waveform"></i>
                      {df.filename}{" "}
                      <span className="badge bg-light text-dark ms-2">
                        {df.size_mb} MB
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pending / Uploading Queue */}
        {(files.length > 0 || isUploading) && (
          <div className="row mt-4">
            <div className="col-12">
              <div
                className="bg-white p-4 rounded-3 shadow-sm"
                style={{ borderLeft: "4px solid #f59e0b" }}
              >
                <h6 className="fw-bold mb-3">Pending Uploads</h6>
                <div className="d-flex flex-column gap-2">
                  {files.map((file, index) => (
                    <div key={index} className="p-3 bg-light rounded">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-warning text-dark rounded-pill">
                            {index + 1}
                          </span>
                          <span className="small fw-semibold">{file.name}</span>
                          <span className="small text-muted">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        {!isUploading && (
                          <button
                            onClick={() => removeFile(index)}
                            className="btn btn-sm btn-link text-danger text-decoration-none"
                          >
                            &times;
                          </button>
                        )}
                      </div>
                      {/* Progress Bar */}
                      {isUploading && (
                        <div className="progress" style={{ height: "6px" }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{
                              width: `${uploadProgress[file.name] || 0}%`,
                              transition: "width 0.2s ease",
                            }}
                            aria-valuenow={uploadProgress[file.name] || 0}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Uploaded Queue */}
        <div className="row mt-4">
          <div className="col-12">
            <div
              className="bg-white p-4 rounded-3 shadow-sm"
              style={{ borderLeft: "4px solid var(--primary)" }}
            >
              {uploadedFiles.length > 0 ? (
                <>
                  <h6 className="fw-bold mb-3">Uploaded Files</h6>
                  <div className="d-flex flex-column gap-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-between p-3 bg-light rounded border border-success border-opacity-25"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-success bg-opacity-10 p-2 rounded-circle text-success">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <div>
                            <div className="fw-semibold small">{file.name}</div>
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {(file.size / 1024 / 1024).toFixed(2)} MB •
                              Uploaded just now
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeUploadedFile(index)}
                          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                          style={{ fontSize: "0.8rem" }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h6 className="fw-bold mb-3 text-primary">
                    Upload Guidelines
                  </h6>
                  <ul className="small text-muted mb-0 ps-3">
                    <li className="mb-1">
                      Accepted formats: .edf, .bdf, .csv, .mat, .fif, .set,
                      .vhdr
                    </li>
                    <li className="mb-1">
                      Maximum file size: 500 MB per dataset
                    </li>
                    <li className="mb-1">
                      Ensure all patient identifiers are properly anonymized
                      before upload
                    </li>
                    <li>
                      Complete all required metadata fields for proper dataset
                      cataloging
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
