import lunr from "lunr";
import WindowIcon from "@mui/icons-material/Window";
import EmailIcon from "@mui/icons-material/Email";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import PaidIcon from "@mui/icons-material/Paid";
import React from "react";

type Page = {
  id: number;
  content: string;
  selectedTab: string;
  displayName: string;
  icon: () => React.JSX.Element;
};

export const pages: Page[] = [
  {
    id: 1,
    content: "De luna trecuta Facturi Restante Utilizatori Plati Profit Trafic",
    selectedTab: "acasa",
    displayName: "Acasă",
    icon: (): React.JSX.Element => <WindowIcon />,
  },
  {
    id: 2,
    content: "Clienți Cauta utilizator Cauta client clienti caută",
    selectedTab: "clienti",
    displayName: "Clienți",
    icon: (): React.JSX.Element => <PeopleAltIcon />,
  },
  {
    id: 3,
    content: "Anunțuri anunturi",
    selectedTab: "anunturi",
    displayName: "Anunțuri",
    icon: (): React.JSX.Element => <EmailIcon />,
  },
  {
    id: 4,
    content: "Facturi Cauta factura",
    selectedTab: "facturi",
    displayName: "Facturi",
    icon: (): React.JSX.Element => <PaidIcon />,
  },
  {
    id: 5,
    content: "Statistici",
    selectedTab: "statistici",
    displayName: "Statistici",
    icon: (): React.JSX.Element => <BarChartIcon />,
  },
  {
    id: 6,
    content: "Setări Incarca Imagine Detalii Cont Setari",
    selectedTab: "setari",
    displayName: "Setări",
    icon: (): React.JSX.Element => <SettingsIcon />,
  },
];

export const idx = lunr(function () {
  this.ref("id");
  this.field("content");

  pages.forEach((page) => {
    this.add(page);
  });
});
