var translate_param = gup('translate');

var en_translations_dimensions = ["Demographics", "Hobbies", "Employment", "Relationships", "Religion", "Sexuality", "Politics", "Health", "Psychology"];
var du_translations_dimensions = ["demografische gegevens", "Hobby's", "Tewerkstelling", "Relaties", "Religie", "Seksualiteit", "Politieke voorkeuren", "Gezondheid", "Psychologische kenmerken"];
var sw_translations_dimensions = ["Demografisk information", "Hobbies", "Sysselsättning", "Relationer", "Religion", "Sexuell läggning", "Politiska åsikter", "Hälsa", "Personlighetsdrag"];

var en_translations_attribute = ["degree", "nationality", "gender", "animals", "camping", "dancing", "gardening", "theatre", "hiking", "sports", "music", "reading", "shopping", "travelling", "series movies", "employment", "income", "living situation", "relationship status", "religious practice", "practice", "religious stance", "belief", "sexual orientation", "orientation", "political ideology", "ideology", "alcohol", "BMI class", "cannabis", "coffee", "exercising", "health status", "smoking", "agreeableness", "conscientiousness", "extraversion", "neuroticism", "openness"];
var du_translations_attribute = ["graad", "nationaliteit", "gender", "dieren", "camping", "dancing", "tuinieren", "theater", "wandelen", "sport", "muziek", "lezen", "shoppen", "reizen", "series en films", "tewerkstelling", "inkomen", "leefsituatie", "relatiestatus", "praktiserend gelovig", "-", "religieuze overtuiging", "-", "seksuele orientatie", "orientatie", "politieke ideologie", "ideologie", "alcohol", "BMI-waarde", "cannabis", "koffie", "beweging", "gezondheid", "roken", "altruisme", "nauwgezetheid", "extraversie", "neuroticisme", "openheid"];
var sw_translations_attribute = ["utbildningsnivå", "nationalitet", "kön", "djur", "camping", "dans", "trädgårdsarbete", "teater", "vandring", "idrott", "musik", "läsande", "shopping", "att resa", "TV-serier och filmer", "sysselsättning", "inkomst", "boendesituation", "relationsstatus", "religionsutövning", "aktiv utövning", "religiös övertygelse", "tro", "sexuell läggning", "läggning", "politisk ideologi", "ideologi", "alkohol", "BMI", "cannabis", "kaffe", "motion", "hälsostatus", "rökning", "vänlighet", "samvetsgrannhet", "extraversion", "neuroticism", "öppenhet"];

var en_translations_values = ["female", "male", "high school", "postgraduate", "bachelor", "Slovak", "Russian", "Maltese", "Danish", "Bulgarian", "German", "Belgian", "Swedish", "other", "unemployed", "employed", "high", "low", "medium", "single", "in a relationship", "in relationship", "married", "outside my family", "alone or with friend(s)", "with my own family", "with my parents' family", "with my parents", "judaism", "agnosticism", "islam", "atheism", "protestant", "buddhism", "catholic", "no", "yes", "non-heterosexual", "homo/bi", "heterosexual", "left", "right", "poor", "good", "fair", "very good", "healthy", "non-healthy", "agreeable", "disagreeable", "conscientious", "unconscientious", "extravert", "introvert", "open", "closed", "neurotic", "stable", "Other"];
var du_translations_values = ["vrouwelijk", "mannelijk", "secundair onderwijs", "postuniversitair", "bachelor", "Slovaaks", "Russisch", "Maltees", "Deens", "Bulgaars", "Duits", "Belgisch", "Zweeds", "ander", "werkeloos", "werkend", "hoog", "laag", "gemiddeld", "single", "in een relatie", "in relatie", "getrouwd", "buiten mijn familie", "-", "binnen mijn familie", "binnen de familie van mijn ouders", "-", "Jodendom", "agnosticisme", "Islam", "Atheisme", "Protestant", "Boeddhisme", "Katholiek", "nee", "ja", "niet-heteroseksueel", "-", "heteroseksueel", "links", "rechts", "arm", "goed", "-", "heel goed", "gezond", "ongezond", "aangenaam", "onaangenaam", "gewetensvol", "niet gewetensvol", "extravert", "introvert", "open", "gesloten", "neurotisch", "stabiel", "ander"];
var sw_translations_values = ["kvinnlig", "manlig", "gymnasiet", "magister/master", "högskoleingenjör /kandidat", "Slovakisk", "Rysk", "Maltesisk", "Dansk", "Bulgarisk", "Tysk", "Belgisk", "Svensk", "annan", "arbetslös", "anställd", "hög", "låg", "mellan", "single", "i en relation", "i relation", "gift", "utanför min familj", "ensam eller med vänner", "med min egen familj", "med mina föräldrars familj", "med mina föräldrar", "judendom", "agnosticism", "islam", "ateism", "protestant", "buddism", "katolsk", "nej", "ja", "icke-heterosexuell", "homo/bi", "heterosexuell", "vänster", "höger", "dålig", "tillfredsställande/bra", "tillfredsställande", "mycket bra", "hälsosamt", "ohälsosamt", "angenäm", "oangenäm", "samvetsgrann", "icke samvetsgrann", "extravert", "introvert", "öppen", "sluten", "neurotisk", "stabil", "annan"];


$(function () {
    translate(translate_param);
    call_graph();
    $('#myModal2').reveal();
});
function translate(lang) {
    var $mymodal2 = $('#myModal2');
    switch (lang) {
        case "en":
            $mymodal2.find('h1:eq(0)').text('Disclosure Scoring');
            $mymodal2.find('h1:eq(1)').text('Legend');
            $mymodal2.find('h1:eq(2)').text('How is the Disclosure Score computed?');
            $mymodal2.find('h1:eq(3)').text('How should I use this visualization?');
            $mymodal2.find('p:eq(0)').html('This visualization summarizes the information that the DataBait algorithms infer about you based on your Facebook data. These inferences are organized into a number of categories: <strong>Demographics</strong>, <strong>Employment</strong>, <strong>Relationships</strong>, <strong>Religion</strong>, <strong>Psychology</strong>, <strong>Sexuality</strong>, <strong>Politics</strong>, <strong>Health</strong> and <strong>Hobbies</strong>. Each category of information is associated with a set of inferences about more specific attributes. For instance, under the Demographics category, you will find our inferences about your gender that can be either male or female.<br>The different attributes, the categories that they belong to and the specific values that they can take are all depicted as bubbles, the colour and size of which is associated to a "disclosure score". The disclosure score is a measure of information exposure and risk: <strong>the higher the disclosure score, the higher the exposure and risk</strong> related to the associated piece of information.');
            $mymodal2.find('p:eq(1)').text('The disclosure score takes into account three factors: a) our confidence that the predicted values are valid for you, b) the visibility of the associated content to other social network users (for instance, public posts are more visible compared to posts shared with your friends only) and c) the sensitivity of different pieces of information. The first two are automatically computed by our system, whereas the third is initialized with some default values that have resulted from user studies, but can be adapted according to your preferences. This will allow you to emphasize the different types of information that you think are most important (for instance, you may define that information about your political opinion is more sensitive compared to demographic information about you). If you adjust sensitivity, affected scores will be recomputed and updated shortly. Please use higher sensitivity scores for types of information that you believe are more important to be kept private.');
            $mymodal2.find('p:eq(2)').text('At the initial screen, you can see the bubbles corresponding to the different categories and your overall disclosure score. Please take note of the info button at the top-left corner on which you can click to see this description. It is also important to notice that when you put the mouse over one of the categories, you will see some hints about potential risks associated to the disclosure of this category of information. Once you click on one of the categories, you will see a number of attributes grouped under it. Subsequently, you can click on any of them and see the different values that it can take. Please note that the value that we think is most likely to be valid for you is marked with a thick black line. Finally, if you click on a value bubble, you will see at the right part of the page a short explanation of why the system thinks that this value may hold for you. Please note that the results shown are produced by algorithms; therefore, these results should be read with caution and you shouldn\'t be surprised if they are not accurate at times. Please also note that we have two types of inferencing algorithms: the first works on the collection of your social network data (likes, posts, images), whereas the second works on single items in your profile (e.g. a liked page or a single post). For the second type, an explicit association to specific items in your profile is provided, but for the first, an explicit association cannot be provided as the result has been produced based on the collection of all your social network data.');
            $('#dis_score').text('Disclosure Score');
            $('#over').text('Disclosure Score');
            $('#attr_overall').text('Overall');
            $('.controls').html('How can I <a href="controls.html?translate=en">control</a> (<a href="controls_ext.html?translate=en">extended version</a>) my Disclosure Score?')
            break;
        case "du":
            $mymodal2.find('h1:eq(0)').text('Onthullingsscore');
            $mymodal2.find('h1:eq(1)').text('Legende');
            $mymodal2.find('h1:eq(2)').text('Hoe wordt de onthullingsscore berekend?');
            $mymodal2.find('h1:eq(3)').text('Hoe moet ik deze visualisatie gebruiken?');
            $mymodal2.find('p:eq(0)').html('Deze visualisatie vat de informatie samen die het DataBait algoritme over je kan afleiden gebaseerd op je Facebookgegevens. De afgeleide data zijn georganiseerd in de volgende categorieën: <strong>demografie</strong>, <strong>tewerkstelling</strong>, <strong>relaties</strong>, <strong>religie</strong>, <strong>psychologische eigenschappen</strong>, <strong>seksualiteit</strong>, <strong>politiek</strong>, <strong>gezondheid en hobby\'s</strong>. Elke categorie wordt geassocieerd met een selectie van categorieën afgeleid van specifieke eigenschappen. Bijvoorbeeld, onder de categorie demografie, zal je onze afgeleide gegevens zien over gender, deze kunnen mannelijk of vrouwelijk zijn.<br>De verschillende eigenschappen en de categorieën waartoe ze behoren worden samen met hun specifieke scores voorgesteld als bellen waarin de kleur en de grootte bepaald worden door de onthullingsscore. Deze onthullingsscore is een maat om uit te drukken hoeveel je deelt en hoe riskant dit mogelijk is: <strong>hoe hoeger de onthullingscore, hoe meer je deelt en hoe hoger de risico\'s</strong> die met deze informatie hebben te maken. ');
            $mymodal2.find('p:eq(1)').text('De onthullingsscore bestaat uit drie factoren: a) ons vertrouwen in het feit dat onze afgeleide waarden correct zijn voor jou, b) de zichtbaarheid van deze inhoud ten opzichte van andere gebruikers in je sociaal netwerk (bijvoorbeeld, publieke posts zijn meer zichtbaar dan posts die je alleen met je vrienden deelt) en c) de geoveligheid van de verschillende soorten informatie. De eeste twee zaken worden automatisch berekend door ons systeem. De derde is gebaseerd op reacties van voorgaande gebruikers, maar kunnen volgens jouw eigen voorkeuren worden aangepast. Dit laat jouw toe om te benadrukken welke gegevens jij belangrijk vindt (je kan bijvoorbeeld aangeven dat politieke meningen voor jou gevoeliger zijn dan demografishe gegevens). Als je de gevoeligheid van deze gegevenscategorieën aanpast, dan zullen de scores opnieuw berekend en aangepast worden. Gebruik dus best een hogere gevoeligheidsscore voor categorieën van gegevens die je belangrijk vindt en privé wil houden.');
            $mymodal2.find('p:eq(2)').text('Op het beginscherm zie je bellen die overeenkomen met de verschillende categorieën en je algemene onthullingsscore. Zorg er ook zeker voor dat je de info-knop bovenaan links hebt gezien, je kan hier op klikken om deze beschrijving verder te lezen. Het is ook belangrijk om te weten dat wanneer je je muis beweegt over één van de categorieën, dat er hints worden gegeven. Deze hinds gaan over mogelijke risico’s die te maken hebben met onthullingen voor dit type van informatie. Als je klikt op één van deze categorieën, dan zal je enkele eigenschappen zien die met deze categorie te maken hebben. Vervolgens kan je klikken op één van deze eigenschappen om te zien welke waarden deze eigenschappen kunnen hebben. We hebben de waarde die wij belangrijk vinden om jouw score te berekenen een dikke zwarte rand gegeven. Als je klikt op de waarde in een bel, dan zal je aan de rechterkan van je scherm een uitleg zien. Deze uitleg verklaart waarom het systeem denkt dat deze waarde bij jou past. Merk op dat deze resultaten door algoritmes werden berekend, dat wil zeggen dat je voorzichtig moet zijn met de resultaten omdat ze niet altijd nauwkeurig zijn. Het is ook belangrijk om te weten dat we twee soorten algoritmes gebruiken: Het eerste werkt op basis van de data uit je sociale netwerk (vind-ik-leuks, posts, afbeeldingen). Het tweede werkt met individuele sutkken van je profiel (een pagina die je volgt of een post die je leuk vindt). Voor het tweede type algoritme is er een directe link met je profiel, maar voor het eerste algoritme is er geen directe link omdat de data gebaseerd is op de complete verzameling van je gegevens.');
            $('#dis_score').text('Onthullingsscore');
            $('#over').text('Onthullingsscore');
            $('#attr_overall').text('Algemene');
            $('.controls').html('Hoe kan ik mijn onthullingsscore <a href="controls.html?translate=du">aanpassen?</a> (<a href="controls_ext.html?translate=du">extended version</a>)');
            break;
        case "sw":
            $mymodal2.find('h1:eq(0)').text('Avslöjandegrad');
            $mymodal2.find('h1:eq(1)').text('Teckenförklaring');
            $mymodal2.find('h1:eq(2)').text('Hur beräknas Avslöjandegraden?');
            $mymodal2.find('h1:eq(3)').text('Hur kan jag använda denna visualisering');
            $mymodal2.find('p:eq(0)').html('Visualiseringen sammanfattar den information som DataBait-algoritmerna har slutit sig till baserat på dina facebook data. Dessa slutledningar grupperas i ett antal kategorier: <strong>Demografi</strong>, <strong>Sysselsättning</strong>, <strong>Relationer</strong>, <strong>Religion</strong>, <strong>Personlighet</strong>, <strong>Sexuell läggning, Politik</strong>, <strong>Hälsa</strong> och <strong>Hobbies</strong>. Varje informationskategori associeras med ett antal slutledningar avseende specifika attribut. Till exempel, i kategorin Demografi hittar du slutledningar om ditt kön, som kan vara antingen man eller kvinna.<br>De olika attributen, kategorierna de tillhör samt de specifika värdena de kan anta visas alla som bubblor, där bubblans färg och storlek motsvarar en viss "avslöjandegrad". Avslöjandegraden är ett mått på informationens synlighet och risk: <strong>ju högre avslöjandegrad, desto större synlighet och risk</strong> för motsvarande information');
            $mymodal2.find('p:eq(1)').text('Avslöjandegraden bygger på tre faktorer: a) vår konfidens att de uträknade värdena stämmer för dig, b) synligheten för motsvarande innehåll för andra användare av sociala nätverk (till exempel, offentliga inlägg har större synlighet jämfört med inlägg som bara delas med dina vänner samt c) känsligheten för olika informationsdelar. De två första beräknas automatiskt av vårt system, medan det tredje har fått ett initialt värde baserat på användarundersökningar, men kommer att anpassas i enlighet med dina preferenser. Det här ger dig möjlighet att betona de olika typer av information som du tycker är viktigast (till exempel, du kanske definierar information om dina politiska åsikter som känsligare jämfört med demografisk information om dig). Om du justerar känslighet, så kommer påverkade värden att beräknas och uppdateras på nytt. Vänligen använd högre känslighetsvärden för typer av information som du anser viktigt att den hålls privat.');
            $mymodal2.find('p:eq(2)').text('På den inledande skärmen ser du bubblor motsvarande de de olika kategorierna och din totala avslöjandegrad. Vänligen notera info-knappen i det övre vänstra hörnet som du kan klicka på för att se den här beskrivningen. Det är även viktigt att notera att när du för muspekaren över en av kategorierna, så kommer du att se några tips om potentiella risker som hör ihop med avslöjande av den här sortens information. När du klickar på en av kategorierna kommer du att se ett antal attribut grupperade därunder. Därefter kan du klicka på någon av dem och se de olika värdena de kan anta. Vänligen notera att de värde vi tror är mest tillämpligt för dig har markerats med ett tjockt svart streck. Till sist, om du klickar på en värdebubbla så kommer du att på den högra delen av sidan se en kort förklaring av vad systemet anser att det här värdet betyder för dig. Vänligen notera att resultaten har producerats av algoritmer; läs därför de här resultaten med försiktighet och bli inte överraskad ifall de ibland inte stämmer. Vänligen även notera att vi har två typer av slutledningsalgoritmer: den första arbetar med summan av dina sociala nätverks-data (likes, inlägg, bilder), medan den andra arbetar med en enskild del i din profil (t.ex. en gillad sida eller ett enskilt inlägg). Avseende den andra typen, så visas en explicit koppling till en specifik enhet i din profil, men för den första kan en explicit koppling inte visas då reultatet har beräknats baserat på summan av alla dina sociala nätverks-data.');
            $('#dis_score').text('avslöjandegrad');
            $('#over').text('avslöjandegrad');
            $('#attr_overall').text('sammanlagt');
            $('.controls').html('Hur kan jag <a href="controls.html?translate=sw">påverka</a> (<a href="controls_ext.html?translate=sw">extended version</a>) min avslöjandegrad?');
            break;
        default:
            $mymodal2.find('h1:eq(0)').text('Disclosure Scoring');
            $mymodal2.find('h1:eq(1)').text('Legend');
            $mymodal2.find('h1:eq(2)').text('How is the Disclosure Score computed?');
            $mymodal2.find('h1:eq(3)').text('How should I use this visualization?');
            $mymodal2.find('p:eq(0)').html('This visualization summarizes the information that the DataBait algorithms infer about you based on your Facebook data. These inferences are organized into a number of categories: <strong>Demographics</strong>, <strong>Employment</strong>, <strong>Relationships</strong>, <strong>Religion</strong>, <strong>Psychology</strong>, <strong>Sexuality</strong>, <strong>Politics</strong>, <strong>Health</strong> and <strong>Hobbies</strong>. Each category of information is associated with a set of inferences about more specific attributes. For instance, under the Demographics category, you will find our inferences about your gender that can be either male or female.<br>The different attributes, the categories that they belong to and the specific values that they can take are all depicted as bubbles, the colour and size of which is associated to a "disclosure score". The disclosure score is a measure of information exposure and risk: <strong>the higher the disclosure score, the higher the exposure and risk</strong> related to the associated piece of information.');
            $mymodal2.find('p:eq(1)').text('The disclosure score takes into account three factors: a) our confidence that the predicted values are valid for you, b) the visibility of the associated content to other social network users (for instance, public posts are more visible compared to posts shared with your friends only) and c) the sensitivity of different pieces of information. The first two are automatically computed by our system, whereas the third is initialized with some default values that have resulted from user studies, but can be adapted according to your preferences. This will allow you to emphasize the different types of information that you think are most important (for instance, you may define that information about your political opinion is more sensitive compared to demographic information about you). If you adjust sensitivity, affected scores will be recomputed and updated shortly. Please use higher sensitivity scores for types of information that you believe are more important to be kept private.');
            $mymodal2.find('p:eq(2)').text('At the initial screen, you can see the bubbles corresponding to the different categories and your overall disclosure score. Please take note of the info button at the top-left corner on which you can click to see this description. It is also important to notice that when you put the mouse over one of the categories, you will see some hints about potential risks associated to the disclosure of this category of information. Once you click on one of the categories, you will see a number of attributes grouped under it. Subsequently, you can click on any of them and see the different values that it can take. Please note that the value that we think is most likely to be valid for you is marked with a thick black line. Finally, if you click on a value bubble, you will see at the right part of the page a short explanation of why the system thinks that this value may hold for you. Please note that the results shown are produced by algorithms; therefore, these results should be read with caution and you shouldn\'t be surprised if they are not accurate at times. Please also note that we have two types of inferencing algorithms: the first works on the collection of your social network data (likes, posts, images), whereas the second works on single items in your profile (e.g. a liked page or a single post). For the second type, an explicit association to specific items in your profile is provided, but for the first, an explicit association cannot be provided as the result has been produced based on the collection of all your social network data.');
            $('#dis_score').text('Disclosure Score');
            $('#over').text('Disclosure Score');
            $('#attr_overall').text('Overall');
            $('.controls').html('How can I <a href="controls.html">control</a> (<a href="controls_ext.html">extended version</a>) my Disclosure Score?');
    }
}

function gup(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return "";
    else return results[1];
}