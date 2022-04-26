document.addEventListener('DOMContentLoaded', function() {
    var site = processURL();
    const lang_access_template = languageAccessTemplate(site);
    const lang_access_footer_wrap = languageAccessFooterWrapTemplate();
    var lang_access_header_wrap_el = document.createElement('div');
    lang_access_header_wrap_el.id = 'translate-wrap';
    document.body.insertBefore(lang_access_header_wrap_el, document.body.firstChild);
    document.getElementById('translate-wrap').insertAdjacentHTML("afterbegin", lang_access_template);


    var lang_access_footer_wrap_el = document.createElement('div');
    lang_access_footer_wrap_el.id = 'footer-translate';
    lang_access_footer_wrap_el.className = 'footer-translate';
    document.body.insertBefore(lang_access_footer_wrap_el, null);
    document.getElementById('footer-translate').insertAdjacentHTML("afterbegin", lang_access_footer_wrap);
    document.getElementById('translation-menu').insertAdjacentHTML("afterbegin", lang_access_template);
}, false);

function processURL() {
    var url = 'https://dfs.ny.gov/users/sign_in';
    var url_parts = url.split('/');
    var site = {
        protocol: url_parts[0],
        domain: url_parts[2],
        path: url_parts[3],
        noprotocolsite_url: url_parts[2],
    }
    return site;
}

function languageAccessFooterWrapTemplate() {
    return `
        <div class="inside-wrap">
            <h3><a href="https://www.ny.gov/web-translation-services">Translation Services</a></h3>
            <p>This page is available in other languages</p>
            <div class="translation-menu" id="translation-menu">

            </div><!--translation-menu-->
        </div><!--/inside-wrap-->
    `
}

function languageAccessTemplate(site) {
    return `
        <div class="translate-bar">
        <!--<div id="smt-lang-selector" class="smt-selector"></div>-->
        <div class="smt-selector">
            <nav aria-labelledby="langnav">
                <ul class="smt-menu">
                    <li class="smt-trigger">
                        <a class="smt-trigger-link" tabindex="0">
                            <span class="smt-lang" id="langnav">Translate</span>
                        </a>
                        <ul class="language-links">
                            <li class="smt-item">
                                <a translate="no" lang="en" class="smt-link sl_norewrite" href="https://${site.noprotocolsite_url}">English</a>
                            </li>
                            <li class="smt-item">
                                <a translate="no" lang="es" class="smt-link sl_norewrite" href="https://es.${site.noprotocolsite_url}">Español</a>
                            </li>
                            <li class="smt-item">
                                <a translate="no" lang="zh" class="smt-link sl_norewrite" href="https://zh.${site.noprotocolsite_url}">中文</a>
                            </li>
                            <li class="smt-item">
                                <a translate="no" lang="ru" class="smt-link sl_norewrite" href="https://ru.${site.noprotocolsite_url}">Русскийy</a>
                            </li>
                            <li class="smt-item">
                                <a translate="no" lang="yi" class="smt-link sl_norewrite" href="https://yi.{{ noprotocolsite_url }}">יידיש</a>
                            </li>
                            <li class="smt-item">
                                <a translate="no" lang="bn" class="smt-link sl_norewrite" href="https://bn.${site.noprotocolsite_url}">বাঙালি</a>
                            </li>
                            <li class="smt-item">
                                <a translate="no" lang="ko" class="smt-link sl_norewrite" href="https://ko.${site.noprotocolsite_url}">한국어</a>
                            </li>
                            <li class="smt-item">
                                <a translate="no" lang="ht" class="smt-link sl_norewrite" href="https://ht.${site.noprotocolsite_url}">Kreyòl Ayisyen</a>
                            </li>
                            <li class="smt-item">
                                <a translate="no" lang="it" class="smt-link sl_norewrite" href="https://it.${site.noprotocolsite_url}">Italiano</a>
                            </li>
                            <li class="smt-item">
                                <a translate="no" lang="ar" class="smt-link sl_norewrite" href="https://ar.{{ noprotocolsite_url }}">العربية</a>
                            </li>
                            <li class="smt-item">
                                <a translate="no" lang="pl" class="smt-link sl_norewrite" href="https://pl.${site.noprotocolsite_url}">Polski</a>
                            </li>
                            <li class="smt-item">
                                <a translate="no" lang="fr" class="smt-link sl_norewrite" href="https://fr.{{ noprotocolsite_url }}">Français</a>
                            </li>
                            <li class="smt-item">
                                <a translate="no" lang="ur" class="smt-link sl_norewrite" href="https://ur.{{ noprotocolsite_url }}">اردو</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </div><!--/translate-bar-->
    `
}

$(document).ready(function() {
    // hide menu if javascript is enabled
    $('#translate-wrap .smt-trigger ul').css('display', 'none');
    $(".footer-translate .inside-wrap .translation-menu ul.smt-menu ul").css("display", "none");

    // bind click event to trigger menu display
    $('.smt-trigger').bind('click', function(e) {
        e.stopPropagation();
        $(this).find('ul').toggle();
        $('#translate-wrap a.smt-trigger-link').toggleClass("open");
    });

    // build object full of key presses
    var keys = {};
    onkeydown = onkeyup = function(e){
        keys[e.keyCode] = e.type == 'keydown';
    };

    // on focusout of last item in menu, check if key press is tab and close menu if so
    $('#translate-wrap .language-links li:last-child').focusout(function() {
        if (keys[9] && !keys[16]) {
            $('#translate-wrap .smt-trigger').find('ul').hide();
            $('#translate-wrap a.smt-trigger-link').removeClass("open");
        } 
    });

    // on focusout of first item in menu, check if key press is shift+tab and close menu if so
    $('#translate-wrap .language-links li:first-child').focusout(function() {
        if (keys[9] && keys[16]) {
            $('#translate-wrap .smt-trigger').find('ul').hide();
            $('#translate-wrap a.smt-trigger-link').removeClass("open");
        } 
    });

    // close menu on click outside
    $('body').bind('click', function(e) {
        $('#translate-wrap .smt-trigger').find('ul').hide();
        $('#translate-wrap a.smt-trigger-link').removeClass("open");
    });

    // bind enter key to trigger
    $('.smt-trigger').keyup(function(e) {
        if (e.keyCode === 13) {
            $(this).find('ul').toggle();
            $('#translate-wrap a.smt-trigger-link').toggleClass("open");
        }
    });

    // Hide the vertical list of links in the footer translate menu in mobile (looks for window < 768px for NYGOV).
    var expandCollapse = function () {
        if ($(window).width() < 768) {
            $(function () {
            $(".footer-translate .inside-wrap .translation-menu ul.smt-menu ul").css("display", "none");
            });
        } else {
            $(function () {
            $(".footer-translate .inside-wrap .translation-menu ul.smt-menu ul").css("display", "flex");
            });
        }
    };
    $(window).resize(expandCollapse);

    // change footer translate menu links into <select> menu (to display on mobile devices)
    // append <select> to footer translate nav
    var buildSelectMenu = function () {
        var label = $('<label for="footertranslate">Translate</label>');
        var select = $('<select id="footertranslate" name="footertranslate"></select>');
        select.append(new Option('Translate', ''));
        $(".footer-translate .smt-menu ul.language-links li a").each(function() {
            select.append(new Option($(this).text(), $(this).attr('href')));
        });

        $('.footer-translate .smt-menu').append(label).append(select);
    };

    buildSelectMenu();
    $("#footertranslate option:first-child").prop({"disabled": "disabled", "hidden": "hidden"});

    // Ensure links open in the same browser tab
    $(".smt-menu select").change(function() {
        window.location = $(this).find("option:selected").val();
    });
    

    //For local development: force page to load in rtl for local development.  Adds class to 

    // $(document).ready(function(){
    //   $("html[lang=en]").attr("dir", "rtl").find("body").addClass("right-to-left");
    // });
});