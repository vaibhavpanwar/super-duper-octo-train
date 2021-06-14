import React from "react";
import parse, { domToReact } from "html-react-parser";

const Parse = ({ data, setSelectedCompany, setContainerVisible }) => {
  const handleSelectCompany = (name, cin) => {
    setSelectedCompany({ name, cin });
    setContainerVisible(false);
  };

  const options = {
    replace: (domNode) => {
      const { attribs, children, name } = domNode;

      if (name === "div" && attribs.class === "show") {
        return (
          <div
            className="company-list-items"
            onClick={() => handleSelectCompany(children[0]?.data, attribs.id)}
          >
            {domToReact(children, options)}
          </div>
        );
      } else {
        return domNode;
      }
    },
  };

  return <>{parse(data, options)}</>;
};

export default Parse;
