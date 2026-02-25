import React from "react";
import Select from "react-select";
import "../../styles/editStyle.css";

const FONT_OPTIONS = [
  { label: "Georgia", value: "Georgia" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Arial", value: "Arial" },
  { label: "Calibri", value: "Calibri" },
  { label: "Cambria", value: "Cambria"}
];

export const THEME_OPTIONS = [
  {
    label: "Classic Blue",
    value: "classicBlue",
    theme: {
      headingColor: "#1f2937",
      textColor: "#374151",
      accentColor: "#2563eb",
      pageBg: "#ffffff",
      skillBox: "#2563eb",
      skillTextColor: "#ffffff",
    },
  },
  {
    label: "Slate",
    value: "slate",
    theme: {
      headingColor: "#0f172a",
      textColor: "#334155",
      accentColor: "#475569",
      pageBg: "#ffffff",
      skillBox: "#475569",
      skillTextColor: "#ffffff",
    },
  },
  {
    label: "Charcoal",
    value: "charcoal",
    theme: {
      headingColor: "#111827",
      textColor: "#1f2937",
      accentColor: "#111827",
      pageBg: "#ffffff",
      skillBox: "#111827",
      skillTextColor: "#ffffff",
    },
  },
];

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 40,
    borderRadius: 8,
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
    "&:hover": { borderColor: "#9ca3af" },
  }),
  valueContainer: (base) => ({ ...base, padding: "0 10px" }),
  menu: (base) => ({ ...base, borderRadius: 8, zIndex: 20 }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#e5efff"
      : state.isFocused
      ? "#f5f8ff"
      : "#fff",
    color: "#1f2937",
  }),
};

const EditStylePanel = ({ customStyles, setCustomStyles }) => {
  const update = (key, value) => {
    setCustomStyles((prev) => ({ ...prev, [key]: value }));
  };

  const applyTheme = (option) => {
    if (!option) return;
    setCustomStyles((prev) => ({
      ...prev,
      themeId: option.value,
      ...option.theme,
    }));
  };

  return (
    <section className="edit-style-panel">
      <div className="edit-style-header">
        <h2>Style</h2>
        <p>Select a professional theme and font.</p>
      </div>

      <div className="edit-style-grid">
        <div className="style-row">
          <label className="style-label">Theme</label>
          <div className="style-control">
            <Select
              options={THEME_OPTIONS}
              styles={selectStyles}
              value={THEME_OPTIONS.find((x) => x.value === customStyles.themeId)}
              onChange={applyTheme}
            />
          </div>
        </div>

        <div className="style-row">
          <label className="style-label">Font Family</label>
          <div className="style-control">
            <Select
              options={FONT_OPTIONS}
              styles={selectStyles}
              value={FONT_OPTIONS.find((x) => x.value === customStyles.fontFamily)}
              onChange={(option) =>
                update("fontFamily", option?.value || FONT_OPTIONS[0].value)
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditStylePanel;