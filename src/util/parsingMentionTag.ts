export const parsingMentionTag = (text: string) => {
  return text
    .split(" ")
    .map((text) => {
      if (text.startsWith("@"))
        return (
          "@" + text.slice(text.lastIndexOf("[") + 1, text.lastIndexOf("]"))
        );
      return text;
    })
    .join(" ");
};
