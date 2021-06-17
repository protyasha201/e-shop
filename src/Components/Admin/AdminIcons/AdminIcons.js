import React from "react";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import BorderStyleIcon from "@material-ui/icons/BorderStyle";
import AddIcon from "@material-ui/icons/Add";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

const AdminIcons = (props) => {
  const index = props.index;
  if (index === 0) {
    return <PermDataSettingIcon />;
  } else if (index === 1) {
    return <PeopleOutlineIcon />;
  } else if (index === 2) {
    return <AnnouncementIcon />;
  } else if (index === 3) {
    return <LocalOfferIcon />;
  } else if (index === 4) {
    return <BorderStyleIcon />;
  } else if (index === 5) {
    return <AddIcon />;
  } else if (index === 6) {
    return <PersonAddIcon />;
  } else if (index === 7) {
    return <ReportProblemIcon />;
  } else if (index === 8) {
    return <EqualizerIcon />;
  }
};

export default AdminIcons;
