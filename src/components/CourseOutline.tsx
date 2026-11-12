type Props = { modules: string[] };
export function CourseOutline({ modules }: Props) {
  const sections: string[][] = [];
  for (let index = 0; index < modules.length; index += 4) sections.push(modules.slice(index, index + 4));
  return (
    <div className="g-outline">
      {sections.map((section, group) => (
        <details key={group} open={group === 0}>
          <summary><span className="g-outline-icon">▤</span><span><strong>Part {String(group + 1).padStart(2, "0")}</strong><small>Modules {group * 4 + 1}–{group * 4 + section.length}</small></span><span className="g-chevron">⌄</span></summary>
          <ol start={group * 4 + 1}>{section.map((module, index) => <li key={module}><span>{String(group * 4 + index + 1).padStart(2, "0")}</span><strong>{module}</strong><span className="g-module-type">Topic outline</span></li>)}</ol>
        </details>
      ))}
    </div>
  );
}