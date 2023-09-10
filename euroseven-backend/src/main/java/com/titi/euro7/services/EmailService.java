package com.titi.euro7.services;


import com.titi.euro7.entities.Email;
import com.titi.euro7.entities.Invoice;
import com.titi.euro7.entities.PersonalDetails;
import com.titi.euro7.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class EmailService {

    Logger log = Logger.getLogger(EmailService.class.getName());

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private UserService userService;

    @Autowired
    private PersonalDetailsService personalDetailsService;


    public List<Email> createEmailsBasedOnUnpaidInvoices() {
        List<User> users = userService.getAllUsers();
        HashMap<User, List<Invoice>> userInvoices = new HashMap<User, List<Invoice>>();

        for (User user : users) {
            List<Invoice> usersInvoices = this.invoiceService.getInvoicesByUserId(user.id);

            if (usersInvoices.isEmpty()) {
                continue;
            }

            // Filter for unpaid invoices.

            userInvoices.put(user, usersInvoices);
        }

        List<Email> result = new List<Email>();

        Iterator<User> iterator = hashMap.keySet().iterator();
        while (iterator.hasNext()) {
            User user = iterator.next();
            result.add(this.fromInvoicesToEmail(userInvoices.get(user)));
        }

        return result;
    }
    public void sendEmail(Email email){
        // SendGrid integration.
    }

    private Email fromInvoicesToEmail(List<invoice> invoices) {
        PersonalDetails personalDetails = this.personalDetailsService.getPersonalDetailsById(invoices.get(0).personal_details_id)
        String subject = "";
        // Really ugly but I do not wanna move this already beautiful piece of text to a JSON file.
        String content = "DE LA: EURO SEVEN INDUSTRY S.R.L.\nADRESA :  CLC "+ personalDetails.customer_number +"\nSUBIECT: Soma\u021Bie de plat\u0103 a facturii/facturilor aferente consumului de gaze naturale\n\n \nStimate domn/doamna, \n\n            Subscrisa EURO SEVEN INDUSTRY S.R.L., cu sediul \u00EEn Municipiul Bucure\u0219ti, Strada Hora\u021Biu nr. 11, ap. 2 (etaj), sector 1, \u00EEnmatriculat\u0103 \u00EEn Registrul Comer\u021Bului sub nr. J40/7881/2000, av\u00E2nd codul unic de \u00EEnregistrare 13310879, cont IBAN RO16BRDE426SV44358664260 deschis la BRD, telefon: 0374.627.726, fax: 0374.092.081, email office@euro7.ro, reprezentat\u0103 de administrator Cong Yan, \u00EEn temeiul prevederilor art. 145 alin. (1) din Legea nr. 123/2012, art. 45, art. 61 lit. b) din Regulamentul privind furnizarea gazelor naturale la clien\u021Bii finali aprobat prin Ordinul nr. 29/2016, v\u0103 transmitem prezenta\n\n SOMA\u021AIE DE PLAT\u0102\n prin care v\u0103 solicit\u0103m ca \u00EEn termen de 5 zile de la primirea prezentei soma\u021Bii s\u0103 pl\u0103ti\u021Bi suma de "+
                this.sum(invoices) +
                " lei pe care o datora\u021Bi c\u0103tre Euro Seven Industry S.R.L., reprezent\u00E2nd debit/rest de plat\u0103 neachitat din factura/facturile urm\u0103toare, dup\u0103 cum urmeaz\u0103: \u00B7"+
                this.invoicesToString(invoices) +"\t\u00CEn situa\u021Bia \u00EEn care nu \u00EEn\u021Belege\u021Bi s\u0103 da\u021Bi curs soma\u021Biei noastre, vom fi nevoi\u021Bi s\u0103 reziliem contractul de furnizare cu dvs., s\u0103 solicit\u0103m concursul instan\u021Bei de judecat\u0103 competente, pentru a  recupera debitul datorat, penalit\u0103\u021Bile de \u00EEnt\u00E2rziere, c\u00E2t \u0219i daunele interese suplimentare, astfel \u00EEnc\u00E2t s\u0103 se asigure o desp\u0103gubire integral\u0103, rapid\u0103 \u015Fi echitabil\u0103 a Euro Seven Industry S.R.L. prin care s\u0103 se acopere prejudiciile materiale, financiare \u015Fi opera\u0163ionale suferite ca urmare a neachit\u0103rii la termen a contravalorii gazelor naturale furnizate c\u0103tre dvs., precum \u0219i toate cheltuielile suplimentare ocazionate de neplata consumului realizat de c\u0103tre dvs. \u00CEn acest sens, v\u0103 punem \u00EEn vedere c\u0103 \u00EEn cazul unui eventual demers judiciar, \u00EEn mod suplimentar, se va dispune obligarea dvs. la plata cheltuielilor de judecat\u0103 const\u00E2nd \u00EEn onorariu avoca\u021Bial \u0219i tax\u0103 judiciar\u0103 de timbru suportate de societatea noastr\u0103 \u00EEn vederea recuper\u0103rii acestor sume din partea dvs.\n\n\tV\u0103 punem \u00EEn vedere c\u0103 debitul pe care \u00EEl datora\u021Bi se \u00EEntemeiaz\u0103 pe contractul de furnizare incheiat cu societatea noastra \u0219i, totodat\u0103, potrivit aceluia\u0219i contract datora\u021Bi penalit\u0103\u021Bi de \u00EEnt\u00E2rziere \u00EEn cuantum de 0.02% pentru fiecare zi de \u00EEnt\u00E2rziere, astfel cum acestea sunt prev\u0103zute de art. 6 din contract, calculate la debitul datorat, \u00EEncep\u00E2nd cu data scaden\u021Bei facturii/facturilor \u0219i p\u00E2n\u0103 la plata efectiv\u0103 a sumei datorate.\n\n\u00CEn fapt, ar\u0103t\u0103m urm\u0103toarele:\n\n            \u00CEntre Euro Seven Industry S.R.L., \u00EEn calitate de furnizor \u0219i dvs, \u00EEn calitate de client final, s-a \u00EEncheiat un contract de furnizare prin care s-au convenit urm\u0103toarele:\n\n        i.            Euro Seven Industry S.R.L. se oblig\u0103 s\u0103 furnizeze c\u0103tre dvs. gaze naturale, la locul de consum stabilit prin contract;\n\n      ii.            Dvs. v-a\u021Bi obligat s\u0103 pl\u0103ti\u021Bi contravaloarea consumului de gaze naturale \u00EEnregistrat, \u00EEn termenul \u015Fi \u00EEn condi\u0163iile prev\u0103zute \u00EEn contractul de furnizare a gazelor naturale;\n\n    iii.            Dvs. v-a\u021Bi obligat ca, \u00EEn cazul \u00EEn care \u00EEnt\u00E2rzia\u021Bi la plat\u0103, s\u0103 pl\u0103ti\u021Bi penaliz\u0103ri de 0.02% pe zi de \u00EEnt\u00E2rziere din valoarea restant\u0103;\n\n\tUlterior semn\u0103rii contractului, de\u0219i societatea noastr\u0103 \u0219i-a executat obliga\u021Biile \u0219i a furnizat c\u0103tre dvs. gaze naturale ne\u00EEntrerupt, respect\u00E2ndu-\u0219i obliga\u021Biile contractuale, dvs. a\u021Bi consumat gaze \u00EEn perioada 01.06.2021 \u2013 31.07.2021, f\u0103r\u0103 a pl\u0103ti contravaloarea acestora, neexist\u00E2nd nicio justificare pentru neplata sumelor datorate c\u0103tre Euro Seven Industry S.R.L. \n\n\tPrin urmare, \u00EEn prezent \u00EEnregistra\u021Bi c\u0103te Euro Seven Industry S.R.L. o datorie \u00EEn cuantum de " +
                this.sum(invoices) + " lei, pe care, f\u0103r\u0103 nicio justificare, nu a\u021Bi achitat-o nici p\u00E2n\u0103 \u00EEn prezent, aduc\u00E2nd societ\u0103\u021Bii noastre un prejudiciu \u00EEnsemnat.\n\n\tMen\u021Bion\u0103m c\u0103 pentru neplata la scaden\u021B\u0103 a \u00EEntregii sumei datorate, \u00EEn conformitate cu prevederile contractului de furnizare \u00EEncheiat cu dvs., datora\u021Bi c\u0103tre societatea noastr\u0103 penalit\u0103\u021Bi de \u00EEnt\u00E2rziere \u00EEn cuantum de 0.02 % pe zi de \u00EEnt\u00E2rziere, calculate la debitul datorat, \u00EEncep\u00E2nd cu data scaden\u021Bei (exigibilit\u0103\u021Bii) fiec\u0103rei facturi \u0219i p\u00E2n\u0103 la plata efectiv\u0103 a sumei datorate.\n\n            V\u0103 punem \u00EEn vedere c\u0103 \u00EEn m\u0103sura \u00EEn care \u00EEn termen de 5 zile de la data primirii prezentei soma\u0163ii nu achita\u021Bi debitul restant \u0219i penalit\u0103\u021Bile de \u00EEnt\u00E2rziere datorate, vom fi nevoi\u021Bi s\u0103 reziliem contractul de furnizare cu dvs., \u00EEntruc\u00E2t v-a\u021Bi \u00EEnc\u0103lcat obliga\u021Bia contractual\u0103 esen\u021Bial\u0103 de plat\u0103 a pre\u021Bului, a\u0219a cum rezult\u0103 din dispozi\u021Biile contractului de furnizare.\n\n \u00CEn drept, indic\u0103m urm\u0103toarele texte de lege \u00EEn temeiul c\u0103rora ne \u00EEntemeiem prezenta soma\u021Bie:\n\n- Art. 143 alin. (2) din Legea nr. 123/2012: \u201EFurnizorul de gaze naturale are, \u00EEn principal, urm\u0103toarele drepturi: a) s\u0103 \u00EEncaseze contravaloarea gazelor naturale furnizate, conform contractelor \u00EEncheiate cu clien\u0163ii.\u201D\n\n- Art. 145 alin. (1) din Legea nr. 123/2012: \u201EClien\u0163ii finali au obliga\u0163ia s\u0103 achite facturile reprezent\u00E2nd contravaloarea serviciilor prestate de c\u0103tre furnizorul/operatorul sistemului, \u00EEn termenul \u015Fi \u00EEn condi\u0163iile prev\u0103zute \u00EEn contractul \u00EEncheiat cu acesta.\u201D           \n\n- Art. 43 alin. (1) din Regulamentul privind furnizarea gazelor naturale la clien\u021Bii finali aprobat prin Ordinul nr. 29/2016: \u201EFurnizorul emite factura reprezent\u00E2nd contravaloarea consumului de gaze naturale la locul de consum al clientului final dup\u0103 fiecare perioad\u0103 de facturare stabilit\u0103 conform contractului de furnizare a gazelor naturale.\u201D\n\n- Art. 45 alin. (1) din Regulamentul privind furnizarea gazelor naturale la clien\u021Bii finali aprobat prin Ordinul nr. 29/2016: \u201EPlata contravalorii consumului de gaze naturale se efectueaz\u0103 de clientul final \u00EEn baza facturii emise de c\u0103tre furnizor, cu respectarea termenului scadent de plat\u0103 prev\u0103zut \u00EEn contractul de furnizare a gazelor naturale.\u201D\n\n- Art. 48 alin. (1) din Regulamentul privind furnizarea gazelor naturale la clien\u021Bii finali aprobat prin Ordinul nr. 29/2016: \u201EPentru neachitarea de c\u0103tre clientul final, \u00EEn termenul scadent prev\u0103zut \u00EEn contractul de furnizare a gazelor naturale, a facturii reprezent\u00E2nd contravaloarea consumului de gaze naturale, furnizorul are dreptul s\u0103 aplice dob\u00E2nzi penalizatoare pentru \u00EEnt\u00E2rziere \u00EEn efectuarea pl\u0103\u0163ii, \u00EEn termenul \u015Fi \u00EEn condi\u0163iile prev\u0103zute \u00EEn contractul de furnizare a gazelor naturale  [...]\u201D\n\n- Art. 61 lit. b) din Regulamentul privind furnizarea gazelor naturale la clien\u021Bii finali aprobat prin Ordinul nr. 29/2016: \u201EClientul final de gaze naturale are, \u00EEn principal, urm\u0103toarele obliga\u0163ii: b) s\u0103 achite integral factura scadent\u0103 reprezent\u00E2nd contravaloarea consumului de gaze naturale, \u00EEn termenul \u015Fi \u00EEn condi\u0163iile prev\u0103zute \u00EEn contractul de furnizare a gazelor naturale.\u201D\n\n- Art. 1 alin. (3) din OG nr. 13/2011: \u201EDob\u00E2nda datorat\u0103 de debitorul obliga\u0163iei b\u0103ne\u015Fti pentru ne\u00EEndeplinirea obliga\u0163iei respective la scaden\u0163\u0103 este denumit\u0103 dob\u00E2nd\u0103 penalizatoare.\u201D\n\n- Art. 1270 alin. (1) din Codul civil: \u201EContractul valabil \u00EEncheiat are putere de lege \u00EEntre p\u0103r\u0163ile contractante\u201D.\n\n- Art. 1531  din Codul civil:\n\n            \u201E(1) Creditorul are dreptul la repararea integral\u0103 a prejudiciului pe care l-a suferit din faptul neexecut\u0103rii.\n\n            (2) Prejudiciul cuprinde pierderea efectiv suferit\u0103 de creditor \u015Fi beneficiul de care acesta este lipsit. La stabilirea \u00EEntinderii prejudiciului se \u0163ine seama \u015Fi de cheltuielile pe care creditorul le-a f\u0103cut, \u00EEntr-o limit\u0103 rezonabil\u0103, pentru evitarea sau limitarea prejudiciului\u201D.\n\n-  Art. 1535 din Codul civil:\n\n\u201E(1) \u00CEn cazul \u00EEn care o sum\u0103 de bani nu este pl\u0103tit\u0103 la scaden\u0163\u0103, creditorul are dreptul la daune moratorii, de la scaden\u0163\u0103 p\u00E2n\u0103 \u00EEn momentul pl\u0103\u0163ii, \u00EEn cuantumul convenit de p\u0103r\u0163i sau, \u00EEn lips\u0103, \u00EEn cel prev\u0103zut de lege, f\u0103r\u0103 a trebui s\u0103 dovedeasc\u0103 vreun prejudiciu. \u00CEn acest caz, debitorul nu are dreptul s\u0103 fac\u0103 dovada c\u0103 prejudiciul suferit de creditor ca urmare a \u00EEnt\u00E2rzierii pl\u0103\u0163ii ar fi mai mic.\n\n(2) Dac\u0103, \u00EEnainte de scaden\u0163\u0103, debitorul datora dob\u00E2nzi mai mari dec\u00E2t dob\u00E2nda legal\u0103, daunele moratorii sunt datorate la nivelul aplicabil \u00EEnainte de scaden\u0163\u0103.\n\n(3) Dac\u0103 nu sunt datorate dob\u00E2nzi moratorii mai mari dec\u00E2t dob\u00E2nda legal\u0103, creditorul are dreptul, \u00EEn afara dob\u00E2nzii legale, la daune-interese pentru repararea integral\u0103 a prejudiciului suferit\u201D.\n\n- Art. 1549 alin. (1) teza a II-a din Codul civil: \u201E. \u00CEn cazul contractelor cu executare succesiv\u0103, creditorul are dreptul la reziliere, chiar dac\u0103 neexecutarea este de mic\u0103 \u00EEnsemn\u0103tate, \u00EEns\u0103 are un caracter repetat. Orice stipula\u0163ie contrar\u0103 este considerat\u0103 nescris\u0103.\u201D\n\n \n\n\tLu\u00E2nd \u00EEn considerare situa\u021Bia de fapt prezentat\u0103 anterior \u0219i motivele de drept \u00EEnvederate, v\u0103 solicit\u0103m s\u0103 da\u021Bi curs prezentei soma\u021Bii \u0219i s\u0103 dispune\u021Bi plata debitului de "+
                this.sum(invoices) + " lei \u0219i a penalit\u0103\u021Bilor de \u00EEnt\u00E2rziere aferente acestui debit \u00EEn cuantum de  0.02 % pe zi de \u00EEnt\u00E2rziere, \u00EEncep\u00E2nd cu data scaden\u021Bei fiec\u0103rei facturi \u0219i p\u00E2n\u0103 la data pl\u0103\u021Bii efective, astfel cum am detaliat anterior, \u00EEn contul bancar al societ\u0103\u021Bii noastre IBAN RO16BRDE426SV44358664260 deschis la BRD sau prin prezentarea la urm\u0103toarele puncte de lucru ale Euro Seven Industry S.R.L.:\n\n\u00B7         Comuna Bolintin Deal, Jude\u021Bul Giurgiu - Strada Muncii nr. 18, telefon 0374.629.219;\n\n\u00B7         Comuna S\u0103b\u0103reni, Jude\u021Bul Giurgiu - Strada Teilor nr. 1, telefon 0374.628.672;\n\nProgram de func\u021Bionare: 08.00 - 16.00.\n\n          Neplata contravalorii consumului dvs. genereaz\u0103 pentru societatea noastr\u0103 costuri suplimentare pentru a men\u021Bine func\u021Bionalitatea sistemului, c\u00E2t \u0219i pentru a putea acoperi cheltuielile cu transportul \u0219i \u00EEnmagazinarea gazelor, pe care societatea noastr\u0103 va fi nevoit\u0103 s\u0103 le recupereze pe cale judec\u0103toreasc\u0103 de la dvs. De asemenea, neplata facturilor pentru consumul de gaze naturale ne va pune \u00EEn imposibilitate de a v\u0103 furniza \u00EEn continuare gazele naturale, \u00EEntruc\u00E2t nu vom avea resursele financiare necesare pentru achizi\u021Bionarea \u0219i furnizarea gazelor c\u0103tre dvs.\n\n\nCu deosebit\u0103 considera\u021Bie,\n EURO SEVEN INDUSTRY S.R.L. \u2013 creditoare,\nprin administrator Cong Yan";
        String to = personalDetails.customer_email; // Mapping to DB
        LocalDate creation_date = LocalDate.now();

        return new Email(to, content, subject, creation_date);
    }

    private static String invoicesToString(List<Invoice> invoices)
    {
        String result = "\n\n";
        for (Invoice i : invoices) {
            result += i.toString() + "\n\n";
        }

        return result;
    }

    private static String sum(List<Invoice> invoices)
    {
        double suma = 0;
        for (Invoice i : invoices) {
            suma += i.price;
        }

        return String.valueOf(suma);
    }
}
