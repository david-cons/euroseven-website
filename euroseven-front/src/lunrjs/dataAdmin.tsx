import lunr from "lunr";
import WindowIcon from "@mui/icons-material/Window";
import EmailIcon from "@mui/icons-material/Email";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import PaidIcon from "@mui/icons-material/Paid";
import React from "react";
import GasMeter from "@mui/icons-material/GasMeter";
import ContactPage from "@mui/icons-material/ContactPage";
import Speed from "@mui/icons-material/Speed";
import Help from "@mui/icons-material/Help";

type Page = {
  id: number;
  content: string;
  selectedTab: string;
  displayName: string;
  icon: () => React.JSX.Element;
};

export const pagesAdmin: Page[] = [
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

export const idxAdmin = lunr(function () {
  this.ref("id");
  this.field("content");

  pagesAdmin.forEach((page) => {
    this.add(page);
  });
});

export const pagesIncasari: Page[] = [
  {
    id: 1,
    content:
      "Facturi Restante Creeare Factura Creeare Factură Inregistreaza Plata Înregistrează Plată Email Facturi Ghid Utilizator Legal Setari Setări Acasa Acasă Deconecteazate Deconecteaza-te Deconectează-te",
    selectedTab: "acasa",
    displayName: "Acasă",
    icon: (): React.JSX.Element => <WindowIcon />,
  },
  {
    id: 2,
    content:
      "Plati Plați Cauta plata Caută plată Creeare Plata Creeare Plată Creeaza Plata Creează Plată",
    selectedTab: "plati",
    displayName: "Plăți",
    icon: (): React.JSX.Element => <PaidIcon />,
  },
  {
    id: 3,
    content:
      "Facturi Cauta factura Caută factură Creeaza Factura Creează Factură Inregistreaza Factura Înregistrează Factura Facturi",
    selectedTab: "facturi",
    displayName: "Facturi",
    icon: (): React.JSX.Element => <EmailIcon />,
  },
  {
    id: 4,
    content:
      "Contor Contoare Cauta contor Caută contor Creeaza Contor Creează Contor Aproba contor Aprobă contor",
    selectedTab: "contor",
    displayName: "Contoare",
    icon: (): React.JSX.Element => <GasMeter />,
  },
  {
    id: 6,
    content: "Setări Incarca Imagine Detalii Cont Setari",
    selectedTab: "setari",
    displayName: "Setări",
    icon: (): React.JSX.Element => <SettingsIcon />,
  },
];

export const idxIncasari = lunr(function () {
  this.ref("id");
  this.field("content");

  pagesIncasari.forEach((page) => {
    this.add(page);
  });
});

export const pagesClient: Page[] = [
  {
    id: 1,
    content:
      "rest de plata rest de plată facturi restante plati recente plați recente index vechi index nou acasa acasă",
    selectedTab: "acasa",
    displayName: "Acasă",
    icon: (): React.JSX.Element => <WindowIcon />,
  },
  {
    id: 2,
    content:
      "rest de plata rest de plată restul tău de plată restul tau de plata facturi restante facturi platite plateste factura platește factură plateste facturi factura descarca descarcă",
    selectedTab: "facturi",
    displayName: "Facturi",
    icon: (): React.JSX.Element => <PaidIcon />,
  },
  {
    id: 3,
    content:
      "contract contractul tău durată contract tip de contract dată început contract dată terminat contract data inceput data terminat",
    selectedTab: "contract",
    displayName: "Contract",
    icon: (): React.JSX.Element => <ContactPage />,
  },
  {
    id: 4,
    content:
      "citire contor citește contor citeste contor citire contoare serie contor inregistreaza citire contor înregistrează citire contor",
    selectedTab: "contor",
    displayName: "Contor",
    icon: (): React.JSX.Element => <GasMeter />,
  },
  {
    id: 5,
    content: "consum vezi consum",
    selectedTab: "consum",
    displayName: "Consum",
    icon: (): React.JSX.Element => <Speed />,
  },
  {
    id: 5,
    content: "ajutor intrebare întrebare intrebari întrebări faq",
    selectedTab: "ajutor",
    displayName: "Ajutor",
    icon: (): React.JSX.Element => <Help />,
  },
  {
    id: 6,
    content: "Setări Incarca Imagine Detalii Cont Setari",
    selectedTab: "setari",
    displayName: "Setări",
    icon: (): React.JSX.Element => <SettingsIcon />,
  },
];

export const idxClient = lunr(function () {
  this.ref("id");
  this.field("content");

  pagesClient.forEach((page) => {
    this.add(page);
  });
});
