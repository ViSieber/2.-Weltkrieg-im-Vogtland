<?php
    require("./classes.php");

    session_start();

    // GLOBAL VARIABLES
    // instance of mainClass gets initilized with init-key
    //$MAIN = NULL;

    // get language from http-request
    $LANG_B = $_SERVER["HTTP_ACCEPT_LANGUAGE"];
    
    // if set, page gets initialized
    $INIT = $_POST["init"];

    // if set, the language of the page will change
    $CHANGE_LANG = $_POST["changelang"];
    
    // if set, the file line.xml will be send
    $LINE = $_POST["line"];

    // if set, the file info_<lang>.xml will be send
    $INFO = $_POST["info"];

    // if set, file past_and_today.xml will be send
    $PAT = $_POST["pat"];
    
    // if set, a search will be performed
    $DO_SEARCH = $_POST["dosearch"];
    
    $Linesend = FALSE;

    if ($INIT == "TRUE")
    {
        //session_start();
        // get platform from post-request
        $PLATFORM = $_POST["platform"];
        $MAIN = new MainClass($LANG_B, $PLATFORM);
        
        $_SESSION["mainclass"] = $MAIN;
        
        $MAIN->sendAvailableLanguagesKey();
    }

    elseif ($LINE == "TRUE")
    {
        $MAIN = $_SESSION["mainclass"];
        $MAIN->sendLineXML();
    }

    elseif ($PAT == "TRUE")
    {
        $MAIN = $_SESSION["mainclass"];
        $MAIN->sendPatXml();
    }

    else if ($INFO == "TRUE")
    {
        $MAIN = $_SESSION["mainclass"];
        $MAIN->sendInfoXML();
    }

    else if ($CHANGE_LANG == "TRUE")
    {
        $MAIN = $_SESSION["mainclass"];

        // get language from post-request
        $LANG = $_POST["lang"];
        $MAIN->changeLanguage($LANG);
        $MAIN->sendInfoXML();
    }

    else if ($DO_SEARCH == "TRUE")
    {
        $MAIN = $_SESSION["mainclass"];

        // get search-keywords from post-request
        $SEARCH = $_POST["search"];
        $MAIN->search($SEARCH);
    }
?>