export function summarize(content: string): string {
  let text = content;

  text = text.replace(/!\[[^\]]*]\([^)]*\)/g, '');
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/^#{1,6}\s.*$/gm, '');
  text = text.replace(/`([^`]*)`/g, '$1');
  text = text.replace(/\[([^\]]+)]\([^)]*\)/g, '$1');
  text = text.replace(/[*_>~\-]+/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();

  return text.length > 160 ? `${text.slice(0, 157)}...` : text;
}
