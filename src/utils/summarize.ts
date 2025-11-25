export function summarize(content: string): string {
  let text = content;

  text = text.replace(/!\[.*?\]\(.*?\)/g, '');            // 이미지 제거
  text = text.replace(/```[\s\S]*?```/g, '');             // 코드블록 제거
  text = text.replace(/^#+\s.+$/gm, '');                  // 헤더 제거
  text = text.replace(/`([^`]*)`/g, '$1');                // inline code
  text = text.replace(/\[([^\]]+)]\([^)]+\)/g, '$1');     // 링크 제거
  text = text.replace(/[*_>~\-]/g, '');                   // md 스타일 제거
  text = text.replace(/\s+/g, ' ').trim();                // 공백 정리

  if(text.length > 160) return text.substring(0, 157) + '...';
  return text;
}
