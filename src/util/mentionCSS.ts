export const mentionInputStyle = {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    outlineStyle: "none",
  },

  "&multiLine": {
    control: {
      minHeight: 20,
    },
    highlighter: {},
    input: {
      outlineStyle: "none",
      overflow: "auto",
    },
  },

  "&singleLine": {
    display: "inline-block",
    width: 180,

    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      padding: 1,
      border: "2px inset",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};
export const mentionStyle = {
  backgroundColor: "#cee4e5",
};
