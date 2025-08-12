export default function Button({
  label,
  href,
  centered = true,
}: {
  label: string;
  href: string;
  centered?: boolean;
}) {
  return `
<div style="${centered ? "margin: auto;" : ""}">
  <a 
    href="${href}" 
    style="
      display: inline-block; 
      padding: 10px 16px; 
      background-color: #2563eb; 
      color: white; 
      text-decoration: none; 
      border-radius: 6px;
      font-family: inherit;
    "
  >
    ${label}
  </a>
</div>
`;
}
