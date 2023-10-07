interface AnimatedMenuIconProps {
  isOpen: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const AnimatedMenuIcon = (props: AnimatedMenuIconProps) => {
  const { isOpen, handleClick } = props;
  return (
    <button
      id="btn"
      className={isOpen ? "on" : ""}
      onClick={handleClick}
      style={{ zIndex: isOpen ? 2 : 1 }}
    >
      <span />
      <span />
      <span />
    </button>
  );
};
