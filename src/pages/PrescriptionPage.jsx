import { useState } from "react";

export default function PrescriptionPage() {
  const [mode, setMode] = useState("manual"); // manual | upload
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const [prescription, setPrescription] = useState({
    rightSPH: "",
    leftSPH: "",
    rightCYL: "",
    leftCYL: "",
    rightAxis: "",
    leftAxis: "",
    pd: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setPrescription(prev => ({ ...prev, [name]: value }));
  };

  const validateManual = () => {
    const errs = {};
    if (!prescription.rightSPH) errs.rightSPH = "Required";
    if (!prescription.leftSPH) errs.leftSPH = "Required";
    if (!prescription.pd) errs.pd = "Required";
    return errs;
  };

  const validateUpload = () => {
    const errs = {};
    if (!file) errs.file = "Please upload your prescription";
    return errs;
  };

  const handleNext = () => {
    const validationErrors =
      mode === "manual" ? validateManual() : validateUpload();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Save draft later
      console.log("Prescription valid");
    }
  };

  return (
    <div className="min-h-screen px-8 py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Prescription Details
      </h1>

      {/* Mode Switch */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode("manual")}
          className={`px-4 py-2 rounded border
            ${mode === "manual" ? "bg-blue-600 text-white" : ""}
          `}
        >
          Enter Manually
        </button>

        <button
          onClick={() => setMode("upload")}
          className={`px-4 py-2 rounded border
            ${mode === "upload" ? "bg-blue-600 text-white" : ""}
          `}
        >
          Upload Prescription
        </button>
      </div>

      {/* Manual Entry */}
      {mode === "manual" && (
        <>
          <EyeSection
            title="Right Eye (OD)"
            prefix="right"
            values={prescription}
            errors={errors}
            onChange={handleChange}
          />
          <EyeSection
            title="Left Eye (OS)"
            prefix="left"
            values={prescription}
            errors={errors}
            onChange={handleChange}
          />

          <Input
            label="Pupillary Distance (PD)"
            name="pd"
            value={prescription.pd}
            error={errors.pd}
            onChange={handleChange}
          />
        </>
      )}

      {/* Upload */}
      {mode === "upload" && (
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Upload Prescription (PDF, JPG, PNG)
          </label>

          <input
            type="file"
            accept=".pdf,image/*"
            onChange={e => setFile(e.target.files[0])}
            className="block"
          />

          {errors.file && (
            <p className="text-red-600 text-sm mt-1">
              {errors.file}
            </p>
          )}
        </div>
      )}

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* ---------- Reusable components ---------- */

function EyeSection({ title, prefix, values, errors, onChange }) {
  return (
    <div className="mb-6">
      <h2 className="font-medium mb-2">{title}</h2>
      <div className="grid grid-cols-3 gap-4">
        <Input label="SPH" name={`${prefix}SPH`} value={values[`${prefix}SPH`]} error={errors[`${prefix}SPH`]} onChange={onChange} />
        <Input label="CYL" name={`${prefix}CYL`} value={values[`${prefix}CYL`]} onChange={onChange} />
        <Input label="AXIS" name={`${prefix}Axis`} value={values[`${prefix}Axis`]} onChange={onChange} />
      </div>
    </div>
  );
}

function Input({ label, error, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type="number"
        step="0.25"
        className={`w-full border rounded px-3 py-2 ${
          error ? "border-red-500" : ""
        }`}
        {...props}
      />
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
