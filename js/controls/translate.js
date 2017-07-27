var translate_param = gup('translate');
$(function () {
    translate(translate_param);
    get_posts();
    $('#myModal').reveal();
});

function translate(lang) {
    var $mymodal = $('#myModal');
    switch (lang) {
        case "en":
            $mymodal.find('h1').text('Control Suggestions');
            $mymodal.find('p').text('Here you will find a set of posts that you may want to reconsider sharing and a set of pages that you may want to reconsider liking. The sets of posts and likes for reconsideration are ordered based on the associated "disclosure score" (please see the relevant section in Databait [here we will add a link]). There are two separate lists for posts and liked pages, each of them can be seen by clicking at the respective buttons at the top. For each post and like, the related category of personal information is mentioned along with the disclosure score. Please note that through the visualization of the disclosure scores you can change the sensitivity of different categories of information and this can affect the order by which the liked pages and posts appear here. Also, if you make appropriate changes to your profile (e.g. delete posts or un-like pages) you are likely to see you disclosure score drop (it may take some minutes until the changes from Facebook are propagated to DataBait)!');
            $('#title').text('You may like to reconsider liking the following pages and sharing the following posts!');
            $('#posts').text('POSTS');
            $('#likes').text('LIKES');
            $('#images').text('IMAGES');
            $('#likes_p').text('Please note that your likes are visible by all your friends!');
            $('#posts_no').text('Νο posts to draw your attention to!');
            $('#likes_no').text('Νο likes to draw your attention to!');
            $('#images_no').text('Νο images to draw your attention to!');
            $('#Demographics').text('Demographics');
            $('#Hobbies').text('Hobbies');
            $('#Employment').text('Employment');
            $('#Relationships').text('Relationships');
            $('#Religion').text('Religion');
            $('#Sexuality').text('Sexuality');
            $('#Politics').text('Politics');
            $('#Health').text('Health');
            $('#Psychology').text('Psychology');
            break;
        case "du":
            $mymodal.find('h1').text('Controleer de suggesties');
            $mymodal.find('p').text('Hier vind je een selectie posts die je mogelijk niet meer wil delen of leuk-vinden. De selectie van deze posts en vind-ik-leuks is gebaseerd op je geassocieerde onthullingsscore (bekijk hier wat we daar mee bedoelen in DataBait (here we will add a link). Er zijn twee aparte lijsten voor posts en pagina’s. Elke lijst kan je zien door te klikken op de knoppen bovenaan. Voor iedere post en vind-ik-leuk wordt er weergegeven welke categorie van persoonsgegevens met deze onthullingsscore te maken heeft. Je kan via de visualisatie steeds de onthullingsscores aanpassen door de gevoeligheid van de verschillende categorieën aan te passen. Dit zal er dan voor zorgen dat deze lijsten anders geordend worden. Als je bovendien zaken op je profiel aanpast (iets verwijderen of ontvolgen), dan zal je onthullinsscore hier zakken. Pas op, dit duurt wel even voor DataBait het heeft berekend.');
            $('#title').text('Je kan best overwegen of je deze pagina\'s wel wil volgen of deze posts wel wil delen!');
            $('#posts').text('Posts');
            $('#likes').text('Vind-ik-leuks');
            $('#images').text('IMAGES');
            $('#likes_p').text('Onthoud dat je vind-ik-leuks zichtbaar zijn voor al je vrienden!');
            $('#posts_no').text('Geen posts om je aandacht te trekken!');
            $('#likes_no').text('Geen vind-ik-leuks om je aandacht te trekken!');
            $('#images_no').text('Νο images to draw your attention to!');
            $('#Demographics').text('demografische gegevens');
            $('#Hobbies').text('Hobby\'s');
            $('#Employment').text('Tewerkstelling');
            $('#Relationships').text('Relaties');
            $('#Religion').text('Religie');
            $('#Sexuality').text('Seksualiteit');
            $('#Politics').text('Politieke voorkeuren');
            $('#Health').text('Gezondheid');
            $('#Psychology').text('Psychologische kenmerken');
            break;
        case "sw":
            $mymodal.find('h1').text('Förslag till inställningar');
            $mymodal.find('p').text('Här hittar du en grupp av inlägg som du kanske vill ompröva att dela, och ett antal sidor du kanske vill ompröva att gilla. Gruppen av inlägg och "likes" för omprövning har ordnats baserat på motsvarande "avslöjandegrad" (vänligen se aktuell beskrivning i DataBait [länk]). Det finns två separata listor för inlägg och gillade sidor, var och en av dem kan ses genom att klicka på respektive knapp högst upp. För varje inlägg och "like", så noteras motsvarande kategori av personlig information tillsammans med avslöjandegraden. Vänligen notera att med hjälp av visualiseringen av avslöjandegrad så kan du ändra känsligheten för olika kategorieer av information, vilket kan påverka ordningen för hur gillade sidor och inlägg visas här. Dessutom, om du gör lämpliga förändringar i din profil-inställning (t.ex. radera inlägg eller "un-like" sidor) så kommer du sannolikt att se en minskning i avslöjandegraden (det kan ta några minuter innan ändringarna i Facebook har nått DataBait)!');
            $('#title').text('Du kanske vill ompröva gillandet av följande sidor och delandet av följande inlägg!');
            $('#posts').text('Inlägg');
            $('#likes').text('"LIKES"');
            $('#images').text('IMAGES');
            $('#likes_p').text('Vänligen notera att dina gilla-markeringar är synliga för alla dina vänner!');
            $('#posts_no').text('Inga inlägg att väcka din uppmärksamhet!');
            $('#likes_no').text('Inga "likes" att väcka din uppmärksamhet!');
            $('#images_no').text('Νο images to draw your attention to!');
            $('#Demographics').text('Demografi');
            $('#Hobbies').text('Hobbies');
            $('#Employment').text('Sysselsättning');
            $('#Relationships').text('Relationer');
            $('#Religion').text('Religion');
            $('#Sexuality').text('Sexuell läggning');
            $('#Politics').text('Politiska åsikter');
            $('#Health').text('Hälsa');
            $('#Psychology').text('Personlighetsdrag');

            break;
        default:
            $mymodal.find('h1').text('Control Suggestions');
            $mymodal.find('p').text('Here you will find a set of posts that you may want to reconsider sharing and a set of pages that you may want to reconsider liking. The sets of posts and likes for reconsideration are ordered based on the associated "disclosure score" (please see the relevant section in Databait [here we will add a link]). There are two separate lists for posts and liked pages, each of them can be seen by clicking at the respective buttons at the top. For each post and like, the related category of personal information is mentioned along with the disclosure score. Please note that through the visualization of the disclosure scores you can change the sensitivity of different categories of information and this can affect the order by which the liked pages and posts appear here. Also, if you make appropriate changes to your profile (e.g. delete posts or un-like pages) you are likely to see you disclosure score drop (it may take some minutes until the changes from Facebook are propagated to DataBait)!');
            $('#title').text('You may like to reconsider liking the following pages and sharing the following posts!');
            $('#posts').text('POSTS');
            $('#likes').text('LIKES');
            $('#images').text('IMAGES');
            $('#likes_p').text('Please note that your likes are visible by all your friends!');
            $('#posts_no').text('Νο posts to draw your attention to!');
            $('#likes_no').text('Νο likes to draw your attention to!');
            $('#images_no').text('Νο images to draw your attention to!');
            $('#Demographics').text('Demographics');
            $('#Hobbies').text('Hobbies');
            $('#Employment').text('Employment');
            $('#Relationships').text('Relationships');
            $('#Religion').text('Religion');
            $('#Sexuality').text('Sexuality');
            $('#Politics').text('Politics');
            $('#Health').text('Health');
            $('#Psychology').text('Psychology');
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