import React, { useState } from "react";
import BatchExpiryMaster from "../../../component/admin/inventory/BatchExpiryMaster";

const BatchExpiry = () => {
  const [batches, setBatches] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleAdd = () => {
    setSelectedBatch(null);
    setShowForm(true);
  };

  const handleEdit = (batch) => {
    setSelectedBatch(batch);
    setShowForm(true);
  };

  const handleView = (batch) => {
    console.log("View batch:", batch);
  };

  const handleSave = (batchData) => {
    if (selectedBatch) {
      setBatches((current) =>
        current.map((batch) =>
          batch.id === selectedBatch.id
            ? {
                ...batch,
                ...batchData,
              }
            : batch
        )
      );
    } else {
      const newBatch = {
        id: Date.now(),
        ...batchData,
      };

      setBatches((current) => [
        ...current,
        newBatch,
      ]);
    }

    setShowForm(false);
    setSelectedBatch(null);
  };

  return (
    <BatchExpiryMaster
      batches={batches}
      showForm={showForm}
      selectedBatch={selectedBatch}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onView={handleView}
      onSave={handleSave}
      onClose={() => {
        setShowForm(false);
        setSelectedBatch(null);
      }}
    />
  );
};

export default BatchExpiry;