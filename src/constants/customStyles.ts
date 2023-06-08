export const customStyles = {
  control: (styles: object) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: "5px",
    color: "#000",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
    border: "2px solid #000000"
  }),
  option: (styles: object) => {
    return {
      ...styles,
      color: "#000",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: "#fff",
      ":hover": {
        backgroundColor: "rgb(243 244 246)",
        color: "#000",
        cursor: "pointer"
      }
    };
  },
  menu: (styles: object) => {
    return {
      ...styles,
      backgroundColor: "#fff",
      maxWidth: "14rem",
      border: "2px solid #000000",
      borderRadius: "5px",
      boxShadow: "5px 5px 0px 0px rgba(0,0,0);"
    };
  },

  placeholder: (defaultStyles: object) => {
    return {
      ...defaultStyles,
      color: "#000",
      fontSize: "0.8rem",
      lineHeight: "1.75rem"
    };
  }
};
