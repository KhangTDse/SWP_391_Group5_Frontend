import { useState } from "react";

export default function PrescriptionPage() {
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
    setPrescription(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValid =
    prescription.rightSPH &&
    prescription.leftSPH &&
    prescription.pd;

  return (
    <div className="min-h-screen px-8 py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Enter Your Prescription
      </h1>

      {/* Right Eye */}
      <div className="mb-6">
        <h2 className="font-medium mb-2">Right Eye (OD)</h2>
        <div className="grid grid-cols-3 gap-4">
          <Input label="SPH" name="rightSPH" value={prescription.rightSPH} onChange={handleChange} />
          <Input label="CYL" name="rightCYL" value={prescription.rightCYL} onChange={handleChange} />
          <Input label="AXIS" name="rightAxis" value={prescription.rightAxis} onChange={handleChange} />
        </div>
      </div>

      {/* Left Eye */}
      <div className="mb-6">
        <h2 className="font-medium mb-2">Left Eye (OS)</h2>
        <div className="grid grid-cols-3 gap-4">
          <Input label="SPH" name="leftSPH" value={prescription.leftSPH} onChange={handleChange} />
          <Input label="CYL" name="leftCYL" value={prescription.leftCYL} onChange={handleChange} />
          <Input label="AXIS" name="leftAxis" value={prescription.leftAxis} onChange={handleChange} />
        </div>
      </div>

      {/* PD */}
      <div className="mb-8 max-w-xs">
        <Input label="Pupillary Distance (PD)" name="pd" value={prescription.pd} onChange={handleChange} />
      </div>

      <div className="flex justify-end">
        <button
          disabled={!isValid}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type="number"
        step="0.25"
        className="w-full border rounded px-3 py-2"
        {...props}
      />
    </div>
  );
}
