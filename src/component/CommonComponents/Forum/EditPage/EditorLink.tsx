import { CompositeDecorator } from "draft-js";

export const Link = (props: any) => {
  const { url, linkText } = props.contentState
    .getEntity(props.entityKey)
    .getData();
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={url}
      style={{ textDecoration: "underline", color: "#006cb7" }}
    >
      {linkText || props.children}
    </a>
  );
};

export const linkDecorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) => {
      contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === "LINK"
        );
      }, callback);
    },
    component: Link,
  },
]);
