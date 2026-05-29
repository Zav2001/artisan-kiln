"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BracketFieldProps {
  value: string | number;
  onChange?: (value: string) => void;
  readonly?: boolean;
  prefix?: string;
  className?: string;
  inputClassName?: string;
  highlight?: boolean;
}

export default function BracketField({
  value,
  onChange,
  readonly = false,
  prefix = "",
  className = "",
  inputClassName = "",
  highlight = false,
}: BracketFieldProps) {
  const displayValue = prefix
    ? `${prefix}${typeof value === "number" ? value.toFixed(2) : value}`
    : String(value);

  if (readonly) {
    return (
      <motion.span
        key={displayValue}
        initial={{ opacity: 0.6, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={`bracket-field readonly ${highlight ? "highlight" : ""} ${className}`}
      >
        [ {displayValue} ]
      </motion.span>
    );
  }

  return (
    <span className={`bracket-field ${className}`}>
      [{" "}
      {prefix && <span>{prefix}</span>}
      <input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={inputClassName}
        aria-label="Quantity"
      />{" "}
      ]
    </span>
  );
}

interface UnderlineFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}

export function UnderlineField({
  label,
  value,
  onChange,
  error,
  multiline = false,
  className = "",
  placeholder,
}: UnderlineFieldProps) {
  return (
    <div className={`underline-field ${className}`}>
      <label htmlFor={label}>{label}</label>
      {multiline ? (
        <textarea
          id={label}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={2}
        />
      ) : (
        <input
          id={label}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {error && (
        <span className="text-[0.62rem] text-terracotta-dark">{error}</span>
      )}
    </div>
  );
}

export function SectionBox({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`section-panel ${className}`}>{children}</div>
  );
}
