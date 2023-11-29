export const HorizontalLine = ({bold = false}) => {
    return <hr className={bold ? "border-t-[#FFFFFFFF]" : "border-t-[#FFFFFF33]"} />;
  };