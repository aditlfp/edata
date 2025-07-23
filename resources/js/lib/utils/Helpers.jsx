import React from "react";

export function Kapital(props) {
  return props
    ?.toLowerCase()
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function Undercase(props) {
  return <div>{props}</div>;
}
