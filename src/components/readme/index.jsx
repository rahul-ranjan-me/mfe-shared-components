import React from "react";
import PropTypes from "prop-types";

import "./readme.scss";

const ReadmeContent = ({ data }) => data && <div className="readme-container" dangerouslySetInnerHTML={{ __html: data }} />;

ReadmeContent.propTypes = {
  data: PropTypes.string.isRequired,
};

export default ReadmeContent;
